/** 
 * The view of share.
 * 分享功能的视图。
 * 
 * @version 20180413
 * @author Winterwrath
 * @license /license
 */

class Share extends eui.Component {

  public shareSuccessClickMask: eui.Rect

  public shareCoin0: eui.Image
  public shareCoin1: eui.Image
  public shareCoin2: eui.Image
  public shareCoin3: eui.Image
  public shareCoin4: eui.Image
  public shareCoin5: eui.Image
  public shareCoin6: eui.Image
  public shareCoin7: eui.Image
  public shareCoin8: eui.Image
  public shareCoin9: eui.Image
  public shareCoin10: eui.Image
  public shareCoin11: eui.Image
  public shareCoinA: eui.Image
  public shareCoinB: eui.Image
  public shareCoinC: eui.Image
  public shareCoinD: eui.Image

  public constructor() {
    super()
    this.skinName = 'Exml.Share'
    for (let i = 0; i < 12; i++) {
      egret.Tween.get(this[`shareCoin${i}`]).wait(i * 100).to({ y: this[`shareCoin${i}`].y + 940 }, (Math.random() * 500 | 0) + 200, egret.Ease.cubicOut).call(() => {
        egret.Tween.get(this[`shareCoin${i}`], { loop: true }).to({ alpha: 0 }, 1000)
      })
    }
    egret.Tween.get(this.shareCoinA).wait(300).to({ alpha: 1 }, 200)
    egret.Tween.get(this.shareCoinB).wait(600).to({ alpha: 1 }, 200)
    egret.Tween.get(this.shareCoinC).wait(900).to({ alpha: 1 }, 200)

    var that=this;
    setTimeout(function () {
        if (that.parent) {
          that.parent.removeChild(that)
        }
    }, 2500)
    this.shareSuccessClickMask.once(egret.TouchEvent.TOUCH_TAP, () => {
      egret.Tween.get(this).to({ alpha: 0 }, 100).call(() => {
        for (let i = 0; i < 12; i++) {
          egret.Tween.removeTweens(this[`shareCoin${i}`])
        }
        if (this.parent) {
          this.parent.removeChild(this)
        }

      })
    }, this)


  }
}
