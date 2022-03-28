/** @type {import('eslint').Linter.Config} */
module.exports = {
    ignorePatterns: ['dist', 'interp-wasm'],

    env: {
        es6: true,
        browser: true,
        node: true,
    },

    extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],

    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },

    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },

    plugins: ['prettier', 'simple-import-sort'],

    rules: {
        'eol-last': ['error', 'always'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],

        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // Side effect imports.
                    ['^\\u0000'],
                    // Packages.
                    // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                    ['^@?\\w'],
                    // Anything that does not start with a dot.
                    ['^[^.]'],
                    //  Absolute imports.
                    ['^src/'],
                    // Relative imports.
                    // Anything that starts with a dot.
                    ['^\\.'],
                ],
            },
        ],
    },

    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            extends: ['plugin:@typescript-eslint/recommended'],
            plugins: ['@typescript-eslint'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
            },
        },

        {
            files: ['**/*.tsx'],
            extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime'],
            plugins: ['react'],
            rules: {
                'react/prop-types': 'off',
            },
            settings: {
                react: { version: 'detect' },
            },
        },
    ],
};
