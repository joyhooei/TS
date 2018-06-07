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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.collisionArray = []; // 碰撞数组
        _this.syntheticNumber = 0; // 合成次数
        _this.skinName = "Exml.Game";
        _this.init($data.pageX, $data.pageY);
        _this.gameStopIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            $view.stop = new Stop();
            $stage.addChild($view.stop);
            $view.stop.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                $stage.removeChild($view.stop);
            }, _this);
        }, _this);
        _this.gameTitleTop.text = "top: " + $data.gameTitleTop;
        _this.gameTitleScore.text = "" + $data.gameTitleScore;
        return _this;
    }
    /**
    * 游戏主页面
    * @param x 方块行个数
    * @param y 方块列个数
    */
    Game.prototype.init = function (rx, ry) {
        var _this = this;
        var squareList = [];
        for (var i = 0; i < ry; i++) {
            squareList[i] = [];
            for (var j = 0; j < rx; j++) {
                squareList[i][j] = this.squareRandom();
            }
        }
        Data.observe('squareList', function (newValue) {
            _this.gameChessboard.removeChildren();
            for (var i = 0; i < $data.squareList.length; i++) {
                for (var j = 0; j < $data.squareList[i].length; j++) {
                    $data.squareView[i]["" + j] = new Square(i, j, newValue[i][j]);
                    _this.gameChessboard.addChild($data.squareView[i]["" + j]);
                }
            }
        }, 3, true);
        $data.squareList = squareList;
        this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (e.target.parent instanceof Square) {
                //	逻辑操作 检查点击方块是否满足条件
                _this.stageX = e.target.parent.x; // 在视图层上的X轴坐标
                _this.stageY = e.target.parent.y; // 在视图层上的Y轴坐标
                var arrayKey1 = _this.stageY / 92; // $data.squareList数组的第一维数组的key
                var arrayKey2 = _this.stageX / 92; // $data.squareList数组的第二维数组的key
                _this.findSquare(arrayKey1, arrayKey2);
            }
        }, this.gameChessboard);
        this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            if (e.target.parent instanceof Square) {
                e.target.parent.fill.source = e.target.parent.fill.source.replace(/(\d)_png$/, '$1--active_png');
            }
        }, this.gameChessboard);
        this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            if (e.target.parent instanceof Square) {
                e.target.parent.fill.source = e.target.parent.fill.source.replace(/--active_png$/, '_png');
            }
        }, this.gameChessboard);
        this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function (e) {
            if (e.target.parent instanceof Square) {
                e.target.parent.fill.source = e.target.parent.fill.source.replace(/--active_png$/, '_png');
            }
        }, this.gameChessboard);
        this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_CANCEL, function (e) {
            if (e.target.parent instanceof Square) {
                e.target.parent.fill.source = e.target.parent.fill.source.replace(/--active_png$/, '_png');
            }
        }, this.gameChessboard);
    };
    /**
     * 寻找目标方块的方法
     */
    Game.prototype.findSquare = function (x, y) {
        //	这个寻找规则需要更改 4个for循环寻找目标方块
        //	有一个arrayKey1 = 0 和 arrayKey1 = 10 的情况
        this.collisionArray = [];
        var squareList = $data.squareList;
        var level = squareList[x][y]; // 所点击方块的level
        if (squareList[x][y] !== 0) {
            //	点击方块 生成一个方块
            this.creatNumber();
        }
        else {
            //	上寻
            if (x != 0) {
                for (var i = x - 1; i >= 0; i--) {
                    if (squareList[i][y] !== 0) {
                        this.collisionArray.push(i * 10 + y);
                    }
                }
            }
            //	右训
            if (y != 7) {
                for (var i = y + 1; i <= 7; i++) {
                    if (squareList[x][i] !== 0) {
                        this.collisionArray.push(x * 10 + i);
                    }
                }
            }
            // console.log(y)
            //	下寻
            if (x != 9) {
                for (var i = x + 1; i <= 9; i++) {
                    if (squareList[i][y] !== 0) {
                        this.collisionArray.push(i * 10 + y);
                    }
                }
            }
            //	左寻
            if (y != 0) {
                for (var i = y - 1; i >= 0; i--) {
                    if (squareList[x][i] !== 0) {
                        this.collisionArray.push(x * 10 + i);
                    }
                }
            }
        }
        // console.log("vvvvvvv", this.collisionArray)
        this.disposeCollisionArrat(x, y, this.collisionArray);
    };
    /**
     * 对碰撞数组进行处理
     * @param x 点击方块的一维数组的下标
     * @param y 点击方块的二维数组的下标
     * @param levelArray 从$data.squareList中提出的 等级数组	levelArray的key 等于this.collisionArray数组的key
     * @param keyArray 存放相同level的key
     */
    Game.prototype.disposeCollisionArrat = function (x, y, disposeArray) {
        var _this = this;
        var a = [];
        var levelArray = [];
        var keyArray = [];
        a = disposeArray;
        // this.collisionArray
        //	生成一个level数组 判断哪些方块需要合成
        for (var i = 0; i < a.length; i++) {
            //  ox 从a中提出的 一维数组的下标
            //  oy 从a中提出的 二维数组的下标
            var ox = (a[i] - a[i] % 10) / 10;
            var oy = a[i] % 10;
            var level = $data.squareList[ox][oy];
            levelArray.push(level);
        }
        //	生成key数组 存放需要合成的方块的key
        var initNumber = Number(levelArray.slice().sort(function (a, b) { return b - a; }).toString().concat(',0,0,').match(/(\d+),\1,/)[1]);
        for (var i = 0; i < levelArray.length; i++) {
            if (levelArray[i] === initNumber) {
                keyArray.push(i);
            }
        }
        //	判断可以合成的方块之间有没有挡着的方块
        var disposeSquare;
        // console.log("删除操作之前的数组", a)
        for (var i = keyArray.length - 1; i >= 0; i--) {
            //	ox disposeSquare数组中提出的 一维数组的下标
            //	ox disposeSquare数组中提出的 二维数组的下标
            disposeSquare = a[keyArray[i]];
            // console.log("disposeSquare", disposeSquare)
            var ox = (disposeSquare - disposeSquare % 10) / 10;
            var oy = disposeSquare % 10;
            // console.log(ox, oy)
            // console.log(x, y)
            if (oy === y) {
                //	Y轴方向
                if (ox < x) {
                    //	Y轴正方向
                    // console.log("Y轴正方向")
                    for (var j = x - 1; j > ox; j--) {
                        if ($data.squareList[j][y] !== initNumber && $data.squareList[j][y] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
                else if (ox > x) {
                    //	Y轴负方向
                    // console.log("Y轴负方向")
                    for (var k = x + 1; k < ox; k++) {
                        if ($data.squareList[k][y] !== initNumber && $data.squareList[k][y] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
            }
            else if (ox === x) {
                //	X轴方向
                if (oy > y) {
                    //	X轴正方向
                    // console.log("X轴正方向")
                    for (var m = y + 1; m < oy; m++) {
                        if ($data.squareList[x][m] !== initNumber && $data.squareList[x][m] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
                else if (oy < y) {
                    //	X轴负方向
                    // console.log("X轴负方向")
                    for (var n = y - 1; n > oy; n--) {
                        if ($data.squareList[x][n] !== initNumber && $data.squareList[x][n] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
            }
        }
        var excessiveArray = [];
        for (var i = 0; i < a.length; i++) {
            var ox = (a[i] - a[i] % 10) / 10;
            var oy = a[i] % 10;
            if (initNumber === $data.squareList[ox][oy]) {
                excessiveArray.push(a[i]);
            }
        }
        a = excessiveArray;
        // console.log("删除操作之后的数组", a)
        if (a.length <= 1 && $data.squareList[x][y] === 0) {
            //	随机生成一个方块
            // this.disposeCollisionArrat(x, y, this.collisionArray)
            this.floorRepeat(this.collisionArray, x, y, initNumber);
        }
        else {
            // console.log("最终碰撞数组", a)
            var key = true;
            if (key) {
                var _loop_1 = function (i) {
                    //	进行操作
                    var ox = (a[i] - a[i] % 10) / 10;
                    var oy = a[i] % 10;
                    egret.Tween.get($data.squareView[ox][oy]).to({ x: this_1.stageX, y: this_1.stageY }, 250).call(function () {
                        egret.Tween.get($data.squareView[ox][oy]["fill"]).to({ scaleX: 0, scaleY: 0 }, 250).call(function () {
                            var squareList2 = $data.squareList;
                            squareList2[ox][oy] = 0;
                            $data.squareList = squareList2;
                        });
                    });
                };
                var this_1 = this;
                for (var i = 0; i < a.length; i++) {
                    _loop_1(i);
                }
                var score = a.length * initNumber;
                var level = this.level(score);
                // console.log("level", level)
                var totalScore = $data.score;
                var maxScore = void 0;
                //	当前游戏总分
                if ($data.squareList[x][y] !== 0) {
                    totalScore += 0;
                    $data.score = totalScore;
                }
                else {
                    totalScore += 10 * Math.pow(level, 2);
                    $data.score = totalScore;
                    //	点击次数
                    this.syntheticNumber += 1;
                    // console.log("10 * Math.pow(level, 2)", 10 * Math.pow(level, 2))
                    // console.log("$data.maxScore", $data.maxScore)
                    if (10 * Math.pow(level, 2) > $data.maxScore) {
                        maxScore = 10 * Math.pow(level, 2);
                        $data.maxScore = maxScore;
                    }
                }
                this.gameTitleScore.text = "" + $data.score;
                var squareList1_1 = $data.squareList;
                if ($data.squareList[x][y] === 0) {
                    var timeOut = null;
                    timeOut = setTimeout(function () {
                        $data.squareList = squareList1_1;
                        _this.creatNumber();
                    }, 600);
                    squareList1_1[x][y] = Math.pow(2, level);
                }
            }
            else {
                this.creatNumber();
            }
        }
    };
    /**
     * 解决点击位置大的方块被挡住 不能让小的合成的功能
     */
    Game.prototype.floorRepeat = function (array, x, y, n) {
        var _this = this;
        var a = [];
        var initNumber;
        var levelArray = [];
        var keyArray = [];
        var aaaArray = [];
        a = array;
        // console.log("a", a)
        // console.log("n", n)
        //	生成一个level数组 判断那些方块需要合成
        for (var i = 0; i < a.length; i++) {
            //  ox 从a中提出的 一维数组的下标
            //  oy 从a中提出的 二维数组的下标
            var ox = (a[i] - a[i] % 10) / 10;
            var oy = a[i] % 10;
            var level = $data.squareList[ox][oy];
            levelArray.push(level);
        }
        // console.log("levelArray", levelArray)
        for (var i = 0; i < levelArray.length; i++) {
            if (levelArray[i] === n) {
                levelArray[i] = 0;
            }
        }
        // console.log("levelArray1", levelArray)
        //	生成key数组 存放需要合成的方块的key
        initNumber = Number(levelArray.slice().sort(function (a, b) { return b - a; }).toString().concat(',0,0,').match(/(\d+),\1,/)[1]);
        // console.log("initNumber", initNumber)
        for (var i = 0; i < levelArray.length; i++) {
            if (levelArray[i] === initNumber) {
                keyArray.push(i);
            }
        }
        //	判断可以合成的方块之间有没有挡着的方块
        var disposeSquare;
        // console.log("删除操作之前的数组", a)
        for (var i = keyArray.length - 1; i >= 0; i--) {
            // console.log("走")
            //	ox disposeSquare数组中提出的 一维数组的下标
            //	ox disposeSquare数组中提出的 二维数组的下标
            disposeSquare = a[keyArray[i]];
            // console.log("disposeSquare", disposeSquare)
            var ox = (disposeSquare - disposeSquare % 10) / 10;
            var oy = disposeSquare % 10;
            // console.log(ox, oy)
            // console.log(x, y)
            if (oy === y) {
                //	Y轴方向
                if (ox < x) {
                    //	Y轴正方向
                    // console.log("Y轴正方向")
                    for (var j = x - 1; j > ox; j--) {
                        if ($data.squareList[j][y] !== initNumber && $data.squareList[j][y] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
                else if (ox > x) {
                    //	Y轴负方向
                    // console.log("Y轴负方向")
                    for (var k = x + 1; k < ox; k++) {
                        if ($data.squareList[k][y] !== initNumber && $data.squareList[k][y] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
            }
            else if (ox === x) {
                //	X轴方向
                if (oy > y) {
                    //	X轴正方向
                    // console.log("X轴正方向")
                    for (var m = y + 1; m < oy; m++) {
                        if ($data.squareList[x][m] !== initNumber && $data.squareList[x][m] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
                else if (oy < y) {
                    //	X轴负方向
                    // console.log("X轴负方向")
                    for (var n_1 = y - 1; n_1 > oy; n_1--) {
                        if ($data.squareList[x][n_1] !== initNumber && $data.squareList[x][n_1] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
            }
        }
        // console.log("删除操作之后的数组", a)
        var excessiveArray = [];
        for (var i = 0; i < a.length; i++) {
            var ox = (a[i] - a[i] % 10) / 10;
            var oy = a[i] % 10;
            if (initNumber === $data.squareList[ox][oy]) {
                excessiveArray.push(a[i]);
            }
        }
        a = excessiveArray;
        //	asdasdasdasdasdadwd
        // console.log("a", a)
        if (array.length == 0) {
            // console.log("走array.length == 0")
            this.creatNumber();
        }
        else if (n == 0) {
            this.creatNumber();
        }
        else if (initNumber !== n || initNumber === 0 && array != []) {
            // console.log("走initNumber !== n")
            // console.log("a.lenth", a.length)
            if (a.length <= 1 && $data.squareList[x][y] === 0) {
                // console.log("走a.length <= 1")
                this.floorRepeat(array, x, y, initNumber);
                this.creatNumber();
            }
            else {
                // console.log("最终碰撞数组", a)
                //	改变没有相交的点还能合成的功能
                var key = void 0;
                key = true;
                if (key) {
                    for (var x_1 = 0; x_1 < a.length; x_1++) {
                        for (var y_1 = 0; y_1 < a.length; y_1++) {
                        }
                    }
                    var _loop_2 = function (i) {
                        //	进行操作
                        var ox = (a[i] - a[i] % 10) / 10;
                        var oy = a[i] % 10;
                        egret.Tween.get($data.squareView[ox][oy]).to({ x: this_2.stageX, y: this_2.stageY }, 250).call(function () {
                            egret.Tween.get($data.squareView[ox][oy]["fill"]).to({ scaleX: 0, scaleY: 0 }, 250).call(function () {
                                var squareList2 = $data.squareList;
                                squareList2[ox][oy] = 0;
                                $data.squareList = squareList2;
                            });
                        });
                    };
                    var this_2 = this;
                    for (var i = 0; i < a.length; i++) {
                        _loop_2(i);
                    }
                    var score = a.length * initNumber;
                    var level = this.level(score);
                    var totalScore = $data.score;
                    var maxScore = void 0;
                    //	当前游戏总分
                    if ($data.squareList[x][y] !== 0) {
                        totalScore += 0;
                        $data.score = totalScore;
                    }
                    else {
                        totalScore += 10 * Math.pow(level, 2);
                        $data.score = totalScore;
                        //	点击次数
                        this.syntheticNumber += 1;
                        if (10 * Math.pow(level, 2) > $data.maxScore) {
                            maxScore = 10 * Math.pow(level, 2);
                            $data.maxScore = maxScore;
                        }
                    }
                    this.gameTitleScore.text = "" + $data.score;
                    var squareList1_2 = $data.squareList;
                    if ($data.squareList[x][y] === 0) {
                        var timeOut = null;
                        timeOut = setTimeout(function () {
                            $data.squareList = squareList1_2;
                            _this.creatNumber();
                        }, 600);
                        squareList1_2[x][y] = Math.pow(2, level);
                    }
                }
                else {
                    this.creatNumber();
                }
            }
        }
        else {
            this.floorRepeat(array, x, y, initNumber);
        }
    };
    /**
     * 根据方块分数计算方块等级
     */
    Game.prototype.level = function (n) {
        var level = Math.floor(Math.log2(n));
        return level;
    };
    /**
     * 点击操作生成方块
     */
    Game.prototype.creatSquare = function () {
        var creatArray = [];
        for (var i = 0; i < $data.squareList.length; i++) {
            for (var j = 0; j < $data.squareList[i].length; j++) {
                if ($data.squareList[i][j] === 0) {
                    creatArray.push(i * 10 + j);
                }
            }
        }
        var creatLenth = creatArray.length;
        if (creatLenth == 0) {
            var level = this.level($data.maxScore);
            // console.log("maxScore", $data.maxScore)
            var gold = $data.gold;
            if ($data.maxScore === 0) {
                level = 2;
            }
            gold = this.syntheticNumber + 10 * (level - 2);
            $data.gold = gold;
            console.log("$data.maxScore", $data.maxScore);
            console.log("最高等级", level - 2);
            console.log("获得金币", $data.gold);
            $view.clear = new Clearing;
            $stage.addChild($view.clear);
            //	清空上局金币
            $data.maxScore = 0;
            console.log("gold", $data.gold);
        }
        var randomLent = Math.floor(Math.random() * (creatLenth - 1));
        var randomNumber = creatArray[randomLent];
        var randomX = (randomNumber - randomNumber % 10) / 10;
        var randomY = randomNumber % 10;
        var squareList4 = $data.squareList;
        squareList4[randomX][randomY] = this.againRandom();
        $data.squareList = squareList4;
    };
    /**
     * 方块生成权重
     */
    Game.prototype.squareRandom = function () {
        var rand = Math.random();
        if (rand <= .83) {
            return 0;
        }
        else if (rand > .83 && rand <= .89) {
            return 2;
        }
        else if (rand > .89 && rand < .93) {
            return 4;
        }
        else if (rand > .93 && rand < .96) {
            return 8;
        }
        else if (rand > .96 && rand < .99) {
            return 16;
        }
        else {
            return 32;
        }
    };
    /**
     * 方块重新生成权重
     */
    Game.prototype.againRandom = function () {
        var rand = Math.random();
        if (rand <= .35) {
            return 2;
        }
        else if (rand > .35 && rand <= .58) {
            return 4;
        }
        else if (rand > .58 && rand < .76) {
            return 8;
        }
        else if (rand > .76 && rand < .89) {
            return 16;
        }
        else if (rand > .89 && rand < 1) {
            return 32;
        }
    };
    /**
     * 方块生成
     */
    Game.prototype.creatNumber = function () {
        var num = Math.floor(Math.random() * 2);
        for (var i = 0; i <= num; i++) {
            this.creatSquare();
        }
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map