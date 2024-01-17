import { pickBy } from "lodash";

declare global {
  interface WindowEnv extends NodeJS.ProcessEnv {}

  interface Window {
    env: Pick<WindowEnv, `REACT_APP_${string}`>;
  }
}

// if not production, use env from node
if (process.env.NODE_ENV !== "production")
  window.env = pickBy(process.env, (_value, key) => /^REACT_APP_/.test(key));

export default window.env;
