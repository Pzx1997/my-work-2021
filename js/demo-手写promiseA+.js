// 手写 Promise/A
// Promise/A+ 规范 https://github.com/promises-aplus/promises-spec
// 1.promise：是一个拥有 then 方法的对象或函数，其行为符合本规范
// 2.thenable：是一个定义了 then 方法的对象或函数。这个主要是用来兼容一些老的 Promise 实现，只要一个 Promise 实现是 thenable，也就是拥有 then 方法的，就可以跟 Promise/A+ 兼容
// 3.value：指 resolve 出来的值，可以是任何合法的JS值（包括 undefined，thenable，promise等）
// 4.exception：异常，在 promise 里面用 throw 抛出来的值
// 5.reason：拒绝原因，是 reject 里面传的参数，表示 reject 的原因

// Promise 状态
// Promise 总共有三种状态
// 1.pending：一个 promise 在 resolve 或者 reject 前就处于这个状态
// 2.fulfilled：一个 promise 被 resolve 后就处于 fulfilled 状态，这个状态不能再改变，而且必须拥有一个不可变的值（vakue）
// 3.rejected：一个 promise 被 reject 后就处于 rejected 状态，这个状态也不能再改变，而却必须拥有一个不可变的拒绝原因（reason）

// then 方法
// 一个 promise 必须拥有一个 then 方法来访问他的值或者拒绝原因。then 方法有两个参数
// 参数可选 onFulfilled 和 onRejected。如果不是函数，其必须被忽略

// onFulfilled 特性 
// 如果 onFulfilled 是函数
//     当 promise 执行结束后必须被调用，第一个参数为 promise 的终值 value
//     在 promise 执行结束前不可被调用
//     调用次数不可超过一次
// 

// onRejected 特性
// 如果 onRejected 是函数
//     当 promise 被拒绝执行后必须被调用，第一个参数为 promise 的拒因 reason 
//     在 promise 被拒绝执行钱不可被调用
//     调用次数不可超过一次

// 多次调用
// then 方法可以被同一个 promise 调用多次
//     当 promise 成功执行时，所有 onFulfilled 需按照注册顺序依次回调
//     当 promise 被拒绝执行时，所有的 onRejected 需要找注册顺序依次回调

// 返回
// then 方法必须返回一个 promise 对象  
// promise2 = promise1.then(onFulfilled, onRejected);
// 如果 onFulfilled 或者 onRejected 返回的一个值 x，则运行 Promise 解决过程：[[Resolve]](promise2,x)
// 如果 onFulfilled 或者 onRejected 抛出一个异常 e，则 promise2 必须拒绝执行，并返回拒因e
// 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
// 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因


// 先定义三个常亮表示状态
var PENDING = 'pending';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';
 
module.exports = class MyPromise {
    constructor(fn) {
        // 如果传进不是函数则直接抛出错误
        if (typeof fn !== 'function') {
            throw new Error('MyPromise must accept a function as a parameter')
        }
        this.status = PENDING;  // 初始化状态
        this.value = null;      // 初始化 value
        this.reason = null;     // 初始化 reason
        // 添加两个数组存储成功和失败的回调
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];

        // 将 resolve 和 reject 作为参数调用传进来的参数，加上try，如果捕获到错误就 reject
        try {
            fn(this.resolve, this.reject)
        } catch(error) {
            this.reject(error)
        }
    }

    // resolve 和 reject 方法
    // 根据规范 resolve 方法是将状态修改为 fulfilled，reject 方法是修改为 rejected
    // resolve 方法参数是value
    resolve = (value) => {
        if (this.status === PENDING) {
            const run = () => {
                this.status = FULFILLED;
                this.value = value;
                // 依次执行成功队列中的函数，并清空队列
                const runFulfilled = value => {
                    let cb;
                    while (cb = this.onFulfilledCallback.shift()) {
                        cb(value)
                    }
                }
                // 依次执行失败队列中的函数，并清空队列
                const runRejected = error => {
                    let cb;
                    while (cb = this.onRejectedCallback.shift()) {
                        cb(error)
                    }
                }
                /** 
                 * 如果 resolve 的参数为 promise 对象，则必须等待该 promise 对象状态改变后，
                 * 当前 promise 的状态才会改变，且状态取决于参数 promise 对象的状态
                */
                if (value instanceof MyPromise) {
                    value.then(val => {
                        this.value = value;
                        runFulfilled(val);
                    }, err => {
                        this.reason = err;
                        runRejected(err);
                    })
                } else {
                    this.value = value
                    runFulfilled(value)
                }
            }
            // 为了支持同步的 Promise，这里采用异步调用
            setTimeout(run, 0)
        }
    }

    // reject 方法参数是reason
    reject = (reason) => {
        if (this.status === PENDING) {
            const run = () => {
                this.status = REJECTED;
                this.reason = reason;
                let cb;
                // reject 里面将所有失败的回调拿出来调用，并清空队列
                while (cb = this.onRejectedCallback.shift()) {
                    cb(this.reason)
                }
            }
            setTimeout(() => run(), 0)
        }
    }

    // then 方法可以链式调用，所以他是实例方法，而且规范中的 API 是 promise。then(onFulfilled, onRejected)
    then = (onFulfilled, onRejected) => {
        // 返回一个新的promise对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            // 封装一个成功时执行的函数
            let fulfilled = value => {
                try {
                    if (typeof onFulfilled !== 'function') {
                        onFulfilledNext(value)
                    } else {
                        let res = onFulfilled(value);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回 MyPromise 对象，必须等待其他状态改变后执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            // 否则会将返回结果直接作为参数，传入下一个 then 的回调函数，并立即执行下一个 then 的回调函数
                            onFulfilledNext(res)
                        }
                    }  
                } catch (error) {
                    // 如果函数执行出错，新的 Promise 对象的状态为失败
                    onRejectedNext(error)
                }
                
            }

            // 封装一个失败时执行的回调函数
            let rejected = err => {
                try {
                    if (typeof onRejected !== 'function') {
                        onRejectedNext(err)
                    } else {
                        let res = onRejected(err)
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onRejectedNext(res)
                        }
                    }
                } catch (error) {
                    onRejectedNext(error)
                }
            }
            
            switch (this.status) {
                // 如果还是 PADNING 状态，将回调保存下来
                case PENDING:
                    this.onFulfilledCallback.push(fulfilled);
                    this.onRejectedCallback.push(rejected);
                    break;

                // 判断status状态 如果操作成功了就调用onFulfilled 如果失败就调用 onRejected
                case FULFILLED:
                    onFulfilled(this.value);
                    break;
                
                case REJECTED:
                    onRejected(this.reason);
                    break;
            }
        })
    }

    catch = (onRejected) => {
        return this.then(undefined, onRejected)
    }

    // 静态 resolve 方法
    static resolve = (value) => {
        // 如果参数是 MyPormise 实例，直接返回这个实例
        if (value instanceof MyPromise) return value 
        return new MyPromise(resolve => resolve(value))
    }

    // 静态 reject 方法
    static reject = (error) => {
        return new MyPromise((resovle, reject) => reject(error))
    }

    // 静态 all 方法
    static all = (list) => {
        return new MyPromise((resolve, reject) => {
            let values = []
            let count = 0
            for (let [i, p] of list.entries()) {
                // 数组参数如果不是 MyPromise 实例，先调用 MyPromise.resolve
                this.resolve(p).then(res => {
                    values[i] = res
                    count++
                    // 所有状态都变成 fulfilled 时返回的 MyPromise 状态就变成了 fulfilled
                    if (count === list.length) resolve(values)
                }, err => {
                    // 有一个被 rejected 时返回的 MyPromise 状态就变成 rejected
                    reject(err)
                })
            }
        })
    }

    // 静态 race 方法
    static race (list) {
        return new MyPromise((resolve, reject) => {
            for (let p of list) {
                // 只要有一个实例先改变状态，新的 MyPromise 的状态就跟着改变
                this.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }

    // finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
    finally(cb) {
        return this.then(
            value => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => { throw reason })
        )
    }
}