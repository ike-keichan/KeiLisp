// #!/usr/bin/env node

"use strict";

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
     * エラーを検知し、応答するメソッド
     * @param {String} aString エラー内容
     * @return {Null} 何も返さない
     */
    fatal(aString)
    {
        console.log(aString); // Todo:エラー処理
        return null;
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
            catch(e){ this.fatal("Not Found Method: " + this.methodName); } // Todo:エラー処理
        }

        let aNumber = -1;
        try
        {
            if(this.nextState != null){ aNumber = this.nextState; }
            let toDoMethod = R.invoker(0, this.methodName);
            let anObject = toDoMethod(this.automaton);
            if(anObject != null){ aNumber = Number(anObject); }
        }
        catch(e) { this.fatal("Not Invoke Method: " + this.methodName); } // Todo:エラー処理

        return Number(aNumber);
    }
} 
