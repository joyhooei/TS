/**
 * Orchid - HallLoading.ts
 *
 * 大厅 Loading 界面的视图。
 *
 * @version 20180522
 * @author Winterwrath
 * @license 见 ORCHID-README
 */
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
var HallLoading = (function (_super) {
    __extends(HallLoading, _super);
    function HallLoading() {
        var _this = _super.call(this) || this;
        // 加载 Hall Loading 的背景图片
        var backgroundLoader = new egret.ImageLoader();
        backgroundLoader.once(egret.Event.COMPLETE, function (e) {
            var texture = new egret.Texture();
            texture.bitmapData = e.target.data;
            _this.background = new egret.Bitmap(texture);
            _this.addChild(_this.background);
            // 加载 Hall Loading 的进度条图片
            var progressLoader = new egret.ImageLoader();
            progressLoader.once(egret.Event.COMPLETE, function (e) {
                var texture = new egret.Texture();
                texture.bitmapData = e.target.data;
                _this.progressBar = new egret.Bitmap(texture);
                _this.addChild(_this.progressBar);
                _this.progressBar.x = -442;
                _this.progressBar.y = 979;
                _this.onLoadComplete();
            }, _this);
            progressLoader.load($data.hallLoadingProgressURL);
        }, _this);
        backgroundLoader.load($data.hallLoadingBackgroundURL);
        return _this;
    }
    HallLoading.prototype.onLoadComplete = function () {
        // 添加 Hall Loading 的文本
        this.textLabel = new egret.TextField();
        this.textLabel.x = 0;
        this.textLabel.y = 1040;
        this.textLabel.width = 750;
        this.textLabel.height = 24;
        this.textLabel.size = 24;
        this.textLabel.fontFamily = $data.fontFamilyContent;
        this.textLabel.textColor = 0xffffff;
        this.textLabel.textAlign = egret.HorizontalAlign.CENTER;
        this.textLabel.text = I18n.hallLoadingInit;
        this.addChild(this.textLabel);
        // 添加 Hall Loading 的进度条和遮罩
        this.progressBarMask = new egret.Shape();
        this.progressBarMask.graphics.beginFill(0xff3333);
        this.progressBarMask.graphics.lineTo(120, 978);
        this.progressBarMask.graphics.lineTo(632, 978);
        this.progressBarMask.graphics.curveTo(666, 999, 632, 1020);
        this.progressBarMask.graphics.lineTo(120, 1020);
        this.progressBarMask.graphics.curveTo(85, 999, 120, 978);
        this.progressBarMask.graphics.endFill();
        this.progressBar.mask = this.progressBarMask;
        this.addChild(this.progressBarMask);
    };
    return HallLoading;
}(eui.Component));
__reflect(HallLoading.prototype, "HallLoading");
//# sourceMappingURL=HallLoading.js.map