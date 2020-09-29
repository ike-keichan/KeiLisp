#!/bin/sh
 
if [ ! -e ./package.json ]
then
    cat << EOF > ./package.json
{
    "name": "JSLisp",
    "version": "1.0.0",
    "description": "このプログラムはJSでLisp処理系を作成したものです。",
    "main": "Example.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "Ikeda Keisuke（池田 敬祐）",
    "license": "BSD-2-Clause",
    "devDependencies": {
        "eslint": "^7.3.1",
        "jsdoc": "^3.6.5",
        "webpack": "^4.44.1",
        "webpack-cli": "^3.3.12",
        "readline": "^1.3.0"
    },
    "eslintConfig": {
        "env": {
            "browser": true,
            "es2020": true,
            "node": true
        },
        "extends": "eslint:recommended",
        "globals": {
            "Atomics": "readonly",
            "SharedArrayBuffer": "readonly"
        },
        "parserOptions": {
            "ecmaVersion": 11,
            "sourceType": "module"
        },
        "rules": {
            "no-unused-vars": "warn",
            "no-undef": "warn"
        }
    }
}
EOF
fi
