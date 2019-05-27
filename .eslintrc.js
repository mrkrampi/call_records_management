module.exports = {
    root: true,
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2019,
        "sourceType": "module"
    },
    "plugins": [
        "vue",
    ],
    "extends": [
        "eslint:recommended",
        "plugin:vue/base"
    ],
    env: {
        browser: true
    },
    rules: {
        "no-console": 0
    },
};
