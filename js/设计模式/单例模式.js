// 单例模式
// 单例模式适用于全局只能有一个实例对象的场景
// 一般结构如下
function Singleton() {
    Singleton.getInstance = function () {
        if (this.instance) {
            return this.instance
        }

        this.instance = new Singleton()
        return this.instance
    }
}

// 上述代码中，Singleton 类挂载了一个静态方法 getInstance，如果要获取实例对象只能通过这个方法拿，
// 这个方法会检测是不是有现存的实例对象，如果有就返回，没有就新建一个


// 案例
// 我们需要对一个全局的数据对象进行管理，这个对象只能有一个，如果多个会导致数据不同步。
function store() {
    // 见一个 instanceof 检测
    if (!(this instanceof store)) {
        return new store()
    }

    if (store.instance) {
        return store.instance
    }

    store.instance = this
}
