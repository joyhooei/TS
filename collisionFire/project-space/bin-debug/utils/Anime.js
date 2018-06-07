/**
 * Orchid - Anime.ts
 *
 * 动画与效果工具类。
 *
 * @function Anime.fadeIn(item: egret.DisplayObjectContainer): void
 * 淡入显示该对象，一般用于制作添加新视图时的过渡效果
 *
 * @version 20180525
 * @author Winterwrath
 * @license 见 ORCHID-README
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Anime = (function () {
    function Anime() {
    }
    Anime.fadeIn = function (item) {
        Log('Anime', 'Fade in:', item.constructor.name);
        item.alpha = 0;
        egret.Tween.get(item).to({ alpha: 1 }, 100);
    };
    return Anime;
}());
__reflect(Anime.prototype, "Anime");
window['Anime'] = Anime;
//# sourceMappingURL=Anime.js.map