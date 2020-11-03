// #!/usr/bin/env node

"use strict";

/**
 * @class
 * @classdesc 
 * @author Keisuke Ikeda
 * @this {StreamManager}
 */
export class Table extends Object
{
    constructor()
    {
        super();
        this.isTrace = false;
        this.streamTable = new Map();
        this.spyTable = new Map();
        this.traceStream = null;
        this.initialize();

        return this;
    }

    getStream()
    {

    }

    initialize()
    {
        
    }

    isSpy(aSymbol)
    {
        if(this.isTrace){ return true; }
        if(this.spyTable.has(aSymbol)){ return true; }
        return false;
    }

    noSpy(aSymbol)
    {
        if(this.spyTable.has(aSymbol))
        {
            // Todo:並列処理？
        }

        return null;
    }

    noTrace()
    {
        this.setIsTrace(false);
        // Todo:並列処理？

        return null;
    }

    setIsTrace(aBoolean)
    {
        this.isTrace = aBoolean;
        return null;
    }

    setTraceStream(aStream)
    {
        this.traceStream = aStream;
        return null;
    }

    spy()
    {

    }

    spyStream()
    {

    }

    spyTable()
    {

    }


    trace()
    {
        
    }

}
