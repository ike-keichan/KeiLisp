// #!/usr/bin/env node

"use strict";

import { Cons } from './Cons.js';
//モジュール「Evaluator」を読み込む。
import {Evaluator} from './Evaluator.js';

/**
 * @class
 * @classdesc レクス(字句解析)、パース（構文解析）を行うクラス
 * @author Keisuke Ikeda
 * @this {Parser}
 */
export class Parser
{
    /**
     * コンストラクタメソッド
     * 標準入力の引数を配列にする。
     * @constructor
     * @param {*} input 標準入力の引数
     * @return {Null} 何も返さない。
     */
    constructor(input)
    {
        this.aString = input.replace(/(\(|\)|\'|\,)/g, ' $1 ').split(/\s+/).filter(x => x != '');
        
        

        this.index = 0;
        console.log(this.aString); //デバック用
        console.log(this.aCons); //デバック用

        return null;
    }

    makeTree()
    {


        return;
    }

    /**
     * パーサ（構文解析器）の起動メソッド
     * @return {Null} 処理を終了させる。 何も返さない。
     */
    parse()
    {
        console.log(this.aString); //デバック用

        while(this.index < this.anArray.length)
        {
            try
            {
                // let anEvaluator = new Evaluator();
                // console.log(this.parseToken()); //デバック用
                // console.log(anEvaluator.eval(this.parseToken()));
            } catch (e){ console.log('SyntaxError!!'); break; }
        }

        return null;
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
        // let nextToken = this.anArray[this.index+1];
        // if(token.match(/^[(]/g) && nextToken.match(/^[)]/g)){ return 'nil' }

        this.anArray.splice(this.index, 1, token.replace(/^[(]/, ''));
        let anotherArray = [this.parseToken()];
        let flag = true;

        while(flag)
        {
            let anotherToken = this.anArray[this.index];
            if(this.numberOfRightParenthesis <= 1) 
            {
                if(anotherToken.match(/[)]$/g))
                {
                    this.numberOfRightParenthesis = ( anotherToken.match(/[)]/g) || 0 ).length ;
                    this.anArray.splice(this.index, 1, anotherToken.replace(/[)]+$/, ''));
                    anotherArray.push(this.parseToken());
                    flag = false;
                }
                else 
                {
                    anotherArray.push(this.parseToken());
                }
            }
            else
            { 
                this.numberOfRightParenthesis--;
                flag = false;
            }
        }

        return anotherArray.filter(value => value !== '');
    }
}
