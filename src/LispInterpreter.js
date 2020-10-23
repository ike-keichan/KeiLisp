// #!/usr/bin/env node

"use strict";

//モジュール「Table」を読み込む。
import { Cons } from './Cons.js';

//モジュール「Table」を読み込む。
import { Table } from './Table.js';

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
     * @return {LispInterpreter} 自身
	 */
    constructor()
	{
        super();

        // このインスタンスの環境を保持する変数
        this.root = this.initializeTable();

        // 入力を保持する変数
        this.inputBuffer = new Array();

        // レフトパーレンシスの数
        this.leftParentheses = 0;

        // コマンドラインの入出力を管理する変数
        this.rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: ">> "
        });

        return this;
    }

    /**
     * インタプリタの起動メソッド
     * @return {Null} 何も返さない。
     */
    run()
    {
        let aString = new String(); //入力列を別の変数に格納しておく。

        this.rl.prompt(); // プロンプトの出力
        this.rl.on('line', (line) => { // コマンドラインの入力モードの処理と終了モードの処理
            line += ' '; // 行の最後に空白文字を加えておく。

            //入力列からパーレンシスの有無を確認する。
            for(let aCharacter of line)
            {
                if(aCharacter == '(') { this.leftParentheses++ }
                if(aCharacter == ')') { this.leftParentheses-- }
                if(this.leftParentheses > 0){ aString += aCharacter; }
                if(this.leftParentheses <= 0)
                {
                    aString += aCharacter;
                    this.inputBuffer.push(aString);
                    aString = new String();
                }
            }

            // パーレンシスがなくなったら値を評価し、プロンプトを出す。
            if(this.leftParentheses <= 0)
            {
                this.inputBuffer.pop(); // 入力バッファに最後に入った空白文字を省く
                this.inputBuffer.forEach(each => console.log(this.parse(each)) ); // 入力バッファの値をパースする。
                this.inputBuffer = new Array(); // 入力バッファを初期化する
                this.rl.prompt(); // プロンプトの出力
            }
        }).on('close', () => {
            console.log('\nBye!');
            process.exit(0);
        });

        return null;
    }

    /**
     * 環境の根を初期化するメソッド
     * @return {Table} 初期化した環境の根
     */
    initializeTable()
    {
        let aList = new Array();
        let aTable = new Table();
        aTable.setRoot(true);

        aList.push("+");
        aList.push("-");
        aList.push("*");
        aList.push("/");
        aList.push("<");
        aList.push("<=");
        aList.push(">");
        aList.push(">=");
        aList.push("=");
        aList.push("==");

        aList.forEach(each => {
            let aSymbol = Symbol(each);
            aTable.set(aSymbol, aSymbol)
        });

        return aTable;
    }

    // eval()
    // {

    // }

    parse(input)
    {
        let aCons = null;

        // try
        // {
            aCons = Cons.parse(input);
        // }
        // catch (e){
        //     // Todo: RuntimeException作る
        //     console.log('RuntimeException');
        //     aCons = 'nil';
        // }

        return aCons.toString();
    }

    /**
	 * 指定された環境を環境の根として設定する.
	 * @param {Table} environment
     * @return {Null} 何も返さない。
	 */
    setRoot(environment)
    {
        if(environment instanceof Table)
        {
            environment.setRoot(true);
            this.root = environment;
        }

        return null;
    }

    // streamManager()
    // {

    // }
}
