/**
 * Orchid - Main.ts
 *
 * 本项目的入口类。
 * 声明了 $main 与 $stage 两个变量以便调用。
 *
 * @const $main: Main
 * 指向 Main 类的实例
 * @const $stage: egret.Stage
 * 指向舞台的实例
 *
 * @version 20180521
 * @author Winterwrath
 * @license 见 EGRET-README 和 ORCHID-README
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
var $main = null;
var $stage = null;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        // 声明 $main 和 $stage 两个全局变量
        $main = this;
        $stage = new eui.Component();
        // Egret 自带的生命周期系统
        egret.lifecycle.onPause = function () { };
        egret.lifecycle.onResume = function () { };
        // 注册 AssetAdapter 和 ThemeAdapter
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        var $temp = {};
        // 注册声明周期函数
        Object.freeze(TYPES);
        Object.keys(TYPES).forEach(function (v) {
            $hub.addEventListener(v, Router[v], RouterContext);
        });
        // 适配 iPhone X 的屏幕
        this.addChild($stage);
        Warn($data.versionInfomation);
        if ($main.stage.$stageHeight <= 1335) {
            Log('Adapt to iPhone 5/SE/6/6 Plus/7/7 Plus/8/8 Plus');
            $stage.y = -154;
        }
        else if ($main.stage.$stageHeight <= 1467) {
            Log('Adapt to ?????');
            $stage.y = -88;
        }
        else {
            Log('Adapt to iPhone X');
            $stage.y = 0;
        }
        // 开始创建大厅的 Loading
        $dispatch(TYPES.CREATE_HALL_LOADING);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
window['$main'] = $main;
window['$stage'] = $stage;
//# sourceMappingURL=Main.js.map