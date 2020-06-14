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
## 3. 字符串的扩展
- 加强了对 Unicode 的支持，写法"\u{41}" ，范围是 \u0000~\uFFFF
- 可用for...of对字符串进行遍历
- 模板字符串，可用输入多行，会保留所有的空格、换行等，花括号内可进行运算、调用函数
  ```
  let name = 'zhangsan'
  let s = `my name is ${name}`
  s // "my name is zhangsan"
  ```
 - 标签模板
  ```
  let a = 5;
  let b = 10;

  function tag(s, v1, v2) {
    console.log(s);
    console.log(v1);
    console.log(v2);

    return "OK";
  }

  tag`Hello ${ a + b } world ${ a * b}`;
  // 第一个值始终为字符串值的数组，其余依次取传入模板的值
  // ["Hello aa ", " world ", ""] 
  // 15 
  // 50
  ```
  
**新增方法**

- String.fromCodePoint() 从 Unicode 码点返回对应字符
```
String.fromCodePoint(0x78, 0x79) // xy
```
- String.raw() 返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串
```
String.raw`Hi\n${2+3}!` // 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"
```
- codePointAt() 返回一个字符的码点,能够处理 4 个字节储存的字符(String.fromCodePoint()的逆操作)
- normalize() 把字符的不同表示方法统一为同样形式，返回新字符串()
```
// 字符 O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）
// Ǒ（\u01D1）
'\u01D1'.normalize() === '\u004F\u030C'.normalize() // true
```
- includes() 是否包含某个字符
```
'abc'.includes('a') // true
```
- startsWith() 是否以某个字符开始
```
'abc'.startsWith('a') // true
```
- startsWith() 是否以某个字符结束
```
'abc'.endsWith('c') // true
```
- repeat() 将原字符串重复n次
```
'abc'.repeat(3) // 'abcabcabc'
```
- padStart() ES2017新增，某个字符串不够指定长度，会在头部补全，返回新的字符串
```
'aa'.padStart(5, 'abcd') // abcaa 只会取符合的长度，超出的舍去，不传第二个参数用空格填充
```
- padEnd() ES2017新增，某个字符串不够指定长度，会在尾部补全，返回新的字符串
```
'aa'.padEnd(5, 'abcd') // aaabc 只会取符合的长度，超出的舍去，不传第二个参数用空格填充
```
- trimStart() ES2019新增,消除字符串头部的空格，返回新的字符串
```
'  aa  '.trimStart() // 'aa  '
```
- trimEnd() ES2019新增,消除尾部的空格，返回新的字符串
```
'  aa  '.trimEnd() // '  aa'
```
- matchAll() 返回一个正则表达式在当前字符串的所有匹配，返回的是一个迭代器
```
const regexp = /\s/g;
const str = ' ass a ';
let match = str.matchAll(regexp);

for (const match of matches) {
  console.log(match);
}
// [' ', index: 0, input: " ass a ", groups: undefined]
// [' ', index: 4, input: " ass a ", groups: undefined]
// [' ', index: 6, input: " ass a ", groups: undefined]
```



