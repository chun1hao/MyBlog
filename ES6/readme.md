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

**解构规则**
- 匹配模式：只要等号两边的模式相同，左边的变量就会被赋予对应的值
- 等号右边的值不是对象或数组，先将其转为对象（null、undefined无法转化为对象，不能解构）
- 解构默认值只有在属性值严格等于undefined才会生效
- 解构不成功时变量为undefined

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

5. 函数参数的解构赋值
```
function add([x, y]){
  return x + y;
}
add([1, 2]);   // 3
[[1, 2], [3, 4]].map(([a, b]) => a + b); // [3,7]
// 使用默认值
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x:1, y:2}) //  [1, 2]
move() //  [0, 0]

// 注意下面的写法
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
move() //  [undefined, undefined]

不同在于下面的写法默认值是move的整个参数，而不是x、y
```
**使用场景**

1. 交换变量的值
```
[x, y] = [y, x]
```
2. 从函数返回多个值
```
function Func(){
  return {
    x:1,
    y:2
  }
}
const [x, y, z] = Func()
```
3. 函数参数的定义，告别之前传参必须按照顺序
```
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```
4. 提取 JSON 数据
```
const json = {
  id: 42,
  status: "OK",
  data: [867, 5309]
}
let {id, status} = json
```
5. 函数参数的默认值
```
function Func({ x = 1, y = 2 } = {}) {}
```
6. 遍历 map
```
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
```
7. 输入模块的指定方法
```
const { SourceMapConsumer, SourceNode } = require("source-map")
```



