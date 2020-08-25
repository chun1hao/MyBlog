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

// 3.new
function myNew(fn){
    let obj = {}
    obj.__proto__ = fn.prototype
    // let obj = Object.setPrototypeOf({}, fn.prototype)
    let res = fn.apply(obj, [...arguments].slice(1))
    return typeof res == 'object' ? res : obj  // new 的特性，当fn返回值是一个对象时，只能访问返回值里面的属性
}

// 4. Object.create
Object.create = function(proto){
    var fn = function(){}
    fn.prototype = proto
    return new fn()
}
// Object.create() 第二个参数同 Object.defineProperties
// Object.create 是继承了传入的对象（当传入null时，为一个空对象，无Object上任何方法），原型指向传入对象
// new 创建的是 Object 的实例，原型指向Object.prototype
