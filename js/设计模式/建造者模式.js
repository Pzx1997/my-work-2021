// 建造者模式
// 建造者模式是用于比较复杂的大对象的构建
// 针对需要创建的情况不多，创建的对象本身又很复杂的时候就适用建造者模式。

// 建造者模式的一般结构
// 下面代码中我们最终使用的是 final，但是 final 里面的结构比较复杂，有很多个子模块，final 就是讲这些子模块组合起来完成功能。
// 这种需要精细化构造的就适用于建造者模式
function Model1 () {}
function Model2 () {}

// 最终使用的类
function Final() {
    this.model1 = new Model1()
    this.model2 = new Model2()
}

// 使用时
var obj = new Final()


// 案例
// 创建一个给外部使用的类
function Editor() {
    this.initer = new HtmlInit();
    this.fontController = new FontController();
    this.stateController = new StateController(this.fontController);
}

// 初始化参数
function HtmlInit () {}
HtmlInit.prototype.initStyle = function () { }  // 初始化样式
HtmlInit.prototype.renderDom = function () { }  // 渲染 Dom

// 字体控制
function FontController () {}
FontController.prototype.changeFontSize = function () { }  // 控制字体大小
FontController.prototype.changeFontColor = function () { } // 控制字体颜色

// 状态控制
function StateController(fontController) {
    this.states = [];    // 一个数组，存储所有状态
    this.currentState = 0;  // 一个指针，指向当前状态
    this.fontController = fontController;  // 将字体管理器注入，便于改变状态的时候改变字体
}
StateController.prototype.saveState = function () { }       // 保存状态
StateController.prototype.backState = function () { }       // 后退状态
StateController.prototype.forwardState = function () { }    // 前进状态

// 上面的代码其实就将一个编辑器插件的架子搭起来了，
// 具体实现功能就是往这些方法里面填入具体的内容就行了
// 其实就是各个模块的相互调用