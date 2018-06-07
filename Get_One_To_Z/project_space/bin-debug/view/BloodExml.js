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
var BloodExml = (function (_super) {
    __extends(BloodExml, _super);
    function BloodExml() {
        var _this = _super.call(this) || this;
        _this.skinName = "Exml.BloodExml";
        return _this;
    }
    /**
     * @param type   1 加  2 减
     */
    BloodExml.prototype.InitChangeBlood = function (type) {
        switch (type) {
            case 1:
                if ($Data.bloodNum < 5) {
                    $Data.bloodNum++;
                }
                for (var i = 1; i <= $Data.AbsBloodNum; i++) {
                    if (i <= $Data.bloodNum) {
                        this["interfaceBlood" + i].visible = true;
                    }
                    else {
                        this["interfaceBlood" + i].visible = false;
                    }
                }
                break;
            case 2:
                if ($Data.bloodNum > 0) {
                    $Data.bloodNum--;
                    for (var i = 1; i <= $Data.AbsBloodNum; i++) {
                        if (i <= $Data.bloodNum) {
                            this["interfaceBlood" + i].visible = true;
                        }
                        else {
                            this["interfaceBlood" + i].visible = false;
                        }
                    }
                }
                else {
                    console.log("game_over");
                }
                break;
        }
    };
    return BloodExml;
}(eui.Component));
__reflect(BloodExml.prototype, "BloodExml");
//# sourceMappingURL=BloodExml.js.map