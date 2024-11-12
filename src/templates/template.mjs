export const template = {
  tailwindConfig:
`/** @type {import('tailwindcss').Config} */
export default {
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
            extend: {},
      },
          plugins: [],
      };
`,
  appTsxContent({ installRouter }) {
return( 
`import React from 'react';
${
installRouter ? "import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';": ""
}
${ installRouter ? "import Home from './pages/Home';" : "./components/Home"}
export default function App (){
        return (
    ${installRouter? `<Router>
                      <Routes>
                          <Route path="/" element={<Home />} />
                      </Routes>
                  </Router>`
                : "<Home />"
            }
              );
        };
      `);
  },
  homeTsxContent({ installFramerMotion }) {
    return( 
`import React from 'react';
${installFramerMotion ? "import { motion } from 'framer-motion';" : ""}
export default function Home() {
        return (
          ${ installFramerMotion ? "<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>"
              : "<div>"
          }
          <h1 className="text-3xl font-bold underline">Welcome to Home!</h1>
          ${installFramerMotion ? "</motion.div>" : "</div>"}
        );
      };
    `);
  },
  mainTsxContent: 
`import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
      );
      `,
  tailwindDirectives: 
`@tailwind base;
@tailwind components;
@tailwind utilities;
`,
  aliasTsConfig(aliasCharacter) {
return (
`{
  "files": [],
  "references": [
      { "path": "./tsconfig.app.json" },
      { "path": "./tsconfig.node.json" }
          ],
  "compilerOptions": {
  "baseUrl": ".",
  "paths": {
        "${aliasCharacter}*": ["./src/*"]
      }
    }
}`)},
    aliasAppTsConfig(aliasCharacter){ 
return( 
`{
  "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
      "target": "ES2020",
      "useDefineForClassFields": true,
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
  
      /* Bundler mode */
      "moduleResolution": "Bundler",
      "allowImportingTsExtensions": true,
      "isolatedModules": true,
      "moduleDetection": "force",
      "noEmit": true,
      "jsx": "react-jsx",
  
      /* Linting */
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedSideEffectImports": true,
      "baseUrl": ".",
      "paths": {
        "${aliasCharacter}/*": [
          "./src/*"
        ]
      }
    },
    "include": ["src"],
    "exclude": ["node_modules"]
  }
  `)},
aliasViteConfig(aliasCharacter){ 
return(
`import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "${aliasCharacter}": path.resolve(__dirname, "./src"),
    },
  },
})
`)},
readmeTemplate({projectName, packages}){
  return (
`# ${projectName}

This project was bootstrapped using the [create-react-vite-app](https://github.com/Nathan-Somto/create-react-vite-app) CLI tool by [Nathan-Somto](https://github.com/Nathan-Somto).

## About

This project builds upon the \`create-vite\` to allow for more customization.

## Packages Installed
${packages.map((pkg) => `- ${pkg}`).join("\n")}

## Getting Started

To start developing, run:

\`\`\`bash
cd ${projectName}
npm run dev
\`\`\`

## Learn More

To learn more about the CLI tool used to create this project, visit the [create-react-vite-app GitHub repository](https://github.com/Nathan-Somto/create-react-vite-app).

## License

This project is licensed under the terms defined in the \`LICENSE\` file.
`
  )
}
};
