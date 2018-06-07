// This file is exported by Orchid PSD Exporter v1.1.0
class Stop extends eui.Component {
  public stopStopMask: eui.Rect
  public stopStopBg: eui.Image
  public stopVolume: eui.Button
  public stopBackHome: eui.Button
  public stopStopShare: eui.Button
  public addNumber: number = 0
  public musicImg: eui.Image
  public constructor() {
    super()
    this.skinName = 'Exml.Stop'
    this.musicImg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {

      // $stage.addChild($view.stop)
      if ($data.key) {
        this.musicImg.source = "stop-volume--active_png"
        console.log("声音已关闭")
        AudioManager.stopMusic()
        AudioManager.isMusicAllowed = false
        AudioManager.isSoundAllowed = false
        window['wx'].showToast({
          title: "声音已关闭",
          icon: "none"
        })
        $data.key = false
        console.log("声音已关闭", $data.key)
      } else if (!$data.key) {
        this.musicImg.source = "stop-volume_png"
        console.log("声音已开启")
        window['wx'].showToast({
          title: "声音已开启",
          icon: "none"
        })
        AudioManager.isMusicAllowed = true
        AudioManager.isSoundAllowed = true
        AudioManager.playLoop('gameStare_mp3')
        AudioManager.playSound('button_mp3')
        $data.key = true
        console.log("声音已开启", $data.key)
      }
    }, this)

    this.stopBackHome.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
      $dispatch(TYPES.CREATE_GAME_LOADING)
      $dispatch(TYPES.HALL_INITIALIZE)
      $stage.removeChild($view.stop)
      $stage.removeChild($view.game)
      $data.score = 0
    }, this)

    this.stopStopShare.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
      window['wx'].shareAppMessage({
        title: $data.shareTextList[Math.floor(Math.random() * $data.shareTextList.length)],
        imageUrl: $data.shareImage,
        success: res => {
          this.saveScore()
          res['shareTickets'][0]
          AudioManager.playLoop('hall_mp3')
        }
      })
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
