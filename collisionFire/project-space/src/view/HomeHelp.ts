// This file is exported by Orchid PSD Exporter v1.1.0
class HomeHelp extends eui.Component {
  public homeMask: eui.Rect
  public homeBackground: eui.Image
  public homeCountDown: eui.Button
  public homeAddCoin: eui.Label
  public homeTime: eui.Label
  public homeInvite: eui.Button
  public homeClose: eui.Button
  public homeFire1: eui.Image
  public homeFire2: eui.Image
  public homeFire3: eui.Image
  public homeFire4: eui.Image
  public homeFire5: eui.Image

  public fire2Time: number = 65;
  public fire3Time: number = 65;
  public fire4Time: number = 65;
  public fire5Time: number = 65;

  public fireImg1: string = 'home-fire-1_png';
  public fireImg2: string = 'home-fire-2_png';
  public fireImg3: string = 'home-fire-3_png';
  public fireImg4: string = 'home-fire-4_png';

  public fireImg: string = '';
  public imgIndex: number = 1;

  public second: number = 60;
  public addCoinNum: number = 0;
  public isColse: boolean = false;
  public coinNum: number = 0;//火球随机数（不算第一个）
  public helpNumber: number = 0
  public constructor() {
    super()
    this.skinName = 'Exml.HomeHelp'
    var that = this
    setInterval(function () {
      if (that.imgIndex == 1) {
        that.fireImg = that.fireImg1
        that.homeFire1.texture = RES.getRes(that.fireImg)
        that.homeFire2.texture = RES.getRes(that.fireImg)
        that.homeFire3.texture = RES.getRes(that.fireImg)
        that.homeFire4.texture = RES.getRes(that.fireImg)
        that.homeFire5.texture = RES.getRes(that.fireImg)
        that.imgIndex = 2
      } else if (that.imgIndex == 2) {
        that.fireImg = that.fireImg2
        that.homeFire1.texture = RES.getRes(that.fireImg)
        that.homeFire2.texture = RES.getRes(that.fireImg)
        that.homeFire3.texture = RES.getRes(that.fireImg)
        that.homeFire4.texture = RES.getRes(that.fireImg)
        that.homeFire5.texture = RES.getRes(that.fireImg)
        that.imgIndex = 3
      } else if (that.imgIndex == 3) {
        that.fireImg = that.fireImg3
        that.homeFire1.texture = RES.getRes(that.fireImg)
        that.homeFire2.texture = RES.getRes(that.fireImg)
        that.homeFire3.texture = RES.getRes(that.fireImg)
        that.homeFire4.texture = RES.getRes(that.fireImg)
        that.homeFire5.texture = RES.getRes(that.fireImg)
        that.imgIndex = 4
      } else if (that.imgIndex == 4) {
        that.fireImg = that.fireImg4
        that.homeFire1.texture = RES.getRes(that.fireImg)
        that.homeFire2.texture = RES.getRes(that.fireImg)
        that.homeFire3.texture = RES.getRes(that.fireImg)
        that.homeFire4.texture = RES.getRes(that.fireImg)
        that.homeFire5.texture = RES.getRes(that.fireImg)
        that.imgIndex = 1
      }

    }, 100)

    this.homeFire1.visible = false
    this.homeFire2.visible = false
    this.homeFire3.visible = false
    this.homeFire4.visible = false
    this.homeFire5.visible = false
    this.homeCountDown.visible = false
    this.homeInvite.visible = true

    this.homeAddCoin.text = '+0';

    this.homeInvite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addCoin, this)

    // this.homeClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHomeHelp, this)
  }

  private addCoin() {
    AudioManager.playSound('button_mp3')
    window['wx'].shareAppMessage({
      title: $data.shareTextList[Math.floor(Math.random() * $data.shareTextList.length)],
      imageUrl: $data.shareImage,
      success: res => {
        var that = this;
        that.homeInvite.visible = false;
        that.homeCountDown.visible = true;
        setTimeout(function () {
          that.homeFire1.visible = true
          that.addCoinNum += 40
          that.homeAddCoin.text = '+' + that.addCoinNum;
        }, 3000)

        that.coinNum = (Math.floor(Math.random() * 4) + 1);
        console.log("coinNum:" + that.coinNum)
        if (that.coinNum == 1) {
          that.fire2Time = (Math.floor(Math.random() * 30) + 6);
        }
        if (that.coinNum == 2) {
          that.fire2Time = (Math.floor(Math.random() * 16) + 5);
          that.fire3Time = (Math.floor(Math.random() * 20) + 25);
        }
        if (that.coinNum == 3) {
          that.fire2Time = (Math.floor(Math.random() * 12) + 5);
          that.fire3Time = (Math.floor(Math.random() * 16) + 18);
          that.fire4Time = (Math.floor(Math.random() * 16) + 35);
        }
        if (that.coinNum == 4) {
          that.fire2Time = (Math.floor(Math.random() * 10) + 5);
          that.fire3Time = (Math.floor(Math.random() * 12) + 16);
          that.fire4Time = (Math.floor(Math.random() * 12) + 28);
          that.fire5Time = (Math.floor(Math.random() * 15) + 40);
        }
        setTimeout(function () {
          if (that.coinNum > 0 && !that.isColse) {
            that.homeFire2.visible = true
            that.addCoinNum += 40
            that.homeAddCoin.text = '+' + that.addCoinNum;
            that.coinNum--;
          }

        }, that.fire2Time * 1000)

        setTimeout(function () {
          if (that.coinNum > 0 && !that.isColse) {
            that.homeFire3.visible = true
            that.addCoinNum += 40
            that.homeAddCoin.text = '+' + that.addCoinNum;
            that.coinNum--;
          }

        }, that.fire3Time * 1000)

        setTimeout(function () {
          if (that.coinNum > 0 && !that.isColse) {
            that.homeFire4.visible = true
            that.addCoinNum += 40
            that.homeAddCoin.text = '+' + that.addCoinNum;
            that.coinNum--;
          }

        }, that.fire4Time * 1000)

        setTimeout(function () {
          if (that.coinNum > 0 && !that.isColse) {
            that.homeFire5.visible = true
            that.addCoinNum += 40
            that.homeAddCoin.text = '+' + that.addCoinNum;
            that.coinNum--;
          }

        }, that.fire5Time * 1000)

        setTimeout(function () {
          if (that.coinNum > 0 && !that.isColse) {
            that.homeFire5.visible = true
            that.addCoinNum += 40
            that.homeAddCoin.text = '+' + that.addCoinNum;
            that.coinNum--;
          }
        }, 55000)


        var internal = setInterval(function () {
          that.second--
          that.homeTime.text = that.second + 's';
          if (that.second == 0) {
            clearInterval(internal);
            // that.homeInvite.visible = true;
            // that.homeCountDown.visible = false;
            if (!that.isColse) {
              that.closeHomeHelp();
            }
          }
        }, 1000)
      }
    })

  }
  private closeHomeHelp() {
    this.isColse = true;
    var that = this
    console.log('获得金币数：' + that.addCoinNum)
    var addCoinNum = that.addCoinNum;
    this.saveScore()
  }
  public saveScore(): void {
    Ajax($data.goldURL, {
      postData: true,
      user_id: $data.userID,
      game_id: $data.gameId,
      type: 2,
      token: $data.token,
      num: this.addCoinNum,
      sign: $data.MD5.hex_md5('game_id=' + $data.gameId + '&num=' + this.addCoinNum + '&postData=' + true + '&score=' + $data.score + '&token=' + $data.token + '&type=' + 2 + '&user_id=' + $data.userID),
      score: $data.score
    }).then(res => {
      console.log("help提交成绩", res)
      if (res["error"] == 0) {
        console.log("this.addCoinNum", this.addCoinNum)
        $data.goldNumber += this.addCoinNum
        $view.home.homeHallGold.text = `${$data.goldNumber}`
         window['wx'].showToast({
            title: "助力成功！！！",
            icon: "none"
          })
          $stage.removeChild($view.help)
      } else if (res["error"] == 1) {
        this.helpNumber++
        if (this.helpNumber < 7) {
          window['wx'].showToast({
            title: "网络连接失败，正在重新链接...",
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
