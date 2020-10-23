// #!/usr/bin/env node

"use strict";

//モジュール「Cons」を読み込む。
import { Cons } from './Cons.js';

//モジュール「Evaluator」を読み込む。
import { Evaluator } from './Evaluator.js';

/**
 * @class
 * @classdesc レクス(字句解析)、パース（構文解析）を行うクラス
 * @author Keisuke Ikeda
 * @this {Parser}
 */
export class Parser
{
    /**
     * コンストラクタメソッド、標準入力の引数を配列にする。
     * @constructor
     * @param {*} input 標準入力の引数
     * @return {Null} 何も返さない。
     */
    constructor(input)
    {
        this.aCons = new Cons();
        this.anArray = input.replace(/(\(|\)|\'|\.)/g, ' $1 ').split(/\s+/g).filter(x => x != '');
        this.index = 0;
        // console.log(this.anArray); //デバック用

        return null;
    }

    /**
     * パーサ（構文解析器）の起動メソッド
     * @return {Null} 処理を終了させる。 何も返さない。
     */
    parse()
    {
        while(this.index < this.anArray.length)
        {
            // try
            // {
                let anEvaluator = new Evaluator();
                let parsedArray = this.parseToken();
                // console.log(parsedArray);
                this.aCons = new Cons(this.prepareCons(parsedArray[0]), this.prepareCons(parsedArray.slice(1)));
                // this.debugCons();
                // console.log(anEvaluator.eval(this.aCons));
            // } catch (e){ console.log('SyntaxError!!'); break; }
        }

        return this.aCons;
    }

    debugCons()
    {
        console.log(this.aCons.toString());
        
        let bCons = this.aCons.clone();
        
        console.log(bCons.toString());

        for(const value of this.aCons.loop())
        {
            console.log(value);
        }

        (async() =>
        {
            for await(const value of this.aCons.loop())
            {
                console.log(value);
            }
        })();
        
        return null;
    }

    /**
     * Consを用意するメソッド
     * @param {*} anObject 引数のオブジェクト
     * @return {Cons} 用意したCons
     */
    prepareCons(anObject)
    {
        let inclusiveCons = new Cons();

        if(!Array.isArray(anObject)){ //anObjectがリストでない場合
            inclusiveCons = anObject;
        }
        else if(Array.isArray(anObject) && anObject.length == 1){ //anObjectがリストで、かつ要素が1つの場合
            inclusiveCons = new Cons(this.prepareCons(anObject[0]));
        }
        else{ //anObjectがリストで、かつ要素が2つ以上の場合
            inclusiveCons = new Cons(this.prepareCons(anObject[0]), this.prepareCons(anObject.slice(1)));
        }

        return inclusiveCons;
    }

    /**
     * トークンを構文解析するメソッド。
     * トークンのアトム（型）を調べ、それぞれの処理にトークンを渡す。
     * @return {*} 構文解析を終えたトークン
     */
    parseToken()
    {
        const token = this.anArray[this.index];

        if(token == null)
        {
            return 'nil';
        }
        // else if(token.match(/^[\']/g))
        // {
        //     return
        // }
        else if(token.match(/^[(]/g))
        {
            return this.parseList(token);
        }
        else if(token.match(/^[0-9]+$/g))
        {
            return this.parseNumber(token);
        }
        else if(typeof(token) === 'string')
        {
            return this.parseString(token);
        }
        else
        {
            return this.parseSymbol(token);
        }
    }

    /**
     * アトムが数字となるトークンを構文解析するメソッド
     * @param {*} token 数字トークン
     * @return {Number} 構文解析を終えた数字トークン
     *
     */
    parseNumber(token)
    {
        this.index++;
        return Number(token);
    }

    /**
     * アトムが文字列となるトークンを構文解析するメソッド
     * @param {String} token 文字列トークン
     * @return {String} 構文解析を終えた文字列トークン
     */
    parseString(token)
    {
        this.index++;
        return String(token);
    }

    /**
     * アトムがシンボルとなるトークンを構文解析するメソッド
     * @param {*} token シンボルトークン
     * @return {Symbol} 構文解析を終えたシンボルトークン
     */
    parseSymbol(token)
    {
        this.index++;
        return token;
    }

    /**
     * リストを構文解析するメソッド
     * @param {*} token リストの第一要素になるトークン
     * @return {Array} 構文解析を終えたリスト
     */
    parseList(token)
    {
        this.anArray.splice(this.index, 1, token.replace(/^[(]/, ''));
        let anotherArray = [this.parseToken()];
        let flag = true;

        while(flag)
        {
            let anotherToken = this.anArray[this.index];

                if(anotherToken.match(/[)]$/g))
                {
                    this.anArray.splice(this.index, 1, anotherToken.replace(/[)]+$/, ''));
                    anotherArray.push(this.parseToken());
                    flag = false;
                }
                else
                {
                    anotherArray.push(this.parseToken());
                }
        }

        return anotherArray.filter(value => value !== '');
    }
}
