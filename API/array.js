// 1.float 简单实现
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

// 2.map
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

// 3.filter
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

//4.reduce
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

// 5.push
Array.prototype.myPush = function(){
    let O = Object(this)
    let len = O.length >>> 0    
    let argLen = arguments.length >>> 0
    
    if (len + argLen > 2 ** 53 - 1) { // 长度限制
        throw new TypeError("The number of array is over the max value restricted!")
    }
    
    for(let i=0; i<argLen; i++){
        O[len+i] = arguments[i]
    }
    let newLen = len + argLen
    O.length = newLen
    
    return newLen
}

// 6.pop
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

// 7.splice
Array.prototype.mySplice = function(start, delCount){
    let o = Object(this)
    let len = o.length >>> 0
    let addItem = [].slice.call(arguments, 2)
    let addLen = addItem.length >>> 0

    // start 处理    
    if(start < 0){
        let temStart = len + start
        start = temStart < 0 ? 0 : temStart
    }else{
        start = start > len ? len : start
    }

    // delCount 处理
    let temCount = len - start
    if(delCount < 0) delCount = 0
    if(delCount > temCount || delCount == undefined){
        delCount = temCount
    }

    let result = Array(delCount)

    // 获取删除的元素
    for(let i=0; i<delCount; i++){
        let _idx = start+i
        if(_idx in o){
            result[i] = o[_idx]
            delete o[_idx]
        }        
    }

    // 将删除元素后面的元素移动到相应位置
    if(delCount > addLen){ // 如果删除的大于新增 
        // [1,2,3,4,5,6] 7 8
        let c = delCount - addLen
        for(let i=start+delCount; i<len; i++){
            o[i-c] = o[i]    
        }
    }
    if(delCount < addLen){ // 如果删除的小于新增
        // [1,2,3,4] 4 5 6
        let c = addLen - delCount
        for(let i=len-1; i>=start+delCount; i--){
            o[i+c] = o[i]   
        }
    }

    // 将新增元素放到原数组
    if(addLen){
        for(let i=0; i<addLen; i++){
            o[start+i] = addItem[i]
        }
    }    

    // 设置新的数组长度
    o.length = len + addLen - delCount

    return result
}




