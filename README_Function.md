# JSLisp
（this document fix： 2020/11/29 create: 2020/11/27）

## Function
In this interpreter the following functions are defined.

+ [abs](#abs)
+ [add](#add)
+ [and](#and)
+ [apply](#apply)
+ [append](#append)
+ [assoc](#assoc)
+ [atom](#atom)
+ [bind](#bind)
+ [butlast](#butlast)
+ [car](#car)
+ [cdr](#cdr)
+ [characterp](#characterp)
+ [cond](#cond)
+ [cons](#cons)
+ [consp](#consp)
+ [copy](#copy)
+ [defun](#defun)
+ [divide](#divide)
+ [do](#do)
+ [do*](#do*)
+ [dolist](#dolist)
+ [doublep](#doublep)
+ [eq](#eq)
+ [equal](#equal)
+ [exit](#exit)
+ [gc](#gc)
+ [gensym](#gensym)
+ [if](#if)
+ [integerp](#integerp)
+ [lambda](#lambda)
+ [let](#let)
+ [let*](#let*)
+ [last](#last)
+ [length](#length)
+ [listp](#listp)
+ [mapcar](#mapcar)
+ [member](#member)
+ [mod](#mod)
+ [multipy](#multiply)
+ [not](#not)
+ [notrace](#notrace)
+ [nth](#nth)
+ [nthcdr](#nthcdr)
+ [null](#null)
+ [numberp](#numberp)
+ [pop]()
+ [progn]()
+ [push]()
+ [quote]()
+ [reverse]()
+ [setq]()
+ [set-allq]()
+ [set-carq]()
+ [set-cdrq]()
+ [subtract]()
+ [stringp]()
+ [symbolp]()
+ [time]()
+ [trace]()
+ [unless]()
+ [when]()
+ [+]()
+ [-]()
+ [*]()
+ [/]()
+ [=]()
+ [==]()
+ [<]()
+ [<=]()
+ [>]()
+ [>=]()

### abs
**(abs X)**
Function to answer the absolute value of X.

```
>> (abs -10.0)
10
```

### add
**(add X1 X2 ... Xn)**
Function to answer the sum of X1, X2 ... and Xn.

```
>> (add 1 2)
3
>> (add 12 -34 5.6 -7.8 90)
65.8
```
### and
**(and X1 X2 ... Xn)**
Function to answer the logical product of X.

```
>> (and t nil)
nil
>> (and (= 1 1) (= 1 1))
t
>> (and (= 1 1) (= 2 1))
nil
>> (and t (= 1 1))
t
>> (and nil (= 1 1))
nil

```

### append
**(append L1 L2)**
Functions to answer the combined list of L1 and L2.

```
>> (append '(a b c) '(d e f))
(a b c d e f)
```

### apply
**(apply X L)**
Function to answer the result of applying X to L.

```
>> (apply + '(1 2))
3
```

### assoc
**(assoc X L)**
Find the pairs with the key specified by X from the L association list

```
>> (assoc 'c  '((a . 10) (b . 20) (c . 30)))
(c . 30)
>> (setq a-list '((1 . abc) (2 . def) (3 . ghi)))
((1 . abc) (2 . def) (3 . ghi))
>> (assoc 2 a-list)
(2 . def)
```

### atom
**(atom X)**
Function to answer whether X is an Atom.

```
>> (atom '(1 2 3))
nil
>> (atom '())
nil
>> (atom 'a)
t
>> (atom "a")
t
>> (atom 1)
t
```

### bind
**(bind X)**
Functions to answer the number of values bound to the X Symbol.

```
>> (bind a)
nil
>> (setq a 10)
10
>> (bind a)
1
>> (let ((a 20))
        (bind a))
2
```

### butlast
**(butlast L X)**
Functions to answer the list with the X values removed from the end of L.

```
>> (butlast '(a b c d e f g) 3)
(a b c d)
```

### car
**(car L)**
Function to answer the value of the head from L.

```
>> (car '(a b c))
a
>> (car '(1 2 3))
1
```

### cdr
**(cdr L)**
Function to answer the value of the tail from L.

```
>> (cdr '(a b c))
(b c)
>> (cdr '(1 2 3))
(2 3)
```

### characterp
**(characterp X)**
Function to answer whether X is a Character.

```
>> (characterp '(1 2 3))
nil
>> (characterp '())
nil
>> (characterp 'a)
nil
>> (characterp 1)
nil
>> (characterp "a")
t
```

### cond
**(cond (X1 Y11 Y12 ... Y1n) ... (Xn Yn1 Yn2 ... Ynn))**
Function to answer Yn1, Yn2 ... and Ynn satisfy the Xn condition.

```
>> (cond (t 10) (nil 20))
10
>> (cond
        ((= 1 2) 10)
        ((= 1 3) 20)
     	((= 1 1) 30)
    )
30

```

### cons
**(cons X Y)**
Function to answer the X and Y pairs.

```
>> (cons 'a 'b)
(a . b)
>> (cons 'a '(b c))
(a b c)
>> (cons '(a b c) '(1 2 3))
((a b c) 1 2 3)
```

### consp
**(consp X)**
Function to answer whether X is a Cons.

```
>> (consp '(1 2 3))
t
>> (consp '())
nil
>> (consp 'a)
nil
>> (consp 1)
nil
>> (consp "a")
nil
```

### copy
**(copy L)**
Function to answer a copy of X.

```
>> (setq a 10)
10
>> (eq a (copy a))
t
>> (setq a '(a b))
(a b)
>> (eq a (copy a))
nil

```

### defun
**(defun A L X1 X2 ... Xn)**
Function defining function with A as the function name, L as the argument, and X1 X2 ... and Xn as the process.

```
>> (defun tasu (a b) (+ a b))
tasu
>> (tasu 1 2)
3
```

### divide
**(divide X1 X2 ... Xn)**
Function to answer the quotient of X1 divided by X2 ... and Xn.

```
>> (divide 10 5)
2
>> (divide 12 5 4)
0.6
```

### do
**(do L X1 X2 ... Xn)**

```
>> (do* ((ans 0)(a 0 (+ a 1)))
        ((= a 10) ans)
        (setq ans (+ ans a))
    )
45
```

### do*
**(do* L X1 X2 ... Xn)**

```
>> (do* ((a 0 (+ a 1)) (ans 0 (+ ans a)))
        ((= a 10) ans)
    )
55
```

### dolist
**(dolist L X1 X2 ... Xn)**

```
>> (dolist (each '(a b c) t)
        (format "~a" each)
    )
a
b
c
t
```

### doublep
**(doublep X)**
Function to answer whether X is a Double.

```
>> (doublep 12)
nil
>> (doublep 12.3)
t
>> (doublep -12)
nil
>> (doublep -12.3)
t
>> (doublep 'a)
nil
```

### eq
**(eq X Y)**
Function that answers whether X and Y are equal or not.

```
>> (eq 'a 'a)
t
>> (eq 'a 'b)
nil
>> (eq 1 1)
t
>> (eq 1 2)
nil
>> (eq 1 1.0)
t
>> (eq 1 "1")
nil
>> (eq '(a b) '(a b))
nil
```

### equal
**(equal X Y)**
Function that answers whether X and Y are equal or not.

```
>> (equal 'a 'a)
t
>> (equal 'a 'b)
nil
>> (equal 1 1)
t
>> (equal 1 2)
nil
>> (equal 1 1.0)
t
>> (equal 1 "1")
t
>> (equal '(a b) '(a b))
nil
```

### exit
**(exit)**
Function to exit the Lisp interpreter.

```
>> (exit)
Bye!
```

### gc
**(gc)**
Functions to operate the garbage collection.

```
>> (gc)
t
```

### gensym
**(gensym)**
Function to answer the new symbol.

```
>> (gensym)
id0
>> (gensym)
id1
```

### if
**(if X Y Z)**

```
>> (if t (+ 2 3) (* 2 3))
5
>> (if nil (+ 2 3) (* 2 3))
6
>> (if (= 1 1) (+ 2 3) (* 2 3))
5
>> (if (= 1 2) (+ 2 3) (* 2 3))
6
```

### integerp
**(integerp X)**
Function to answer whether X is an Integer.

```
>> (integerp 12)
t
>> (integerp 12.3)
nil
>> (integerp -12)
t
>> (integerp -12.3)
nil
>> (integerp 'a)
nil
```

### lambda
**(lamda X Y)**

```
>>  (lambda (a b) (+ a b))
(lambda (a b) (+ a b))
>> ((lambda (a b) (+ a b)) 1 2)
3
```

### let
****

```
```

### let*
****

```
```

### last
**(last L)**

```
>> (last '(a b c d e f g h i j))
(j)
>> (last '(1 (2 (3 4) (5) (6 7) 8) 9))
(9)
>> (last '(((k (r s t u)) g (m)) c d ((n) (o (v w x y z) q))))
(((n) (o (v w x y z) q)))
```

### length
**(length L)**

```
>> (length '(a b c d e f g h i j))
10
>> (length '(1 (2 (3 4) (5) (6 7) 8) 9))
3
>> (length '(((k (r s t u)) g (m)) c d ((n) (o (v w x y z) q))))
4
```

### list
**(list X1 X2 ... Xn)**

```
>> (list 'a 'b 'c 'd)
(a b c d)
>> (list 1 2 3 4)
(1 2 3 4)
```

### listq
**(listq X)**
Function to answer whether X is a List.

```
>> (listp '(1 2 3))
t
>> (listp '())
t
>> (listp 'a)
nil
>> (listp 1)
nil
>> (listp "a")
nil
```

### mapcar
**(mapcar X L)**

```
>> (mapcar list '(a b c))  
((a) (b) (c))
>>  (mapcar (lambda (a) (* a 10)) '(1 2 3))
(10 20 30)
```

### member
**(member X L)**

```
>> (member 'b '(a b c))
(b c)
>> (member 'd '(a b c))
nil
>> (member '2 '(1 (2 (3 4) (5) (6 7) 8) 9))
nil
```

### mod
**(mod X1 X2 ... Xn)**

```
>> (mod 1000 3)
1
>> (mod 100 43 8)   
6
```

### multiply
**(multiply X1 X2 ... Xn)**

```
>> (multiply 2 3)
6
>> (multiply 20 30 40)
24000
```

### not
**(not X)**

```
>> (not t)
nil
>> (not nil)
t
>> (not (= 1 1))
nil
>> (not (= 1 2))
t
```

### notrace
**(notrace)**

```
>> (notrace)
t
```

### nth
**(nth X L)**

```
>> (nth 2 '(a b c d e f g h i j))
b
>> (nth 2 '(1 (2 (3 4) (5) (6 7) 8) 9))
(2 (3 4) (5) (6 7) 8)
>> (nth 4 '(((k (r s t u)) g (m)) c d ((n) (o (v w x y z) q))))
((n) (o (v w x y z) q))
```

### nthcdr
**(nthcdr X L)**

```
>> (nthcdr 2 '(a b c d e f g h i j))
(c d e f g h i j)
>> (nthcdr 2 '(1 (2 (3 4) (5) (6 7) 8) 9))
(9)
>> (nthcdr 1 '(1 (2 (3 4) (5) (6 7) 8) 9))
((2 (3 4) (5) (6 7) 8) 9)
```

### null
**(null X)**
Function to answer whether X is a Nil.

```
>> (null '(1 2 3))
nil
>> (null '())
t
>> (null 'a)
nil
>> (null 1)
nil
>> (null "a")
nil
```

### numberp
**(numberp X)**
Function to answer whether X is a Number.

```
>> (numberp 12)
t
>> (numberp 12.3)
t
>> (numberp -12)
t
>> (numberp -12.3)
t
>> (numberp 'a)
nil
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```

###
****

```
```
