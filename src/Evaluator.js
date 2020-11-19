// #!/usr/bin/env node

'use strict';

// ライブラリ「Ramda」を読み込む。
import * as R from 'ramda'; 

// モジュール「Applier」を読み込む。
import { Applier } from './Applier.js';

// モジュール「Cons」を読み込む。
import { Cons } from './Cons.js';

//モジュール「InterpretedSymbol」を読み込む。
import { InterpretedSymbol } from './InterpretedSymbol';

// モジュール「StreamManager」を読み込む。
import { StreamManager } from './StreamManager.js';

// モジュール「Table」を読み込む。
import { Table } from './Table.js';

/**
 * @class
 * @classdesc Lispの万能関数のEvaluateを模倣したクラス
 * @author Keisuke Ikeda
 * @this {Evaluator}
 */
export class Evaluator extends Object
{
    /**
     * 
     */
    static buildInFunctions = Evaluator.setup();

    /**
     * コンストラクタメソッド
     * @constructor
     * @param {Table} aTable 環境のテーブル（予約語）
     * @param {StreamManager} aStreamManager
     * @param {Number} aNumber 呼び出しの深さ
     * @return {Evaluator} 自身
     */
    constructor(aTable, aStreamManager, aNumber)
    {
        super();
        this.environment = aTable;
        this.streamManager = aStreamManager;
        this.depth = aNumber;

        return this;
    }

    and()
    {

    }

    apply_lisp()
    {

    }

    bind()
    {

    }

    bindAUX()
    {

    }

    binding()
    {

    }

    bindingParallel()
    {

    }

    cond()
    {

    }

    defun()
    {

    }

    do_()
    {

    }

    doList()
    {

    }

    doStar()
    {

    }

    /**
     * EvaluatorでできないことをApplierに任せ、結果を応答するメソッド
     * @param {*} form 評価するCons、又はスペシャルフォーム
     * @return {*} 計算結果
     */
    entrustApplier(form)
    {
        let aCons = form.cdr;
        let args = new Cons();
        let procedure = form.car;
        let aSymbol = new InterpretedSymbol();

        // console.log('entrustApplier111');
        if(Cons.isSymbol(procedure)){ aSymbol = procedure; }
        if(this.isSpy(aSymbol))
        {
            this.spyPrint(this.streamManager.spyStream(aSymbol), form.toString);
            this.setDepth(this.depth + 1);
        }
        // console.log('entrustApplier222');
        for(let each of aCons.loop())
        {
            if(each instanceof Table){ break; }
            args.add(Evaluator.eval(each, this.environment, this.streamManager, this.depth));
        }
        if(this.isSpy(aSymbol)){ this.setDepth(this.depth - 1); }
        // console.log('entrustApplier333');

        args = args.cdr;
        let anObject = Applier.apply(procedure, args, this.environment, this.streamManager, this.depth);
        return anObject;
    }

    /**
     * Evaluatorを実行するメソッド
     * @param {*} form 評価するCons、又はスペシャルフォーム
     * @param {Table} environment 環境のテーブル（予約語）
     * @param {StreamManager} aStreamManager 
     * @param {Number} depth 呼び出しの深さ
     * @return {*} 計算結果
     */
    static eval(form, environment, aStreamManager = new StreamManager(), depth = 1)
    {
        return new Evaluator(environment, aStreamManager, depth).eval(form);
    }
    
    /**
     * Evaluatorを実行するメソッド
     * @param {*} form 評価するCons、又はスペシャルフォーム
     * @return {*} 計算結果
     */
    eval(form)
    {
        // console.log('eval111');
        if(Cons.isSymbol(form)){ return this.evaluateSymbol(form); }
        // console.log('eval222');
        if(Cons.isNil(form) || Cons.isAtom(form)){ return form; }
        // console.log('eval333');
        if(Cons.isSymbol(form.car) &&  Evaluator.buildInFunctions.has(form.car)){ return this.specialForm(form); }
        // console.log('eval444');

        return this.entrustApplier(form);
    }

    /**
     * Evaluatorを実行するメソッド
     * @param {Cons} aCons 評価するCons
     * @return {*} 計算結果
     */
    eval_lisp(aCons)
    {
        return Evaluator.eval(Evaluator.eval(aCons.car, this.environment, this.streamManager, this.depth), this.environment, this.streamManager, this.depth);
    }

    /**
     * シンボルを評価して応答するメソッド
     * @param {InterpretedSymbol} aSymbol シンボル
     * @return {InterpretedSymbol} 評価したシンボル
     */
    evaluateSymbol(aSymbol)
    {
        let answer = null;

        if(aSymbol != null & this.environment.has(aSymbol))
        {
            if(this.isSpy(aSymbol))
            {
                this.spyPrint(this.streamManager.spyStream(aSymbol), aSymbol.toString());
                this.setDepth(this.depth + 1);
            }

            answer = this.environment.get(aSymbol);
            if(answer instanceof Cons && answer.cdr instanceof Table){ answer = answer.car; }

            if(this.isSpy(aSymbol))
            {
                this.setDepth(this.depth - 1);
                this.spyPrint(this.streamManager.spyStream(aSymbol), answer + ' <== ' + aSymbol);
            }
        }
        else{ throw new Error("I could find no variable binding for " + aSymbol); }

        return answer;
    }

    exit()
    {

    }

    if_()
    {

    }

    indent()
    {
        let index = 0;
        let aString = new String();
        aString += "";
        while(index++ < this.depth){ aString += "| "; }

        return aString;
        
    }

    isSpy(aSymbol)
    {
        if(aSymbol == null){ return false; }
        return this.streamManager.isSpy(aSymbol);
    }

    lambda()
    {

    }

    let()
    {

    }

    letStar()
    {

    }

    noSpy()
    {

    }

    not()
    {

    }

    noTrace()
    {

    }

    or()
    {

    }

    pop_()
    {

    }

    progn()
    {

    }

    push_()
    {

    }

    quote(aCons)
    {
        return aCons.car;
    }

    set_()
    {

    }

    set_all_()
    {

    }

    set_car_()
    {

    }

    set_car_all_()
    {

    }

    set_cdr_()
    {
        
    }

    set_cdr_all_()
    {

    }

    /**
     * 呼び出しの深さを設定するメソッド
     * @param {Number} aNumber 呼び出しの深さ
     * @return {Null} 何も返さない。
     */
    setDepth(aNumber)
    {
        this.depth = aNumber;
        return null;
    }

    /**
     * Lispの関数とJSの関数を紐づけるテーブルを応答するメソッド
     * @return {Table} 生成したテーブル
     */
    static setup()
    {
        try
        {
            let aTable = new Map();
            aTable.set(InterpretedSymbol.of("and"), "and");
			aTable.set(InterpretedSymbol.of("apply"), "apply_lisp");
			aTable.set(InterpretedSymbol.of("bind"), "bind");
			aTable.set(InterpretedSymbol.of("cond"), "cond");
			aTable.set(InterpretedSymbol.of("defun"), "defun");
			aTable.set(InterpretedSymbol.of("do"), "do_");
			aTable.set(InterpretedSymbol.of("dolist"), "doList");
			aTable.set(InterpretedSymbol.of("do*"), "doStar");
			aTable.set(InterpretedSymbol.of("eval"), "eval_lisp");
			aTable.set(InterpretedSymbol.of("exit"), "exit");
			aTable.set(InterpretedSymbol.of("gc"), "gc");
			aTable.set(InterpretedSymbol.of("if"), "if_");
            aTable.set(InterpretedSymbol.of("lambda"), "lambda");
			aTable.set(InterpretedSymbol.of("let"), "let");
			aTable.set(InterpretedSymbol.of("let*"), "letStar");
			aTable.set(InterpretedSymbol.of("nospy"), "nospy");
			aTable.set(InterpretedSymbol.of("not"), "not");
			aTable.set(InterpretedSymbol.of("notrace"), "notrace");
			aTable.set(InterpretedSymbol.of("or"), "or");
			aTable.set(InterpretedSymbol.of("pop!"), "pop_");
			aTable.set(InterpretedSymbol.of("progn"), "progn");
			aTable.set(InterpretedSymbol.of("push!"), "push_");
			aTable.set(InterpretedSymbol.of("quote"), "quote");
			aTable.set(InterpretedSymbol.of("set!"), "set_");
			aTable.set(InterpretedSymbol.of("set-all!"), "set_all_");
			aTable.set(InterpretedSymbol.of("set-car!"), "set_car_");
			aTable.set(InterpretedSymbol.of("set-car-all!"), "set_car_all_");
			aTable.set(InterpretedSymbol.of("set-cdr!"), "set_cdr_");
			aTable.set(InterpretedSymbol.of("set-cdr-all!"), "set_cdr_all_");
			aTable.set(InterpretedSymbol.of("spy"), "spy");
			aTable.set(InterpretedSymbol.of("time"), "time");
			aTable.set(InterpretedSymbol.of("trace"), "trace");
			aTable.set(InterpretedSymbol.of("unless"), "unless");
            aTable.set(InterpretedSymbol.of("when"), "when");
            
            return aTable;
        }
        catch(e){ throw new Error('NullPointerException (Evaluator, initialize)'); }
    }

    specialForm(form)
    {
        let answer = null;

        try
        {
            let aSymbol = form.car;

            if(this.isSpy(aSymbol))
            {
                this.spyPrint(this.streamManager.spyStream(aSymbol), form.toString());
                this.setDepth(this.depth + 1);
            }
        
            let aCons = form.cdr;
            let methodName = Evaluator.buildInFunctions.get(aSymbol);

            try { let method = this[methodName]; }
            catch(e){ throw new Error('Not Found Method: ' + methodName); }

            try { answer = R.invoker(1, methodName)(aCons, this); }
            catch(e) { throw new Error('Not Invoke Method: ' + this.methodName); }

            if(this.isSpy(aSymbol))
            {
                this.setDepth(this.depth - 1);
                this.spyPrint(this.streamManager.spyStream(aSymbol), answer + ' <== ' + aSymbol);
            }
        }
        catch(e){ throw new Error('IllegalAccessException (Evaluator, specialForm)'); }
        
        return answer;
    }

    spy()
    {

    }
    
    spyPrint(aStream, line)
    {
        aPrintStream = process.stdout;
        if(aStream != null){  }
        console.log(this.indent() + line);
        if(aStream != null){  }
        return null;
    }

    time()
    {

    }

    trace()
    {

    }

    unless()
    {

    }

    when()
    {
        
    }
}
