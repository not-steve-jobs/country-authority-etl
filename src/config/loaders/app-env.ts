export const loadAppEnv = (): { version: string | null } => ({
  version: process.env.VERSION ?? null,
});
