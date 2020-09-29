// #!/usr/bin/env node

"use strict";

//モジュール「Parser」を読み込む。
import {Parser} from './Parser.js';

/**
 * @class
 * @classdesc インタプリタのクラス
 * @author Keisuke Ikeda
 * @this {LispInterpreter}
 */
export class LispInterpreter
{
    /**
	 * コンストラクタメソッド
     * @constructor
     * @return {Null} 何も返さない。
	 */
    constructor()
	{
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
            let aParser = new Parser(line);
            aParser.parse();
            // console.log(line); //デバック用
            this.rl.prompt();
        }).on('close', () => {
            console.log('\nBye!');
            process.exit(0);
        });

        return null;
    }
}
