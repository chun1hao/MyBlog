// 1. call
Function.prototype.myCall = function(content){
    let obj = content || window // 当传content 为 null 的时候指向 window
    obj.fn = this
    let res = obj.fn(...[...arguments].slice(1))
    delete obj.fn
    return res // 函数有返回值
}
Function.prototype.myCall = function (context, arr) {
    var obj = params || window, res, symKey = 'kk' + Math.random(),len = arguments.length
    while(obj.hasOwnProperty(symKey)){
        symKey = 'kk' + Math.random()
    }
    obj[symKey] = this
    var str = ''
    for(var i=1;i<len;i++){
        str += arguments[i] + (i == len -1 ? '' : ',')
    }
    if(len>1){        
        res = eval('obj[symKey]('+str+')')
    }else{
        res = obj[symKey]()
    }
    delete obj[symKey]
    return res
}

// 2. apply
Function.prototype.myApply = function (context, arr) {
    var context = context || window;
    context.fn = this;
    var result;
    if (!Array.isArray(arr)) { // 如果arr是null或者undefined 不能...
        result = context.fn();
    }else{
        result = context.fn(...arr)
    }
    delete context.fn
    return result;
}


// 3.bind 
// bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。
Function.prototype.myBind = function (context) {
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var self = this
    var args = [...arguments].slice(1)
    
    var temFn = function(){}
    var fn = function(){
        // 1. bind 参数可以分开传
        // 2. bind 可以new，new之后this指向新建的对象(不再指向 bind 绑定时的对象)
        // 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
        return self.apply(this instanceof temFn ? this : context, args.concat(...arguments)) // 函数有返回值
    }
    // 修改返回值的 prototype 为绑定的 prototype ，继承绑定函数的原型中的值
    temFn.prototype = this.prototype
    fn.prototype = new temFn()
    return fn
}
