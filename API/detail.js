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
