import chalk from "chalk";
import { template } from "../templates/template.mjs";
import fs from 'node:fs'
import { execa } from "execa";
import path from "path";
/** 
 * This file is responsible for setting up Tailwind CSS in the project.
 * It installs Tailwind CSS and initializes the configuration file.
 * It also adds the necessary directives to the index.css file. takes an object with the project path and the installTailwind flag.
 * @param {Object} param0 
 * @param {string} param0.projectPath
 * @param {boolean} param0.installTailwind 
 */
export async function setupTailwind({projectPath, installTailwind}) {
    if (installTailwind) {
        console.log(chalk.blue("Initializing Tailwind CSS..."));
        await execa("npx", ["tailwindcss", "init", "-p"]);

        const tailwindPath = path.join(projectPath, `tailwind.config.js`);
        fs.writeFileSync(tailwindPath, template.tailwindConfig);
        // add tailwindcss to the top of the index.css file
        const indexCssPath = path.join(projectPath, "src", "index.css");
        const file = fs.readFileSync(indexCssPath, "utf8");
        const data = template.tailwindDirectives + file;
        fs.writeFileSync(indexCssPath, data);
      }
}