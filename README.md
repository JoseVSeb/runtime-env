# runtime-env-cli

[![npm](https://img.shields.io/npm/v/runtime-env-cli.svg)](https://www.npmjs.org/package/runtime-env-cli)
[![npm](https://img.shields.io/npm/dm/runtime-env-cli.svg)](https://www.npmjs.org/package/runtime-env-cli)
[![GitHub](https://img.shields.io/github/issues/JoseVSeb/runtime-env.svg)](https://github.com/JoseVSeb/runtime-env/issues)
[![release workflow](https://github.com/JoseVSeb/runtime-env/actions/workflows/release.yaml/badge.svg)](https://github.com/JoseVSeb/runtime-env/actions/workflows/release.yaml)
[![npm](https://img.shields.io/npm/l/runtime-env-cli.svg)](https://www.npmjs.org/package/runtime-env-cli)
[![semantic-release: conventional commit](https://img.shields.io/badge/semantic--release-conventionalcommit-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

`runtime-env-cli` is an NPM package that helps manage environment variables in web applications. It allows environment-agnostic build for frameworks like create-react-app and inject environment variables as `window.env` in html files during server startup.

## Usage

### Development Mode

1. Install `runtime-env-cli` as development dependency.

   pnpm:

   ```bash
    pnpm i -D runtime-env-cli
   ```

   npm:

   ```bash
    npm i -D runtime-env-cli
   ```

   Yarn:

   ```bash
    pnpm add -D runtime-env-cli
   ```

2. Import `runtime-env-cli` in top-level javascript/typescript file for aliasing `process.env` as `windows.env` in development mode.

   ```ts
   import "runtime-env-cli";
   ```

   It also provides type-safety for `windows.env`.

   Note: You can make it further type-safe by extending interfaces `ProcessEnv` or `WindowEnv`.

   Use environment variables from `window.env`:

   ```ts
   window.env.SAMPLE_ENV;
   ```

### Production Mode

1. Generate static files for your application.

   ```bash
   npm run build
   ```

2. Install `runtime-env-cli` in hosting environment (if using docker, do this in the last stage).

   ```bash
   npm i -g runtime-env-cli
   ```

3. Run the cli to inject env into html files before serving files (in docker, do this in entrypoint following by serving files, refer [example](https://github.com/JoseVSeb/runtime-env/tree/main/examples/cra)).

   ```bash
   runtime-env [options]
   ```

   Note: CLI uses `process.env` to get environment while injecting. Any matching environment variables already configured in shell will be read. To use .env files, first load it before running this (refer [dotenv-cli](https://www.npmjs.com/package/dotenv-cli)).

### CLI Options

- **-v, --version**: output the version number.
- **-p, --path [paths...]** (optional): glob patterns to match path of html files (default: ["./build/**/*.html"]).
- **-m, --match \<regex\>**: regular expression to match environment variable names to be injected.
- **-h, --help**: display help for command.

#### example

```bash
runtime-env --path "./**/*.html" --match "^APP_ENV_"
```

This will inject all environment variables prefixed with `APP_ENV_` as `window.env` object into all html files under working directory.
