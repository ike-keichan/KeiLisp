#!/bin/sh

if [ ! -e ./node_modules/.bin/webpack ]
then
	sh ./PreparePackageJSON.sh
	echo 'Installing webpack... '
	npm install --save-dev webpack webpack-cli 2> /dev/null | grep -e '+ webpack' -e 'added [0-9]\+ packages'
fi
