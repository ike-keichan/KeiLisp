// #!/usr/bin/env node

"use strict";

// モジュール「Parser」を読み込む。
// import { Parser } from './Parser';

// ライブラリ「Ramda」を読み込む。
import * as R from 'ramda'; 

/**
 * @class
 * @classdesc 次の状態を保持するクラス
 * @author Keisuke Ikeda
 * @this {NextState}
 */
export class NextState extends Object
{

    /**
     * コンストラクタメソッド
     * @constructor
     * @param {Number} aNumber 
     * @param {String} aString
     * @return {NextState} 自身
     */
    constructor(aNumber, aString)
    {
        super();
        this.automaton;
        this.nextState = aNumber;
        this.method = null;
        this.methodName = aString;

        return this;
    }

    /**
     * automatonを設定するメソッド
     * @param {Parser} anAutomaton
     * @return {Null} 何も返さない
     */
    setAutomaton(anAutomaton)
    {
        this.automaton = anAutomaton;
        return null;
    }

    /**
     * エラーを検知し、応答するメソッド
     * @param {String} aString エラー内容
     */
    fatal(aString)
    {
        // Todo:エラー処理
        console.log(aString);
    }

    /**
     * 
     * @param {Parser} anAutomaton 
     */
    next(anAutomaton)
    {
        this.automaton = anAutomaton;
        if(this.methodName == null){ return Number(this.nextState); }
        if(this.method == null)
        {
            try
            {
                this.method = this.automaton[this.methodName];
            }
            catch(e){ this.fatal("Not Found Method: " + this.methodName); }
            // Todo:エラー処理
        }

        let aNumber = -1;
        try
        {
            if(this.nextState != null){ aNumber = this.nextState; }
            let toDoMethod = R.invoker(0, this.methodName);
            let anObject = toDoMethod(this.automaton);
            if(anObject != null){ aNumber = Number(anObject); }
        }
        catch(e) { this.fatal("IllegalAccessException (NextState in Parser, next)"); }
        // Todo:エラー処理

        return Number(aNumber);
    }
} 
