#!/bin/sh

if [ ! -e ./node_modules/.bin/eslint ]
then
	echo '----- Installing eslint... -----'
	npm install --save-dev eslint 2> /dev/null | grep -e '+ eslint' -e 'added [0-9]\+ packages'
fi
