// #!/usr/bin/env node

"use strict";

//モジュール「Parser」を読み込む。
import { Parser } from './Parser.js';

/**
 * @class
 * @classdesc インタプリタのクラス
 * @author Keisuke Ikeda
 * @this {LispInterpreter}
 */
export class LispInterpreter extends Object
{
    /**
	 * コンストラクタメソッド
     * @constructor
     * @return {Null} 何も返さない。
	 */
    constructor()
	{
        super();
        this.root = new Table();
        //入力を保持しておく配列
        this.inputBuffer = new Array();
        //レフトパーレンシスの数
        this.leftParentheses = 0;

        this.rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: ">> "
        });

        return null;
    }

    /**
     * インタプリタの起動メソッド
     * @return {Null} 何も返さない。
     */
    run()
    {
        this.rl.prompt();
        this.rl.on('line', (line) => {
            //入力列を別の変数に格納しておく。
            let copyLine = line;

            //入力列からパーレンシスの有無を確認する。
            copyLine.split('').forEach( (aCharacter) => {
                if(aCharacter == '(') { this.leftParentheses++ }
                if(aCharacter == ')') { this.leftParentheses-- }
            })

            if( this.leftParentheses > 0){ this.inputBuffer.push(line); }
            if( this.leftParentheses <= 0)
            {
                this.inputBuffer.push(line);
                let input = this.inputBuffer.join('');
                // console.log(input); //デバック用
                let aParser = new Parser(input);
                aParser.parse();
                this.inputBuffer = new Array();
                this.rl.prompt();
            }            
        }).on('close', () => {
            console.log('\nBye!');
            process.exit(0);
        });

        return null;
    }

    eval()
    {

    }

    parse(input)
    {
        let aCons = null;

        try
        {
            aCons = Cons.parse();
        }
        catch (e){ console.log() }
    }

    setRoot()
    {

    }

    streamManager()
    {

    }
}
