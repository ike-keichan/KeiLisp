#!/bin/sh

if [ ! -e ./node_modules/.bin/eslint -o ! -e ./node_modules/.bin/jsdoc ]
then 
	echo 'Prepare  package.json... '
	sh ./PreparePackageJSON.sh
fi

if [ ! -e ./node_modules/.bin/eslint ]
then
	echo 'Installing eslint... '
	npm install --save-dev eslint 2> /dev/null | grep -e '+ eslint' -e 'added [0-9]\+ packages'
fi

if [ ! -e ./node_modules/.bin/jsdoc ]
then
	echo 'Installing jsdoc... '
	npm install --save-dev jsdoc 2> /dev/null | grep -e '+ jsdoc' -e 'added [0-9]\+ packages'
fi
