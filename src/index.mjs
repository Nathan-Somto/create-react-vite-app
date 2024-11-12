import { Command } from "commander";
import inquirer from "inquirer";
import { execa } from "execa";
import path from "path";
import fs from "fs";
import { template } from "./templates/template.mjs";
import chalk from 'chalk';

const program = new Command();

program
  .name("create-react-vite-app")
  .description(
    chalk.blue.bold(
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
      } = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "Enter the project name: ",
          default: "my-awesome-project",
        },
        {
          type: "list",
          name: "language",
          message: "Choose a language",
          choices: ["JavaScript", "TypeScript"],
          default: "TypeScript",
        },
        {
          type: "confirm",
          name: "useTypeAlias",
          message: "Do you want to use a Type Alias?",
          default: true,
          when: (answers) => answers.language === "TypeScript",
        },
        {
          type: "input",
          name: "typeAliasCharacter",
          message: "Enter the character for the type alias (e.g., @/):",
          default: "@/ ",
          when: (answers) => answers.useTypeAlias,
        },
        {
          type: "confirm",
          name: "installRouter",
          message: "Do you want to install React Router DOM?",
          default: true,
        },
        {
          type: "confirm",
          name: "installFramerMotion",
          message:"Do you want to install Framer Motion?",
          default: false,
        },
        {
          type: "confirm",
          name: "installTailwind",
          message: "Do you want to install Tailwind CSS?",
          default: true,
        },
        {
          type: "list",
          name: "packageManager",
          message:"Choose a package manager",
          choices: ["npm", "yarn", "pnpm"],
          default: "npm",
        },
      ]);

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
      // create the read me file
        const readmePath = path.join(projectPath, "README.md");
        fs.writeFileSync(readmePath, template.readmeTemplate({projectName, packages}));
      // Install the selected packages
      if (packages.length) {
        console.log(chalk.blue("Installing dependencies..."));
        const installCommand = packageManager === "npm" ? ["install", ...packages] : ["add", ...packages];
        await execa(packageManager, installCommand);
      }

      // If the user selects TypeScript and wants a TypeAlias, add the TypeScript type alias configuration
      if (language === "TypeScript" && useTypeAlias) {
        await execa(packageManager, [packageManager === "npm" ? "install" : "add", "@types/node", "-D"]);
        let sanitizedAlias = typeAliasCharacter.trim();
        
        const tsConfigPath = path.join(projectPath, "tsconfig.json");
        fs.writeFileSync(tsConfigPath, template.aliasTsConfig(sanitizedAlias));
        
        const tsConfigAppPath = path.join(projectPath, "tsconfig.app.json");
        fs.writeFileSync(tsConfigAppPath, template.aliasAppTsConfig(sanitizedAlias));

        const viteConfigPath = path.join(projectPath, "vite.config.ts");
        fs.writeFileSync(viteConfigPath, template.aliasViteConfig(sanitizedAlias));
      }

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

      const homeDirPath = path.join(projectPath, "src", `${installRouter ? "pages" : "components"}`);
      fs.mkdirSync(homeDirPath);

      const homePath = path.join(homeDirPath, `Home.${language === "TypeScript" ? "tsx" : "js"}`);
      fs.writeFileSync(homePath, template.homeTsxContent({ installFramerMotion }));

      const appPath = path.join(projectPath, "src", `App.${language === "TypeScript" ? "tsx" : "js"}`);
      fs.writeFileSync(appPath, template.appTsxContent({ installRouter, installFramerMotion }));

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
