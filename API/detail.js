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
    let len = O.length >>> 0
    if(typeof callbackfn !== 'function'){
        return new TypeError(callbackfn+' is not a function')
    }
    let A = new Array(len)
    let k = 0
    while(k < len){
        if(k in O){
            A[k] = callbackfn.call(thisArg, O[k], k, O)
        }
        k++
    }
    return A    
}

// 7.filter
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
    let to = 0
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
