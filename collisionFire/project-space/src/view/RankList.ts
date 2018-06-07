// This file is exported by Orchid PSD Exporter v1.1.0
class RankList extends eui.Component {
  public rankMask: eui.Rect
  public rankRankGroup: eui.Group
  public rankBackground: eui.Image
  public rankPrevious: eui.Button
  public rankNext: eui.Button
  public rankBack: eui.Button
  public rankTitleGroup: eui.Image
  public rankTitleFriend: eui.Image
  public rankMyGroup: eui.Group
  public rankMyBackground: eui.Image
  public rankMyGroupButton: eui.Button
  public rankMyTitle: eui.Label

  public isGroupRankList: boolean = false
  public sharedCanvas: egret.Bitmap

  public constructor() {
    super()
    this.skinName = 'Exml.RankList'

    let openDataContext = window['wx'].getOpenDataContext()
    openDataContext.canvas.height = $main.stage.$stageHeight
    openDataContext.canvas.width = $main.stage.$stageWidth

    const bitmapdata = new egret.BitmapData(window["sharedCanvas"])
    bitmapdata.$deleteSource = false
    const texture = new egret.Texture()
    texture._setBitmapData(bitmapdata)
    this.sharedCanvas = new egret.Bitmap(texture)
    this.sharedCanvas.width = $main.stage.$stageWidth
    this.sharedCanvas.height = $main.stage.$stageHeight
    this.addChild(this.sharedCanvas)

    egret.startTick((timeStarmp: number) => {
      egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture)
      bitmapdata.webGLTexture = null
      return false
    }, this)

    this.rankPrevious.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
      openDataContext.postMessage({
        isGroupRankList: this.isGroupRankList,
        isRequest: false,
        type: 'previous'
      })
    }, this)

    this.rankNext.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
      openDataContext.postMessage({
        isGroupRankList: this.isGroupRankList,
        isRequest: false,
        type: 'next'
      })
    }, this)

    this.rankBack.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
      if (this.isGroupRankList) {
        this.isGroupRankList = false
        this.rankMyGroup.visible = true
        this.rankTitleGroup.visible = false
        this.rankTitleFriend.visible = true
        openDataContext.postMessage({
          isGroupRankList: this.isGroupRankList,
          isRequest: true
        })
      } else {
        openDataContext.postMessage({
          isGroupRankList: this.isGroupRankList,
          isRequest: false,
          type: 'exit'
        })
        $stage.removeChild($view.rankList)
      }
    }, this)

    this.rankMyGroupButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
      new Promise((resolve, reject) => {
        window['wx'].shareAppMessage({
          title: $data.shareTextList[Math.floor(Math.random() * $data.shareTextList.length)],
           imageUrl: $data.shareImage,
          success(res) { resolve(res['shareTickets'][0]) },
          fail(err) { reject(err) }
        })
      }).then(shareTicket => {
        this.isGroupRankList = true
        this.rankMyGroup.visible = false
        this.rankTitleGroup.visible = true
        this.rankTitleFriend.visible = false
        openDataContext.postMessage({
          isGroupRankList: this.isGroupRankList,
          isRequest: true,
          shareTicket
        })
      }).catch(e => Log(e))
    }, this)

    openDataContext.postMessage({
      isGroupRankList: this.isGroupRankList,
      isRequest: true
    })
  }
}
