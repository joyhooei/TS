// This file is exported by Orchid PSD Exporter v1.1.1
class Clearing extends eui.Component {
  public clearingMask: eui.Rect
  public clearingGameReturn: eui.Button
  public clearingResult: eui.Image
  public clearingScore: eui.Label
  public clearingBest: eui.Image
  public clearingFriendBest: eui.Label
  public clearingChallenge: eui.Button
  public clearingMoreGame: eui.Button
  public clearingShareRecord: eui.Button
  public clearingRankList: eui.Button
  public clearingPlayAgain: eui.Button
  public clearingAddGold: eui.Label
  public clearingGoldcoin: eui.Button
  public number: number = 0
  public constructor() {
    super()
    this.skinName = 'Exml.Clearing'
    if ($data.isShare == 0) {
      this.clearingChallenge.visible = true
      this.clearingShareRecord.visible = true
    } else {
      this.clearingChallenge.visible = false
      this.clearingShareRecord.visible = false
    }

    this.clearingAddGold.text = `+ ${$data.gold}`
    this.clearingScore.text = `${$data.score}分`
    this.clearingFriendBest.text = `${$data.gameTitleTop}分`
    if ($data.score != 0) {
      this.saveScore()
    }

    this.clearingGameReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
       $stage.removeChild($view.game)
      $stage.removeChild($view.clear)
      $dispatch(TYPES.CREATE_GAME_LOADING)
      $dispatch(TYPES.HALL_INITIALIZE)
     
    }, this)

    this.clearingChallenge.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
      AudioManager.playSound('button_mp3')
      window['wx'].shareAppMessage({
        title: $data.shareTextList[Math.floor(Math.random() * $data.shareTextList.length)],
        imageUrl: $data.shareImage,
        success: res => {
          this.saveScore()
          res['shareTickets'][0]
        }
      })
    }, this)

    this.clearingMoreGame.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
      Ajax($data.moreGameURL, {
        postData: true,
        game_id: $data.gameId
      }).then((res) => {
        window["wx"].previewImage({
          current: res["data"].game_pic,
          urls: [res["data"].game_pic]
        })
      })
    }, this)

    this.clearingShareRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
      window['wx'].shareAppMessage({
        title: $data.shareTextList[Math.floor(Math.random() * $data.shareTextList.length)],
        imageUrl: $data.shareImage,
        success: res => {
          this.saveScore()
          res['shareTickets'][0]
        }
      })
    }, this)

    this.clearingRankList.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
      $view.rankList = new RankList
      $stage.addChild($view.rankList)
    }, this)

    this.clearingPlayAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
      if($data.isShare == 1 ){
        if(Number($data.reduceGold) != 1){
          $data.reduceGold = '1'
        }
      }else{
        if(Number($data.reduceGold) != 30){
          $data.reduceGold = '30'
        }
      }
      Ajax($data.reduceURL, {
        postData: true,
        user_id: $data.userID,
        token: $data.token,
        num: $data.reduceGold
      }).then(res => {
        if (res["error"] == 0) {
          $stage.removeChild($view.game)
          $dispatch(TYPES.GAME_INITIALIZE)
          $stage.removeChild($view.clear)
        } else if (res["error"] == 2) {
          window['wx'].showToast({
            title: "网络链接中断，请检查网络",
            icon: "none"
          })
        } else if (res["error"] == 3) {
          //  金币不足 跳转
          window['wx'].showToast({
            title: "金币不足",
            icon: "none"
          })
        }
      })

    }, this)
  }
  public saveScore(): void {
    Ajax($data.goldURL, {
      postData: true,
      user_id: $data.userID,
      game_id: $data.gameId,
      type: 3,
      token: $data.token,
      num: $data.gold,
      sign: $data.MD5.hex_md5('game_id=' + $data.gameId + '&num=' + $data.gold + '&postData=' + true + '&score=' + $data.score + '&token=' + $data.token + '&type=' + 3 + '&user_id=' + $data.userID),
      score: $data.score
    }).then(res => {
      console.log("提交成绩", res)
      if (res["error"] == 0) {
        if (res["data"].is_max_score == 1) {
          window['wx'].setUserCloudStorage({
            KVDataList: [
              { key: 'score', value: '' + $data.gameTitleTop }
            ]
          })
        }
        this.clearingPlayAgain.enabled = true
        this.clearingChallenge.enabled = true
      } else if (res["error"] == 1) {
        this.number++
        if (this.number < 7) {
          window['wx'].showToast({
            title: "上传成绩失败，正在重新上传...",
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
          title: "网络链接中断，请重新登录",
          icon: "none"
        })
      }
    })
  }
}
