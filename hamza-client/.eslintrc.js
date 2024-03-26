module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
    },
    plugins: ['react'],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                // Your TypeScript-specific rules here
                'react/react-in-jsx-scope': 'off',
            },
        },
    ],
}
