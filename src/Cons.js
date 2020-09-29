// #!/usr/bin/env node

"use strict";

/**
 * @class
 * @classdesc Consを模倣したクラス
 * @author Keisuke Ikeda
 * @this {Cons}
 */
export class Cons
{
    /**
     * コンストラクタメソッド
     * @constructor
     * @return {Cons} 自身を返す。
     */
    constructor(car = null, cdr = null)
    {
        this.car = car;
        this.cdr = cdr;

        return this;
    }

    cons(car, cdr)
    {
        this.car = car;
        this.cdr = cdr;

        return this;
    }

}
