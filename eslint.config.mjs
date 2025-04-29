import compat from "@eslint/eslintrc/compat";

const eslintConfig = [
  // Базовые настройки для всех файлов
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        React: "readonly"
      }
    }
  },

  // Подключение next/core-web-vitals + next/typescript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Специфично для TypeScript файлов
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(), // <-- Ловушка на неправильный путь
        createDefaultProgram: true // <-- Если tsconfig глючит, всё равно стартует
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off"
    }
  },

  // Специфично для JavaScript файлов
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: "@babel/eslint-parser",
      parserOptions: {
        requireConfigFile: false
      }
    },
    rules: {
      "no-unused-vars": "warn"
    }
  },

  // Общие React-правила
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    }
  }
];

export default eslintConfig;
