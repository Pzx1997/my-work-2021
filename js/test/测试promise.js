var request = require('request')
var MyPromise = require('../demo-手写promiseA+')
// var promise1 = new MyPromise((resolve) => {
//     request('https://www.baidu.com', (error, res) => {
//         if (!error && res.statusCode === 200) {
//             resolve('request1 sucess')
//         }
//     })
// })

// promise1.then(value => {
//     console.log(value)
// })

// var promise2 = new MyPromise((resolve, reject) => {
//      request('https://www.baidu.com', (error, res) => {
//          if (!error && res.statusCode === 200) {
//             reject('request2 failed')
//         }
//     })
// })

// promise2.then(value => {
//     console.log(value)
// }, reason => {
//     console.log(reason)
// })

// var promise3 = new MyPromise(resolve => {
//     setTimeout(() => {
//         resolve('success')
//     },1000)
// })

// var promise3_1 = promise3.then(res => {
//     console.log(res, '38')
//     return new MyPromise((res, rej) => {
//         setTimeout(() => {
//             rej('错误')
//         },1000)
//     })
// })

// promise3_1.then(res => {
//     console.log(res, '47')
// }, rej => {
//     console.log(rej)
// })

// var promise4 = new MyPromise(resolve => {
//     resolve('success')
// })

// var promise4_1 = new MyPromise(resolve => {
//     resolve(promise4)
// })

// promise4_1.then(res => {
//     console.log(res) // success
// })

// catch 方法
// var promise5 = new MyPromise((resolve, reject) => {
//     reject('catch捕获error')
// })

// promise5.then(res => {
//     console.log(res)
// }).catch(error => {
//     console.log(error)
// })

// var promise6 = new MyPromise((resolve) => {
//     resolve('success')
// })

// var promise6_1 = new MyPromise((resolve, reject) => {
//     reject('error')
// })

// var promise6_2 = new MyPromise((resolve) => {
//     resolve('success')
// })

// var promise6_3 = MyPromise.all([promise6, promise6_1, promise6_2])
// promise6_3.then(res => {
//     console.log(res)
// }, err => {
//     console.log(err)
// })

// var promise_7 = MyPromise.race([promise6, promise6_1, promise6_2])
// var promise_8 = MyPromise.race([promise6, promise6_1, promise6_2])

// promise_7.then(res => {
//     console.log(res)
// }, err => {
//     console.log(err)
// })


// promise_8.then(res => {
//     console.log(res)
// }, err => {
//     console.log(err)
// })