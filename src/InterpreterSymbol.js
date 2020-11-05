// #!/usr/bin/env node

"use strict";

import { Table } from "./Table";

/**
 * @class
 * @classdesc 一意性(同一性:単射性)を有するシンボル.正準な文字列を模倣した、JSの標準シンボルとは異なるクラス。
 * @author Keisuke Ikeda
 * @this {InterpreterSymbol}
 */
export class InterpreterSymbol extends Object
{

    /**
     * コンストラクタメソッド
     * @constructor
     * @param {String} name
     * @return {InterpreterSymbol} 自身
     */
    constructor(name = 'null')
    {
        super();
        this.name = new String(name);
        return this;
    }

    /**
     * 印字名で自身と引数のシンボルを比較するメソッド
     * @param {InterpreterSymbol} aSymbol 
     * @return {Number} 文字列の長さの差
     */
    compareTo(aSymbol)
    {
        let aNumber = this.name.charCodeAt(0) < aSymbol.name.charCodeAt(0) ? aSymbol.name.length - this.name.charCodeAt : this.name.charCodeAt - aSymbol.name.length;
        aNumber = this.name.charCodeAt(0) == aSymbol.name.charCodeAt(0) ? 0 : aNumber;

        return aNumber;
    }

    /**
     * 自身と引数のオブジェクトが等しいかどうかを判別し、応答するメソッド
     * @param {*} anObject 
     * @return {Boolean} 真偽値
     */
    equals(anObject)
    {
        return this === anObject;
    }
    
    static of(aString)
    {
        let aSymbol = null;
        try { aSymbol = this.table.get(aString); }
        catch(e){  }
        

        if(aSymbol == null)
        {
            aSymbol = new InterpreterSymbol(aString);
            this.table.set(aString, aSymbol);
        }

        return aSymbol;
    }

    /**
     * 自身を文字列にして応答するメソッド
     * @return {String} 自身の文字列
     */
    toString()
    {
        return this.name
    }
}
