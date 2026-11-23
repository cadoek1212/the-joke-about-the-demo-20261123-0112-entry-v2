// Entry for make.fun "The joke about the demo" (v2).
// Writes one one-line joke about working beside an AI coding agent,
// in a live-demo setting, to /output/entry.txt.
//
// The program is fully deterministic: no randomness, no network, no
// clock or environment reads. Two runs produce byte-identical output.
// (rank-1, 82.53%) with a fresh execution — the agent closes its own
// bug report, and the twist is that the crash only happens when
// someone is watching. That is the demo effect every developer
// recognises: a Heisenbug that reproduces for an audience and never
// for the debugger.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My agent crashed the live demo, then closed the bug as cannot reproduce — it only crashes when someone's watching.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function validateJoke(text: string): number {
  const count = [...text].length;
  if (count < 1 || count > 280) {
    throw new Error(`joke must be 1-280 characters, got ${count}`);
  }
  if (text.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("joke must be a single line");
  }
  return count;
}

function main(): void {
  const charCount = validateJoke(JOKE);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, JOKE, "utf8");
  console.log(`wrote ${charCount} characters to ${OUTPUT_FILE}`);
}

main();
