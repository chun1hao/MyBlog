// 1.instanceof
function myInstanceof(left, right){
    if(typeof left !== 'object' || left === null) return false;
    let proto = Object.getPrototypeOf(left);
    while(true){
        //  查找到最顶层
        if(proto === null) return false;
        if(proto === right.prototype) return true;
        //  再向上查找
        proto = Object.getPrototypeOf(proto);
    }
}

// 2.Object.is()
function objectIs(x, y){
    if(x === y){
        // -Infinity !== +Infinity
        return x !== 0 || 1/x === 1/y
    }else{
       // NaN情况
        return x!==x && y!==y
    }
}

// 3.float 简单实现
function myFlat(arr){
    // 1. reduce
    // return arr.reduce((r, c)=> r.concat(Array.isArray(c) ? myFlat(c) : c), [])
    
    // 2. JSON.stringify+replace+JSON.parse
    // return JSON.parse(`[${JSON.stringify(arr).replace(/[\[|\]]/g, '')}]`)
    
    // 3. 递归
    // let res = [];
    // for(let i of arr){
    //     res = res.concat(Array.isArray(i) ? myFlat(i) : i);
    // }
    // return res;
    
    // 4. 扩展运算符
    // while(arr.some(Array.isArray)){
    //     arr = [].concat(...arr)
    // }
    // return arr
}

// 4. call
Function.prototype.myCall = function myCall(context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}

// 5. apply
Function.prototype.myApply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}

// 6.bind
Function.prototype.bind = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}

// 7.map
Array.prototype.myMap = function(callbackfn, thisArg){
    if(this === null || this === undefined){
        return new TypeError('can not read property "map" of null or undefined')
    }
    let O = Object(this)
    let len = O.length >>> 0 // >>> 是保证len为整数
    if(typeof callbackfn !== 'function'){
        return new TypeError(callbackfn+' is not a function')
    }
    let A = new Array(len)
    let k = 0
    while(k < len){
        if(k in O){ // 此处使用in 不用 hasOwnPrototype，1是需要判断本身及原型链 2.可以有效处理稀疏数组（遇到empty直接跳过）
            A[k] = callbackfn.call(thisArg, O[k], k, O) // 此处表明如果不传 thisArg，callbackfn 中this指向 window，传了则指向 thisArg
        }
        k++
    }
    return A    
}

// 8.filter
Array.prototype.myFilter = function(callbackfn, thisArg){
    if(this === null || this === undefined){
        return new TypeError('can not read property "map" of null or undefined')
    }
    let O = Object(this)
    let len = O.length >>> 0
    if(typeof callbackfn !== 'function'){
        return new TypeError(callbackfn+' is not a function')
    }
    let A = []
    let k = 0
    let to = 0 // A的索引
    while(k < len){
        if(k in O){
            if(callbackfn.call(thisArg, O[k], k, O)){
                A[to++] = O[k]
            }
        }
        k++
    }
    return A    
}

// 9.reduce
Array.prototype.myReduce = function(callbackfn, initialValue){
    // 异常处理
    if(this === null || this === undefined){
        return new TypeError('can not read property "map" of null or undefined')
    }
    if(typeof callbackfn !== 'function'){
        return new TypeError(callbackfn+' is not a function')
    }
    let O = Object(this)
    let len = O.length >>> 0
    
    if(!len && !initialValue){
        return new TypeError()
    }
    let k = 0
    let accumulator
    if(initialValue){
        accumulator = initialValue
    }else{
        let kPresent = false
        while(k < len && !kPresent){
            if(k in O){
                kPresent = true;
                accumulator = O[k]
            }
            k++
        }
    }
    
    while(k < len){
        if(k in O){
            accumulator = callbackfn.call(undefined, accumulator, O[k], k, O)
        }
        k++
    }
    return accumulator
}

// 10.push
Array.prototype.myPush = function(){
    let O = Object(this)
    let len = O.length >>> 0    
    let argLen = arguments.length >>> 0
    
    if (len + argLen > 2 ** 53 - 1) {
        throw new TypeError("The number of array is over the max value restricted!")
    }
    
    for(let i=0; i<argLen; i++){
        O[len+i] = arguments[i]
    }
    let newLen = len + argLen
    O.length = newLen
    
    return newLen
}

// 11.pop
Array.prototype.myPop = function(){
    let O = Object(this)
    let len = O.length >>> 0    
    let res
    if(len){
        len--
        res = O[len]
        delete O[len]
        O.length = len
    }else{
        O.length = 0
    }
    return res
}





