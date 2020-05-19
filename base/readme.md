## 1.数据类型：

基本数据类型：**Number、String、Boolean、Null、Undefined、BigInt、Symbol**

引用数据类型：**Object（普通对象-Object、函数-Function、日期-Date、数组-Array、正则-RegExp、数学函数-Math）**

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

## 9. forEach 中不能使用 return语句，可以使用 some every代替

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

(4). array.findeIndex(callback[,thisArg])

```
参数同 find

返回值：数组中通过提供测试函数的第一个元素的索引。否则，返回-1
```


## 其他一些东西
### 1. [BigInt](https://github.com/chun1hao/MyBlog/issues/1)
### 2. [隐式转换](https://github.com/chun1hao/MyBlog/issues/2)
### 3. [闭包](https://github.com/chun1hao/MyBlog/issues/3)
### 4. [继承](https://github.com/chun1hao/MyBlog/issues/4)
