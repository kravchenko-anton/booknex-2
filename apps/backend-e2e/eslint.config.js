const baseConfig = require("../../.eslintrc.js");
module.exports = [
    ...baseConfig,
    {
        files: [
            "apps/backend-e2e/**/*.ts",
            "apps/backend-e2e/**/*.tsx",
            "apps/backend-e2e/**/*.js",
            "apps/backend-e2e/**/*.jsx"
        ],
        rules: {}
    },
    {
        files: [
            "apps/backend-e2e/**/*.ts",
            "apps/backend-e2e/**/*.tsx"
        ],
        rules: {}
    },
    {
        files: [
            "apps/backend-e2e/**/*.js",
            "apps/backend-e2e/**/*.jsx"
        ],
        rules: {}
    }
];
