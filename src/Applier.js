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
     * Lispの関数とJSの関数を紐づけるテーブル
     */
    static buildInFunctions = Applier.setup();

    static generateNumber = 0;

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

    /**
     * 引数の絶対値を応答するメソッド
     * @param {Cons} args 引数
     * @return {Number} 計算結果
     */
    abs(args)
    {
        if(Cons.isNumber(args.car)){ return Math.abs(args.car); }
        else { console.log('Can not apply \"abs\" to \"' + args.car + '\"'); }

        return Cons.nil;
    }

    /**
     * 引数の値の和を応答するメソッド
     * @param {Cons} args 引数
     * @return {Number} 計算結果
     */
    add(args)
    {
        if(Cons.isNumber(args.car)) { return this.add_Number(args.car, args.cdr); }
        else { console.log('Can not apply \"add\" to \"' + args.car + '\"'); }

        return Cons.nil;
    }

    /**
     * Number型の値の和を応答するメソッド
     * @param {Number} init 引数のcar
     * @param {Cons} args 引数のcdr
     * @return {Number} 計算結果
     */
    add_Number(init, args)
    {
        let result = init;
        let aCons = args;

        while(!Cons.isNil(aCons))
        {
            let each = aCons.car;
            if(Cons.isNumber(each)){ result = result + each; }
            else 
            { 
                console.log('Can not apply \"add\" to \"' + each + '\"'); 
                return Cons.nil; 
            }
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

    assoc(args)
    {
        let aCons = new Cons();
        let target = args.car;

        if(!Cons.isCons(arguments.nth(2))){ return Cons.nil; }
        aCons = args.nth(2);

        for(let each of aList.loop())
        {
            if(!Cons.isCons(each)){ console.log('Can not apply \"assoc\" to \"' + each + '\"') }
            let key = each.car;

            if(this.equal_(new Cons(target, new Cons(key, Cons.nil))) == InterpretedSymbol.of('t')){ return each; }
        }

        return Cons.nil;
        // Todo:実装不十分
    }

    /**
     * 引数がAtomかどうかを判別し、応答するメソッド。
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    atom_(args)
    {
        if(Cons.isAtom(args.car)){ return InterpretedSymbol.of('t'); }
        return Cons.nil;
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
        }else if(!Cons.isNil(aCons.cdr)){ throw new Error('Can not binding value to \"' + aList.cdr() + '\"'); }

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
            catch(e){ console.log('Not Found Method: ' + methodName); }

            try { answer = R.invoker(1, methodName)(args, this); }
            catch(e) { console.log('Not Invoke Method: ' + methodName); }

            if(this.isSpy(procedure))
            {
                this.setDepth(this.depth - 1);
                this.spyPrint(this.streamManager.spyStream(procedure), answer + ' <== ' + new Cons(procedure, args));
            }
        // }
        // catch(e){ throw new Error('Exception (Applier, buildInFunction)'); }
       
        return answer;
    }

    /**
     * 引数の先頭（car）を応答するメソッド
     * @param {Cons} args
     * @return {*} 引数の先頭
     */
    car(args)
    {
        return args.car.car;
    }

     /**
     * 引数の先頭以外（cdr）を応答するメソッド
     * @param {Cons} args
     * @return {*} 引数の先頭以外
     */
    cdr(args)
    {
        return args.car.cdr;
    }

    /**
     * 引数が文字(Character)かどうかを判別し、応答するメソッド。
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    character_(args)
    {
        if(Cons.isString(args.car) && args.car.length == 1){ return InterpretedSymbol.of('t'); }
        return Cons.nil;
    }

    /**
     * 第一引数と第二引数のリストを結合し、応答するメソッド
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    cons(args)
    {
        return new Cons(args.car, args.nth(2));
    }

    /**
     * 引数のリストを複製し、応答するメソッド
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    copy(args)
    {
        return Cons.cloneValue(args.car);
    }

    /**
     * 引数の値の商を応答するメソッド
     * @param {Cons} args 引数
     * @return {Number} 計算結果
     */
    divide(args)
    {
        if(Cons.isNumber(args.car)) { return this.divide_Number(args.car, args.cdr); }
        else { console.log('Can not apply \"divide\" to \"' + args.car + '\"'); }

        return Cons.nil;
    }

    /**
     * Number型の値の商を応答するメソッド
     * @param {Number} init 引数のcar
     * @param {Cons} args 引数のcdr
     * @return {Number} 計算結果
     */
    divide_Number(init, args)
    {
        let result = init;
        let aCons = args;

        while(!Cons.isNil(aCons))
        {
            let each = aCons.car;
            if(Cons.isNumber(each)){ result = result / each; }
            else { console.log('Can not apply \"divide\" to \"' + each + '\"'); return Cons.nil; }
            aCons = aCons.cdr;
        }

        return result;
    }

    /**
     * 引数が浮動小数倍精度数(Double)かどうかを判別し、応答するメソッド。
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    double_(args)
    {
        if(Cons.isNumber(args.car) && !Number.isInteger(args.car)){ return InterpretedSymbol.of('t'); }
        return Cons.nil;
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

    /**
     * 2つの引数の同値性を判別し、応答するメソッド
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    eq_(args)
    {
        let first = args.car;
        let second = args.nth(2);
        if(first === second){ return InterpretedSymbol.of('t'); }
        
        return Cons.nil;
    }

    /**
     * 2つの引数の同一性を判別し、応答するメソッド
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    equal_(args)
    {
        let first = args.car;
        let second = args.nth(2);
        if(first == second){ return InterpretedSymbol.of('t'); }
        
        return Cons.nil;
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

    /**
     * 2つの値が大なり関係にあるかどうか判別し、応答するメソッド
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    greaterThan(args)
    {
        if(Cons.isNumber(args.car)) { return this.greaterThan_Number(args.car, args.cdr); }
        else { console.log('Can not apply \">\" to \"' + args.car + '\"'); }

        return Cons.nil;
    }

    /**
     * Number型の2つの値が大なり関係にあるかどうか判別し、応答するメソッド
     * @param {Number} init 引数のcar
     * @param {Cons} args 引数のcdr
     * @return {*} 評価値
     */
    greaterThan_Number(init, args)
    {
        let leftValue = init;
        let aCons = args;
        let aBoolean = true;

        while(!Cons.isNil(aCons))
        {
            let rightValue = aCons.car;
            if(Cons.isNumber(rightValue)){ aBoolean = leftValue > rightValue; }
            else { console.log('Can not apply \">\" to \"' + rightValue + '\"'); return Cons.nil; }
            if(aBoolean == false){ return Cons.nil }
            leftValue = rightValue;
            aCons = aCons.cdr;
        }

        return InterpretedSymbol.of('t');
    }

    /**
     * 二つの値が大なりイコール関係にあるかどうか判別し、応答するメソッド
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    greaterThanOrEqual(args)
    {
        if(Cons.isNumber(args.car)) { return this.greaterThanOrEqual_Number(args.car, args.cdr); }
        else { console.log('Can not apply \">=\" to \"' + args.car + '\"'); }

        return Cons.nil;
    }

    /**
     * Number型の二つの値が大なりイコール関係にあるかどうか判別し、応答するメソッド
     * @param {Number} init 引数のcar
     * @param {Cons} args 引数のcdr
     * @return {*} 評価値
     */
    greaterThanOrEqual_Number(init, args)
    {
        let leftValue = init;
        let aCons = args;
        let aBoolean = true;

        while(!Cons.isNil(aCons))
        {
            let rightValue = aCons.car;
            if(Cons.isNumber(rightValue)){ aBoolean = leftValue >= rightValue; }
            else { console.log('Can not apply \">=\" to \"' + rightValue + '\"'); return Cons.nil; }
            if(aBoolean == false){ return Cons.nil }
            leftValue = rightValue;
            aCons = aCons.cdr;
        }

        return InterpretedSymbol.of('t');
    }

    static incrementGenerateNumber()
    {
        Applier.generateNumber++;
        return null;
    }

    /**
	 * 深さ分のインデント文字列を応答するメソッド
	 * @return {String} インデント文字列
	 */
    indent()
    {
        let index = 0;
        let aString = new String();
        aString += "";
        while(index++ < this.depth){ aString += "| "; }

        return aString;
    }

    /**
     * 引数が整数(Integer)かどうかを判別し、応答するメソッド。
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    integer_(args)
    {
        if(Cons.isNumber(args.car) && Number.isInteger(args.car)){ return InterpretedSymbol.of('t'); }
        return Cons.nil;
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

    /**
     * 引数の最後の要素を応答するメソッド
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    last(args)
    {
        if(!Cons.isCons(args)){ return Cons.nil; }
        let aCons = args.car;

        return aCons.last().cdr;
    }

    /**
     * 2つの値が小なり関係にあるかどうか判別し、応答するメソッド
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    lessThan(args)
    {
        if(Cons.isNumber(args.car)) { return this.lessThan_Number(args.car, args.cdr); }
        else { console.log('Can not apply \"<\" to \"' + args.car + '\"'); }

        return Cons.nil;
    }

    /**
     * Number型の2つの値が小なり関係にあるかどうか判別し、応答するメソッド
     * @param {Number} init 引数のcar
     * @param {Cons} args 引数のcdr
     * @return {*} 評価値
     */
    lessThan_Number(init, args)
    {
        let leftValue = init;
        let aCons = args;
        let aBoolean = true;

        while(!Cons.isNil(aCons))
        {
            let rightValue = aCons.car;
            if(Cons.isNumber(rightValue)){ aBoolean = leftValue < rightValue; }
            else { console.log('Can not apply \"<\" to \"' + rightValue + '\"'); return Cons.nil; }
            if(aBoolean == false){ return Cons.nil }
            leftValue = rightValue;
            aCons = aCons.cdr;
        }

        return InterpretedSymbol.of('t');
    }

    /**
     * 2つの値が小なりイコール関係にあるかどうか判別し、応答するメソッド
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    lessThanOrEqual(args)
    {
        if(Cons.isNumber(args.car)) { return this.lessThanOrEqual_Number(args.car, args.cdr); }
        else { console.log('Can not apply \"<=\" to \"' + args.car + '\"'); }

        return Cons.nil;
    }

    /**
     * Number型の2つの値が小なりイコール関係にあるかどうか判別し、応答するメソッド
     * @param {Number} init 引数のcar
     * @param {Cons} args 引数のcdr
     * @return {*} 評価値
     */
    lessThanOrEqual_Number(init, args)
    {
        let leftValue = init;
        let aCons = args;
        let aBoolean = true;

        while(!Cons.isNil(aCons))
        {
            let rightValue = aCons.car;
            if(Cons.isNumber(rightValue)){ aBoolean = leftValue <= rightValue; }
            else { console.log('Can not apply \"<=\" to \"' + rightValue + '\"'); return Cons.nil; }
            if(aBoolean == false){ return Cons.nil }
            leftValue = rightValue;
            aCons = aCons.cdr;
        }

        return InterpretedSymbol.of('t');
    }

    /**
	 * 引数の値をリストにまとめて応答する.
	 * @param args
	 * @return {*} 評価値
	 */
    list(args)
    {
        if(Cons.isNil(args)){ return Cons.nil; }
        return new Cons(args.car, this.list(args.cdr));
    }

    /**
     * 引数がリストかどうかを判別し、応答するメソッド。
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    list_(args)
    {
        if(Cons.isCons(args.car)){ return InterpretedSymbol.of('t'); }
        return Cons.nil;
    }

    mapCar()
    {

    }

    /**
     * 引数のcdrにcarの要素があれば、その要素が先頭となるConsを応答するメソッド
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    member(args)
    {
        let aSymbol = InterpretedSymbol.of('equal?');
        if(!Cons.isNil(args.nth(3))){ aSymbol = args.nth(3); }
        if(!Cons.isCons(args.nth(2))){ return Cons.nil; }
        let aCons = args.nth(2);

        while(Cons.isCons(aCons))
        {
            let anObject = null;

            if(aSymbol == InterpretedSymbol.of('eq?')){ anObject = this.eq_(new Cons(args.car, new Cons(aCons.car, Cons.nil))); }
            if(aSymbol == InterpretedSymbol.of('equal?')){ anObject = this.equal_(new Cons(args.car, new Cons(aCons.car, Cons.nil))); }
            if(anObject == null){ console.log('Can not apply \"member\" to \"' + aSymbol + '\"') }
            if(anObject == InterpretedSymbol.of('t')){ return aCons; }

            aCons = aCons.cdr;
        }

        return Cons.nil;
    }

    /**
     * 引数の値の剰余を応答するメソッド
     * @param {Cons} args 引数
     * @return {Number} 計算結果
     */
    mod(args)
    {
        if(Cons.isNumber(args.car)) { return this.mod_Number(args.car, args.cdr); }
        else { console.log('Can not apply \"mod\" to \"' + args.car + '\"'); }

        return Cons.nil;
    }

    /**
     * Number型の値の剰余を応答するメソッド
     * @param {Number} init 引数のcar
     * @param {Cons} args 引数のcdr
     * @return {Number} 計算結果
     */
    divide_Number(init, args)
    {
        let result = init;
        let aCons = args;

        while(!Cons.isNil(aCons))
        {
            let each = aCons.car;
            if(Cons.isNumber(each)){ result = result % each; }
            else { console.log('Can not apply \"mod\" to \"' + each + '\"'); return Cons.nil; }
            aCons = aCons.cdr;
        }

        return result;
    }

    /**
     * 引数の値の積を応答するメソッド
     * @param {Cons} args 引数
     * @return {Number} 計算結果
     */
    multiply(args)
    {
        if(Cons.isNumber(args.car)) { return this.multiply_Number(args.car, args.cdr); }
        else { console.log('Can not apply \"multiply\" to \"' + args.car + '\"'); }

        return Cons.nil;
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
            else { console.log('Can not apply \"multiply\" to \"' + each + '\"'); return Cons.nil; }
            aCons = aCons.cdr;
        }

        return result;
    }

    /**
     * 引数のcdrのcar番目の要素を応答するメソッド
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    nth(args)
    {
        if(Number.isInteger(args.car)){ return Cons.nil; }
        let index = args.car;
        let aCons = args.nth(2);

        return aCons.nth(index);
    }

    /**
     * 引数がnilかどうかを判別し、応答するメソッド。
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    null_(args)
    {
        if(Cons.isNil(args.car)){ return InterpretedSymbol.of('t'); }
        return Cons.nil;
    }

    /**
     * 引数がNumberかどうかを判別し、応答するメソッド。
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    number_(args)
    {
        if(Cons.isNumber(args.car)){ return InterpretedSymbol.of('t'); }
        return Cons.nil;
    }

    /**
     * 実行する処理を選択し、実行するメソッド
     * @param {InterpretedSymbol} procedure 関数名、又はオペレータ
     * @param {Cons} args 引数の値
     * @return {*} 計算結果
     */
    selectProcedure(procedure, args)
    {
        if(Applier.buildInFunctions.has(procedure)){ return this.buildInFunction(procedure, args); }
        if(this.environment.has(procedure)){ return this.userFunction(procedure, args); }
        console.log('I could find no procedure description for ' + procedure);

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
            aTable.set(InterpretedSymbol.of("abs"), "abs"); //OK?
			aTable.set(InterpretedSymbol.of("add"), "add"); //OK?
			aTable.set(InterpretedSymbol.of("assoc"), "assoc");
			aTable.set(InterpretedSymbol.of("atom?"), "atom_"); //OK?
			aTable.set(InterpretedSymbol.of("car"), "car"); //OK?
			aTable.set(InterpretedSymbol.of("cdr"), "cdr"); //OK?
			aTable.set(InterpretedSymbol.of("character?"), "character_"); //OK?
			aTable.set(InterpretedSymbol.of("cons"), "cons"); //OK?
			aTable.set(InterpretedSymbol.of("copy"), "copy"); //OK?
			aTable.set(InterpretedSymbol.of("divide"), "divide"); //OK?
			aTable.set(InterpretedSymbol.of("double?"), "double_"); //OK?
			aTable.set(InterpretedSymbol.of("eq?"), "eq_"); //OK?
			aTable.set(InterpretedSymbol.of("equal?"), "equal_"); //OK?
			aTable.set(InterpretedSymbol.of("format"), "format");
			aTable.set(InterpretedSymbol.of("gentemp"), "gentemp");
			aTable.set(InterpretedSymbol.of("integer?"), "integer_"); //OK?
			aTable.set(InterpretedSymbol.of("last"), "last"); //OK?
			aTable.set(InterpretedSymbol.of("list"), "list"); //OK?
			aTable.set(InterpretedSymbol.of("list?"), "list_"); //OK?
			aTable.set(InterpretedSymbol.of("mapcar"), "mapcar");
			aTable.set(InterpretedSymbol.of("member"), "member"); //OK?
			aTable.set(InterpretedSymbol.of("mod"), "mod"); //OK?
			aTable.set(InterpretedSymbol.of("multiply"), "multiply"); //OK?
			aTable.set(InterpretedSymbol.of("nth"), "nth"); //OK?
			aTable.set(InterpretedSymbol.of("null?"), "null_"); //OK?
			aTable.set(InterpretedSymbol.of("number?"), "number_"); //OK?
			aTable.set(InterpretedSymbol.of("subtract"), "subtract"); //OK?
			aTable.set(InterpretedSymbol.of("string?"), "string_"); //OK?
			aTable.set(InterpretedSymbol.of("symbol?"), "symbol_"); //OK?
			aTable.set(InterpretedSymbol.of("+"), "add"); //OK?
			aTable.set(InterpretedSymbol.of("-"), "subtract"); //OK?
			aTable.set(InterpretedSymbol.of("*"), "multiply"); //OK?
			aTable.set(InterpretedSymbol.of("/"), "divide"); //OK?
            aTable.set(InterpretedSymbol.of("="), "eq_"); //OK?
            aTable.set(InterpretedSymbol.of("=="), "equal_"); //OK?
			aTable.set(InterpretedSymbol.of("<"), "lessThan"); //OK?
			aTable.set(InterpretedSymbol.of("<="), "lessThanOrEqual"); //OK?
			aTable.set(InterpretedSymbol.of(">"), "greaterThan"); //OK?
			aTable.set(InterpretedSymbol.of(">="), "greaterThanOrEqual"); //OK?
            
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
        // Todo:実装不十分
    }

    /**
     * 引数がStringかどうかを判別し、応答するメソッド。
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    string_(args)
    {
        if(Cons.isString(args.car)){ return InterpretedSymbol.of('t'); }
        return Cons.nil;
    }

    /**
     * 引数の値の差を応答するメソッド
     * @param {Cons} args 引数
     * @return {Number} 計算結果
     */
    subtract(args)
    {
        if(Cons.isNumber(args.car)) { return this.subtract_Number(args.car, args.cdr); }
        else { console.log('Can not apply \"subtract\" to \"' + args.car + '\"'); }

        return Cons.nil;
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
            else { console.log('Can not apply \"subtract\" to \"' + each + '\"'); return Cons.nil; }
            aCons = aCons.cdr;
        }

        return result;
    }

    /**
     * 引数がInterpretedSymbolかどうかを判別し、応答するメソッド。
     * @param {Cons} args 引数
     * @return {*} 評価値
     */
    symbol_(args)
    {
        if (Cons.isSymbol(args.car)) { return InterpretedSymbol.of('t'); }
        return Cons.nil;
    }

    /**
     * ユーザ定義関数を実行し、結果を応答するメソッド
     * @param {InterpretedSymbol} procedure 関数名、又はオペレータ
     * @param {Cons} args 引数
     * @return {*} 計算結果
     */
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

        return answer;
    }
}
