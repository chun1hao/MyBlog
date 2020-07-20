(function () {
    function MyPromise(fn){
        var t = this;

        t.data = null;
        t.status = 'pending';
        /*一个promise可以有多个回调
        var x1 = new Promise(...).then(...)
        var x2 = new Promise(...).then(...)
        否则只返回最后一次的结果*/
        t.onResolveCallbacks = []; 
        t.onRejectCallbacks = [];

        function resolve(value){
            // 异步处理
            setTimeout(function () {
                if(t.status !== 'pending') return;

                t.status = 'fulfilled';
                t.data = value;
                t.onResolveCallbacks.forEach(function(callback){
                    callback(value);
                })
            })
        }

        function reject(error){
            setTimeout(function () {
                if(t.status !== 'pending') return;

                t.status = 'rejected';
                t.data = error;
                t.onRejectCallbacks.forEach(function(callback){
                    callback(error);
                })
            })
        }

        try{
            fn(resolve, reject)
        }catch(e){
            reject(e);
        }
    }

    function resolveProcess(_promise, x, resolve, reject){
        // 处理resolve和reject不同的是resolve需要尝试展开thenable对象（即x）
        var isFirst = true, then;
        // let y = new Promise(res => setTimeout(res(y)))
        if(x === _promise){
            return reject(new TypeError('Chaining cycle detected for promise!'))
        }
        if(x instanceof MyPromise){
            if(x.status === 'pending'){
                x.then(function(value){
                    resolveProcess(_promise, value, resolve, reject);
                }, function(error){
                    reject(error);
                })
            }else{
                x.then(resolve, reject);
            }
            return;
        }
        if((typeof x === 'object' || typeof x === 'function') && x !== null){
            try{
                then = x.then;
                if(typeof then === 'function'){
                    then.call(x, function(y){
                        // 2.3.3.3：如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
                        if(!isFirst) return;
                        isFirst = false;
                        resolveProcess(_promise, y, resolve, reject);
                    }, function(r){
                        if(!isFirst) return;
                        isFirst = false;
                        reject(r);
                    })
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

    MyPromise.prototype.then = function(onResolved, onRejected){
        var t = this, _promise;
        
        // return:值的穿透，new Promise(...).then().then().then(data=>data)       
        onResolved = typeof onResolved === 'function' ? onResolved : function(value){ return value}; 
        onRejected = typeof onRejected === 'function' ? onRejected : function(error){ throw error};
        
        if(t.status === 'fulfilled'){
            // then 方法必须返回一个 promise 对象,不返回新的链式调用时，一直都是第一个
            return _promise = new MyPromise(function(resolve, reject){
                // 2.2.4 注1：这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，
                // 且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行
                setTimeout(function(){
                    try{
                        var x = onResolved(t.data);
                        resolveProcess(_promise, x, resolve, reject);
                    }catch(e){
                        reject(e)
                    } 
                })
                
            })
        }

        if(t.status === 'rejected'){
            return _promise = new MyPromise(function(resolve, reject){
                setTimeout(function(){
                    try{
                        var x = onRejected(t.data);
                        //不论 promise1 被 reject 还是被 resolve 时 promise2 都会被 resolve，只有出现异常时才会被 rejected
                        resolveProcess(_promise, x, resolve, reject);
                    }catch(e){
                        reject(e)
                    } 
                })
            })
        }

        if(t.status === 'pending'){
            return _promise = new MyPromise(function(resolve, reject){
                t.onResolveCallbacks.push(function(value){
                    try{
                        var x = onResolved(value);
                        resolveProcess(_promise, x, resolve, reject);
                    }catch(e){
                        reject(e);
                    }
                })
                t.onRejectCallbacks.push(function(error){
                    try{
                        var x = onRejected(error);
                        resolveProcess(_promise, x, resolve, reject);
                    }catch(e){
                        reject(e);
                    }
                })
            })
        }
    }

    MyPromise.prototype.catch = function(onRejected){
        return this.then(null, onRejected);
    }

    MyPromise.prototype.finally = function(fn){
        // 所有的then调用是一起的，但是这个then里调用fn又异步了一次，所以它总是最后调用的,这里只能保证在已添加的函数里是最后一次
        return this.then(function(v){
            setTimeout(fn);
            return v;
        }, function(e){
            setTimeout(fn);
            return e;
        });
    }

    MyPromise.resolve = function(params){
        // if(params instanceof MyPromise){
        //     return params;
        // }
        // return new MyPromise(function(resolve){
        //     try{
        //         params.then(function(v){
        //             resolve(v);
        //         })
        //     }catch(e){
        //         resolve(params);
        //     }
        // })
        
        return _promise = new MyPromise(function(resolve, reject){
            resolveProcess(_promise, params, resolve, reject)          
        })
    }

    MyPromise.reject = function(params){
        return new MyPromise(function(resolve, reject){
            reject(params);
        })
    }

    MyPromise.all = function(promises){
        var len = promises.len, result = new Array(len), resolveCount = 0;
        return new MyPromise(function(resolve, reject){
            if(!len) return resolve([])
            for(var i=0; i<len; i++){
                MyPromise.resolve(promises[i]).then(function(v){
                    resolveCount++;
                    result[i] = v;
                    if(resolveCount===len) resolve(result);
                }, function (e) {
                    return reject(e)
                })
            }            
        })
    }

    MyPromise.race = function(promises){
        return new MyPromise(function(resolve, reject){
            var len = promises.len;
            if(!len) return;
            for(var i=0; i<len; i++){
                MyPromise.resolve(promises[i]).then(function(v){
                    return resolve(v);
                }, function (e) {
                    return reject(e)
                })
            } 
        })
    }

    MyPromise.allSettled = function(promises){
        var len = promises.length, result = new Array(len), resolveCount = 0;
        return new MyPromise(function(resolve){
            if(!len) return resolve([]);
            for(var i=0; i<len; i++){                
                MyPromise.resolve(promises[i]).then(function(v){
                    resolveCount++;
                    result[i] = {ststus: 'fulfilled', value: v}
                    if(len === resolveCount){
                        resolve(result);
                    }
                }, function (e) {
                    resolveCount++;
                    result[i] = {ststus: 'rejected', value: e}
                    if(len === resolveCount){
                        resolve(result);
                    }
                })
            } 
            
        })
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

    return MyPromise;
})()
