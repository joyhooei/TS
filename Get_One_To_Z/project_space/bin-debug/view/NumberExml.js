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
var NumberExml = (function (_super) {
    __extends(NumberExml, _super);
    function NumberExml(n, array) {
        var _this = _super.call(this) || this;
        _this.skinName = "Exml.NumberExml";
        _this.changeImage(n);
        _this.indexArray = array;
        return _this;
    }
    NumberExml.prototype.changeImage = function (n) {
        switch (n) {
            case 1:
                this.changeImageRes.source = RES.getRes("interface-number-1_png");
                break;
            case 2:
                this.changeImageRes.source = RES.getRes("interface-number-2_png");
                break;
            case 3:
                this.changeImageRes.source = RES.getRes("interface-number-3_png");
                break;
            case 4:
                this.changeImageRes.source = RES.getRes("interface-number-4_png");
                break;
            case 5:
                this.changeImageRes.source = RES.getRes("interface-number-5_png");
                break;
            case 6:
                this.changeImageRes.source = RES.getRes("interface-number-6_png");
                break;
            case 7:
                this.changeImageRes.source = RES.getRes("interface-number-7_png");
                break;
            case 8:
                this.changeImageRes.source = RES.getRes("interface-number-8_png");
                break;
            case 9:
                this.changeImageRes.source = RES.getRes("interface-number-9_png");
                break;
            case 10:
                this.changeImageRes.source = RES.getRes("interface-number-10_png");
                break;
            case 11:
                this.changeImageRes.source = RES.getRes("interface-number-11_png");
                break;
            case 12:
                this.changeImageRes.source = RES.getRes("interface-number-12_png");
                break;
            case 13:
                this.changeImageRes.source = RES.getRes("interface-number-13_png");
                break;
            case 14:
                this.changeImageRes.source = RES.getRes("interface-number-14_png");
                break;
            case 15:
                this.changeImageRes.source = RES.getRes("interface-number-15_png");
                break;
        }
    };
    return NumberExml;
}(eui.Component));
__reflect(NumberExml.prototype, "NumberExml");
//# sourceMappingURL=NumberExml.js.map