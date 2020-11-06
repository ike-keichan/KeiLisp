# JSLisp
（修正：2020/11/6 作成:2020/11/5）

## Status
Creation Period：2020.7~　
Version： -

## About program
I am developing it as a graduation research project of "Special Research on Computer Science and Engineering IIA/IIB" in Department of Computer Science and Engineering, Kyoto Sangyo University. 

It is under development as of November 5, 2020.
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

If the OS and Node.js versions match, the following software will be installed automatically when you build your environment.
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

## Quick start
### Install
```
$ git clone https://github.com/ike-keichan/JSLisp.git
```

### Build & Launch
```
$ cd ./JSLisp
$ make test
```

### Example
#### example1
```
>> 1
1

>> -1.2
-1.2

>> a
a

>> nil
nil
```

#### example2
```
>> ()
nil

>> (+ 1 2)
(+ 1 2)

>> (+ 1 2.3)
(+ 1 2.3)

>> (+ 1.2 3)
(+ 1.2 3)

>> (+ 1.2 -3.4)
(+ 1.2 -3.4)

>> (+ 1.2 3)
(+ 1.2 3)

>> (+ 1 nil)
(+ 1 NaN)     //this is Bug!!

>> (+ nil 1)
(+ nil 1)

>> (+ 1.2 nil)
(+ 1.2 NaN)   //this is Bug!!

>> (+ nil 1.2)
(+ nil 1.2)

```

#### example3
```
>> '(1 . 2)
(quote (1 2))

>> '(1 . 2.3)
(quote (1 . 2.3))

>> '(1.2 . 3)
(quote (1.2 . 3))

>> '(1.2 . 3.4)
(quote (1.2 . 3.4))

>> '(1 . nil)
(quote (1 . NaN))  //this is Bug!!

>> '(nil . 1)
(quote (nil . 1))

>> '(1.2 nil)
(quote (1.2 NaN))   //this is Bug!!

>> '(nil 1.2)
(quote (nil 1.2))
```

#### example4
```
>> (1 (2 (3 (4 5) 6) 7 (8 9)))
(1 (2 (3 (4 5) 6) 7 (8 9)))

>> (+ (- (* 1 2) (* 3 4)) (- (* 5 6) (* 7 8)))
(+ (- (* 1 2) (* 3 4)) (- (* 5 6) (* 7 8)))

>> (+
     1
  2
      )(+ (- (* 1 2) (* 3 4)) (- (* 5 6) (* 7 8)))(
   -
   4
3

)
(+ 1 2)
(+ (- (* 1 2) (* 3 4)) (- (* 5 6) (* 7 8)))
(- 4 3)
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


