// #!/usr/bin/env node

"use strict";

// モジュール「Cons」を読み込む。
import { Cons } from './Cons.js';

// モジュール「IntStream」を読み込む。
import { IntStream } from './IntStream.js';

// モジュール「NextState」を読み込む。
import { NextState } from './NextState.js';

//
const PEEKCOUNT = 10;

/**
 * @class
 * @classdesc パース（構文解析）を行うクラス
 * @author Keisuke Ikeda
 * @this {Parser}
 */
export class Parser extends Object
{
    /**
     * コンストラクタメソッド
     * @constructor
     * @param {String} aString 解析する文字列
     * @return {Parser} 自身
     */
    constructor(aString)
    {
        super();
        this.stream = aString[Symbol.iterator]();
        this.token
        this.tokenString = new String();
        this.states = new Map();
        this.state = 0;
        this.initializeStateTransitionTable();
        this.nexts = Array(PEEKCOUNT + 1);
        let count = 0;
        while (count++ < PEEKCOUNT){ this.nextChar(); }
        
        return this;
    }

    /**
     * 最後の要素かどうかを判別し、応答するメソッド
     * @return {Boolean} 真偽値
     */
    atEnd()
    {
        return (this.peekChar() == null);
    }

    /**
     * 文字を連結するメソッド
     * @return {Null} 何も返さない 
     */
    concatCharacter()
    {
        this.tokenString = this.tokenString.concat(String(this.nexts[0]));
        return null;
    }

    /**
     * エラーを検知し、応答するメソッド
     * @param {String} aString エラー内容
     * @return 
     */
    fatal(aString)
    {
        // Todo:エラー処理
        console.log(aString);
    }

    /**
     * 引数の1文字を入力とし、解析を始めるメソッド
     * @param {*} aCharacter 解析する1文字
     * @return {Null} 何も返さない 
     */
    async input(aCharacter = (() => {
        let aCharacter = this.nextChar();
        return (aCharacter != null) ? aCharacter : null;
    })())
    {
        let inputs = new Map();
        inputs = await this.states.get(Number(this.state));
        console.log("======================")
        console.log(inputs.get("0"))

        // let inputs = new Map();
        // inputs = await (() =>
        // {
        //     inputs = this.states.get(Number(this.state));
        //     return new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve(inputs);
        //         }, 0);
        //     })
        // })();

        let aNumber = new Number();
        aNumber = (String(aCharacter.charCodeAt(0))) ? inputs.get(String(aCharacter.charCodeAt(0))).next(this) : inputs.get(String(128)).next(this);
        console.log('ddd:' + aNumber)

        // let aNumber = new Number();
        // aNumber = await ((inputs) =>
        // {
        //     aNumber = (String(aCharacter.charCodeAt(0))) ? inputs.get(String(aCharacter.charCodeAt(0))).next(this) : inputs.get(String(128)).next(this);
        //     return new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve(aNumber);
        //         }, 0);
        //     })
        // })(inputs);

        if(aNumber < 0){ this.fatal("Syntax Error!11"); }
        this.state = aNumber;

        return null;
    }

    /**
     * 
     */
    nextChar()
    {
        let aCharacter = null;
        try
        {   
            let aNumber = (() => {
                let value = this.stream.next().value;
                return (value != null) ? value.charCodeAt() : -1;
            })()
            if(aNumber >= 0){ aCharacter = String.fromCodePoint(aNumber); }
        }
        catch(e){ this.fatal("Read Error!"); }
        // Todo:エラー処理
        let count = 0;
        while(count < PEEKCOUNT)
        {
            this.nexts[count] = this.nexts[count + 1];
            count++;
        }
        this.nexts[count] = aCharacter;

        return this.nexts[0];
    }

    /**
     * 次のトークンを確認し、応答するメソッド
     * @return {} トークン
     */
    nextToken()
    {
        this.token = null;

        while(this.atEnd() == false)
        {
            if((this.state == 0) && (this.token != null)){ break; }
            this.input();
        }
        if(this.atEnd())
        {
            if(this.state != 0){ this.fatal("Syntax Error!22"); }
        }
        this.tokenString = "";
        console.log('aaa:' + this.token)

        return this.token;
    }

    /**
     * 次の状態を保持するクラス「NextState」をインスタンス化し、応答するメソッド
     * @return {NextState} 次の状態
     */
    nextState(aNumber, aString)
    {
        return new NextState(aNumber, aString);
    }

    /**
     * 引数をパース（構文解析）し、応答するメソッド
     * @param {String} aString
     * @return {*}  
     */
    static parse(aString)
    {
        return new Parser(aString).nextToken();
    }

    /**
     * 次の文字が存在するかどうかを判断し、次の文字を応答するメソッド
     * @return {String} 次の文字
     */
    peekChar(aNumber = 1)
    {
        if(aNumber > this.nexts.length){ this.fatal("Read Error!") }
        return this.nexts[aNumber];
    }

    concat()
    {
        this.concatCharacter();
        return null;
    }

    doubleToken()
    {
        this.concat();
        if(this.rightParen())
        {
            this.tokenToDouble();
            return 0;
        }

        return 3;
    }

    doubleTokenAUX()
    {
        this.concat();
        if(this.rightParen())
        {
            this.tokenToDouble();
            return 0;
        }

        return 5;
    }

    integerToken()
    {
        this.concat();
        if(this.rightParen())
        {
            this.tokenToInteger();
            return 0;
        }

        return 2;
    }

    parseList()
    {
        this.skippingSpaces();
        if(this.rightParen())
        {
            this.nextChar();
            this.token = "nil";
        }
        else{ this.token  = this.parseListAUX(); }

        return 0;
    }

    parseListAux()
    {
        this.skippingSpaces();
        if (this.peekChar() == '#' || this.peekChar() == '%')
        {
            while (this.peekChar() != '\n') { this.nextChar(); }
            this.nextChar();
            this.skippingSpaces();
        }
        if (this.rightParen())
        {
            this.nextChar();
            return 'nil';
        }
        else if (this.peekChar() == '.')
        {
            this.nextChar();
            this.state = 0;
            let cdr = this.nextToken();
            this.skippingSpaces();
            if (this.rightParen() == false) { this.fatal("Syntax Error!"); }
            this.nextChar();
            return cdr;
        }
        else
        {
            this.state = 0;
            return new Cons(this.nextToken(), this.parseListAUX());
        }
    }

    quote()
    {
        let anObject = new Cons(this.nextToken(), 'nil');
        this.token = new Cons(Symbol.of("quote"), anObject);
        return Number(0);
    }

    quoteOrChar()
    {
        let aNumber = (this.peekChar() == '\\') ? 3 : 2;
        if (this.peekChar(aNumber) == '\'') { aNumber = 11; }
        else { aNumber = (this.quote()).intValue(); }
        return aNumber;
    }

    rightParen()
    {
        return (this.peekChar() == ')' || this.peekChar() == ']' || this.peekChar() == '}');
    }

    sign()
    {
        this.concat();
        if(this.rightParen())
        {
            this.tokenToInteger();
            return 0;
        }

        return 7;
    }

    skippingSpaces()
    {
        while(this.nexts[1] == String(9) || this.nexts[1] == String(10) || this.nexts[1] == String(11) || this.nexts[1] == String(12) || this.nexts[1] == String(13) || this.nexts[1] == String(32))
        {
            this.nextChar();
        }

        return null;
    }

    symbolToken()
    {
        this.concat();
        if(this.rightParen())
        {
            this.tokenToInteger();
            return 0;
        }

        return 8;
    }

    tokenToCharacter()
    {
        this.token = String(this.tokenString[0]);
        return;
    }

    tokenToDouble()
    {
        this.token = Number(this.tokenString);
        return;
    }

    tokenToDoubleAUX()
    {
        this.concat();
        this.token = Number(this.tokenString);
        return;
    }

    tokenToInteger()
    {
        let aCharacter = this.tokenString[0];
        if(aCharacter == '+'){ this.tokenString = this.tokenString.substring(1, this.tokenString.length); }
        this.token = Number(this.tokenString);
        console.log('bbb:' + this.token)
        return null;
    }

    tokenToString()
    {
        this.token = this.tokenString;
        return;
    }

    tokenToSymbol()
    {
        this.token = Symbol(this.tokenString);
        if (this.token ==  Symbol("nil")) { this.token = "nil"; }
        return;
    }

    /**
     * 文字コードと対応するメソッド（トークン）の対応表を生成するメソッド
     * @return {Null} 何も返さない。
     */
    initializeStateTransitionTable()
    {
        let aTable = new Map();
        IntStream.rangeClosed(0, 8).forEach(index => aTable.set(String(index), this.nextState(-1, null)) );
        IntStream.rangeClosed(9, 13).forEach(index => aTable.set(String(index), this.nextState(0, null)));
        IntStream.rangeClosed(14, 31).forEach(index => aTable.set(String(index), this.nextState(-1, null)));
        aTable.set(String(32), this.nextState(0, null));
        aTable.set(String(33), this.nextState(8, "symbolToken"));
        aTable.set(String(34), this.nextState(9, null));
        aTable.set(String(35), this.nextState(1, null));
        aTable.set(String(36), this.nextState(8, "symbolToken"));
        aTable.set(String(37), this.nextState(1, null));
        aTable.set(String(38), this.nextState(8, "symbolToken"));
        aTable.set(String(39), this.nextState(-1, "quoteOrChar"));
        aTable.set(String(40), this.nextState(-1, "parseList"));
        aTable.set(String(41), this.nextState(-1, null));
        aTable.set(String(42), this.nextState(8, "symbolToken"));
        aTable.set(String(43), this.nextState(7, "sign"));
        aTable.set(String(44), this.nextState(8, "symbolToken"));
        aTable.set(String(45), this.nextState(7, "sign"));
        aTable.set(String(46), this.nextState(-1, null));
        aTable.set(String(47), this.nextState(8, "symbolToken"));
        IntStream.rangeClosed(48, 57).forEach(index => aTable.set(String(index), this.nextState(2, "integerToken")));
        IntStream.rangeClosed(58, 90).forEach(index => aTable.set(String(index), this.nextState(8, "symbolToken")));
        aTable.set(String(91), this.nextState(-1, "parseList"));
        aTable.set(String(92), this.nextState(-1, null));
        aTable.set(String(93), this.nextState(-1, null));
        aTable.set(String(94), this.nextState(8, "symbolToken"));
        aTable.set(String(95), this.nextState(8, "symbolToken"));
        aTable.set(String(96), this.nextState(0, "quote"));
        IntStream.rangeClosed(97, 122).forEach(index => aTable.set(String(index), this.nextState(8, "symbolToken")));
        aTable.set(String(123), this.nextState(-1, "parseList"));
        aTable.set(String(124), this.nextState(8, "symbolToken"));
        aTable.set(String(125), this.nextState(-1, null));
        aTable.set(String(126), this.nextState(8, "symbolToken"));
        aTable.set(String(127), this.nextState(-1, null));
        aTable.set(String(128), this.nextState(-1, null));
        this.states.set(Number(0), aTable);

        aTable = new Map();
        IntStream.rangeClosed(0, 8).forEach(index => aTable.set(String(index), this.nextState(-1, null)));
        aTable.set(String(10), this.nextState(0, null));
        aTable.set(String(13), this.nextState(0, null));
        IntStream.rangeClosed(14, 31).forEach(index => aTable.set(String(index), this.nextState(-1, null)));
        aTable.set(String(127), this.nextState(-1, null));
        aTable.set(String(128), this.nextState(1, null));
        this.states.set(Number(1), aTable);

        aTable = new Map();
        IntStream.rangeClosed(9, 13).forEach(index => aTable.set(String(index), this.nextState(0, "tokenToInteger")));
        aTable.set(String(32), this.nextState(0, "tokenToInteger"));
        aTable.set(String(46), this.nextState(3, "doubleToken"));
        IntStream.rangeClosed(48, 57).forEach(index => aTable.set(String(index), this.nextState(2, "integerToken")));
        aTable.set(String(69), this.nextState(4, "concat"));
        aTable.set(String(101), this.nextState(4, "concat"));
        aTable.set(String(128), this.nextState(-1, null));
        this.states.set(Number(2), aTable);

        aTable = new Map();
        IntStream.rangeClosed(9, 13).forEach(index => aTable.set(String(index), this.nextState(0, "tokenToDouble")));
        aTable.set(String(32), this.nextState(0, "tokenToDouble"));
        IntStream.rangeClosed(48, 57).forEach(index => aTable.set(String(index), this.nextState(3, "doubleToken")));
        aTable.set(String(68), this.nextState(0, "tokenToDoubleAUX"));
        aTable.set(String(69), this.nextState(4, "concat"));
        aTable.set(String(100), this.nextState(0, "tokenToDoubleAUX"));
        aTable.set(String(101), this.nextState(4, "concat"));
        aTable.set(String(128), this.nextState(-1, null));
        this.states.set(Number(3), aTable);

        aTable = new Map();
        aTable.set(String(43), this.nextState(6, "concat"));
        aTable.set(String(45), this.nextState(6, "concat"));
        IntStream.rangeClosed(48, 57).forEach(index => aTable.set(String(index), this.nextState(5, "doubleTokenAUX")));
        aTable.set(String(128), this.nextState(-1, null));
        this.states.set(Number(4), aTable);

        aTable = new Map();
        IntStream.rangeClosed(9, 13).forEach(index => aTable.set(String(index), this.nextState(0, "tokenToDouble")));
        aTable.set(String(32), this.nextState(0, "tokenToDouble"));
        IntStream.rangeClosed(48, 57).forEach(index => aTable.set(String(index), this.nextState(5, "doubleTokenAUX")));
        aTable.set(String(128), this.nextState(-1, null));
        this.states.set(Number(5), aTable);

        aTable = new Map();
        IntStream.rangeClosed(48, 57).forEach(index => aTable.set(String(index), this.nextState(5, "doubleTokenAUX")));
        aTable.set(String(128), this.nextState(-1, null));
        this.states.set(Number(6), aTable);

        aTable = new Map();
        IntStream.rangeClosed(9, 13).forEach(index => aTable.set(String(index), this.nextState(0, "tokenToSymbol")));
        aTable.set(String(32), this.nextState(0, "tokenToSymbol"));
        aTable.set(String(33), this.nextState(8, "symbolToken"));
        IntStream.rangeClosed(35, 38).forEach(index => aTable.set(String(index), this.nextState(8, "symbolToken")));
        IntStream.rangeClosed(42, 45).forEach(index => aTable.set(String(index), this.nextState(8, "symbolToken")));
        aTable.set(String(47), this.nextState(8, "symbolToken"));
        IntStream.rangeClosed(48, 57).forEach(index => aTable.set(String(index), this.nextState(2, "integerToken")));
        IntStream.rangeClosed(58, 90).forEach(index => aTable.set(String(index), this.nextState(8, "symbolToken")));
        aTable.set(String(94), this.nextState(8, "symbolToken"));
        aTable.set(String(95), this.nextState(8, "symbolToken"));
        IntStream.rangeClosed(97, 122).forEach(index => aTable.set(String(index), this.nextState(8, "symbolToken")));
        aTable.set(String(124), this.nextState(8, "symbolToken"));
        aTable.set(String(126), this.nextState(8, "symbolToken"));
        aTable.set(String(128), this.nextState(-1, null));
        this.states.set(Number(7), aTable);

        aTable = new Map();
        IntStream.rangeClosed(9, 13).forEach(index => aTable.set(String(index), this.nextState(0, "tokenToSymbol")));
        aTable.set(String(32), this.nextState(0, "tokenToSymbol"));
        aTable.set(String(33), this.nextState(8, "symbolToken"));
        IntStream.rangeClosed(35, 38).forEach(index => aTable.set(String(index), this.nextState(8, "symbolToken")));
        IntStream.rangeClosed(42, 45).forEach(index => aTable.set(String(index), this.nextState(8, "symbolToken")));
        aTable.set(String(47), this.nextState(8, "symbolToken"));
        IntStream.rangeClosed(48, 57).forEach(index => aTable.set(String(index), this.nextState(8, "symbolToken")));
        IntStream.rangeClosed(58, 90).forEach(index => aTable.set(String(index), this.nextState(8, "symbolToken")));
        aTable.set(String(94), this.nextState(8, "symbolToken"));
        aTable.set(String(95), this.nextState(8, "symbolToken"));
        IntStream.rangeClosed(97, 122).forEach(index => aTable.set(String(index), this.nextState(8, "symbolToken")));
        aTable.set(String(124), this.nextState(8, "symbolToken"));
        aTable.set(String(126), this.nextState(8, "symbolToken"));
        aTable.set(String(128), this.nextState(-1, null));
        this.states.set(Number(8), aTable);

        aTable = new Map();
        IntStream.rangeClosed(0, 31).forEach(index => aTable.set(String(index), this.nextState(-1, null)));
        aTable.set(String(34), this.nextState(0, "tokenToString"));
        aTable.set(String(92), this.nextState(10, null));
        aTable.set(String(127), this.nextState(-1, null));
        aTable.set(String(128), this.nextState(9, "concat"));
        this.states.set(Number(9), aTable);

        aTable = new Map();
        IntStream.rangeClosed(0, 31).forEach(index => aTable.set(String(index), this.nextState(-1, null)));
        aTable.set(String(127), this.nextState(-1, null));
        aTable.set(String(128), this.nextState(9, "concat"));
        this.states.set(Number(10), aTable);

        aTable = new Map();
        IntStream.rangeClosed(32, 38).forEach(index => aTable.set(String(index), this.nextState(12, "concat")));
        IntStream.rangeClosed(40, 91).forEach(index => aTable.set(String(index), this.nextState(12, "concat")));
        aTable.set(String(92), this.nextState(13, null));
        IntStream.rangeClosed(93, 126).forEach(index => aTable.set(String(index), this.nextState(12, "concat")));
        aTable.set(String(128), this.nextState(-1, null));
        this.states.set(Number(11), aTable);

        aTable = new Map();
        aTable.set(String(39), this.nextState(0, "tokenToCharacter"));
        aTable.set(String(128), this.nextState(-1, null));
        this.states.set(Number(12), aTable);

        aTable = new Map();
        IntStream.rangeClosed(32, 38).forEach(index => aTable.set(String(index), this.nextState(12, "concat")));
        IntStream.rangeClosed(40, 126).forEach(index => aTable.set(String(index), this.nextState(12, "concat")));
        aTable.set(String(128), this.nextState(-1, null));
        this.states.set(Number(13), aTable);

        return null;
    }
}
