// This file is exported by Orchid PSD Exporter v1.1.0
class Home extends eui.Component {
  public homeHallBg: eui.Image
  public homeHallPrompt: eui.Image
  public homeGameTitle: eui.Image
  public homeHallMoregame: eui.Button
  public homeHallHelpIcon: eui.Button
  public homeHallRankIcon: eui.Button
  public homeHallTutorialIcon: eui.Button
  public homeHallPlayIcon: eui.Button
  public homeHallGoldicon: eui.Image
  public homeBestScore: eui.Label
  public homeBestScoreicon: eui.Label
  public homeHallGold: eui.Label
  public homeGetGold: eui.Button
  public constructor() {
    super()
    this.skinName = 'Exml.Home'
    console.log("+++++++++++1")
    this.homeBestScore.text = `${$data.gameTitleTop}`
    this.homeHallGold.text = `${$data.goldNumber}`
    console.log(Number($data.goldNumber) >= $data.gamePay)
    if (Number($data.goldNumber) >= $data.gamePay) {
      this.homeHallPlayIcon.enabled = true
    } else {
      this.homeHallPlayIcon.enabled = false
    }
    if ($data.isShare == 0) {
      this.homeGetGold.visible = true;
      this.homeHallHelpIcon.visible = true;
      this.homeHallRankIcon.x = 101;
      this.homeHallRankIcon.x = 331;
      this.homeHallTutorialIcon.x = 543;
    }
    else {
      this.homeGetGold.visible = false;
      this.homeHallHelpIcon.visible = false;
      this.homeHallRankIcon.x = 176;
      this.homeHallTutorialIcon.x = 470;
    }
    this.homeHallMoregame.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      // AudioManager.playSound('button_mp3')
      Ajax($data.moreGameURL, {
        postData: true,
        game_id: $data.gameId
      }).then((res) => {
        var yy = 812 - $main.stage.$stageHeight / 2;
        window["wx"].previewImage({
          urls: [res['data'].game_pic + '?x-oss-process=image/crop,x_0,y_' + yy + ',w_' + $main.stage.$stageWidth + ',h_' + $main.stage.$stageHeight],
        });
      })
    }, this)





    this.homeHallHelpIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      // AudioManager.playSound('button_mp3')
      $view.help = new HomeHelp()
      $stage.addChild($view.help)
      $view.help.homeMask.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        $stage.removeChild($view.help)
        var that = this
        $view.help.isColse = true;
        console.log('获得金币数：' + $view.help.addCoinNum)
        var addCoinNum = $view.help.addCoinNum;
        if (addCoinNum >= 40) {
          Ajax($data.goldURL, {
            postData: true,
            user_id: $data.userID,
            game_id: $data.gameId,
            type: 2,
            token: $data.token,
            num: addCoinNum,
            sign: $data.MD5.hex_md5('game_id=' + $data.gameId + '&num=' + addCoinNum + '&postData=' + true + '&score=' + $data.score + '&token=' + $data.token + '&type=' + 2 + '&user_id=' + $data.userID),
            score: $data.score
          }).then(res => {
            console.log(res)
            console.log(res['error'])
            if (res['error'] == 0) {
              $data.goldNumber += addCoinNum;
              this.homeHallGold.text = `${$data.goldNumber}`
              var sharePage = new Share();
              that.addChild(sharePage);
            } else {
              window['wx'].showModal({
                content: '金币增加失败',
              })
            }
            if ($view.help.parent) {
              that.removeChild($view.help);
            }

          });
        } else {
          if ($view.help.parent) {
            that.removeChild($view.help);
          }
        }
      }, this)
    }, this)

    this.homeHallRankIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      // AudioManager.playSound('button_mp3')
      $view.rankList = new RankList
      $stage.addChild($view.rankList)
    }, this)

    this.homeHallTutorialIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      // AudioManager.playSound('button_mp3')
      $view.tutorial = new Tutorial()
      $stage.addChild($view.tutorial)
    }, this)

    this.homeHallPlayIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      // AudioManager.playSound('button_mp3')
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
        console.log("金币扣除", res)
        if (res["error"] == 0) {
          $dispatch(TYPES.CREATE_GAME)
        } else if (res["error"] == 2) {
          window['wx'].showToast({
            title: "获取信息失败，正在重新登录...",
            icon: "none"
          })
          this.login()
        } else if (res["error"] == 3) {
          //  金币不足 跳转
          window['wx'].showToast({
            title: "金币不足",
            icon: "none"
          })

        }
      })

    }, this)

    this.homeGetGold.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      // AudioManager.playSound('button_mp3')
      $view.addIcon = new AddCoin
      $stage.addChild($view.addIcon)
    }, this)
    let randomNum: number = null
    setInterval(() => {
      randomNum = Math.floor(Math.random() * 2)
      if (randomNum == 0) {
        this.homeGameTitle.source = `home-game-title_png`
      } else if (randomNum == 1) {
        this.homeGameTitle.source = `home-game-title--active_png`
      } else {
        this.homeGameTitle.source = `home-game-title--disabled_png`
      }
    }, 500)


    egret.Tween.get(this.homeHallMoregame, { loop: true }).to({ rotation: 10 }, 400).to({ rotation: -10 }, 400)
    egret.Tween.get(this.homeHallMoregame, { loop: true }).to({ y: 356 }, 6000).to({ y: 306 }, 6000)

  }

  public login(): void {
    window['wx'].login({
      success: res => {
        console.log("login", res)
        $data.code = res.code
        window['wx'].getUserInfo({
          success: res => {
            console.log("getUserInfo", res)
            $data.encryptedData = res.encryptedData,
              $data.iv = res.iv,
              $data.userInfo = res.userInfo
            Ajax($data.get_openURL, {
              postData: true,
              js_code: $data.code,
              game_id: $data.gameId,
            }).then(res => {
              console.log("jscode获取token和openid", res)
              $data.session_key = res["data"].session_key,
                console.log("sessionKey", $data.sessionKey)
              Ajax($data.loginURL, {
                postData: true,
                encryptedData: $data.encryptedData,
                iv: $data.iv,
                session_key: $data.session_key,
                game_id: $data.gameId,
                version: $data.version
              }).then(res => {
                console.log("登录注册接口", res)
                $data.token = res["data"].token
                $data.goldNumber = res["data"].gold
                $data.userID = res["data"].id
                $data.gameTitleTop = res["data"].max_score
                $data.isShare = res["data"].share_lock
                this.homeBestScore.text = `${$data.gameTitleTop}`
                this.homeHallGold.text = `${$data.goldNumber}`
                if (res["data"].gold >= $data.gamePay) {
                  this.homeHallPlayIcon.enabled = true
                }

              })
            })
          }
        })

      }
    })
  }

}
