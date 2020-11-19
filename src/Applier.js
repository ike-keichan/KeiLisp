// #!/usr/bin/env node

'use strict';

// ライブラリ「Ramda」を読み込む。
import * as R from 'ramda'; 

// モジュール「Cons」を読み込む。
import { Cons } from './Cons.js';

//モジュール「InterpretedSymbol」を読み込む。
import { InterpretedSymbol } from './InterpretedSymbol';

// モジュール「StreamManager」を読み込む。
import { StreamManager } from './StreamManager.js';

// モジュール「Table」を読み込む。
import { Table } from './Table.js';

/**
 * Lispの万能関数のApplyを模倣したクラス
 * @class
 * @classdesc 
 * @author Keisuke Ikeda
 * @this {Applier}
 */
export class Applier extends Object
{
    /**
     * 
     */
    static buildInFunctions = Applier.setup();

    /**
     * コンストラクタメソッド
     * @constructor
     * @param {Table} aTable 環境のテーブル（予約語）
     * @param {StreamManager} PaStreamManager
     * @param {Number} aNumber 呼び出しの深さ
     * @return {Applier} 自身
     */
    constructor(aTable, aStreamManager, aNumber)
    {
        super();
        this.environment = new Table(aTable);
        this.streamManager = aStreamManager;
        this.depth = aNumber;

        return this;
    }

    abs()
    {

    }

    /**
     * 引数の値の和を応答するメソッド
     * @param {Cons} args 引数のCons
     * @return {Number} 計算結果
     */
    add(args)
    {
        if (Cons.isNumber(args.car)) { return this.add_Number(args.car, args.cdr); }
        else { throw new Error('Can not apply \"add\" to \"' + args.car + '\"'); }
    }

    /**
     * Number型の値の和を応答するメソッド
     * @param {Number} init 引数のcar
     * @param {Cons} args 引数のcdr
     * @return {NUmber} 計算結果
     */
    add_Number(init, args)
    {
        let result = init;
        let aCons = args;

        while(!Cons.isNil(aCons))
        {
            let each = aCons.car;
            if(Cons.isNumber(each)){ result = result + each; }
            else { throw new Error('Can not apply \"add\" to \"' + each + '\"'); }
            aCons = aCons.cdr;
        }

        return result;
    }

    /**
     * Applierを実行するメソッド
     * @param {*} procedure 関数名、又はオペレータ
     * @param {*} args 引数の値
     * @param {Table} environment 環境のテーブル（予約語）
     * @param {StreamManager} aStreamManager 
     * @param {Number} depth 呼び出しの深さ
     * @return {*} 計算結果 
     */
    static apply(procedure, args, environment, aStreamManager, depth)
    {
        return new Applier(environment, aStreamManager, depth).apply(procedure, args);
    }

    /**
     * Applierを実行するメソッド
     * @param {*} procedure 関数名、又はオペレータ
     * @param {*} args 引数の値
     * @return {*} 計算結果
     */
    apply(procedure, args)
    {
        if(Cons.isSymbol(procedure)){ return this.selectProcedure(procedure, args); }
        return this.entrustEvaluator(procedure, args);
    }

    assoc()
    {

    }

    atom_()
    {

    }

    binding(parameter, args)
    {
        let aCons = parameter;
        let theCons = args;

        if(Cons.isNil(parameter)){ return null; }
        while(!Cons.isNil(aCons))
        {
            try { this.environment.set(aList.car, theCons.car); }
            catch(e) { throw new Error('sizes do not match.'); }
            if(!Cons.isCons(aCons.cdr)){ break; }
            aCons = aCons.cdr;
            theCons = theCons.cdr;
        }

        if(Cons.isAtom(aCons.cdr) && (!Cons.isNil(aCons.cdr)))
        {
            try { this.environment.set(aCons.cdr, theCons.cdr); }
            catch(e) { throw new Error('sizes do not match.'); }
        }else if(!Cons.isNil(aCons.cdr)){ throw new Error('Can not binding value to "' + aList.cdr() + '"'); }

        return null;
    }

    /**
     * 組み込み関数を実行し、結果を応答するメソッド
     * @param {InterpretedSymbol} procedure 関数名、又はオペレータ
     * @param {Cons} args 引数
     * @return {*} 計算結果
     */
    buildInFunction(procedure, args)
    {
        let answer = null;
        let methodName = new String();

        // try
        // {
            if(this.isSpy(procedure))
            {
                this.spyPrint(this.streamManager.spyStream(procedure), (new Cons(procedure, args)).toString());
                this.setDepth(this.depth + 1);
            }

            methodName = Applier.buildInFunctions.get(procedure);

            try { let method = this[methodName]; }
            catch(e){ throw new Error('Not Found Method: ' + methodName); }

            try { answer = R.invoker(1, methodName)(args, this); }
            catch(e) { throw new Error('Not Invoke Method: ' + methodName); }

            if(this.isSpy(procedure))
            {
                this.setDepth(this.depth - 1);
                this.spyPrint(this.streamManager.spyStream(procedure), answer + ' <== ' + new Cons(procedure, args));
            }
        // }
        // catch(e){ throw new Error('Exception (Applier, buildInFunction)'); }
       
        return answer;
    }

    car()
    {

    }

    cdr()
    {

    }

    character_()
    {

    }

    cons()
    {

    }

    copy()
    {

    }

    /**
     * 引数の値の商を応答するメソッド
     * @param {Cons} args 引数のCons
     * @return {Number} 計算結果
     */
    divide(args)
    {
        if (Cons.isNumber(args.car)) { return this.divide_Number(args.car, args.cdr); }
        else { throw new Error('Can not apply \"divide\" to \"' + args.car + '\"'); }
    }

    /**
     * Number型の値の商を応答するメソッド
     * @param {Number} init 引数のcar
     * @param {Cons} args 引数のcdr
     * @return {NUmber} 計算結果
     */
    divide_Number(init, args)
    {
        let result = init;
        let aCons = args;

        while(!Cons.isNil(aCons))
        {
            let each = aCons.car;
            if(Cons.isNumber(each)){ result = result / each; }
            else { throw new Error('Can not apply \"divide\" to \"' + each + '\"'); }
            aCons = aCons.cdr;
        }

        return result;
    }

    double_()
    {

    }

    /**
     * ApplierでできないことをEvaluatorに任せ、結果を応答するメソッド
     * @param {Cons} procedure 関数名、又はオペレータ
     * @param {Cons} args 引数の値
     */
    entrustEvaluator(procedure, args)
    {
        let anObject = Cons.nil;
        let aCons = procedure.cdr;
        this.binding(aCons.car, args);

        for(let each of aCons.loop())
        {
            if(each instanceof Table){ break; }
            anObject = EvalError.eval(each, this.environment, this.streamManager, this.depth);
        }

        return anObject;
    }

    eq_()
    {

    }

    equal_()
    {

    }

    format()
    {

    }

    format_AUX()
    {

    }

    genTemp()
    {

    }

    getStream()
    {

    }

    greaterThan()
    {

    }

    greaterThan_Double()
    {

    }

    greaterThan_Integer()
    {

    }

    greaterThanOrEqual()
    {

    }

    greaterThanOrEqual_Double()
    {

    }

    greaterThanOrEqual_Integer()
    {

    }

    static incrementGenerateNumber()
    {

    }

    indent()
    {

    }

    integer_()
    {

    }

    /**
     * スパイする必要があるかどうかを判別し、応答するメソッド
     * @param {InterpretedSymbol} aSymbol
     * @return {Boolean} 真偽値
     */
    isSpy(aSymbol)
    {
        return this.streamManager.isSpy(aSymbol);
    }

    last()
    {

    }

    lessThan()
    {

    }

    lessThan_Double()
    {

    }

    lessThan_Integer()
    {

    }

    lessThanEqual()
    {

    }

    lessThanEqual_Double()
    {

    }

    lessThanEqual_Integer()
    {

    }

    list()
    {

    }

    list_()
    {

    }

    mapCar()
    {

    }

    member()
    {

    }

    mod()
    {

    }

    mod_Double()
    {

    }

    mod_Integer()
    {

    }

    /**
     * 引数の値の積を応答するメソッド
     * @param {Cons} args 引数のCons
     * @return {Number} 計算結果
     */
    multiply(args)
    {
        if (Cons.isNumber(args.car)) { return this.multiply_Number(args.car, args.cdr); }
        else { throw new Error('Can not apply \"multiply\" to \"' + args.car + '\"'); }
    }

    /**
     * Number型の差の積を応答するメソッド
     * @param {Number} init 引数のcar
     * @param {Cons} args 引数のcdr
     * @return {Number} 計算結果
     */
    multiply_Number(init, args)
    {
        let result = init;
        let aCons = args;

        while(!Cons.isNil(aCons))
        {
            let each = aCons.car;
            if(Cons.isNumber(each)){ result = result * each; }
            else { throw new Error('Can not apply \"multiply\" to \"' + each + '\"'); }
            aCons = aCons.cdr;
        }

        return result;
    }

    nth()
    {

    }

    null_()
    {

    }

    number_()
    {

    }

    /**
     * 実行する処理を選択し、実行するメソッド
     * @param {InterpretedSymbol} procedure 関数名、又はオペレータ
     * @param {Cons} args 引数の値
     * @return {*} 計算結果
     */
    selectProcedure(procedure, args)
    {
        // console.log('selectProcedure000');
        if(Applier.buildInFunctions.has(procedure)){ return this.buildInFunction(procedure, args); }
        // console.log('selectProcedure111');
        if(this.environment.has(procedure)){ return this.userFunction(procedure, args); }
        // console.log('selectProcedure222')
        new Error('I could find no procedure description for ' + procedure);

        return Cons.nil;
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
            aTable.set(InterpretedSymbol.of("abs"), "abs");
			aTable.set(InterpretedSymbol.of("add"), "add");
			aTable.set(InterpretedSymbol.of("assoc"), "assoc");
			aTable.set(InterpretedSymbol.of("atom?"), "atom_");
			aTable.set(InterpretedSymbol.of("car"), "car");
			aTable.set(InterpretedSymbol.of("cdr"), "cdr");
			aTable.set(InterpretedSymbol.of("character?"), "character_");
			aTable.set(InterpretedSymbol.of("cons"), "cons");
			aTable.set(InterpretedSymbol.of("copy"), "copy");
			aTable.set(InterpretedSymbol.of("divide"), "divide");
			aTable.set(InterpretedSymbol.of("double?"), "double_");
			aTable.set(InterpretedSymbol.of("eq?"), "eq_");
			aTable.set(InterpretedSymbol.of("equal?"), "equal_");
			aTable.set(InterpretedSymbol.of("format"), "format");
			aTable.set(InterpretedSymbol.of("gentemp"), "gentemp");
			aTable.set(InterpretedSymbol.of("integer?"), "integer_");
			aTable.set(InterpretedSymbol.of("last"), "last");
			aTable.set(InterpretedSymbol.of("list"), "list");
			aTable.set(InterpretedSymbol.of("list?"), "list_");
			aTable.set(InterpretedSymbol.of("mapcar"), "mapcar");
			aTable.set(InterpretedSymbol.of("member"), "member");
			aTable.set(InterpretedSymbol.of("mod"), "mod");
			aTable.set(InterpretedSymbol.of("multiply"), "multiply");
			aTable.set(InterpretedSymbol.of("nth"), "nth");
			aTable.set(InterpretedSymbol.of("null?"), "null_");
			aTable.set(InterpretedSymbol.of("number?"), "number_");
			aTable.set(InterpretedSymbol.of("subtract"), "subtract");
			aTable.set(InterpretedSymbol.of("string?"), "string_");
			aTable.set(InterpretedSymbol.of("symbol?"), "symbol_");
			aTable.set(InterpretedSymbol.of("+"), "add");
			aTable.set(InterpretedSymbol.of("-"), "subtract");
			aTable.set(InterpretedSymbol.of("*"), "multiply");
			aTable.set(InterpretedSymbol.of("/"), "divide");
			aTable.set(InterpretedSymbol.of("="), "eq_");
			aTable.set(InterpretedSymbol.of("<"), "lessThan");
			aTable.set(InterpretedSymbol.of("<="), "lessThanOrEqual");
			aTable.set(InterpretedSymbol.of(">"), "greaterThan");
			aTable.set(InterpretedSymbol.of(">="), "greaterThanOrEqual");
            
            return aTable;
        }
        catch(e){ throw new Error('NullPointerException (Applier, initialize)'); }
    }

    spyPrint(aStream, line)
    {
        aPrintStream = process.stdout;
        if(aStream != null){  }
        console.log(this.indent() + line);
        if(aStream != null){  }
        return null;
    }

    string_()
    {

    }

    /**
     * 引数の値の差を応答するメソッド
     * @param {Cons} args 引数のCons
     * @return {Number} 計算結果
     */
    subtract(args)
    {
        if (Cons.isNumber(args.car)) { return this.subtract_Number(args.car, args.cdr); }
        else { throw new Error('Can not apply \"subtract\" to \"' + args.car + '\"'); }
    }

    /**
     * Number型の差の商を応答するメソッド
     * @param {Number} init 引数のcar
     * @param {Cons} args 引数のcdr
     * @return {Number} 計算結果
     */
    subtract_Number(init, args)
    {
        let result = init;
        let aCons = args;

        while(!Cons.isNil(aCons))
        {
            let each = aCons.car;
            if(Cons.isNumber(each)){ result = result - each; }
            else { throw new Error('Can not apply \"subtract\" to \"' + each + '\"'); }
            aCons = aCons.cdr;
        }

        return result;
    }

    symbol_()
    {

    }

    tolerance()
    {

    }

    userFunction(procedure, args)
    {
        let answer = null;
        if(this.isSpy(procedure))
        {
            this.spyPrint(this.streamManager.spyStream(procedure), (new Cons(procedure, args)).toString());
            this.setDepth(this.depth + 1);
        }

        let lambda = this.environment.get(procedure);
        let theEnvironment = lambda.last().car;
        answer = Applier.apply(lambda, args, theEnvironment, this.streamManager, this.depth);

        if(this.isSpy(procedure))
        {
            this.setDepth(this.depth - 1);
            this.spyPrint(this.streamManager.spyStream(procedure), answer + ' <== ' + new Cons(procedure, args));
        }
    }
}
