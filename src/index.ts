/**
 * Development helpers for runtime-env-cli in React.JS.
 * Environment variables is loaded in `window.env`.
 */

declare global {
  interface WindowEnv extends NodeJS.ProcessEnv {}

  interface Window {
    env: WindowEnv;
  }
}

// if not production, use env from node
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined")
  window.env = process.env;

export default window.env;
