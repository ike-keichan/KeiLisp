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
        "eslint": "^7.12.1",
        "jsdoc": "^3.6.6",
        "ramda": "^0.27.1",
        "readline": "^1.3.0",
        "webpack": "^4.44.1",
        "webpack-cli": "^3.3.12"
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

if [ ! -e ./node_modules/.bin/readline ]
then
	echo 'Installing readline... '
	npm install --save-dev readline 2> /dev/null | grep -e '+ readline' -e 'added [0-9]\+ packages'
fi

if [ ! -e ./node_modules/.bin/ramda ]
then
	echo 'Installing ramda... '
	npm install --save-dev ramda 2> /dev/null | grep -e '+ ramda' -e 'added [0-9]\+ packages'
fi
