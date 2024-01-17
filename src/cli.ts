import { program } from "commander";
import { glob } from "glob";
import { pickBy } from "lodash";
import { injectEnvInHtml } from "./injectEnvInHtml";

program
  .name("runtime-env")
  .description("CLI to inject env in html files")
  .version("[VI]{version}[/VI]", "-v, --version")
  .option(
    "-p, --path [paths...]",
    "glob patterns to match path of html files",
    ["./build/**/*.html"],
  )
  .requiredOption(
    "-m, --match <regex>",
    "regular expression to match environment variable names to be injected",
  )
  .action(async ({ path, match }) => {
    const files = await glob(path);
    await Promise.all(
      files.map((file) =>
        injectEnvInHtml(
          file,
          pickBy(process.env, (_value, key) => key.match(match)),
        ),
      ),
    );
  });

program.parse();
