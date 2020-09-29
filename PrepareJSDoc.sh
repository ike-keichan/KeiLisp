#!/bin/sh

if [ ! -e ./node_modules/.bin/eslint ]
then
	sh ./PrepareESLint.sh
	echo 'Installing jsdoc... '
	npm install --save-dev jsdoc 2> /dev/null | grep -e '+ jsdoc' -e 'added [0-9]\+ packages'
fi
