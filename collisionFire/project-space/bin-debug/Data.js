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
var $data = {
    // 系统常量
    gameID: 1005,
    wechatAppID: 'wx6937dace80289a44',
    sessionKey: 'AIDNWQSDKCLAS',
    hostTestURL: 'http://mirror.vqs.com',
    hostProductionURL: 'https://api2.vqs.com',
    uiSocketURL: 'wss://clj.vqs.com/cmd',
    gameSocketURL: 'wss://pks.vqs.com/mla',
    fontFamilyTitle: 'PingFang SC, Myriad Pro, Hiragino Sans GB, Microsoft YaHei, simHei, sans-serif',
    fontFamilyContent: '-apple-system, BlinkMacSystemFont, simHei, sans-serif',
    versionInfomation: 'Orchid version: 2.0.0',
    bridgePrefix: 'VqsGame',
    shareImageURL: 'resource/share.jpg',
    gameLoadingBackgroundURL: 'resource/gameLoading.jpg',
    hallLoadingProgressURL: 'resource/hallLoadingProgress.jpg',
    hallLoadingBackgroundURL: 'resource/hallLoading.jpg',
    // 状态信息
    phase: 0,
    isLogEnabled: true,
    isProductionEnvironment: false,
    // 全局配置项
    hallLoadingRefreshInterval: 500,
    hallLoadingAnimationCost: 300,
    gameLoadingRefreshInterval: 500,
    gameLoadingAnimationCost: 300,
    uiSocketTimeout: 25000,
    matchWaitingTimeout: 5000,
    ajaxTimeout: 60000,
    startInterval: 1000,
    // 玩家信息
    platform: 4,
    language: 'zh-CN',
    myID: 0,
    myName: '',
    myGender: 0,
    myAge: 0,
    myHeadimg: '',
    myCoin: 8888,
    myRoundCount: 0,
    // 对局信息
    roomID: 'GI9MK201',
    inviteTimestamp: 0,
    hasMatchedAI: false,
    opponentID: 0,
    opponentName: '',
    opponentGender: 0,
    opponentAge: 0,
    opponentHeadimg: '',
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
    squareList: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
    squareView: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
    pageX: 8,
    pageY: 10,
    score: 0,
    gold: 0,
    maxScore: 0,
    gameTitleTop: "0",
    gameTitleScore: "0",
    goldNumber: "0",
    gameId: 1105,
    //  微信参数
    goldURL: 'http://pkgame.vqs.com/wx/member/add',
    get_openURL: "http://pkgame.vqs.com/wx/member/get_open",
    loginURL: "http://pkgame.vqs.com/wx/member/register_third",
    code: "",
    encryptedData: "",
    iv: "",
    userInfo: {},
    session_key: "",
    token: "",
    openid: "",
};
window['$data'] = $data;
//# sourceMappingURL=Data.js.map