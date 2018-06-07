///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                               //
//                                     ;;,                ..,,,,,..                                                              //
//                                    ;'.            .,,`            ,`        .;:.    `.   .,.       ;.             ,,.         //
//                         `,;., `` :,.            .:                 .     .;.           ,,.                     `;,.           //
//                       ,;, `,:,,.      .         ;:                 .`   .;.          ,:,:,`     .;.      ``` .,:.             //
//                    .;:.                 .       ;,                 ,    .;`        .,.  ;.    ,,.     .;.. `,,                //
//                  ,:.                    ,      ;,                 ;.     `,,.`..:,.     .,.,`   ..,,,` ..,. .:,.              //
//               .;,                       :     .;,               ,;.                                                           //
//              ,.                        .,     ;,`            .;,.                                        .                    //
//             ;.                         '.    ;, .         .;,.           .:,,      `..                   .                    //
//            `.                        .;.    '.    .::,,,,.          `.:,             ;.                  :                    //
//            ..                      .;,    ,,;.`   ..             .;,.               `'.                  :                    //
//            `.   .,:::,,..,,,...  .;.   `;..          .       `,:,                .,:.                    ,                    //
//             :;,.              .;, `...;.               . `,:,                .;:,                       ..                    //
//           .,`.,         ``,;:.     .,.  `..`          .;,`...         `.,,,.                            :                     //
//          ..       ```                         `..`.;,.                                                .,                      //
//          ,                                    `.:.  `..                                             ,:.                       //
//           .`                              `.:,`          ..`                                     .;,`                         //
//              .`                      `.,,.                    .,`                            `,;:.                            //
//                 ...       ``..,::,,.                               ...                  `.::,.                                //
//                                                                          ..,,,::,,:,:,.`                                      //
//                                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Interface = (function (_super) {
    __extends(Interface, _super);
    // public Interface = new Interface //	实例化Interface类
    function Interface() {
        var _this = _super.call(this) || this;
        _this.squareList = []; // 方块列表
        // public squareController = new SquareClearController(5)	// 例化方块控制器类
        /**
           * 方块控制器类
           * @param x 当前点击数字的横坐标
           * @param y 当前点击数字的纵坐标
           * @param n 点击后数字的大小
           * @param T 向上寻路的标识
           * @param R 向右寻路的标识
           * @param B 向下寻路的标识
           * @param L 向左寻路的标识
           */
        _this.T = 0; //	向上寻路的次数
        _this.R = 0; //	向右寻路的次数
        _this.B = 0; //	向下寻路的次数
        _this.L = 0; //	向上寻路的次数
        _this.tag = 0; //	路标：0、1、2、3 分别代表：上、下、左、右
        _this.pushArray = []; //	需要消除的数组
        _this.indexArray = []; //	传进来的数组
        _this.chainArray = []; //	连锁反应要检查的方块顺序数组
        _this.realChainArray = []; //	去重后的连锁反应要检查的方块顺序数组
        _this.rotArray = []; //	旋转的数组
        _this.realPushArray = []; //	去重的push数组
        _this.skinName = 'Exml.Interface';
        _this.InitMap();
        _this.maxNum = 5;
        _this.interfaceStopIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, _this);
        _this.interfaceFlush.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, _this);
        return _this;
    }
    /**
       * 获得第一次点击时的坐标
       */
    Interface.prototype.init = function (x, y) {
        this.px = x;
        this.py = y;
    };
    /**
     * 初始化界面
     */
    Interface.prototype.InitMap = function () {
        this.bloodExml = new BloodExml();
        this.bloodExml.x = 50;
        this.bloodExml.y = 100;
        this.addChild(this.bloodExml);
    };
    /**
       * 页面加载随机生成方块
       * @param n 方块最大的数字
       * @param rx 方块矩阵列
       * @param ry 方块矩阵行
       */
    Interface.prototype.randomSquare = function (n, rx, ry) {
        for (var i = 0; i < rx; i++) {
            this.squareList[i] = new Array();
            for (var j = 0; j < ry; j++) {
                this.squareList[i].push(Math.ceil(Math.random() * n));
            }
        }
        this.drawAgin(rx, ry, this.squareList);
        // console.log("this.squareList", this.squareList)
    };
    /**
     * 根据数组进行绘制
     * @param x 方块行
     * @param y 方块列
     * @param arrayList 生成的随机数组
     * x 55   y   482    w  640   h   640
     */
    Interface.prototype.drawAgin = function (x, y, arrayList) {
        var _this = this;
        var _loop_1 = function (i) {
            var allNum = x * y;
            var arrayListX = Math.floor(i / x);
            var arrayListY = i % x;
            // console.log(arrayList[arrayListX][arrayListY])
            this_1["square" + i] = new NumberExml(arrayList[arrayListX][arrayListY], arrayList);
            this_1["square" + i].x = (i % 5) * 124 + 127;
            this_1["square" + i].y = 556 + 124 * arrayListX;
            this_1.addChild(this_1["square" + i]);
            this_1["square" + i].changeImageRes.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.bloodExml.InitChangeBlood(2);
                var touch_x = _this["square" + i].x;
                var touch_y = _this["square" + i].y;
                var array_x = Math.floor((touch_x - 69) / 124);
                var array_y = Math.floor((touch_y - 498) / 124);
                var changeNum = _this.squareList[array_y][array_x] += 1;
                _this["square" + i].changeImageRes.source = RES.getRes("interface-number-" + changeNum + "_png");
                _this.squareClear(array_x, array_y, changeNum, _this.squareList, touch_x, touch_y);
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < x * y; i++) {
            _loop_1(i);
        }
    };
    /**
       * 方块消除规则
       */
    Interface.prototype.squareClear = function (x, y, n, a, tx, ty) {
    };
    /**
     * 连锁反应规则
   * @param realChainArray 连锁反应需要检查的方块列表
     */
    Interface.prototype.chainRule = function () {
        console.log("this.realChainArray", this.realChainArray);
    };
    /**
     * 拿到所有相同数字的位置坐标
     *
     */
    Interface.prototype.seek = function (x, y, n, a) {
        //	寻路方法: 上、右、下、左
        //	寻路规则：按顺序查找外扩散1
        this.num = n;
        this.indexArray = a;
        this.x = x;
        this.y = y;
        // console.log("ssss!!!@@@!!",x,y)
        if (y != 0) {
            if (this.indexArray[y - 1][x] == n && y >= 0 && this.tag == 0) {
                //	top
                // console.log("top")
                this.tag += 1;
                var tn = (y - 1) * 10 + x;
                if ((this.py) * 10 + this.px != (y - 1) * 10 + x && !this.inArray(tn, this.pushArray)) {
                    this.T += 1;
                    this.pushArray.push((y - 1) * 10 + x);
                }
            }
            else {
                this.tag += 1;
            }
        }
        else {
            this.tag += 1;
        }
        if (x != 4) {
            if (this.indexArray[y][x + 1] == n && x <= 4 && this.tag == 1) {
                // console.log("right")
                //	right
                this.tag += 1;
                var rn = y * 10 + (x + 1);
                if (y * 10 + (x + 1) != this.py * 10 + (this.px) && !this.inArray(rn, this.pushArray)) {
                    this.R += 1;
                    this.pushArray.push(y * 10 + (x + 1));
                }
            }
            else {
                this.tag += 1;
            }
        }
        else {
            this.tag += 1;
        }
        if (y != 4) {
            if (this.indexArray[y + 1][x] == n && y >= 0 && this.tag == 2) {
                //	bottom
                // console.log("bottom")
                this.tag += 1;
                var bn = (y + 1) * 10 + x;
                if ((y + 1) * 10 + x != (this.py) * 10 + this.px && !this.inArray(bn, this.pushArray)) {
                    // console.log("bottom")
                    this.B += 1;
                    this.pushArray.push((y + 1) * 10 + x);
                }
            }
            else {
                this.tag += 1;
            }
        }
        else {
            this.tag += 1;
        }
        if (x != 0) {
            if (this.indexArray[y][x - 1] == n && x <= 4 && this.tag == 3) {
                // console.log("left")
                //	left
                var ln = y * 10 + x - 1;
                if (y * 10 + x - 1 != this.py * 10 + this.px && !this.inArray(ln, this.pushArray)) {
                    this.L += 1;
                    this.tag = 0;
                    this.pushArray.push(y * 10 + x - 1);
                    return true;
                }
            }
            else {
                this.tag = 0;
                return true;
            }
        }
        else {
            this.tag = 0;
            return true;
        }
        this.tag = 0;
    };
    /**
     * 重复调用寻路规则，直到找到最外面的数字相同的方块
     */
    Interface.prototype.sucendUser = function () {
        for (var i = 0; i < this.pushArray.length; i++) {
            this.seek(this.pushArray[i] % 10, (this.pushArray[i] - this.pushArray[i] % 10) / 10, this.num, this.indexArray);
        }
        if (this.pushArray[0] != null) {
            this.pushArray.push(this.py * 10 + this.px);
        }
        console.log("pushArray1", this.pushArray);
        // $Data.sqeArray = this.pushArray
    };
    /**
     * 遍历要删除的数组 如果传入值有重复返回true 否则返回false
     */
    Interface.prototype.inArray = function (n, a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] == n) {
                return true;
            }
        }
        return false;
    };
    /**
     * 消除规则
     */
    Interface.prototype.clearRule = function (n) {
        if (this.T + this.B >= 2) {
            this.T = 0;
            this.R = 0;
            this.B = 0;
            this.L = 0;
            //	执行下落规则
            // console.log("列满足消除条件")
            return true;
        }
        else if (this.R + this.L >= 2) {
            this.T = 0;
            this.R = 0;
            this.B = 0;
            this.L = 0;
            //	行满足消除条件：3个或者以上相同
            // console.log("行满足消除条件")
            return true;
        }
        else if (this.T >= 1 && this.R >= 1 || this.B >= 1 && this.R >= 1 || this.B >= 1 && this.L >= 1 || this.T >= 1 && this.L >= 1) {
            this.T = 0;
            this.R = 0;
            this.B = 0;
            this.L = 0;
            //	L型满足消除条件
            // console.log("L型满足条件")
            return true;
        }
        else {
            this.T = 0;
            this.R = 0;
            this.B = 0;
            this.L = 0;
            this.pushArray = [];
            return false;
        }
    };
    /**
     * 连锁反应逻辑
     * 1.当用户点击之后执行消除的方法后 那么会获取到所有所关联的位置 坐标
     * 2.将每一个所关联的坐标进行从大到小排序  之后进行模拟寻路操作 如果不可消除的位置  将数组内位置删除掉   直到找到可消除  或者当前数组遍历结束  都没有可消除的内容
     * 3.当找到可消除的内容  那么将所有针对于当前这个可消除的坐标所关联的位置  加入到数组中   然后进行去重    重新模拟2操作
     */
    /**
     * 方块下落规则
     */
    Interface.prototype.dropRule = function (n) {
    };
    return Interface;
}(eui.Component));
__reflect(Interface.prototype, "Interface");
//# sourceMappingURL=Interface.js.map