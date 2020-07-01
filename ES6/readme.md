### 对ES6-ES11的一个简单的总结

主要参考 [《ES6 入门教程》](https://es6.ruanyifeng.com/)

## 1. let、const

let、const都是块级作用域，只在所在代码块内生效
1. 不存在变量提升(变量提升 function > arguments > var, 自运行中也会提升，()包起来的不会提升)
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
## 4. 正则的扩展
- es6在第一个参数是正则的时候，允许传第二个参数做为修饰符，且会覆盖之前的修饰符
```
new RegExp(/abc/ig, 'i').flags == 'i'
```
- 字符串对象的match()、replace()、search()、split()内部调用转为调用RegExp实例对应的RegExp.prototype[Symbol.方法]
- ES6 对正则表达式添加了u 修饰符，含义为“Unicode 模式”
- 新增 RegExp.prototype.unicode，判断正则是否包含 u 修饰符
```
var reg = /abc/u
reg.unicode // true
```
- ES6 对正则表达式添加了y 修饰符，y修饰符的作用与g修饰符类似，后一次匹配都从上一次匹配成功的下一个位置开始，y修饰符确保匹配必须从剩余的第一个位置开始，相当于隐藏了一个 ^
```
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null
```
- RegExp.prototype.sticky，是否设置了y修饰符
- RegExp.prototype.flags，返回正则的修饰符
- ?<=  ?!<= 后行断言
```
/(?<=%)\d+/.exec('100%00') // [00]
/(?!<=%)\d+/.exec('100%00') // [100]
```
- ES2018新增 具名匹配，模式为 “问号 + 尖括号 + 组名”
```
const reg = /(\d{4})-(\d{2})-(\d{2})/;
const match = reg.exec('1999-12-31'); // ["1999-12-31", "12", ""31""]

const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31
```
- ES2020 新增 String.prototype.matchAll()，返回一个Iterator
```
const string = 'test1test2test3';
const regex = /t(e)(st(\d?))/g;

for (const match of string.matchAll(regex)) {
  console.log(match);
}
// ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
// ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
// ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
```
## 5. 数值的扩展
- 二进制表示法：0b或0B开头表示二进制(0bXX或0BXX)
- 八进制表示法：0o或0O开头表示二进制(0oXX或0OXX)
- Number.isFinite()：判断数值是否有限，对于非数值返回 false
```
Number.isFinite(15); // true
Number.isFinite(Infinity); // false
```
- Number.isNaN()：判断是否为NaN，对于非数值返回 false
- Number.parseInt(), Number.parseFloat()
```
Number.parseInt('12.34') // 12
Number.parseFloat('123.45') // 123.45
```
- Number.isInteger(): 是否为整数
- Number.EPSILON：数值最小精度
- Number.isSafeInteger()：是否为安全数，即Number.MAX_SAFE_INTEGER（2^53 -1 ）和Number.MIN_SAFE_INTEGER（-2^53 -1 ）之间
- Math.trunc()：去除一个数的小数部分，返回整数部分
- Math.sign()：判断一个数到底是正数、负数、还是零
```
参数为正数，返回+1；
参数为负数，返回-1；
参数为 0，返回0；
参数为-0，返回-0;
其他值，返回NaN
```
- Math.cbrt()：计算立方根ath.imul()：返回两个数以 32 位带符号整数形式相乘的结果 
- Math.hypot()：返回所有数值平方和的平方根
- Math.expm1()：返回e^n - 1
- Math.log1p()：返回1 + n的自然对数(Math.log(1 + n))
- Math.log10()：返回以10为底的n的对数
- Math.log2()：返回以2为底的n的对数
- Math.sinh()：返回n的双曲正弦
- Math.cosh()：返回n的双曲余弦
- Math.tanh()：返回n的双曲正切
- Math.asinh()：返回n的反双曲正弦
- Math.acosh()：返回n的反双曲余弦
- Math.atanh()：返回n的反双曲正切
- ** 指数运算
- [BigInt](https://github.com/chun1hao/MyBlog/issues/1)

## 6. 函数的扩展
- 函数参数的默认值
形式：function Func(x = 1, y = 2) {}
参数赋值：惰性求值(函数调用后才求值)
参数位置：一般将有默认值得参数设置为尾参数，这样参数才可以省略
length：不适用默认值时，length为参数的个数，使用后为没有默认值的参数个数
作用域：函数作用域
声明方式：默认声明，不能用const或let再次声明相同名称的参数
- rest 参数
形式：...变量名,rest 参数之后不能再有其他参数
```
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}
add(2, 5, 3) // 10
```
- 严格模式
使用了默认值，结构赋值，扩展运算符之后函数内部不能使用严格模式
- name 属性：返回函数的名称
- 箭头函数
  1. 箭头函数内的this对象，是定义时所在的对象，而不是使用时所在的对象
  2. 不可以当作构造函数
  3. 没有arguments对象
  4. 不可以使用yield命令，因此箭头函数不能用作 Generator 函数
- 尾调用优化：只保留内层函数的调用帧，尾调用是指某个函数的最后一步是调用另一个函数
```
// 尾调用
function f(x){
  return g(x);
}
// 下面为非尾调用
function f(x){
  let y = g(x);
  return y; // 调用后有赋值
}

function f(x){
  return g(x) + 1; // 有运算
}

function f(x){
  g(x); 
}
等价于下面
function f(x){
  g(x);
  return undefined
}
```
尾递归：尾调用调用的是自身，优化为把所有用到的内部变量改写成函数的参数
- ES2017 允许函数的最后一个参数有尾逗号
- ES2019 修改了Function.prototype.toString()：会保留内部注释
- ES2019 如果不需要用到catch的err信息，可以省略catch 命令的参数
```
try {
  // ...
} catch {
  // ...
}
```

## 7. 数组的扩展
- Array.from：转换具有Iterator接口的数据结构为真正数组，返回新数组，包括 ES6 新增的数据结构 Set 和 Map
```
Array.from([1, 2, 3], x => x + x) // [2,4,6]
Array.from({length: 3}, ()=>3) // [3, 3, 3]
```
- Array.of()：将一组值，转换为数组
```
Array.of(3, 11, 8) // [3,11,8]
```
- copyWithin()：把指定位置的成员复制到其他位置，会修改原数组，不会改变原数组的长度
```
Array.prototype.copyWithin(target, start = 0, end = this.length)
// 
```
target（必需）：从该位置开始替换数据。如果为负值，表示倒数
start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算
end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算
如为负值则是倒数
```
[1, 2, 3, 4, 5].copyWithin(0, 3, 4) // [4, 2, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(0, 1) // [2, 3, 4, 5, 5]
```
- find()：返回第一个符合条件的成员
- findIndex()：返回第一个符合条件的成员索引值
- fill()：根据指定值填充整个数组，返回原数组
- keys()：返回以索引值为遍历器的对象
```
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1
```
- values()：返回以属性值为遍历器的对象
```
for (let index of ['a', 'b'].values()) {
  console.log(index);
}
// a
// b
```
- entries()：返回以索引值和属性值为遍历器的对象
```
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
- 数组空位：ES6明确将数组空位转为undefined(空位处理规不一，建议避免出现)
- ES2016 include：判断数组中是否包含某个值
```
[1,2,3,4,5].includes(2,3) // false
[1,2,3,4,5].includes(2,1) // true
```
- flat()：数组扁平化，参数为多少层，默认一层，infinity为展开所有
- flatMap()：方法对原数组的每个成员执行一个函数，然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组
```
[1, 2, 3, 4].flatMap(x => [x * 2]);
// [2, 4, 6, 8]
```
- ES2019 规定，Array.prototype.sort() 为稳定排序

## 8. 对象的扩展
- 简洁表示法：直接写入变量和函数作为对象的属性和方法
```
let a = 'aa'
let b = {a} //{a: "aa"}
```
- 属性名表达式：使用字面量定义对象时可以用[]，里面可以为变量和表达式，不能和简洁表示同时使用
- ES2017 新增 Object.getOwnPropertyDescriptor(obj, 'foo')，返回指定对象所有自身属性（非继承属性）的描述对象（value、writable、enumerable、configurable）
- 属性的可枚举性：Object.getOwnPropertyDescriptor(obj, 'foo')中的enumerable，如果为false，for...in，Object.keys()，JSON.stringify()，Object.assign()会忽略该值
- super 关键字：指向当前对象的原型对象
- Object.is()：对比两值是否相等
- Object.assign()：合并对象(浅拷贝)，返回原对象
- Object.getPrototypeOf()：返回对象的原型对象
- Object.setPrototypeOf()：设置对象的原型对象
- ES2020 新增链判断运算符
```
const message = {a:b}
const b = message.a.b?.c  // undefined
```
- ES2020 新增 Null 判断运算符 ??,当运算符左侧的值为null或undefined时，返回右侧的值

## 9. symbol
- 定义：独一无二的值
- 声明：const set = Symbol(str)
- 入参：字符串(可选)

- Symbol()：创建以参数作为描述的Symbol值(不登记在全局环境)
- Symbol.for()：接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值，如存在此参数则返回原有的Symbol值,否则就新建一个以该字符串为名称的 Symbol 值(先搜索后创建，登记在全局环境)
```
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
```
- Symbol.keyFor()：返回已登记的Symbol值的描述(只能返回Symbol.for()的key)
```
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```
- Object.getOwnPropertySymbols()：返回对象中所有用作属性名的Symbol值的数组
```
// Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
```
- Symbol.hasInstance：指向一个内部方法，当其他对象使用instanceof运算符判断是否为此对象的实例时会调用此方法
- Symbol.isConcatSpreadable：指向一个布尔，定义对象用于Array.prototype.concat()时是否可展开
```
let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
```
- Symbol.species：指向一个构造函数，当实例对象使用自身构造函数时会调用指定的构造函数
- Symbol.match：指向一个函数，当实例对象被String.prototype.match()调用时会重新定义match()的行为
- Symbol.replace：指向一个函数，当实例对象被String.prototype.replace()调用时会重新定义replace()的行为
- Symbol.search：指向一个函数，当实例对象被String.prototype.search()调用时会重新定义search()的行为
- Symbol.split：指向一个函数，当实例对象被String.prototype.split()调用时会重新定义split()的行为
- Symbol.iterator：指向一个默认遍历器方法，当实例对象执行for-of时会调用指定的默认遍历器
- Symbol.toPrimitive：指向一个函数，当实例对象被转为原始类型的值时会返回此对象对应的原始类型值
- Symbol.toStringTag：指向一个函数，当实例对象被Object.prototype.toString()调用时其返回值会出现在toString()返回的字符串之中表示对象的类型
- Symbol.unscopables：指向一个对象，指定使用with时哪些属性会被with环境排除

## 10. set
特性：类似于数组，但是没有重复值
声明：new Set()
参数：具有Iterator接口的数据结构
属性：
- Set.prototype.constructor：构造函数，默认就是Set函数
- Set.prototype.size：返回成员个数
方法：
- Set.prototype.add(value)：新增
```
新增 NaN 会认为是相同的值
新增 对象 都是不同的值
不会有类型转换 5 !== "5"
```
- Set.prototype.delete(value)：删除指定value,返回true/false，表示删除是否成功
- Set.prototype.has(value)：查询是否有value，返回true/false
- Set.prototype.clear()：删除所有，无返回值
- Set.prototype.keys()：返回键名的遍历器
- Set.prototype.values()：返回键值的遍历器
```
由于set没有键名，只有键值，故keys()和values() 返回的结果一致
```
- Set.prototype.entries()：返回键值对的遍历器
```
let set = new Set(['a','b','c'])
for(let i of ser.entries()){
  console.log(i)
}
// ['a','a']
// ['b','b']
// ['c','c']
```
- Set.prototype.forEach()：使用回调函数遍历每个成员

## 11. WeakSet
- WeakSet.prototype.add()：添加值，返回实例
- WeakSet.prototype.delete()：删除值，返回布尔
- WeakSet.prototype.has()：检查值，返回布尔

WeakSet 不可遍历，无size
WeakSet 同 set 一样都是无重复值，但是其成员只能是对象
WeakSet 中的对象都是弱引用，垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中
强引用：垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存，结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏

可以用来储存DOM节点：DOM节点被移除时自动释放此成员，不用担心这些节点从文档移除时会引发内存泄漏，
也可以临时存放一组对象或存放跟对象绑定的信息：只要这些对象在外部消失，它在WeakSet结构中的引用就会自动取消
