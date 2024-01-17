import { readFile, writeFile } from "fs/promises";
import { load } from "cheerio";

const id = "runtime-env";

export const injectEnvInHtml = async (
  html: string,
  env: Partial<Record<string, string>>,
) => {
  const data = await readFile(html, "utf8");
  const $ = load(data);

  const script = `<script id="${id}">window.env=${JSON.stringify(
    env,
  )}</script>`;

  const oldTag = $(`head script#${id}`);
  if (oldTag.length === 0) $("head").prepend(script);
  else oldTag.replaceWith(script);

  await writeFile(html, $.html());
};
