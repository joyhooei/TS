/** 
 * Orchid - Data.ts
 * 
 * 本项目的数据中心。
 * 使用方法请参见 OrchidData.ts 的注释。
 * 
 * @version 20180521
 * @author Winterwrath
 * @license 见 ORCHID-README
 */

const $data = {
  // 系统常量
  gameID: 1005,                                                                                           // 游戏的 ID
  wechatAppID: 'wx6937dace80289a44',                                                                      // 微信 APP ID
  sessionKey: 'AIDNWQSDKCLAS',                                                                            // 微信 Session Key
  hostTestURL: 'http://mirror.vqs.com',                                                                   // 测试接口的地址
  hostProductionURL: 'https://api2.vqs.com',                                                              // 线上接口的地址
  uiSocketURL: 'wss://clj.vqs.com/cmd',                                                                   // 适配服务器的地址
  gameSocketURL: 'wss://pks.vqs.com/mla',                                                                 // 游戏服务器的地址
  fontFamilyTitle: 'PingFang SC, Myriad Pro, Hiragino Sans GB, Microsoft YaHei, simHei, sans-serif',      // 用于标题的字体族
  fontFamilyContent: '-apple-system, BlinkMacSystemFont, simHei, sans-serif',                             // 用于普通文本的字体族
  versionInfomation: 'Orchid version: 2.0.0',                                                             // Orchid 版本信息
  bridgePrefix: 'VqsGame',                                                                                // Bridge 的前缀
  shareImageURL: 'resource/share.jpg',                                                                    // 微信分享的图片地址
  gameLoadingBackgroundURL: 'resource/gameLoading.jpg',                                                   // Game Loading 的背景图片地址
  hallLoadingProgressURL: 'resource/hallLoadingProgress.jpg',                                             // Hall Loading 的进度条图片地址
  hallLoadingBackgroundURL: 'resource/hallLoading.jpg',                                                   // Hall Loading 的背景图片地址

  // 状态信息
  phase: 0,                               // 程序运行的阶段，[0] 为 Hall Loading，[1] 为 Hall，[2] 为 Game Loading，[3] 为 Game
  isLogEnabled: true,                     // 是否显示日志，[true] 为显示日志，[false] 为隐藏日志
  isProductionEnvironment: false,         // 是否为线上环境，[true] 为线上环境，[false] 为非线上环境

  // 全局配置项
  hallLoadingRefreshInterval: 500,        // Hall Loading 进度事件的刷新间隔，应该大于 $data.hallLoadingAnimationCost
  hallLoadingAnimationCost: 300,          // Hall Loading 进度事件的动画时间
  gameLoadingRefreshInterval: 500,        // Game Loading 进度事件的刷新间隔，应该大于 $data.gameLoadingAnimationCost
  gameLoadingAnimationCost: 300,          // Game Loading 进度事件的动画时间
  uiSocketTimeout: 25000,                 // 发送给适配服务器的心跳包间隔
  matchWaitingTimeout: 5000,              // 等待其他玩家加入的超时时间
  ajaxTimeout: 60000,                     // 发送 Ajax 的超时时间
  startInterval: 1000,                    // 匹配成功时在房间内的停留时间

  // 玩家信息
  platform: 4,                   // 玩家的平台类型，[0] 为 Android 端，[1] 为网页，[2] 未定义，[3] 为 iOS 端，[4] 为小程序端
  language: 'zh-CN',             // 玩家的语言类型，[zh-CN] 为中文，[en-US] 为英文
  myID: 0,                       // 玩家的 ID
  myName: '',                    // 玩家的昵称
  myGender: 0,                   // 玩家的性别，[0] 为男性，[1] 为女性
  myAge: 0,                      // 玩家的年龄
  myHeadimg: '',                 // 玩家的头像地址
  myCoin: 8888,                  // 玩家的金币数
  myRoundCount: 0,               // 玩家的总局数

  // 对局信息
  roomID: 'GI9MK201',            // 房间的 ID  
  inviteTimestamp: 0,            // 发送的邀请时间戳
  hasMatchedAI: false,           // 是否匹配到 AI，[true] 为匹配到 AI，[false] 为匹配到玩家
  opponentID: 0,                 // 对手的 ID
  opponentName: '',              // 对手的昵称
  opponentGender: 0,             // 对手的性别，[0] 为男性，[1] 为女性
  opponentAge: 0,                // 对手的年龄
  opponentHeadimg: '',           // 对手的头像地址

  // I18n 文本映射
  languageMap: {
    'zh-CN': {
      hallLoadingInit: '正在初始化',
      hallLoadingLoadResource: '正在加载文件',
      hallLoadingComplete: '加载完成',
      hallLoadingRequestAuth: '正在读取用户资料',
      hallLoadingAuthDenied: '用户资料读取失败',
      hallLoadingConnecting: '正在连接游戏适配服务器',
      hallLoadingConnectFailed: '游戏适配服务器连接失败',
      hallLoadingEnter: '正在进入游戏大厅',
      gameStart: '游戏开始',
      gameOver: '游戏结束',
      wechatAuthorizationFailTitle: '注意',
      wechatAuthorizationFailText: '您刚刚拒绝了授权，请10分钟后再次申请。',
      wechatShareTitle0: '谁人敢与我一战',
      wechatShareTitle1: '快来来大战三百回合',
      wechatShareTitle2: '我的战绩强无敌，求打败',
      wechatShareInvite0: '你还在玩儿跳一跳？落伍辣，快来看看这款魔性咸鱼',
      wechatShareInvite1: '作为咸鱼中最咸的一条，常因含盐量过高而独领风骚',
      wechatShareInvite2: '快来虐死这条咸鱼',
      wechatShareInvite3: '我手残了，也变强了，你能比我多上一层？',
      wechatShareInvite4: '小哥哥小姐姐，上天吗？',
      wechatShareInvite5: '我居然被一条咸鱼嘲笑了，不能忍不能忍！',
      wechatShareInvite6: '实时匹配，真人对战，你的男神女神都在这里',
      wechatShareInvite7: '玩儿这个游戏，隔着屏幕都笑出声',
      wechatShareInvite8: '毒性太大停不了，我保证玩完这把就关',
      wechatShareTitleResult: '我的战绩无敌强，求打败',
      shareFailedToast: '换个群分享吧',
      functionIsNotAvailable: '功能暂未开放'
    },
    'en-US': {
      uiLoadingInit: '',
      uiLoadingLoadResource: '',
      uiLoadingComplete: '',
      uiLoadingRequestAuth: '',
      uiLoadingAuthDenied: '',
      uiLoadingConnecting: '',
      uiLoadingConnectFailed: '',
      uiLoadingEnter: '',
      gameStart: '',
      gameOver: '',
      wechatAuthorizationFailTitle: '',
      wechatAuthorizationFailText: '',
      wechatShareTitle0: '',
      wechatShareTitle1: '',
      wechatShareTitle2: '',
      wechatShareInvite0: '',
      wechatShareInvite1: '',
      wechatShareInvite2: '',
      wechatShareInvite3: '',
      wechatShareInvite4: '',
      wechatShareInvite5: '',
      wechatShareInvite6: '',
      wechatShareInvite7: '',
      wechatShareInvite8: '',
      wechatShareTitleResult: '',
      shareFailedToast: '',
      functionIsNotAvailable: ''
    }
  },
  //  游戏配置信息
  squareList: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],          //  方块列表
  squareView: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],          //  方块视图列表
  pageX: 8,                //  方块行个数
  pageY: 10,               //  方块列个数
  score: 0,                //  总分
  gold: 0,                 //  传给后台的金币数
  maxScore: 0,             //  当前最大分数
  gameTitleTop: "0",        //  最大分数
  gameTitleScore: "0",      //  当前分数
  goldNumber: "",           //  当前金币数
  gamePay: 30,               //  开始一局游戏需要支付的金币
  gameId: 1105,             //  游戏ID
  key: true,                //  按钮开关
  //  微信参数
  goldURL: 'https://wx.vvppw.com/wx/member/add',
  get_openURL: "https://wx.vvppw.com/wx/member/get_open",
  loginURL: "https://wx.vvppw.com/wx/member/register_third",
  reduceURL: "https://wx.vvppw.com/wx/member/reduce",
  moreGameURL: "https://wx.vvppw.com/wx/member/more",
  code: "",                 //  微信code
  encryptedData: "",        //  包括敏感数据在内的完整用户信息的加密数据
  iv: "",                   //  加密算法的初始向量   
  userInfo: {},             //  用户信息
  session_key: "",          //  get_open接口返回session_key
  token: "",                //  
  openid: "",               //
  userID: 0,                //  用户ID
  reduceGold:"30",             //  每局减少的金币
  shareAddGold: 100,        //  分享给的金币数
  shareImage: "resource/hall/2.png",     //  用户分享使用的图片地址
  MD5: new MD5(),           // 
  shareTextList:[
    "消出幸运草，未来一个月转运~666~",
    "佛系少女必备游戏~每天都是星期七",
    "陪伴我最长时间的游戏，消磨时间必备游戏~",
    "不氪金 消磨必备必备~",
    "天啦噜 一玩就几个小时候了~沉迷！",
    "秒杀2048的休闲益智游戏!",
    "居家旅行打发零碎时间必备游戏！",
    "消除消的根本停不下来！",
    "同学说很不屑的游戏，她试玩后根本停不下来！",
    "超耐玩易上手易上瘾!试玩三分钟沉迷一下午！",
    "让人一盘接一局根本停不下来的消除游戏！",
    "玩了几个小时，硬是没消出钻石！继续消！"
  ],          //  分享文本列表 
  version: 101,  
  isShare:1  
}

window['$data'] = $data
