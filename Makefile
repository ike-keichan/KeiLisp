JS_ENGINE = node
TARGET	= Example
TARGET_SCRIPT	= ./$(TARGET).js
TARGET_HTML	= ./$(TARGET).html
TARGET_CSS	= ./$(TARGET).css
DOC_DIRECTORY = out
DOC_HTML =./$(DOC_DIRECTORY)/index.html
INSTDIR	= ./$(TARGET).app/Contents/Resources/JavaScript/
ARCHIVE	= $(shell basename `pwd`)
BROWSER	= "/Applications/Google Chrome.app"
#BROWSER	= "/Applications/Firefox.app"
#BROWSER	= "/Applications/Safari.app"
LINTER	= ./node_modules/.bin/eslint
JSDOC = ./node_modules/.bin/jsdoc
SCRIPTS	= $(shell ls ./src/*.js)

all: $(TARGET_SCRIPT)
	@:

$(TARGET_SCRIPT): $(SCRIPTS)
	@sh ./PrepareWebpack.sh
	npx webpack --progress --display-modules #--verbose

clean:
	rm -f ./Example.js
	@if [ -e $(INSTDIR) ] ; then echo "rm -f -r $(INSTDIR)" ; rm -f -r $(INSTDIR) ; fi
	@find . -name ".DS_Store" -exec rm {} ";" -exec echo rm -f {} ";"

wipe: clean
	rm -rf ./node_modules/ ./package*.json
	@xattr -cr ./
	@(cd ../ ; if [ -e $(ARCHIVE).zip ] ; then echo "rm -f ../$(ARCHIVE).zip" ; rm -f $(ARCHIVE).zip ; fi)
	@(cd ../ ; if [ -e $(ARCHIVE).tar.gz ] ; then echo "rm -f ../$(ARCHIVE).tar.gz" ; rm -f $(ARCHIVE).tar.gz ; fi)
	@if [ -e $(DOC_DIRECTORY) ] ; then echo "rm -rf ./$(DOC_DIRECTORY)" ; rm -rf $(DOC_DIRECTORY) ; fi

test: all
	$(JS_ENGINE) $(TARGET_SCRIPT)

install: all
	@if [ ! -e $(INSTDIR) ] ; then echo "mkdir $(INSTDIR)" ; mkdir $(INSTDIR) ; fi
	cp -p -r {$(TARGET_SCRIPT),$(TARGET_HTML),$(TARGET_CSS)} $(INSTDIR)

zip: wipe
	(cd ../ ; zip -r ./$(ARCHIVE).zip ./$(ARCHIVE)/ --exclude='*/.svn/*')

tgz: wipe
	(cd ../ ; tar --exclude='*/.svn/*' -czvf ./$(ARCHIVE).tar.gz ./$(ARCHIVE)/)

lint:
	@sh ./PrepareESLint.sh
	$(LINTER) $(SCRIPTS)

doc:
	@sh ./PrepareJSDoc.sh
	$(JSDOC) $(SCRIPTS)
	open -a $(BROWSER) $(DOC_HTML)
