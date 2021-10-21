// 工厂模式
// 讲模块封装的像一个工厂一样批量的产出需要的对象。
// 常见个工厂模式的一个特征就是调用的时候不需要使用new，而且传入的参数比较简单。
// 但是调用次数可能比较频繁，经常需要产出不同的对象，频繁调用时不用new也方便许多。

// 根绝不同的 type 来创建不同的对象
// function factory(type) {
//     switch (type) {
//         case 'type1':
//             return new Type1();
        
//         case 'type2':
//             return new Type2();
        
//         case 'type3':
//             return new Type3();
        
//         default:
//             break;
//     }
// }


// 案例
// 生成弹窗类
// function infoPopup(content, color) {}
// function confirmPopup(content, color) {}
// function cancelPopup(content, color) {}

// 工厂模式改造
// 添加一个方法 popup 把这几个类都包装起来
// function popup(type, content, color) {
//     switch (type) {
//         case 'infoPopup':
//             return new infoPopup(content, color)
    
//         case 'confirmPopup':
//             return new confirmPopup(content, color)
        
//         case 'cancelPopup':
//             return new cancelPopup(content, color)
//     }
// }

// 改造成面向对象
// function popup(type, content, color) {
//     // 如果是通过 new 调用的，返回对应类型的弹窗
//     if (this instanceof popup) {
//         return new this[type](content, color)
//     }
//     // 如果不是 new 调用的，使用 new 调用，会走到上面那行代码
//     return new popup(type, content, color)    
// }

// 各种类型的弹窗全部挂载在原型上成为实例方法
// popup.prototype.infoPopup = function (content, color) {}
// popup.prototype.confirmPopup = function (content, color) {}
// popup.prototype.cancelPopup = function (content, color) {}


// 封装成模块
(function () {
    function popup(type, content, color) {
        if (this instanceof popup) {
            return new this[type](content, color)
        }
        return new popup(type, content, color)
    }
    popup.prototype.infoPopup = function (content, color) {}
    popup.prototype.confirmPopup = function (content, color) {}
    popup.prototype.cancelPopup = function (content, color) {}
    
    // 挂载到 window 上作为一个模块调用
    window.popup = popup
})()