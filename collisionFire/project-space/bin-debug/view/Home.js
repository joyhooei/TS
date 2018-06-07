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
// This file is exported by Orchid PSD Exporter v1.1.0
var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        var _this = _super.call(this) || this;
        window['wx'].login({
            success: function (res) {
                console.log("login", res);
                $data.code = res.code;
                window['wx'].getUserInfo({
                    success: function (res) {
                        console.log("getUserInfo", res);
                        $data.encryptedData = res.encryptedData,
                            $data.iv = res.iv,
                            $data.userInfo = res.userInfo;
                        Ajax($data.get_openURL, {
                            postData: true,
                            js_code: $data.code,
                            game_id: $data.gameId,
                            Promise: function (res) {
                                console.log("jscode获取token和openid", res);
                                $data.sessionKey = res.session_key,
                                    $data.token = res.token,
                                    $data.openid = res.openid;
                                Ajax($data.loginURL, {
                                    postData: true,
                                    encryptedData: $data.encryptedData,
                                    iv: $data.iv,
                                    session_key: $data.session_key,
                                    game_id: $data.gameId,
                                    Promise: function (res) {
                                        console.log("登录注册接口", res);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
        _this.skinName = 'Exml.Home';
        _this.homeBestScore.text = "" + $data.gameTitleTop;
        _this.homeHallGold.text = "" + $data.goldNumber;
        _this.homeHallMoregame.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            $view.share = new SharingPage();
            $stage.addChild($view.share);
            $view.share.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                $stage.removeChild($view.share);
            }, _this);
        }, _this);
        _this.homeHallHelpIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, _this);
        _this.homeHallRankIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, _this);
        _this.homeHallTutorialIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            $view.tutorial = new Tutorial();
            $stage.addChild($view.tutorial);
        }, _this);
        _this.homeHallPlayIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            $dispatch(TYPES.CREATE_GAME);
        }, _this);
        _this.homeGetGold.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, _this);
        var randomNum = null;
        setInterval(function () {
            randomNum = Math.floor(Math.random() * 2);
            if (randomNum == 0) {
                _this.homeGameTitle.source = "home-game-title_png";
            }
            else if (randomNum == 1) {
                _this.homeGameTitle.source = "home-game-title--active_png";
            }
            else {
                _this.homeGameTitle.source = "home-game-title--disabled_png";
            }
        }, 500);
        egret.Tween.get(_this.homeHallMoregame, { loop: true }).to({ rotation: 10 }, 400).to({ rotation: -10 }, 400);
        egret.Tween.get(_this.homeHallMoregame, { loop: true }).to({ y: 356 }, 6000).to({ y: 306 }, 6000);
        return _this;
    }
    return Home;
}(eui.Component));
__reflect(Home.prototype, "Home");
//# sourceMappingURL=Home.js.map