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
        const value = line.slice(separator + 1).trim().replace(/^(['"])(.*)\1$/, "$2");
        return [key, value];
      }),
  );
}

const env = {
  ...parseEnvFile(".env"),
  ...parseEnvFile(".env.local"),
};

const firstValue = (...names) => names.map((name) => env[name]).find(Boolean);

const supabaseUrl = firstValue("SUPABASE_URL", "VITE_SUPABASE_URL");
const supabasePublishableKey = firstValue(
  "SUPABASE_PUBLISHABLE_KEY",
  "VITE_SUPABASE_PUBLISHABLE_KEY",
);

if (!supabaseUrl || !supabasePublishableKey) {
  console.error(
    "Missing local Supabase configuration. Add SUPABASE_URL/VITE_SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY/VITE_SUPABASE_PUBLISHABLE_KEY before syncing.",
  );
  process.exit(1);
}

const variables = {
  SUPABASE_URL: supabaseUrl,
  SUPABASE_PUBLISHABLE_KEY: supabasePublishableKey,
  VITE_SUPABASE_URL: supabaseUrl,
  VITE_SUPABASE_PUBLISHABLE_KEY: supabasePublishableKey,
};

const vercelCommand = process.platform === "win32" ? "vercel.cmd" : "vercel";
const environments = ["production", "preview", "development"];

for (const [name, value] of Object.entries(variables)) {
  for (const target of environments) {
    const result = spawnSync(
      vercelCommand,
      ["env", "add", name, target, "--force", "--yes"],
      {
        input: `${value}\n`,
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
      },
    );

    if (result.status !== 0) {
      console.error(`Failed to add ${name} to ${target}.`);
      if (result.stderr) console.error(result.stderr.trim());
      process.exit(result.status ?? 1);
    }

    console.log(`Synced ${name} to ${target}.`);
  }
}

console.log("Supabase environment configuration synced without printing secret values.");
