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

class Anime {
  public static fadeIn(item: egret.DisplayObjectContainer): void {
    Log('Anime', 'Fade in:', item.constructor.name)
    item.alpha = 0
    egret.Tween.get(item).to({ alpha: 1 }, 100)
  }
}

window['Anime'] = Anime
