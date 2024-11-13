import inquirer from "inquirer";

export  async function prompt(){
  return await  inquirer.prompt([
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
}