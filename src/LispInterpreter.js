// #!/usr/bin/env node

'use strict';

// モジュール「Cons」を読み込む。
import { Cons } from './Cons.js';

// モジュール「Evaluator」を読み込む。
import { Evaluator } from './Evaluator.js';

//モジュール「InterpretedSymbol」を読み込む。
import { InterpretedSymbol } from './InterpretedSymbol';

// モジュール「StreamManager」を読み込む。
import { StreamManager } from './StreamManager.js';

// モジュール「Table」を読み込む。
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
        // ストリームを管理する変数
        this.streamManager = new StreamManager();

        // コマンドラインの入出力を管理する変数
        this.rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '>> '
        });

        return this;
    }

    /**
     * インタプリタの起動メソッド
     * @return {Null} 何も返さない。
     */
    run()
    {
        // Cons
        let aCons = new Cons();
        // 入力列を格納する変数
        let aString = new String();
        // レフトパーレンシスの数
        let leftParentheses = 0;

        this.rl.prompt(); // プロンプトの出力
        this.rl.on('line', (line) => { // コマンドラインの入力モードの処理と終了モードの処理
            line += '\n'; // 行の最後に空白文字を加えておく。

            for(let aCharacter of line)
            {
                if(aCharacter == '(') { leftParentheses++ }
                if(aCharacter == ')') { leftParentheses-- }
                aString += aCharacter;
            }

           if(leftParentheses <= 0)
           {
               aCons = this.parse(aString);
            //    for(let each of aCons.loop()){ console.log(each.toString()); }
               for(let each of aCons.loop()){ console.log(this.eval(each).toString()); }
               leftParentheses = 0;
               aString = new String();
               this.rl.prompt(); // プロンプトの出力
           }

        }).on('close', () => {
            console.log('\nBye!');
            process.exit(0);
        });

        return null;
    }

    /**
     * 引数のリストを評価し、評価値を応答するメソッド
     * @param {Cons} aCons 評価するリスト
     * @return {Object} 評価値
     */
    eval(aCons)
    {
        let anObject = Cons.nil;
        // try { anObject = Evaluator.eval(aCons, this.root, this.streamManager); }
        // catch (e) { anObject = Cons.nil; }

        anObject = Evaluator.eval(aCons, this.root, this.streamManager);

        return anObject;
    }

    /**
     * 引数の文字列をパースし、リストにして応答するメソッド
     * @param {String} aString パースする文字列
     * @return {Cons} パースしたリスト
     */
    parse(aString)
    {
        let aCons = null;

        try { aCons = Cons.parse('(' + aString + '\n);'); }
        catch (e)
        {
            console.log('*** can not parse ' + aString.replace( /\n/g , "" ) + ' ***')
            aCons = Cons.nil;
        }

        return aCons;
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

    /**
     * 環境のテーブルを初期化するメソッド
     * @return {Table} 初期化した環境のテーブル
     */
    initializeTable()
    {
        let aList = new Array();
        let aTable = new Table();
        aTable.setRoot(true);

        aList.push('abs');
        aList.push('add');
        aList.push('and');
        aList.push('apply');
        aList.push('assoc');
        aList.push('atom?');
        aList.push('bind');
        aList.push('car');
        aList.push('cdr');
        aList.push('character');
        aList.push('cond');
        aList.push('cons');
        aList.push('copy');
        aList.push('defun');
        aList.push('divide');
        aList.push('do');
        aList.push('do*');
        aList.push('dolist');
        aList.push('double?');
        aList.push('eq?');
        aList.push('equal?');
        aList.push('exit');
        aList.push('gc');
        aList.push('gentemp');
        aList.push('if');
        aList.push('integer?');
        aList.push('lamda');
        aList.push('let');
        aList.push('let*');
        aList.push('last');
        aList.push('list');
        aList.push('list?');
        aList.push('mapcar');
        aList.push('member');
        aList.push('mod');
        aList.push('multiply');
        aList.push('nospy');
        aList.push('not');
        aList.push('notrace');
        aList.push('nth');
        aList.push('null?');
        aList.push('nember?');
        aList.push('or');
        aList.push('pop!');
        aList.push('progn');
        aList.push('push!');
        aList.push('quote');
        aList.push('set!');
        aList.push('set-all!');
        aList.push('set-car!');
        aList.push('set-car-all!');
        aList.push('set-cdr!');
        aList.push('set-cdr-all!');
        aList.push('spy');
        aList.push('subtract');
        aList.push('string?');
        aList.push('symbol?');
        aList.push('time');
        aList.push('trace');
        aList.push('unless');
        aList.push('when');
        aList.push('+');
        aList.push('-');
        aList.push('*');
        aList.push('/');
        aList.push('=');
        // aList.push('==');
        aList.push('<');
        aList.push('<=');
        aList.push('>');
        aList.push('>=');

        aList.forEach(each => {
            let aSymbol = InterpretedSymbol.of(each);
            aTable.set(aSymbol, aSymbol)
        });

        let aString = new String();
        let aCons = new Cons();
        aString = "(lambda (list1 list2) (cond ((atom? list1) nil) ((atom? list2) nil) ((null? list1) list2) (t (cons (car list1) (append (cdr list1) list2)))))";
        aCons = Cons.parse(aString);
        aCons.last().setCdr(new Cons(aTable, Cons.nil));
        aTable.set(InterpretedSymbol.of('append'), aCons);

        aString = "(lambda (l n) (cond ((<= (length l) n) nil) (t (cons (car l) (butlast (cdr l) n)))))";
        aCons = Cons.parse(aString);
        aCons.last().setCdr(new Cons(aTable, Cons.nil));
		aTable.set(InterpretedSymbol.of('butlast'), aCons);

		aString = "(lambda (l) (cond ((atom? l) nil) ((null? l) 0)	(t (+ 1 (length (cdr l))))))";
        aCons = Cons.parse(aString);
        aCons.last().setCdr(new Cons(aTable, Cons.nil));
		aTable.set(InterpretedSymbol.of('length'), aCons);

		aString = "(lambda (n l) (cond ((> n (length l)) nil) ((= 0 n) l) (t (nthcdr (- n 1) (cdr l)))))";
        aCons = Cons.parse(aString);
        aCons.last().setCdr(new Cons(aTable, Cons.nil));
		aTable.set(InterpretedSymbol.of('nthcdr'), aCons);

		aString = "(lambda (l) (cond ((atom? l) l) ((null? l) '()) (t (append (reverse (cdr l)) (list (car l))))))";
        aCons = Cons.parse(aString);
        aCons.last().setCdr(new Cons(aTable, Cons.nil));
        aTable.set(InterpretedSymbol.of('reverse'), aCons);
        
        aTable.set(InterpretedSymbol.of('t'), InterpretedSymbol.of('t'));

        return aTable;
    }
}
