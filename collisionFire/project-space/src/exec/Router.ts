/** 
 * Orchid - Router.ts
 * 
 * 项目的路由控制器。
 * 通过 $dispatch 方法调用。
 * 使用方法请参见 OrchidRouter.ts 的注释。
 * 
 * @version 20180521
 * @author Winterwrath
 * @license 见 ORCHID-README
 */

const Router = {
  // Phase 0 - HallLoading
  /** 创建大厅界面的 Loading */
  [TYPES.CREATE_HALL_LOADING]() {
    $data.phase = 0
    this.initLocalData()
    this.initMapLanguage($data.language)
    $view.hallLoading = new HallLoading()
    $stage.addChild($view.hallLoading)
    Anime.fadeIn($view.hallLoading)
    $dispatch(TYPES.LOAD_HALL_RESOURCE)
  },

  /** 加载大厅界面的资源 */
  [TYPES.LOAD_HALL_RESOURCE]() {
    this.loadResource(() => {
      $dispatch(TYPES.REQUEST_AUTHORIZATION)
    }).catch(() => {
      throw new Error('@Orchid 资源加载失败。')
    })
  },

  /** 请求用户授权 */
  [TYPES.REQUEST_AUTHORIZATION]() {

    $view.hallLoading.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { AudioManager.playSound('tap_mp3') }, $main)
    $view.hallLoading.textLabel.text = I18n.hallLoadingRequestAuth
    // Connection.login()
    $dispatch(TYPES.CREATE_HALL)
  },

  /** 请求用户授权失败 */
  [TYPES.AUTHORIZATION_FAILED]() {
    $view.hallLoading.textLabel.text = I18n.hallLoadingAuthDenied
  },

  /** 请求用户授权成功 */
  [TYPES.AUTHORIZATION_SUCCEEDED]() {
    // $view.hall.userName.text = $data.myName
    // $view.hall.userHeadimg.source = $data.myHeadimg
    // $view.hall.userCoin.text = String($data.myCoin)
    // $view.hall.userGender.source = $data.myGender === 0 ? 'gender-0_png' : 'gender-1_png'
  },

  /** 连接游戏适配服务器 */
  [TYPES.CONNECT_TO_MATCH_SERVER]() {
    $view.hallLoading.textLabel.text = I18n.hallLoadingConnecting
  },

  /** 连接游戏适配服务器失败 */
  [TYPES.MATCH_SERVER_DISCONNECTED]() {
    $view.hallLoading.textLabel.text = I18n.hallLoadingConnectFailed
  },

  /** 连接游戏适配服务器成功 */
  [TYPES.MATCH_SERVER_CONNECTED]() {
    $view.hallLoading.textLabel.text = I18n.hallLoadingEnter
  },

  /** 渲染大厅界面 */
  [TYPES.CREATE_HALL]() {
    // $view.hall = new Hall()
    // $view.hall.visible = false
    // $stage.addChild($view.hall)
    // $stage.swapChildren($view.hall, $view.hallLoading)    
    // $view.hall.visible = true
    $dispatch(TYPES.DESTROY_HALL_LOADING)

  },

  /** 销毁大厅界面的 Loading */
  [TYPES.DESTROY_HALL_LOADING]() {
    egret.Tween.get($view.hallLoading).wait($data.hallLoadingRefreshInterval * 2).to({ alpha: 0 }, 100).call(() => {
      $stage.removeChild($view.hallLoading)
    })
    $dispatch(TYPES.HALL_INITIALIZE)
  },

  // Phase 1 - Hall
  /** 大厅界面初始化 */
  [TYPES.HALL_INITIALIZE]() {
    window['wx'].showShareMenu({
      withShareTicket: true
    })
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
                console.log("+++++++++++++++++++++2")
                AudioManager.playLoop('hall_mp3')
                $view.home = new Home()
                $stage.addChild($view.home)
                // $dispatch(TYPES.DESTROY_HALL_LOADING)

                $view.home.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                  AudioManager.playSound('button_mp3')

                }, this)

              })
            })
          }
        })

      }
    })


    // $dispatch(TYPES.CREATE_GAME)
  },

  /** 开始匹配 */
  [TYPES.MATCH_BEGIN]() {

  },

  /** 匹配超时 */
  [TYPES.MATCH_TIMEOUT]() {

  },

  /** 匹配成功 */
  [TYPES.MATCH_SUCCEEDED]() {

  },

  /** 销毁大厅界面 */
  [TYPES.DESTROY_HALL]() {

  },

  // Phase 2 - GameLoading
  /** 创建游戏界面的 Loading */
  [TYPES.CREATE_GAME_LOADING]() {

  },

  /** 加载游戏界面的资源 */
  [TYPES.LOAD_GAME_RESOURCE]() {

  },

  /** 连接游戏对局服务器 */
  [TYPES.CONNECT_TO_GAME_SERVER]() {

  },

  /** 连接游戏对局服务器失败 */
  [TYPES.GAME_SERVER_DISCONNECTED]() {

  },

  /** 连接游戏对局服务器成功 */
  [TYPES.GAME_SERVER_CONNECTED]() {

  },

  /** 其他玩家载入超时 */
  [TYPES.OTHERS_LOAD_TIMEOUT]() {

  },

  /** 渲染游戏界面 */
  [TYPES.CREATE_GAME]() {
    AudioManager.playLoop('gameStare_mp3')
    $data.phase = 3
    $view.game = new Game()
    $stage.addChild($view.game)
    $stage.removeChild($view.home)
  },

  /** 销毁游戏界面的 Loading */
  [TYPES.DESTROY_GAME_LOADING]() {

  },

  // Phase 3 - Game
  /** 游戏界面初始化 */
  [TYPES.GAME_INITIALIZE]() {
    AudioManager.playLoop('gameStare_mp3')
    $view.game = new Game()
    $stage.addChild($view.game)
    $stage.removeChild($view.home)
    // $dispatch(TYPES.GAME_START)
  },

  /** 游戏开始 */
  [TYPES.GAME_START]() {

  },

  /** 游戏暂停 */
  [TYPES.GAME_PAUSE]() {

  },

  /** 游戏继续 */
  [TYPES.GAME_RESUME]() {

  },

  /** 游戏结束 */
  [TYPES.GAME_OVER]() {
    AudioManager.stopMusic()
    AudioManager.playSound('false_mp3')
    $view.clear = new Clearing
    $stage.addChild($view.clear)

  },

  /** 游戏结束的结算 */
  [TYPES.GAME_OVER_RESULT]() {

  },

  /** 强制退出游戏 */
  [TYPES.FORCED_QUIT_GAME]() {

  },

  /** 强制退出游戏的结算 */
  [TYPES.FORCED_QUIT_GAME_RESULT]() {

  },

  /** 销毁游戏界面 */
  [TYPES.DESTROY_GAME]() {

  },

  // Universal
  /** 创建子视图 */
  [TYPES.CREATE_SUB_VIEW]() {

  },

  /** 销毁子视图 */
  [TYPES.DESTROY_SUB_VIEW]() {

  },

  /** 程序失去焦点 */
  [TYPES.LOSE_FOCUS]() {

  },

  /** 程序获得焦点 */
  [TYPES.OBTAIN_FOCUS]() {

  }
}

window['Router'] = Router
