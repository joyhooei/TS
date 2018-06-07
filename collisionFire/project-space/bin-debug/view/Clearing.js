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
var Clearing = (function (_super) {
    __extends(Clearing, _super);
    function Clearing() {
        var _this = _super.call(this) || this;
        _this.skinName = 'Exml.Clearing';
        _this.clearingGameReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            $stage.removeChild($view.clear);
        }, _this);
        _this.clearingChallenge.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, _this);
        _this.clearingMoreGame.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, _this);
        _this.clearingShareRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, _this);
        _this.clearingRankList.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, _this);
        _this.clearingPlayAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            $stage.removeChild($view.game);
            $dispatch(TYPES.GAME_INITIALIZE);
            $stage.removeChild($view.clear);
            // this.parent.removeChild(this)
            // $dispatch(TYPES.GAME_INITIALIZE)
        }, _this);
        return _this;
    }
    return Clearing;
}(eui.Component));
__reflect(Clearing.prototype, "Clearing");
//# sourceMappingURL=Clearing.js.map