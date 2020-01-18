1. promise特点：<br />
    （1）对象的状态不受外界影响；<br />
    （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果<br />
2. promise方法：<br />
    （1）Promise.prototype.then(value=> console.log(value), err=> console.log(err))，then方法返回的是一个新的Promise实例;<br />
    （2）Promise.prototype.catch 等价于 promise.then(null,err=> console.log(err))；<br />
    （3）Promise.prototype.finally 无论promise的最终状态是成功（fulfilled）或失败（rejected）最终都会执行；<br />
            promise.then(val=>{}).catch(err=>{}).finally(()=>{})<br />
            finally方法的回调函数不接受任何参数,所以不能知道前面promise到底是fulfilled还是rejected;<br />
    （4）Promise.reslove(value) 返回一个 fulfilled 的 promise，等价于 new Promise((reslove, reject)=>reslove(value))；<br />
    （5）promise.reject(err) 返回一个 rejected 的 promise，等价于 new Promise((reslove, reject)=>reject(err))；<br />
    （6）all 所有请求完成（fulfilled，返回值为一个数组，顺序为传入的promises顺序，状态为fulfilled）<br />
            或者有一个请求失败（rejected，返回第一个rejected的值，状态为rejected）时返回<br />
            Promise.all([p1, p2, p3]).then(value=>{}).catch(err=>{})<br />
    （7）race 返回第一个 fulfilled 或者 rejected 的promise的值，状态同返回promise<br />
            Promise.race([p1, p2, p3]).then(value=>{}).catch(err=>{})<br />
            ps. 如果all或者 race的参数不是promise对象则先调用 Promise.reslove(value)方法<br />
    （8）Promise.allSettled([p1, p2, p3])，所有promise状态确定时返回新的promise，一旦结束状态只能是fulfilled<br />
            ps. all 如果有一个失败就返回失败，有可能还有请求没有执行完<br />
            exp1:<br />
            const resolved = Promise.resolve(42);<br />
            const rejected = Promise.reject(-1);<br />
            const allSettledPromise = Promise.allSettled([resolved, rejected]);<br />
            allSettledPromise.then(function (results) {   console.log(results);})<br />
            // [{ status: 'fulfilled', value: 42 }, { status: 'rejected', reason: -1 }]<br />
            exp2:<br />
            const resolved1 = Promise.resolve(42);<br />
            const resolved2 = Promise.resolve(32);<br />
            const rejected1 = Promise.reject(-1);<br />
            const allSettledPromise1 = Promise.allSettled([resolved1, resolved2, rejected1]).filter(item=> item.status === 'fulfilled'); // 过滤成功的请求<br />
3. promise/A+ 地址：<br />
    英文版：https://promisesaplus.com/  <br />
    中文翻译：https://www.ituring.com.cn/article/66566<br />
    一些术语解释：<br />
     thenable:是一个定义了 then 方法的对象或函数，“拥有 then 方法”；<br />
     x 是promise.then的返回值 .then方法必须返回一个promise对象<br />
