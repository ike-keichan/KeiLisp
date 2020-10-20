// #!/usr/bin/env node

"use strict";

//モジュール「Loop」を読み込む。
import { Loop } from './Loop';

//モジュール「Parser」を読み込む。
import { Parser } from './Parser';

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
     * Consの最後に指定された要素を加える
     * @param {*} anObject 加えるオブジェクト
     * @return {Cons} 要素を加えたCons
     */
    add(anObject)
    {
        let aCons = new Cons(anObject, 'nil');
        return this.nconc(aCons);
    }

    clone()
    {

    }

    static cloneValue()
    {

    }

    equals()
    {

    }

    equalsAUX()
    {

    }

    hashCode()
    {

    }

    /**
     * 引数がAtomかどうかを判別し、応答するメソッド
     * @param {*} anObject 判別するオブジェクト
     * @return {Boolean} 真偽値
     */
    static isAtom(anObject)
    {
        return !( Cons.isNil(anObject) || Cons.isCons(anObject) );
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
        return (anObject instanceof Symbol);
    }

    static isTable()
    {

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
        this.last().setCdr(aCons);
        return this;
    }

    /**
	 * Consのn番目の要素を応答するメソッド
	 * @param number
	 * @return anObject
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
     * @param {String} aString 
     */
    static parse(aString)
    {
        return Parser.parse(aString);
    }

    ppList()
    {

    }

    ppListTail()
    {

    }

    ppSpace()
    {

    }

    ppString()
    {

    }

    /**
     * carを設定するセッターメソッド
     * @param {*} anObject car
     * @return {Null} 何も返さない。
     */
    setCar(anObject)
    {
        this.car = anObject;
        return null;
    }

    /**
     * cdrを設定するセッターメソッド
     * @param {*} anObject cdr
     * @return {Null} 何も返さない。
     */
    setCdr(anObject)
    {
        this.cdr = anObject;
        return null;
    }

   /**
     * Consを設定するセッターメソッド
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
