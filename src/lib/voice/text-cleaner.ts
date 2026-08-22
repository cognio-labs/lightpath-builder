/**
 * Cleans and formats markdown and web content into natural spoken Hindi/Hinglish/English dialogue for TTS.
 */
export function cleanTextForSpeech(text: string): string {
  if (!text) return "";

  let cleaned = text;

  // Remove code blocks and inline code
  cleaned = cleaned.replace(/```[\s\S]*?```/g, "");
  cleaned = cleaned.replace(/`([^`]+)`/g, "$1");

  // Remove markdown headers
  cleaned = cleaned.replace(/^#+\s+/gm, "");

  // Remove bold and italic markers
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, "$1");
  cleaned = cleaned.replace(/\*([^*]+)\*/g, "$1");
  cleaned = cleaned.replace(/__([^_]+)__/g, "$1");
  cleaned = cleaned.replace(/_([^_]+)_/g, "$1");

  // Remove markdown links: [label](url) -> label
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Remove standalone URLs
  cleaned = cleaned.replace(/https?:\/\/\S+/gi, "");

  // Remove bullet points and numbered lists markers
  cleaned = cleaned.replace(/^\s*[-*+]\s+/gm, "");
  cleaned = cleaned.replace(/^\s*\d+\.\s+/gm, "");

  // Clean currency symbols to spoken words if needed
  cleaned = cleaned.replace(/₹\s*(\d+)/g, "$1 rupees");

  // Remove excessive punctuation/symbols
  cleaned = cleaned.replace(/[~#|>]/g, " ");

  // Collapse multiple whitespaces and newlines
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  return cleaned;
}
