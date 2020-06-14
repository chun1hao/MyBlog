### 对ES6-ES10的一个简单的总结

主要参考 [《ES6 入门教程》](https://es6.ruanyifeng.com/)

## 1. let、const

let、const都是块级作用域，只在所在代码块内生效
1. 不存在变量提升
```
console.log(a) // 报错ReferenceError
let a = 1
```
2. 暂时性死区(TDZ):
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
```
var a = 1
if (true) {
  console.log(a); // ReferenceError
  let a; 
  console.log(a); // undefined
}
```
使用let命令声明变量之前，该变量都是不可用的
```
if (true) {
  console.log(a); // ReferenceError
  let a; 
  console.log(a); // undefined
}
```
3. 不能重复声明

**const、let 区别：使用const声明的常量不可以修改**

## 2. 解构赋值
1. 数组的解构赋值
```
let [a, [b, [c]], d=5] = [1, [2, [3]]] 
// a 1
// b 2
// c 3
// d 5
```
2. 对象的解构赋值
```
const obj = {
  name: 'zhangsan',
  age: 18
}
let {age, name} = obj // age=18 name='zhangsan' 
let {age, job="it"} = obj // age=18 job='it'
let {age: age1} = obj  // age1=18
```
3. 字符串的解构赋值
```
const [a, b, c, d, e] = 'hello'
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
4. 数值和布尔值的解构赋值
```
let {toString: s} = 123 // s === Number.prototype.toString
let {toString: s} = true // s === Boolean.prototype.toString
```
**对于无法转化为对象的，如 null、undefined 会直接报错**




