// #!/usr/bin/env node

'use strict';

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
 * @classdesc イーバル（評価）を行うクラス
 * @author Keisuke Ikeda
 * @this {Evaluator}
 */
export class Evaluator extends Object
{
    static buildInFunctions = Evaluator.setup();

    /**
     * コンストラクタメソッド
     * 関数の連想リストを用意する。
     * @constructor
     * @return {Null} 何も返さない。
     */
    constructor(aTable, aStreamManager, aNumber)
    {
        super();
        this.environment = aTable;
        this.streamManager = aStreamManager;
        this.depth = aNumber;

        return this;
    }
    
    static eval(form, environment, aStreamManager = new StreamManager(), depth = 1)
    {
        if(Cons.isSymbol(form)){ return this.evaluateSymbol(form); }
        if(Cons.isNil(form) || Cons.isAtom(form)){ return form; }
        if(Cons.isSymbol(form.car) &&  Evaluator.buildInFunctions.has()){ return this.specialForm(form); }
    }
    
}
