import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";

/**
 * installs all the packages specified from inquirer
 * @param {Object} param0 
 * @param {boolean} param0.installFramerMotion 
 * @param {boolean} param0.installRouter 
 * @param {boolean} param0.installTailwind 
 * @param {"npm"| "yarn" | "pnpm" | "bun"} param0.packageManager
 * @returns 
 */
export async  function installPkgs({installFramerMotion, installRouter, installTailwind, packageManager}){
    const packages = [];
    if (installRouter) {
      packages.push("react-router-dom");
    }
    if (installFramerMotion) {
      packages.push("framer-motion");
    }
    if (installTailwind) {
      packages.push("tailwindcss", "autoprefixer", "postcss");
    } 
    if (packages.length) {
        const spinner = ora('Installing Dependencies').start()
        spinner.color = 'blue';
        const installCommand = packageManager === "npm" ? ["install", ...packages] : ["add", ...packages];
        await execa(packageManager, installCommand);
        spinner?.stop();
      } 
      return packages;
}