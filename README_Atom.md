# JSLisp
（this document fix： 2020/11/27 create: 2020/11/27）

## Atom
In this interpreter, the following are called atoms.

+ [Symbol](###Symbol)
+ [Number](###Number)
+ [String](###String)

### Symbol
You must start with an alphabetic character.
After the second character, you can use numbers in addition to these characters.
You can bind values. When you enter a symbol while the value is bound, it returns the bound value and
When you enter an unbound symbol, the warning and "nil" will be returned.
The interpreter recognizes when you write a symbol as follows.

```
>> (set! a 10)
10

>> a
10

>> b
I could find no variable binding for b
nil

>> abc
I could find no variable binding for abc
nil

>> abc123
I could find no variable binding for abc123
nil
```

### Number
The interpreter recognizes when you write a number as follows.

```
>> 123
123

>> -123
-123

>> 123.456
123.456

>> -123.456
-123.456

>> 123.456e7
1234560000

>> -123.456e-7
-0.0000123456
```

### String
The string must be enclosed in ".
The interpreter recognizes when you write a string as follows.

```
>> "Kyoto"
Kyoto

>> "I have a pen."
I have a pen.
```
