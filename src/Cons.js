// #!/usr/bin/env node

"use strict";

//モジュール「Parser」を読み込む。
import { Parser } from './Parser';

//モジュール「Loop」を読み込む。
import { Loop } from './Loop';

//モジュール「Table」を読み込む。
import { Table } from './Table';

/**
 * @class
 * @classdesc Consを模倣したクラス
 * @author Keisuke Ikeda
 * @this {Cons}
 */
export class Cons extends Object
{
    /**
     * コンストラクタメソッド
     * @constructor
     * @param {*} car car、引数なしでnilが参照される。
     * @param {*} cdr cdr、引数なしでnilが参照される。
     * @return {Cons} 自身
     */
    constructor(car = 'nil', cdr = 'nil')
    {
        super();
        this.car = car;
        this.cdr = cdr;

        return this;
    }

    /**
     * Consの最後に指定された要素を加えるメソッド
     * @param {*} anObject 加えるオブジェクト
     * @return {Cons} 要素を加えたCons
     */
    add(anObject)
    {
        let aCons = new Cons(anObject, 'nil');
        return this.nconc(aCons);
    }

    /**
     * 自身（Cons）を複製し、応答するメソッド
     * @return {Cons} 複製したCons
     */
    clone()
    {
        return new Cons(Cons.cloneValue(this.car), Cons.cloneValue(this.cdr));
    }

    /**
     * 引数の値(Consの要素)を複製し、応答するメソッド
     * @param {*} value Consの要素
     * @return {*} value 複製したConsの要素
     */
    static cloneValue(value)
    {
        if(Cons.isCons(value))  { return value.clone(); }
        if(Cons.isNil(value))   { return 'nil' }
        if(Cons.isNumber(value)){ return Number(value); }
        if(Cons.isString(value)){ return String(value); }
        if(Cons.isSymbol(value)){ return value; }
        if(Cons.isTable(value)) { return value; }
        return value;
    }

    /**
     * 自身と引数が等しいかをどうかを判別し、応答するメソッド
     * @param {*} anObject 判別するオブジェクト
     * @return {Boolean} 真偽値
     */
    equals(anObject)
    {
        if(Cons.isCons(anObject)){ return this.equalsAUX(this, anObject); }
        return false;
    }

    /**
     * 2つ引数がともにConsであり、等しいかをどうかを判別し、応答するメソッド
     * @param {*} left 判別するオブジェクト
     * @param {*} right 判別するオブジェクト
     * @return {Boolean} 真偽値
     */
    equalsAUX(left, right)
    {
        if(left == right){ return true; }
        if((Cons.isCons(left) && Cons.isCons(right)) == false){ return false; }
        let leftCons = left;
        let rightCons = right;
        if(this.equalsAUX(leftCons.car, rightCons.car)){ return this.equalsAUX(leftCons.cdr, rightCons.cdr); }

        return false;
    }

    /**
     * 引数がAtomかどうかを判別し、応答するメソッド
     * @param {*} anObject 判別するオブジェクト
     * @return {Boolean} 真偽値
     */
    static isAtom(anObject)
    {
        return !(Cons.isList(anObject));
    }

    /**
     * 引数がConsかどうかを判別し、応答するメソッド
     * @param {*} anObject 判別するオブジェクト
     * @return {Boolean} 真偽値
     */
    static isCons(anObject)
    {
        return (anObject != 'nil') && (anObject instanceof Cons);
    }

    /**
     * 引数がListかどうかを判別し、応答するメソッド
     * @param {*} anObject 判別するオブジェクト
     * @return {Boolean} 真偽値
     */
    static isList(anObject)
    {
        return Cons.isNil(anObject) || Cons.isCons(anObject);
    }

    /**
     * 引数がNilかどうかを判別し、応答するメソッド
     * @param {*} anObject 判別するオブジェクト
     * @return {Boolean} 真偽値
     */
    static isNil(anObject)
    {
        return anObject == 'nil';
    }

    /**
     * 引数がConsでないかどうかを判別し、応答するメソッド
     * @param {*} anObject 判別するオブジェクト
     * @return {Boolean} 真偽値
     */
    static isNotCons(anObject)
    {
        return !(Cons.isCons(anObject));
    }

    /**
     * 引数がNilでないかどうかを判別し、応答するメソッド
     * @param {*} anObject 判別するオブジェクト
     * @return {Boolean} 真偽値
     */
    static isNotNil(anObject)
    {
        return !(Cons.isNil(anObject));
    }

    /**
     * 引数が数字かどうかを判別し、応答するメソッド
     * @param {*} anObject 判別するオブジェクト
     * @return {Boolean} 真偽値
     */
    static isNumber(anObject)
    {
        return (anObject instanceof Number || (typeof anObject) == "number");
    }

    /**
     * 引数が文字列かどうかを判別し、応答するメソッド
     * @param {*} anObject 判別するオブジェクト
     * @return {Boolean} 真偽値
     */
    static isString(anObject)
    {
        return (anObject instanceof String || (typeof anObject) == "string");
    }

    /**
     * 引数がシンボルかどうかを判別し、応答するメソッド
     * @param {*} anObject 判別するオブジェクト
     * @return {Boolean} 真偽値
     */
    static isSymbol(anObject)
    {
        return anObject instanceof Symbol;
    }

    /**
     * 引数が環境かどうかを判別し、応答するメソッド
     * @param {*} anObject 判別するオブジェクト
     * @return {Boolean} 真偽値
     */
    static isTable(anObject)
    {
        return anObject instanceof Table;
    }

    /**
     * Consの最後のセルを応答するメソッド
     * @return {Cons} 自身の最後のセル
     */
    last()
    {
        let aCons = new Cons('nil', this);
        let anotherCons = this;

        while(Cons.isCons(anotherCons))
        {
            if( (Cons.isCons(anotherCons.cdr)) == false ){ break; }
            aCons = aCons.cdr;
            anotherCons = anotherCons.cdr;
        }

        return anotherCons;
    }

    /**
	 * Consのイテレータを応答するメソッド
	 * @return {Loop} Consのイテレータ
	 */
    loop()
    {
        return new Loop(this);
    }

    /**
     * 自身の長さ（深さ）を応答するメソッド
     * @return {Number} 自身の長さ（深さ）
     */
    length()
    {
        let count = 0;
        let aCons = this;

        while(Cons.isCons(aCons))
        {
            count++;
            aCons = aCons.cdr;
        }

        return count;
    }

    /**
     * Consを結合するし、自身を応答するメソッド
     * @param {Cons} aCons 結合するCons
     * @return {Cons} 自身
     */
    nconc(aCons)
    {
        this.last().cdr(aCons);
        return this;
    }

    /**
	 * Consのn番目の要素を応答するメソッド
	 * @param aNumber 指定する番号
	 * @return anObject 指定した番号の要素
	 */
    nth(aNumber)
    {
        if(aNumber <= 0){ return 'nil' }
        let count = 1;
        let aCons = this;
        while (Cons.isCons(aCons))
        {
            if(count >= aNumber){ return aCons.car; }
            count++;
            aCons = aCons.cdr;
        }

    }

    /**
     * 指定された文字列を字句解析してConsを生成し、応答するメソッド
     * @param {String} aString 字句解析する文字列
     * @return {}
     */
    static parse(aString)
    {
        let aParser = new Parser(aString);
        return aParser.parse();
    }

    /**
     * carを設定するメソッド
     * @param {*} anObject car
     * @return {Null} 何も返さない。
     */
    setCar(anObject)
    {
        this.car = anObject;
        return null;
    }

    /**
     * cdrを設定するメソッド
     * @param {*} anObject cdr
     * @return {Null} 何も返さない。
     */
    setCdr(anObject)
    {
        this.cdr = anObject;
        return null;
    }

   /**
     * Consを設定するメソッド
     * @param {*} car car
     * @param {*} cdr cdr
     * @return {Cons} 自身
     */
    setCons(car, cdr)
    {
        this.car = car;
        this.cdr = cdr;
        return this;
    }

    /**
     * 自身を整形し、文字列として返すメソッド
     * @return {String} 自身を整形した文字列を返す。
     */
    toString()
    {
        return String('(' + this.car + ' . ' + this.cdr + ')');
    }
}
