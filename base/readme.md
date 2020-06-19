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

## 3. null 不是对象，typeof null === 'object' 是js的bug

## 4. '1'.toString() 运行过程

```
1. var a = new Object('1')  // Number、String、Boolean、BigInt、Symbol都是包装类型，es6新规范在new symbol  bigint 会报错，所以不使用new String
2. a.toString
3. a = null
```

**基本包装类型和引用类型的区别就是生存期不同，在代码执行后就会销毁实例，拥有自己的方法，无法定义新的方法**

```
var str = "person"; 
str.name = "jeson";  // 添加属性不会报错
alert(str.name) ;// undifined 实例已经销毁获取不到
```

## 5. 检测数据类型
typeof 对于基本数据类型除了null 都能正确判断，对于引用类型，除了function 其他都返回object

instanceof 基于原型链查询，只要处于原型链中，都返回true

## 6. Object.is 和 ===

Object.is修复了===一些错误
```
-0 === +0 // true NaN === NaN // false
Object.is(-0, +0) // false
Object.is(NaN, NaN) // true
 ```   
 
## 7. 原型链：

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

## 8. 类数组转化为数组

**类数组比如函数中 arguments，其拥有length，可使用下标访问，但是不能使用数组的方法**

```
(1) Array.form(arguments)
(2) [...arguments]
(3) Array.prototype.slice.call(arguments)
(4) Array.prototype.conct.apply([], arguments)
```

## 9. forEach 中不能使用 return 语句，可以使用 some、every 代替
some: 有一个满足返回 true
every: 都满足才返回 true

```
var arr = [1,2,3,4,5]
arr.some(i=>i>3) // true
arr.every(i=>i>3) // false
```

## 10. 判断数组中是否包含某个值

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

## 11. 短路表达式
x && y
先将 x 转化为 boolean 值，如果为 false，返回 x，为 true 返回 y

x || y
先将 x 转化为 boolean 值，如果为 true，返回 x，为 false 返回 y

## 12. 垃圾回收机制
jst在创建变量（对象，字符串等）时自动进行了内存分配，在不使用它们时“自动”释放， 释放的过程称为垃圾回收

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


## 其他
### 1. [隐式转换](https://github.com/chun1hao/MyBlog/issues/2)
### 2. [闭包](https://github.com/chun1hao/MyBlog/issues/3)
### 3. [继承](https://github.com/chun1hao/MyBlog/issues/4)
### 4. [Event loop](https://github.com/chun1hao/MyBlog/issues/5)
### 5. [this](https://github.com/chun1hao/MyBlog/issues/6)
### 6. [拷贝](https://github.com/chun1hao/MyBlog/issues/7)
### 7. [ES6简单总结](https://github.com/chun1hao/MyBlog/blob/master/ES6/readme.md)

