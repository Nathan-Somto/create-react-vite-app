import fs from "node:fs";
import path from "path";
import { template } from "../templates/template.mjs";
/**
 * function that handles the setting up the ruter or framer motion.
 * @param {Object} param0
 * @param {string} param0.projectPath
 * @param {boolean} param0.installRouter
 * @param {boolean} param0.installFramerMotion
 * @param {"TypeScript" | "JavaScript"} param0.language
 * @returns
 */
export function setupRouter({
  projectPath,
  installRouter,
  installFramerMotion,
  language,
}) {
  if (!installRouter || !installFramerMotion) return;
  const homeDirPath = path.join(
    projectPath,
    "src",
    `${installRouter ? "pages" : "components"}`
  );
  fs.mkdirSync(homeDirPath);

  const homePath = path.join(
    homeDirPath,
    `Home.${language === "TypeScript" ? "tsx" : "jsx"}`
  );
  fs.writeFileSync(homePath, template.homeTsxContent({ installFramerMotion }));

  const appPath = path.join(
    projectPath,
    "src",
    `App.${language === "TypeScript" ? "tsx" : "jsx"}`
  );
  fs.writeFileSync(
    appPath,
    template.appTsxContent({ installRouter, installFramerMotion })
  );
}
