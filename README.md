# create-react-vite-app

A Simple CLI tool to quickly bootstrap a React project with Vite, Tailwind CSS, React Router DOM, and other essential packages.

## Features

- Initialize a Vite project with React and TypeScript (or JavaScript).
- Optionally install:
  - **React Router DOM** for routing
  - **Tailwind CSS** for styling
  - **Framer Motion** for animations
- Supports TypeScript aliases.
- Compatible with npm, yarn, and pnpm package managers.

## Installation

To install this CLI tool globally, run:

```bash
npm install -g create-react-vite-app
```

## Usage

To create a new React project with Vite, run:

```bash
create-react-vite-app
```

Follow the prompts to customize your project setup.

## Options & Prompts

The CLI will ask the following questions to tailor the setup:

1. **Project Name**: The name of your project directory (default: `my-awesome-project`).
2. **Language**: Choose between JavaScript and TypeScript.
3. **Type Alias** (TypeScript only): Optionally set a custom path alias (e.g., `@/`).
4. **React Router DOM**: Choose to install React Router for routing.
5. **Framer Motion**: Choose to install Framer Motion for animations.
6. **Tailwind CSS**: Choose to install Tailwind CSS for styling.
7. **Package Manager**: Select npm, yarn, or pnpm.

## Example

```bash
create-react-vite-app
```

### Example Output

After running the command, follow the prompts to customize your project, then see the installation progress in your terminal. Once setup completes, you’ll see a message with instructions to start the project:

```bash
Project created successfully
To start the project, run the following commands:
cd my-awesome-project
npm run dev
```

## Project Structure

Your generated project will include the following (based on selected options):

- **Vite configuration** tailored for React and TypeScript (if selected).
- **Tailwind CSS** with basic setup and configuration files.
- **React Router DOM** setup in `App.js` or `App.tsx`.
- **Framer Motion** installed if chosen.

## Issues

If you encounter any issues, feel free to report them at [GitHub Issues](https://github.com/Nathan-Somto/create-react-vite-app/issues).



## Author

Created by [Nathan Somto](https://github.com/Nathan-Somto).

## Todo
[ ] Add Support for Shadcn ui
[ ] Add Support for data fetching libraries like tan stack query and swc.