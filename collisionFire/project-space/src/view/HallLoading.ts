/** 
 * Orchid - HallLoading.ts
 * 
 * 大厅 Loading 界面的视图。
 * 
 * @version 20180522
 * @author Winterwrath
 * @license 见 ORCHID-README
 */

class HallLoading extends eui.Component {
  public background: egret.Bitmap
  public textLabel: egret.TextField
  public progressBar: egret.Bitmap
  public progressBarMask: egret.Shape

  public constructor() {
    super()

    // 加载 Hall Loading 的背景图片
    let backgroundLoader = new egret.ImageLoader()
    backgroundLoader.once(egret.Event.COMPLETE, e => {
      let texture = new egret.Texture()
      texture.bitmapData = e.target.data
      this.background = new egret.Bitmap(texture)
      this.addChild(this.background)

      // 加载 Hall Loading 的进度条图片
      let progressLoader = new egret.ImageLoader()
      progressLoader.once(egret.Event.COMPLETE, e => {
        let texture = new egret.Texture()
        texture.bitmapData = e.target.data
        this.progressBar = new egret.Bitmap(texture)
        this.addChild(this.progressBar)
        this.progressBar.x = -442
        this.progressBar.y = 979
        this.onLoadComplete()
      }, this)
      progressLoader.load($data.hallLoadingProgressURL)
    }, this)
    backgroundLoader.load($data.hallLoadingBackgroundURL)
  }

  private onLoadComplete(): void {
    // 添加 Hall Loading 的文本
    this.textLabel = new egret.TextField()
    this.textLabel.x = 0
    this.textLabel.y = 1040
    this.textLabel.width = 750
    this.textLabel.height = 24
    this.textLabel.size = 24
    this.textLabel.fontFamily = $data.fontFamilyContent
    this.textLabel.textColor = 0xffffff
    this.textLabel.textAlign = egret.HorizontalAlign.CENTER
    this.textLabel.text = I18n.hallLoadingInit
    this.addChild(this.textLabel)

    // 添加 Hall Loading 的进度条和遮罩
    this.progressBarMask = new egret.Shape()
    this.progressBarMask.graphics.beginFill(0xff3333)
    this.progressBarMask.graphics.lineTo(120, 978)
    this.progressBarMask.graphics.lineTo(632, 978)
    this.progressBarMask.graphics.curveTo(666, 999, 632, 1020)
    this.progressBarMask.graphics.lineTo(120, 1020)
    this.progressBarMask.graphics.curveTo(85, 999, 120, 978)
    this.progressBarMask.graphics.endFill()
    this.progressBar.mask = this.progressBarMask
    this.addChild(this.progressBarMask)
  }
}
