// #!/usr/bin/env node

"use strict";

/**
 * @class
 * @classdesc Consのイテレータクラス
 * @author Keisuke Ikeda
 * @this {Loop}
 */
export class Loop extends Object
{
    /**
     * コンストラクタメソッド
     * @constructor Consのイテレータを作るコンストラクタ
     * @param {Cons} aCons Cons
     * @return {Loop} 自身
     */
    constructor(aCons)
    {
        super();
        this.aCons = aCons;
        this.length = aCons.length();
        this.index = 1;

        return this;
    }

    /**
     * 次の要素へ移行するメソッド
     * @return {Loop} 自身
     */
    iterator()
    {
        return this;
    }

    /**
     * 次の要素があるかどうかを判別し、応答するメソッド
     * @return {Boolean} 真偽値
     */
    hasNext()
    {
        return this.index <= this.length;
    }

    /**
     * 次の要素を応答するメソッド
     * @return {Object} 自身
     */
    next()
    {
        // let anObject = this.aCons.nth(this.index);
        // this.remove();
        // return anObject;
    }

    /**
     * 次の要素へ移行するメソッド
     * @return {Null} 何も返さない。
     */
    remove()
    {
        this.index++;
        return null;
    }
}
