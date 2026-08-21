import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return {};

  return Object.fromEntries(
    readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        const key = line.slice(0, separator).trim();
        const value = line
          .slice(separator + 1)
          .trim()
          .replace(/^(['"])(.*)\1$/, "$2");
        return [key, value];
      }),
  );
}

const localOverrides = Object.fromEntries(
  Object.entries(parseEnvFile(".env.local")).filter(([, value]) => value),
);
const env = { ...parseEnvFile(".env"), ...localOverrides };

const firstValue = (...names) => names.map((name) => env[name]).find(Boolean);

const supabaseUrl = firstValue("SUPABASE_URL", "VITE_SUPABASE_URL");
const supabasePublishableKey = firstValue(
  "SUPABASE_PUBLISHABLE_KEY",
  "VITE_SUPABASE_PUBLISHABLE_KEY",
);

const elevenLabsApiKey = firstValue("ELEVENLABS_API_KEY", "VITE_ELEVENLABS_API_KEY");
const elevenLabsVoiceId =
  firstValue("ELEVENLABS_VOICE_ID", "VITE_ELEVENLABS_VOICE_ID") || "gHu9GtaHOXcSqFTK06ux";

const variables = {};

if (supabaseUrl && supabasePublishableKey) {
  Object.assign(variables, {
    SUPABASE_URL: supabaseUrl,
    SUPABASE_PUBLISHABLE_KEY: supabasePublishableKey,
    VITE_SUPABASE_URL: supabaseUrl,
    VITE_SUPABASE_PUBLISHABLE_KEY: supabasePublishableKey,
  });
} else {
  console.warn("Supabase configuration is not available locally; skipping it.");
}

if (elevenLabsApiKey) {
  Object.assign(variables, {
    ELEVENLABS_API_KEY: elevenLabsApiKey,
    ELEVENLABS_VOICE_ID: elevenLabsVoiceId,
  });
} else {
  console.warn("ElevenLabs configuration is not available locally; skipping it.");
}

if (Object.keys(variables).length === 0) {
  console.error("No supported local environment values were found to sync.");
  process.exit(1);
}

// Production is the only automatic target. Preview variables should be scoped
// deliberately to a Git branch in Vercel instead of being copied everywhere.
const environments = ["production"];

for (const [name, value] of Object.entries(variables)) {
  for (const target of environments) {
    const command = process.platform === "win32" ? process.env.ComSpec : "vercel";
    const args =
      process.platform === "win32"
        ? ["/d", "/s", "/c", `vercel env add ${name} ${target} --force --yes`]
        : ["env", "add", name, target, "--force", "--yes"];
    const result = spawnSync(command, args, {
      input: `${value}\n`,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });

    if (result.status !== 0) {
      console.error(`Failed to add ${name} to ${target}.`);
      if (result.error) console.error(result.error.message);
      if (result.stdout) console.error(result.stdout.trim());
      if (result.stderr) console.error(result.stderr.trim());
      process.exit(result.status ?? 1);
    }

    console.log(`Synced ${name} to ${target}.`);
  }
}

console.log("Environment configuration synced without printing secret values.");
