# JSLisp
（this document fix： 2020/11/27 create: 2020/11/27）

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
+ [characterp](#caracterp)
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
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()
+ []()

### abs
**(abs X)**
Function to find the absolute value of X.

```
>> (abs -10.0)
10
```

### add
**(add X1 X2 ... Xn)**
Function to find the sum of X1, X2 ... and Xn.

```
>> (add 1 2)
3
>> (add 12 -34 5.6 -7.8 90)
65.8
```
### and
**(and X1 X2 ... Xn)**

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

```
>> (append '(a b c) '(d e f))
(a b c d e f)
```

### assoc
**(assoc X L)**

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

```
>> (butlast '(a b c d e f g) 3)
(a b c d)
```

### car
**(car L)**

```
>> (car '(a b c))
a
>> (car '(1 2 3))
1
```

### cdr
**(cdr L)**

```
>> (cdr '(a b c))
(b c)
>> (cdr '(1 2 3))
(2 3)
```

### characterp
**(characterp X)**

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
**(cons X L)**

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

```
>> (defun tasu (a b) (+ a b))
tasu
>> (tasu 1 2)
3
```

### divide
**(divide X1 X2 ... Xn)**

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

```
>> (doublep 12)
nil
>> (doublep 12.3)
t
>> (doublep -12)
nil
>> (doublep -12.3)
t
```

### eq
****

```
```

### equal
****

```
```

### exit
**(exit)**

```
>> (exit)
Bye!
```

### gc
**(gc)**

```
>> (gc)
t
```

### gensym
**(gensym)**

```
>> (gensym)
id0
>> (gensym)
id1
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
