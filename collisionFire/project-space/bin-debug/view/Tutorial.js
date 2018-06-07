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
var Tutorial = (function (_super) {
    __extends(Tutorial, _super);
    function Tutorial() {
        var _this = _super.call(this) || this;
        _this.skinName = 'Exml.Tutorial';
        _this.tutorialHallReturnicon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            $dispatch(TYPES.HALL_INITIALIZE);
            $stage.removeChild($view.tutorial);
        }, _this);
        return _this;
    }
    return Tutorial;
}(eui.Component));
__reflect(Tutorial.prototype, "Tutorial");
//# sourceMappingURL=Tutorial.js.map