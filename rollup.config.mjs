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
import { visualizer } from "rollup-plugin-visualizer";
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";

/** @type {import("rollup").RollupOptions[]} */
const rollupOptions = [
  {
    input: Object.fromEntries(
      glob
        .sync(["src/cli.ts", "src/react/**/*.{js,ts,jsx,tsx}"])
        .map((file) => [
          // This remove `src/` as well as the file extension from each
          // file, so e.g. src/nested/foo.js becomes nested/foo
          path.relative(
            "src",
            file.slice(0, file.length - path.extname(file).length),
          ),
          // This expands the relative paths to absolute paths, so e.g.
          // src/nested/foo becomes /project/src/nested/foo.js
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
        tsconfig: "./tsconfig.json",
      }),
      terser(),
      analyze({
        hideDeps: true,
        limit: 0,
        summaryOnly: true,
      }),
      visualizer(),
    ],
  },
];

export default rollupOptions;
