import { execa } from "execa";
import { template } from "../templates/template.mjs";
import fs from 'node:fs'
import path from "node:path";
/**
 * function that handles setting up of the projects type alias.
 * @param {Object} param0 
 * @param {"Typescript" | "Javascript"} param0.language 
 * @param {boolean} param0.useTypeAlias 
 * @param {string} param0.typeAliasCharacter 
 * @param {string} param0.projectPath
 * @param {"npm" | "yarn" | "pnpm" | "bun"} param0.packageManager
 */
export async function setupTypeAlias({packageManager, language, useTypeAlias, typeAliasCharacter, projectPath}){
    if (language === "TypeScript" && useTypeAlias) {
        await execa(packageManager, [packageManager === "npm" ? "install" : "add", "@types/node", "-D"]);
        let sanitizedAlias = typeAliasCharacter.trim();
        sanitizedAlias = sanitizedAlias.endsWith('/') ? sanitizedAlias : sanitizedAlias + '/'
        const tsConfigPath = path.join(projectPath, "tsconfig.json");
        fs.writeFileSync(tsConfigPath, template.aliasTsConfig(sanitizedAlias));
        
        const tsConfigAppPath = path.join(projectPath, "tsconfig.app.json");
        fs.writeFileSync(tsConfigAppPath, template.aliasAppTsConfig(sanitizedAlias));

        const viteConfigPath = path.join(projectPath, "vite.config.ts");
        // remove the backwards slash.
        fs.writeFileSync(viteConfigPath, template.aliasViteConfig(sanitizedAlias.slice(0, 1)));
      }
}