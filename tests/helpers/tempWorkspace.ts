import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

// The logger decorators append to Logs/ relative to the working directory,
// so tests that log run inside a throwaway directory instead of the repo.
export async function enterTempWorkspace(): Promise<() => Promise<void>> {
  const originalCwd = process.cwd();
  const workspace = await mkdtemp(join(tmpdir(), "patternhub-"));
  await mkdir(join(workspace, "Logs"));
  process.chdir(workspace);
  return async () => {
    process.chdir(originalCwd);
    await rm(workspace, { recursive: true, force: true });
  };
}
