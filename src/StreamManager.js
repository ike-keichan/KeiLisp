// #!/usr/bin/env node

"use strict";

//モジュール「Cons」を読み込む。
import { Cons } from './Cons.js';

/**
 * @class
 * @classdesc 
 * @author Keisuke Ikeda
 * @this {StreamManager}
 */
export class Table extends Object
{
    /**
     * コンストラクタメソッド
     * @constructor 
     * @param 
     * @return 
     */
    constructor()
    {
        super();
        this.isTrace = false;
        this.streamTable = new Object();
        this.spyTable = new Object();
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
        if(aSymbol in this.spyTable){ return true; }
        return false;
    }

    setIsTrace()
    {

    }

    noSpy(aSymbol)
    {
        
    }

    noTrace()
    {

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

    traceStream()
    {

    }
}
