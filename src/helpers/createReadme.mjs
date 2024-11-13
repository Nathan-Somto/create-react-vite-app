import path from 'node:path';
import fs from 'node:fs'
import { template } from '../templates/template.mjs';
/**
 * @param {Object} param0 
 * @param {string} param0.projectPath 
 * @param {string} param0.projectName 
 * @param {string[]} param0.packages 
 */
export function createReadme({projectPath, projectName, packages}){
    const readmePath = path.join(projectPath, "README.md");
    fs.writeFileSync(readmePath, template.readmeTemplate({projectName, packages}));
}