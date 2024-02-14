import commonjs from "@rollup/plugin-commonjs";
import eslint from "@rollup/plugin-eslint";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { glob } from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";
import analyze from "rollup-plugin-analyzer";
import del from "rollup-plugin-delete";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import versionInjector from "rollup-plugin-version-injector";
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";
import shebang from "rollup-plugin-preserve-shebang";

/** @type {import("rollup").RollupOptions[]} */
const rollupOptions = [
  {
    input: "src/cli.ts",
    output: [{ file: "bin/runtime-env", format: "commonjs" }],
    plugins: [
      del({ targets: "bin/*" }),
      peerDepsExternal(),
      optimizeLodashImports(),
      resolve({ preferBuiltins: true }),
      commonjs(),
      versionInjector({ injectInTags: { fileRegexp: /^runtime-env$/ } }),
      eslint({ throwOnError: true }),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      terser(),
      shebang(),
      analyze({
        hideDeps: true,
        limit: 0,
        summaryOnly: true,
      }),
    ],
  },
  {
    input: Object.fromEntries(
      glob
        .sync(["src/*.ts"], { ignore: ["src/cli.ts"] })
        .map((file) => [
          path.relative(
            "src",
            file.slice(0, file.length - path.extname(file).length),
          ),
          fileURLToPath(new URL(file, import.meta.url)),
        ]),
    ),
    output: [{ dir: "dist", format: "commonjs", sourcemap: true }],
    plugins: [
      del({ targets: "dist/*" }),
      peerDepsExternal(),
      optimizeLodashImports(),
      resolve({ preferBuiltins: true }),
      commonjs(),
      versionInjector(),
      eslint({ throwOnError: true }),
      typescript({
        tsconfig: "./tsconfig.build.json",
      }),
      terser(),
      analyze({
        hideDeps: true,
        limit: 0,
        summaryOnly: true,
      }),
    ],
  },
];

export default rollupOptions;
