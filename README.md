# JSLisp
（修正：2020/11/5 作成:2020/11/5）

## Status
Creation Period：2020.7~　
Version： -

## About program
京都産業大学コンピュータ理工学部の「コンピュータ理工学特別研究ⅡＡ・ⅡＢ」 の卒業研究で開発しているものです。
JavaScriptを用いてLisp処理系を実装したものです。2020年11月5日現在、未完成状態です。

## Execution environment
### OS
```
$ sw_vers
ProductName:	Mac OS X
ProductVersion:	10.15.7
BuildVersion:	19H2
```

### NVM
```
$ nvm --version
0.35.3
```

### Node.js
```
$ node --version
v12.18.3
```

以上のバージョンが合っていれば、以下のソフトウェアは環境構築時に自動でインストールされるはずです。
### Node module
```
webpack : 4.44.2
webpack-cli : 3.3.12
babel-loader : 8.1.0
@babel/core : 7.12.3
@babel/plugin-proposal-class-properties : 7.12.1
@babel/preset-env : 7.12.1
ramda : 0.27.1
readline : 1.3.0
eslint : 7.12.1
jsdoc : 3.6.6
```

## Quick　start
### Install
```
$ git clone https://github.com/ike-keichan/JSLisp.git
```

### Setup & Launch
```
$ cd ./JSLisp
$ make test
```

### Example
+ input
```
>> (+ 1 2)
```

+ output
```
(+ . (1 . (2 . nil)))
```

+ input
```
>> 1
```

+ output
```
1
```

+ input
```
>> a
```

+ output
```
[String: 'a']
```

---

### Clean
```
$ make clean
```

### Wipe
```
$ make wipe
```

### Lint
```
$ make lint
```

### JSDoc
```
$ make doc
```


