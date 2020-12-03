# KeiLisp
（this document fix： 2020/11/27 create: 2020/11/27）

## Atom
In this interpreter, the following are called Cons.

+ [Pairs](#pairs)
+ [Nil](#nil)

### Pairs
Pairs are separated by "(", ". )" and a space or other separator.
The interpreter recognizes when you write a Pairs as follows.

```
>> '(1 . 2)
(1 . 2)

>> '(1.2 . 3.4)
(1.2 . 3.4)

>> '(Hello . World)
(Hello . World)

>> '(1 . nil)
(1)

>> '(nil . 1)
(nil . 1)
```

### Nil
In other languages it may be called "Null".
The interpreter recognizes when you write a Nil as follows.

```
>> nil
nil

>> ()
nil
```
