#!/bin/sh
 
if [ ! -e ./package.json ]
then
    echo '-----Prepare package.json  -----'
    cat << EOF > ./package.json
{
    "name": "KeiLisp",
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
        "@babel/core": "^7.12.8",
        "@babel/plugin-proposal-class-properties": "^7.12.1",
        "@babel/preset-env": "^7.12.7",
        "babel-loader": "^8.2.1",
        "eslint": "^7.12.1",
        "expose-gc": "^1.0.0",
        "jsdoc": "^3.6.6",
        "ramda": "^0.27.1",
        "readline": "^1.3.0",
        "webpack": "^4.44.2",
        "webpack-cli": "^3.3.12"
    },
    "babel": {
        "plugins": [
            "@babel/plugin-proposal-class-properties"
        ],
        "presets": [
            ["@babel/preset-env", {
                "useBuiltIns": "usage"
            }]
        ]
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

if [ ! -e ./node_modules/.bin/babel-loader -o ! -e ./node_modules/.bin/@babel ]
then
	echo '-----Installing babel...   -----'
	npm install --save-dev babel-loader 2> /dev/null | grep -e '+ babel-loader' -e 'added [0-9]\+ packages'
	npm install --save-dev @babel/core 2> /dev/null | grep -e '+ @babel/core' -e 'added [0-9]\+ packages'
	npm install --save-dev @babel/preset-env 2> /dev/null | grep -e '+ @babel/preset-env' -e 'added [0-9]\+ packages'
	npm install --save-dev @babel/plugin-proposal-class-properties 2> /dev/null | grep -e '+ @babel/plugin-proposal-class-properties' -e 'added [0-9]\+ packages'
fi

if [ ! -e ./node_modules/.bin/readline ]
then
	echo '-----Installing readline...-----'
	npm install --save-dev readline 2> /dev/null | grep -e '+ readline' -e 'added [0-9]\+ packages'
fi

if [ ! -e ./node_modules/.bin/expose-gc ]
then
	echo '-----Installing expose-gc...-----'
	npm install --save-dev expose-gc 2> /dev/null | grep -e '+ expose-gc' -e 'added [0-9]\+ packages'
fi

if [ ! -e ./node_modules/.bin/ramda ]
then
	echo '-----Installing ramda...   -----'
	npm install --save-dev ramda 2> /dev/null | grep -e '+ ramda' -e 'added [0-9]\+ packages'
fi
