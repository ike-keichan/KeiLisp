// #!/usr/bin/env node

"use strict";

//モジュール「Cons」を読み込む。
import { Cons } from './Cons.js';

/**
 * @class
 * @classdesc イーバル（評価）を行うクラス
 * @author Keisuke Ikeda
 * @this {Evaluator}
 */
export class Evaluator
{
    /**
     * コンストラクタメソッド
     * 関数の連想リストを用意する。
     * @constructor
     * @return {Null} 何も返さない。
     */
    constructor()
    {
        this.functionList = {
            '+':  (args) => (args.car + args.cdr.car),
        }

        return null;
    }
    
    /**
     * イーバリュエータ(評価器)の起動
     * @param {*} input 構文解析を終えたトークン
     * @return {*} 評価結果
     */
    eval(input)
    {
        if(Cons.isCons(input)){
            console.log(input.car);
            console.log(input.cdr);
            let fn = this.functionList[input.car];
            let args = input.cdr
            return fn(args => this.eval(args));
        } else if(typeof(input.car) == 'number'){
            return input.car;
        } else if (typeof(input) == 'string'){
            return input.car;
        }

        return input.car;
    }
}
