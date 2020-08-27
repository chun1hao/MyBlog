class MyPromise{
    constructor(fn){
        this.status = 'pending'
        this.data = null
        
        this.onFulfilledCallback = []
        this.onRejectedCallback = []

        let resolve = value =>{
            if(this.status == 'pending'){
                setTimeout(() => {
                    this.status = 'fulfilled'
                    this.data = value
                    this.onFulfilledCallback.forEach(i=> i())
                });                
            }
        }
        let reject = reason =>{
            if(this.status == 'pending'){
                setTimeout(() => {
                    this.status = 'rejected'
                    this.data = reason
                    this.onRejectedCallback.forEach(i=> i())
                })                
            }
        }

        try{
            fn(resolve, reject)
        }catch(e){
            reject(e)
        }
    }
    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled  == 'function'? onFulfilled : value => value;
        onRejected = typeof onRejected  == 'function'? onRejected : error => {throw error};

        let promise2 = new MyPromise((resolve, reject)=>{
            if(this.status == 'pending'){
                this.onFulfilledCallback.push(()=>{
                    try{
                        let x = onFulfilled(this.data)
                        resolveProcess(promise2, x, resolve, reject)
                    }catch(e){
                        reject(e)
                    }
                })
                this.onRejectedCallback.push(()=>{
                    try{
                        let x = onRejected(this.data)
                        resolveProcess(promise2, x, resolve, reject)
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.status == 'fulfilled'){
                setTimeout(() => {
                    try{
                        let x = onFulfilled(this.data)
                        resolveProcess(promise2, x, resolve, reject)
                    }catch(e){
                        reject(e)
                    }        
                });
                
            }
            if(this.status == 'rejected'){
                setTimeout(() => {
                    try{
                        let x = onRejected(this.data)
                        resolveProcess(promise2, x, resolve, reject)
                    }catch(e){
                        reject(e)
                    }      
                });                
            }
        })
        return promise2
    }
    catch(fn){
        return this.then(null, fn)
    }
    finally(fn){
        this.then(val=>{
            // resolve 是静态方法
            return MyPromise.resolve(fn()).then(()=> val)
        }, err=>{
            return MyPromise.reject(fn()).then(()=> {throw err})
        })
    }  
    static resolve(val){
        return new MyPromise(resolve=> resolve(val))
    }  
    static reject(error){
        return new MyPromise((resolve, reject)=> reject(error))
    }
    static all(promises){        
        return new MyPromise((resolve, reject)=>{
            let count = 0, len = promises.length, res= new Array(len)
            for(let i=0;i<len;i++){
                // 静态方法中 this 指向类，非静态中可能指向实例
                this.resolve(promises[i]).then(val=>{
                    count++
                    res[i] = val
                    if(len == count) resolve(res)
                },err=>{
                    reject(err)
                })
            }
        })
    }
    static race(promises){
        return new MyPromise((resolve, reject)=>{
            let len = promises.length, res= new Array(len)
            for(let i=0;i<len;i++){
                this.resolve(promises[i]).then(val=>{
                    resolve(res)
                },err=>{
                    reject(err)
                })
            }
        })
    }
    static allSettled(promises){
        return new MyPromise((resolve)=>{
            let count = 0, len = promises.length, res= new Array(len)
            for(let i=0;i<len;i++){
                this.resolve(promises[i]).then(val=>{
                    count++
                    res[i] = {status: 'fulfilled', value: val}
                    if(len == count) resolve(res)
                },err=>{
                    count++
                    res[i] = {status: 'fulfilled', value: err}
                    if(len == count) resolve(res)
                })
            }
        })
    }
}
function resolveProcess(promise2, x, resolve, reject){
    let isCalled = false
    if(promise2 === x){
        return reject(new TypeError('xx'))
    }
    if(x !== null && (typeof x === 'object' || typeof x === 'function')){
        try{
            let then = x.then;
            if(typeof then == 'function'){
                then.call(x, y=>{
                    if(isCalled) return
                    isCalled = true
                    resolveProcess(promise2, y, resolve, reject)
                }, r=>{
                    if(isCalled) return
                    isCalled = true
                    reject(r)
                })
            }else{
                resolve(x)
            }
        }catch(e){            
            if(isCalled) return
            isCalled = true
            reject(e)
        }
    }else{
        resolve(x)
    }
}

// promise/A+ test
MyPromise.deferred = MyPromise.defer = function() {
    var dfd = {};
    dfd.promise = new MyPromise(function(resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}

try {
    module.exports = MyPromise
} catch (e) {}

// promises-aplus-tests es6.js
