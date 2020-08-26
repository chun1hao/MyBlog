class MyPromise{
    constructor(fn){
        this.status = 'pending';
        this.data = null;
        this.onResolveCallbacks = [];
        this.onRejectCallbacks = [];

        try{
            fn(this._resolve.bind(this), this._reject.bind(this));
        }catch(e){
            this._reject(e);
        }
    }

    _resolve(value){
        setTimeout(()=>{
            this.status = 'fulfilled';
            this.data = value;
            this.onResolveCallbacks.forEach(callback=> callback(value));
        });
    }

    _reject(error){
        setTimeout(()=>{
            this.status = 'rejected';
            this.data = error;
            this.onRejectCallbacks.forEach(callback=> callback(error));
        });
    }

    _resolveProcess(_promise, x, resolve, reject){
        let isFirst = true;
        let then;
        if(x === _promise){
            return reject(new TypeError('xxx'));
        }
        if(x instanceof MyPromise){
            if(x.status === 'pending'){
                x.then(value=>{
                    this._resolveProcess(_promise, value, resolve, reject);
                }, error=> reject(error))                    
            }else{
                x.then(resolve, reject);
            }
            return;
        }
        if((typeof x === 'object' || typeof x === 'function') && x !== null){
            try{
                then = x.then;
                if(typeof then === 'function'){
                    then.call(x, y=> {
                        if(!isFirst) return;
                        isFirst = false;
                        this._resolveProcess(_promise, y, resolve, reject);
                    }, r=> {
                        if(!isFirst) return;
                        isFirst = false;
                        reject(r);
                    });
                }else{
                    resolve(x);
                }
            }catch(e){
                if(!isFirst) return;
                isFirst = false;
                reject(e);
            }
        }else{
            resolve(x);
        }
    }

    then(onResolved, onRejected){
        let t = this;
        let _promise;
        onResolved = typeof onResolved === 'function' ? onResolved : function(value){return value};
        onRejected = typeof onRejected === 'function' ? onRejected : function(error){throw error};

        if(this.status === 'pending'){
            return _promise = new MyPromise((resolve, reject)=>{
                this.onResolveCallbacks.push((value)=>{
                    try{
                        let x = onResolved(value);
                        this._resolveProcess(_promise, x, resolve, reject);
                    }catch(e){
                        reject(e);
                    }
                })
                this.onRejectCallbacks.push((error)=>{
                    try{
                        let x = onRejected(error);
                        this._resolveProcess(_promise, x, resolve, reject);
                    }catch(e){
                        reject(e);
                    }
                })
            })
        }

        if(this.status === 'fulfilled'){
            return _promise = new MyPromise((resolve, reject)=>{
                setTimeout(() => {
                    try{
                        let x = onResolved(t.data);
                        this._resolveProcess(_promise, x, resolve, reject);
                    }catch(e){
                        reject(e);
                    }
                });
                
            })
        }

        if(this.status === 'rejected'){
            return _promise = new MyPromise((resolve, reject)=>{
                setTimeout(() => {
                    try{
                        let x = onRejected(t.data);
                        this._resolveProcess(_promise, x, resolve, reject);
                    }catch(e){
                        reject(e);
                    }
                });
                
            })
        }
    }        

    catch(onRejected){
        return this.then(null, onRejected);
    }

    finally(fn){
        return this.then((v)=>{
            return reslove(fn).then(()=>v)
        },(e)=>{
            return reslove(fn).then(()=>e)
        })        
    }

    static resolve(parsms){
        if (parsms instanceof MyPromise) return value;
        return new MyPromise((resovle, reject)=>{
            if(parsms && parsms.then && typeof parsms.then==='function'){
                parsms.then(resovle, reject)
            }else{
                resolve(parsms);
            }
        })
    }

    static reject(params){
        return new MyPromise((resolve, reject)=>{
            reject(params);
        })
    }

    static all(promises){
        let values = []
        let count = 0
        for (let [i, p] of promises.entries()) {
            // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
            this.resolve(p).then(res => {
                values[i] = res
                count++
                // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
                if (count === list.length) resolve(values)
            }, err => {
                // 有一个被rejected时返回的MyPromise状态就变成rejected
                reject(err)
            })
        }
    }

    static race (list) {
        return new MyPromise((resolve, reject) => {
            for (let p of list) {
                // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
                this.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
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
