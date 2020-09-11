## 1.数据类型：

基本数据类型：**Number、String、Boolean、Null、Undefined、BigInt、Symbol**

引用数据类型：**Object（普通对象-Object、函数-Function、日期-Date、数组-Array、正则-RegExp、数学函数-Math）**

基本数据类型用**栈**存储，引用数据类型、闭包变量用**堆**存储

## 2. 函数参数的传递是值传递（当参数是对象时，传递的是对象在堆中的内存地址值）

```
function test(obj) {
    obj.age = 20
    obj = {
        name: 'aaa',
        age: 18
    }
    return obj
}
const p1 = {
    name: 'bbb',
    age: 19
}
const p2 = test(p1)
console.log(p1) // -> {name: 'bbb',age: 20}
console.log(p2) // ->  {name: 'aaa',age: 18}
```

函数test有局部变量obj，接收p1作为参数，即将p1赋值给obj，此时p1和obj指向同一个内存地址，故obj.name 改变后 p1也改变，后将obj指向了一个新的内存地址，与p1的联系断开，新对象在函数结束后该对象被垃圾回收

## 3. js 是词法作用域，也就是静态作用域，当函数内访问变量时，是从声明的位置向上查找，而不是调用时，且函数的作用域在函数定义的时候就决定了
```
var x = 10
function f2(){
    console.log(x)
}
function f1(f){
    var x = 20
    f()
}
f1(f2) // 10
```

## 4. null 不是对象，typeof null === 'object' 是 js 的bug

## 5. '1'.toString() 运行过程
```
1. var a = new Object('1')  // Number、String、Boolean、BigInt、Symbol都是包装类型，es6新规范在new symbol  bigint 会报错，所以不使用new String
2. a.toString
3. a = null
```

**基本包装类型和引用类型的区别就是生存期不同，在代码执行后就会销毁实例，拥有自己的方法（继承于原型之上），无法定义新的方法**

```
var str = "person"; 
str.name = "jeson";  // 添加属性不会报错
alert(str.name) ;// undifined 实例已经销毁获取不到
```

## 6. 检测数据类型
typeof 对于基本数据类型除了null 都能正确判断，对于引用类型，除了function 其他都返回object

instanceof 基于原型链查询，只要处于原型链中，都返回true



## 7. Object.is 和 ===

Object.is 修复了 === 一些错误
```
-0 === +0 // true 
NaN === NaN // false
Object.is(-0, +0) // false
Object.is(NaN, NaN) // true
 ```   
 
## 8. 原型链：

(1). 在js中，每当定义一个函数数据类型（普通函数、类）时，都会自带一个 prorotype 属性，其指向函数的原型对象；
     当函数经过 new 调用后，返回一个实例对象，实例有 __proto__ 属性，指向函数的原型对象;
```
function Fn() {}
var cFn = new Fn;
cFn.__proto__ == Fn.prototype // true
```
(2). 对象之间通过 __proto__ 连接起来，这样称之为原型链。当前对象上不存在的属性可以通过原型链一层层往上查找，直到顶层 Object 对象

***hasOwnProperty() 来检查对象自身中是否含有该属性***

***in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true***

## 9. 类数组转化为数组

**类数组比如函数中 arguments，其拥有length，可使用下标访问，但是不能使用数组的方法**

```
(1) Array.form(arguments)
(2) [...arguments]
(3) Array.prototype.slice.call(arguments)
(4) Array.prototype.conct.apply([], arguments)
```

## 10. forEach 中不能使用 return 语句，可以使用 some、every 代替
some: 有一个满足返回 true
every: 都满足才返回 true

```
var arr = [1,2,3,4,5]
arr.some(i=>i>3) // true
arr.every(i=>i>3) // false
```

## 11. 判断数组中是否包含某个值

**(1). indexOf, 有返回下标，无返回-1**

```
arr.indexOf(searchElement[, fromIndex]) 

    fromIndex: 开始查找的位置(包含该位置)。
    
    如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。
    
    如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。 
    注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0 
 ```
 
**(2). includes 有返回true，无返回false**

```
arr.includes(valueToFind[, fromIndex])

    fromIndex同indexOf
```

**(3). array.find(callback[,thisArg])**

```
callback接收 3 个参数, 
  element: 当前遍历到的元素
  index: 当前遍历到的索引
  array: 数组本身

thisArg: 执行回调时用作this 的对象

返回值：数组中第一个满足所提供测试函数的元素的值，否则返回 undefined
```

**(4). array.findeIndex(callback[,thisArg])**

```
参数同 find

返回值：数组中通过提供测试函数的第一个元素的索引。否则，返回-1
```

**(5). some**
```
有满足条件的返回 true，没有则返回 false
var arr = [1,2,3,4,5]
a = arr.some(i=>i==9) // true
```

## 12. 短路表达式
x && y
先将 x 转化为 boolean 值，如果为 false，返回 x，为 true 返回 y

x || y
先将 x 转化为 boolean 值，如果为 true，返回 x，为 false 返回 y

## 13. 垃圾回收机制
js 在创建变量（对象，字符串等）时自动进行了内存分配，在不使用它们时“自动”释放， 释放的过程称为垃圾回收

**内存生命周期**
1. 分配你所需要的内存
2. 使用分配到的内存（读、写），即使用变量的过程
3. 不需要时将其释放\归还

```
// 对于栈
function f(a) {
  console.log(a);
}

function f1(a) {
  f(a);
}

f1(1);
// 1.f1(1) a=1
// 2.f(1) a=1 执行完后被回收
// 3.f1(1) a=1 执行完后被回收
```
**引用计数垃圾收集**

没有引用指向该对象（零引用），对象将被垃圾回收机制回收

```
var o = { 
  a: {
    b:2
  }
}; 
// 创建了两个对象，其中 a 被 o 引用

var o2 = o; // o2 变量也引用了 o 指向的对象

o = 1;      // 取消了 o 对对象的引用，此时‘这个对象’只有 o2 引用

var oa = o2.a; // o2 引用 a 所指向的对象
               // 现在，“这个对象”有两个引用了，一个是o2，一个是oa

o2 = "yo"; // 最初 o 所引用的对象现在已经是零引用了，可以被垃圾回收了
           // 但是它的属性a的对象还在被oa引用，所以还不能回收

oa = null; // a属性的那个对象现在也是零引用了
           // 被垃圾回收
```
无法处理循环引用的事例，需要手动设置为 null，否则会造成内存泄漏

**标记清除算法**

> 这个算法假定设置一个叫做根（root）的对象（在Javascript里，根是全局对象）。垃圾回收器将定期从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象……从根开始，垃圾回收器将找到所有可以获得的对象和收集所有不能获得的对象

这种算法是从全局对象出发能否获取改对象，不能则回收，所以缺陷就是那些无法从根对象查询到的对象都将被清除

## 14. 纯函数
一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用
- 函数的返回结果只依赖于它的参数
- 函数执行过程里面没有副作用

## 15. import
- import * as a from 'a1'：会将a1中所有export（export default、export）导入到新文件并包裹到 a 里面
```
// a.js
export default ()=> 'aa'
export const c = 'aaa'

// b.js
import * as data from './a'

console.log(data)  // {default: function default(),c:'aaa' }
```
- import 会预先加载，优先执行，与位置无关
- import 引入的模块是只读的，不能在引入后的文件中修改

## 16. Object.isExtensible()、Object.preventExtensions()
- Object.isExtensible(),判断对象是否可用扩展，即添加新的属性
冻结（Object.freeze，现有属性不能更改，浅冻结）、密封（Object.seal，阻止添加新属性并将所有现有属性标记为不可配置-Object.defineProperty 不能操作，当前已有的属性可以修改值）不可扩展
- Object.preventExtensions()，阻止对象进行扩展
修改后其原型不可变
```
// 字面量方式定义的对象默认是可扩展的.
var empty = {};
Object.isExtensible(empty) //=== true
 
Object.preventExtensions(empty);
Object.isExtensible(empty) //=== false
```

## 17. 函数记忆
函数记忆：将每次的计算结果都缓存起来，当再次调用时，如果遇到相同的参数，就直接返回缓存中的结果
实现：将参数及结果保存在一个对象中
适用于：需要大量重复的计算，或者大量计算又依赖于之前的结果
```
function memoize(fn) {
    var cache = {}
    return function(){
        // 权威指南
        // 对于参数如果是对象的情况，会出错（对象转化为字符串都是 [object Object]）
        // var key = arguments.length + JSON.stringify(arguments)
        var key = arguments.length + Array.prototype.join.call(arguments, ',');        
        if(key in cache){
            return cache[key]
        }else{
            return cache[key] = fn.apply(this, arguments)
        }
    }
}
```

## 18. 乱序
用于打乱数组
```
function shuffle(arr){
    arr.sort(function(){
        // 随机获得一个正数、负数或者0，正数降序，负数升序，0不变
        return Math.random() - 0.5;
    });
    return arr
}

// 打乱的更加彻底
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}

// 鉴于非酋体质，最后还是需要判断一次
```

## 19. Intl
Intl 对象是 ECMAScript 国际化 API 的一个命名空间，它提供了精确的字符串对比、数字格式化，和日期时间格式化
Intl.NumberFormat是对语言敏感的格式化数字类的构造器类
```
new Intl.NumberFormat([locales[, options]])
// locales: 缩写语言代码
// options 可配置 
// style：指定数字的格式样式，decimal：纯数字格式 （默认值），currency：货币格式，percen：百分比格式
// currency：在货币格式化中使用的货币符号，USD：美元，EUR：欧元，CNY：人民币
// useGrouping：是否使用分组分隔符，默认为true

var number = 123456.789;
var result = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD' }).format(number);
console.log(result); // $123,456.79
```
Intl.DateTimeFormat是根据语言来格式化日期和时间的对象的构造器。
```
new Intl.DateTimeFormat([locales[, options]])
// locales: 缩写语言代码
// options 可配置 
// timeZone：使用的时区. 这唯一的值实现必须被标准世界时间(UTC)所识别。默认值是运行时的默认时区
// hour12：是否使用12小时时间制(而不是24小时的时间). true 或 false，中国地区的默认值为true

const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
console.log(new Intl.DateTimeFormat('en-US').format(date));
// expected output: "12/20/2012"

console.log(new Intl.DateTimeFormat('en-GB').format(date));
// expected output: "20/12/2012"

// Include a fallback language, in this case Indonesian
console.log(new Intl.DateTimeFormat(['ban', 'id']).format(date));
// expected output: "20/12/2012"
```
[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

## 20. 连续赋值
```
let a = {n : 1};
let b = a;
a.x = a = {n: 2};


console.log(a.x) // undefined
console.log(b.x) // {n: 2}
// 执行 b = a 之后，a b 指向同一块内存地址 {n : 1}
// a.x = a = {n: 2};  按照优先级 先执行 . 运算符，在 之前a 和 b  指向的内存上增加了一个 x 属性，然后赋值由右向左， a 指向一个新的内存地址 {n: 2}，且之前a 和 b  指向的内存的 x 属性 等于{n:2 }
```

## 21. 非匿名自执行函数，函数名只读
```
var b = 10;
(function b(){
    b = 20
    console.log(b)
})()
// Function b

var b = 10;
(function b(){
    console.log(b)
    b = 5
    console.log(window.b)
    var b = 20
    console.log(b)
})()
// undefined  变量提升
// 10
// 20
```

## 22. 数组比较大小
```
var a = [1, 2, 3],
    b = [1, 2, 3],
    c = [1, 2, 4]
a ==  b // false
a === b // false
a <   c // true
// == === 都是比较内存地址，> < 从数组的第一项开始比较
```

## 23. arguments
当非严格模式中的函数没有包含剩余参数(...rest)、默认参数和解构赋值，那么arguments对象中的值会跟踪参数的值（反之亦然）
```
function sidEffecting(ary) {
    ary[0] = ary[2];
}
function bar(a, b, c) {
    c = 10
    sidEffecting(arguments);
    return a + b + c;
}
console.log(bar(2, 2, 2)) // 22
```
当非严格模式中的函数有包含剩余参数、默认参数和解构赋值，那么arguments对象中的值不会跟踪参数的值（反之亦然）
```
function sidEffecting(ary) {
    ary[0] = ary[2];
}
function bar(a, b, c = 6) {
    c = 10
    sidEffecting(arguments);
    return a + b + c;
}
console.log(bar(3, 3, 3)) // 16
```
## 24. 伪类和伪元素
伪类是为了弥补常规CSS选择器的不足，以便获取到更多信息，如:hover :active :visited :link :visited :first-child :focus :lang等

伪元素是创建了一个有内容的虚拟容器，如 ::before ::after 等

**最大区别在于：是否创造了新的元素**

- 伪元素：不存在在DOM文档中，是虚拟的元素，是创建新元素。 这个新元素(伪元素)  是某个元素的子元素，这个子元素虽然在逻辑上存在，但却并不实际存在于文档树中.
- 伪类：存在DOM文档中，(无标签,找不到,  只有符合触发条件时才能看到 ),  逻辑上存在但在文档树中却无须标识的“幽灵”分类。
　　　  
## 25. 模块化
### 模块化主要是用来抽离公共代码、隔离作用域、避免全局污染等

- 自运行函数：在一个单独的作用域中执行代码，避免了变量冲突

- AMD：requireJS   前置依赖，异步加载
```javascript
define('./a.js',  function(data){ // data 为 a.js 返回的内容

})
```

- CMD：seaJS   延迟加载，使用时才会加载
```javascript
define(function(require, exports, module){
    var a = require('./a.js');
})
```

- commonJS：node  同步加载，运行时加载
```javascript
let a = require('./a.js')

// a.js
module.exports.a = 'aaa'
```

- esModules：ES6  初始只生成一个引用，执行代码时才会加载需要的模块
```javascript
import a from './a.js'

export default {a: 'aaa'}
```
