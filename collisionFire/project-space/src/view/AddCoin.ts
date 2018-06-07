// This file is exported by Orchid PSD Exporter v1.1.0
class AddCoin extends eui.Component {
  public addMask: eui.Rect
  public addBackground: eui.Image
  public addTuijian: eui.Button
  public addCoinBox: eui.Image
  public addCoin: eui.Image
  public addCoinText: eui.Label
  public addNumber: number = 0
  public constructor() {
    super()
    this.skinName = 'Exml.AddCoin'
    this.addTuijian.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
      window['wx'].shareAppMessage({
        title: $data.shareTextList[Math.floor(Math.random() * $data.shareTextList.length)],
        imageUrl: $data.shareImage,
        success: res => {
          this.saveScore()
          res['shareTickets'][0]
          $view.shareing = new Share()
          $stage.addChild($view.shareing)
        }
      })
    }, this)

    this.addMask.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      this.parent.removeChild(this)
    }, this)
  }

  public saveScore(): void {
    Ajax($data.goldURL, {
      postData: true,
      user_id: $data.userID,
      game_id: $data.gameId,
      type: 1,
      token: $data.token,
      num: $data.shareAddGold,
      sign: $data.MD5.hex_md5('game_id=' + $data.gameId + '&num=' + $data.shareAddGold + '&postData=' + true + '&score=' + $data.score + '&token=' + $data.token + '&type=' + 1 + '&user_id=' + $data.userID),
      score: $data.score
    }).then(res => {
      console.log("share提交成绩", res)
      if (res["error"] == 0) {
        $data.goldNumber += $data.shareAddGold
        $view.home.homeHallGold.text = `${$data.goldNumber}`
        window['wx'].showToast({
            title: "分享成功！！！",
            icon: "none"
          })
        $stage.removeChild($view.addIcon)
        // $dispatch(TYPES.HALL_INITIALIZE)
      } else if (res["error"] == 1) {
        this.addNumber++
        if (this.addNumber < 7) {
          window['wx'].showToast({
            title: "获取信息失败，正在重新获取...",
            icon: "none"
          })
          var key = setInterval(() => {
            clearInterval(key)
            this.saveScore()
          }, 1000)
        } else {
          window['wx'].showToast({
            title: "链接超时，请检查网络",
            icon: "none"
          })
        }
      } else if (res["error"] == 2) {
        window['wx'].showToast({
          title: "链接超时，请检查网络",
          icon: "none"
        })
        $view.home.homeHallPlayIcon.enabled = false
      }
    })
  }

}
