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
var Stop = (function (_super) {
    __extends(Stop, _super);
    function Stop() {
        var _this = _super.call(this) || this;
        _this.skinName = 'Exml.Stop';
        _this.stopVolume.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, _this);
        _this.stopBackHome.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            $dispatch(TYPES.CREATE_GAME_LOADING);
            $dispatch(TYPES.HALL_INITIALIZE);
            $stage.removeChild($view.stop);
            $stage.removeChild($view.game);
        }, _this);
        _this.stopStopShare.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, _this);
        return _this;
    }
    return Stop;
}(eui.Component));
__reflect(Stop.prototype, "Stop");
//# sourceMappingURL=Stop.js.map