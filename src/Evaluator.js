// #!/usr/bin/env node

"use strict";

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
    // constructor()
    // {
    //     /**
    //      * 関数の連想リスト
    //      * @type {Object}
    //      */
    //     this.functionList = {
    //         '<':  (args) => (args[0] < args[1] ? 't' : 'nil'),
    //         '<=': (args) => (args[0] <= args[1] ? 't' : 'nil'),
    //         '>':  (args) => (args[0] > args[1] ? 't' : 'nil'),
    //         '>=': (args) => (args[0] >= args[1] ? 't' : 'nil'),
    //         '=':  (args) => (args[0] == args[1] ? 't' : 'nil'),
    //         '==': (args) => (args[0] === args[1] ? 't' : 'nil'),
    //         'append': (args) => (),
    //         'atom': (args) => (),
    //         'car': (args) => (),
    //         'cdr': (args) => (),
    //         'clear': (args) => (),
    //         'cons': (args) => (),
    //         'consp': (args) => (),
    //         'dtpr': (args) => (),
    //         'doublep': (args) => (),
    //         'eq': (args) => (),
    //         'equal': (args) => (),
    //         'eval': (args) => (),
    //         'expr': (args) => (),
    //         'fexprs': (args) => (),
    //         'floatp': (args) => (),
    //         'fsubrs': (args) => (),
    //         'gc': ,
    //         'gensym': ,
    //         'getprop': ,
    //         'integerp': ,
    //         'last': ,
    //         'length': ,
    //         'lisp': ,
    //         'member': ,
    //         'memq': ,
    //         'nconc': ,
    //         'neq': ,
    //         'nequal': ,
    //         'nospy': ,
    //         'not': ,
    //         'notrace': ,
    //         'nth': ,
    //         'null': ,
    //         'numberp': ,
    //         'oblist': ,
    //         'pp': ,
    //         'princ': ,
    //         'print': ,
    //         'putprop': ,
    //         'remprop': ,
    //         'reverse': ,
    //         'rplaca': ,
    //         'rplacd': ,
    //         'spy': ,
    //         'stringp': ,
    //         'subrs': ,
    //         'symbokp': ,
    //         'terpri': ,
    //         'trace': ,
    //         '~=': ,
    //         '~~': ,
    //         '*':  (args) => (args[0] * args[1]),
    //         '+':  (args) => (args[0] + args[1]),
    //         '-':  (args) => (args[0] - args[1]),
    //         '/':  (args) => (args[0] / args[1]),
    //         '//':  (args) => (args[0] / args[1]),
    //         '.':  (args) => console.log(args[0]),
    //     };

    //     return null;
    // }
    
    /**
     * イーバリュエータ(評価器)の起動
     * @param {*} input 構文解析を終えたトークン
     * @return {*} 評価結果
     */
    eval(input)
    {
        if(Array.isArray(input)){
            let fn = this.functionList[input[0]];
            let args = input.slice(1);
            return fn(args.map(arg => this.eval(arg)));
        } else if(typeof(input) == 'number'){
            return input;
        } else if (typeof(input) == 'string'){
            return input;
        }

        return input;
    }
}
