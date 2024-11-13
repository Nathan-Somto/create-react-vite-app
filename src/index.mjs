import { Command } from "commander";
import { execa } from "execa";
import path from "path";
import fs from "fs";
import chalk from 'chalk';
import { setupTailwind } from "./helpers/setupTailwind.mjs";
import { setupTypeAlias } from "./helpers/setupTypeAlias.mjs";
import { setupRouter } from "./helpers/setupRouter.mjs";
import { installPkgs } from "./helpers/installPkgs.mjs";
import { createReadme } from "./helpers/createReadme.mjs";
import { prompt } from "./helpers/prompt.mjs";
const program = new Command();

program
  .name("create-react-vite-app")
  .description(
    chalk.magenta.bold(
      "A Simple CLI tool to quickly bootstrap a React project with Vite, Tailwind CSS, React Router DOM, and other packages"
    )
  )
  .version(chalk.green('1.0.0'))
  .action(async () => {
    try {
      // Ask user for project configuration
      const {
        installRouter,
        installFramerMotion,
        installTailwind,
        projectName,
        language,
        useTypeAlias,
        typeAliasCharacter,
        packageManager,
      } = await prompt()

      const projectPath = path.join(process.cwd(), projectName);
      const projectExists = fs.existsSync(projectPath);
      if (projectExists) {
        console.error(chalk.red("Error: Project already exists"));
        process.exit(1);
      }
      console.log(chalk.green(`Creating project ${projectName}...`));

      // Set the Vite template based on selected language
      const viteTemplate = language === "TypeScript" ? "react-ts" : "react";
      const viteCommands = [
        "create",
        "vite@latest",
        projectName,
        "--",
        "--template",
        viteTemplate,
      ];
      // remove -- for non npm package managers
      if (packageManager !== "npm") {
          viteCommands.splice(3, 1);
      }
      await execa(packageManager, viteCommands);
      console.log(chalk.green("Initialized a project with Vite, TypeScript, and React"));

      // Navigate to project directory
      process.chdir(projectPath);

    // Collect packages to install based on user selections
    const packages =  await installPkgs({
        installFramerMotion,
        installRouter,
        installTailwind,
        packageManager
      })
      
      await setupTypeAlias({
        language, 
        useTypeAlias, 
        typeAliasCharacter, 
        packageManager,
        projectPath
      })
      
      await setupTailwind({projectPath, installTailwind});
      
      setupRouter({
        installFramerMotion,
        installRouter, 
        language, 
        projectPath
      });
      
      // create the read me file
      createReadme({
        packages,
        projectPath
      })
      console.log(chalk.green("Project created successfully"));
      console.log(chalk.yellow("To start the project, run the following commands:"));
      console.log(chalk.cyan(`cd ${projectName}`));
      console.log(chalk.cyan(`${packageManager} run dev`));
    } catch (e) {
      console.error(chalk.red("An error occurred:"), e);
    }
  });

const runCli = () => {
  program.parse(process.argv);
};
export { runCli };
