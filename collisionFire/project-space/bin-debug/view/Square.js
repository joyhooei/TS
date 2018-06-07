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
var Square = (function (_super) {
    __extends(Square, _super);
    function Square(y, x, n) {
        var _this = _super.call(this) || this;
        _this.skinName = "Exml.Square";
        _this.x = x * 92;
        _this.y = y * 92;
        _this.width = 92;
        _this.height = 92;
        if (n === 0) {
            _this.fill.source = "game-square-1_png";
            _this.alpha = 0;
        }
        else {
            _this.fill.source = "game-square-" + Math.log2(n) + "_png";
        }
        return _this;
    }
    return Square;
}(eui.Component));
__reflect(Square.prototype, "Square");
//# sourceMappingURL=Square.js.map