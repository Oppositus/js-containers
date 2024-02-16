/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    // ignorePatterns: ["src/**/*.test.ts", "dist/**"]
    ignorePatterns: ["dist/**"]
    /* overrides: [{
        files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
        rules: {
            "no-var": "off"
        }
    }] */

}

