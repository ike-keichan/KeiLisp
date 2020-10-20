// #!/usr/bin/env node

"use strict";

//モジュール「Cons」を読み込む。
import { Cons } from './Cons.js';

/**
 * @class
 * @classdesc 
 * @author Keisuke Ikeda
 * @this {Table}
 */
export class Table
{
    /**
     * コンストラクタメソッド
     * @constructor 
     * @param 
     * @return 
     */
    constructor(aTable = null)
    {
        this.source = aTable;
        if(aTable == null){ this.root = true; }
        else{ this.root = false; }

        return this;
    }

    clone()
    {

    }

    containKey()
    {

    }
    
    equals()
    {

    }

    get()
    {

    }

    hashCode()
    {

    }

    isRoot()
    {
        return this.root;
    }

    putIfExit()
    {

    }

    /**
     * 
     * @param {*} aBoolean 
     */
    setRoot(aBoolean)
    {
        this.root = aBoolean;
        return null;
    }

    setSource(aTable)
    {
        this.source = aTable;
        return null;
    }
}
