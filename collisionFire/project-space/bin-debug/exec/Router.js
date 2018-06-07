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
var Router = (_a = {},
    // Phase 0 - HallLoading
    /** 创建大厅界面的 Loading */
    _a[TYPES.CREATE_HALL_LOADING] = function () {
        $data.phase = 0;
        this.initLocalData();
        this.initMapLanguage($data.language);
        $view.hallLoading = new HallLoading();
        $stage.addChild($view.hallLoading);
        Anime.fadeIn($view.hallLoading);
        $dispatch(TYPES.LOAD_HALL_RESOURCE);
    },
    /** 加载大厅界面的资源 */
    _a[TYPES.LOAD_HALL_RESOURCE] = function () {
        this.loadResource(function () {
            $dispatch(TYPES.REQUEST_AUTHORIZATION);
        }).catch(function () {
            throw new Error('@Orchid 资源加载失败。');
        });
    },
    /** 请求用户授权 */
    _a[TYPES.REQUEST_AUTHORIZATION] = function () {
        // AudioManager.playLoop('hall_mp3')
        $view.hallLoading.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { AudioManager.playSound('tap_mp3'); }, $main);
        $view.hallLoading.textLabel.text = I18n.hallLoadingRequestAuth;
        // Connection.login()
        $dispatch(TYPES.CREATE_HALL);
    },
    /** 请求用户授权失败 */
    _a[TYPES.AUTHORIZATION_FAILED] = function () {
        $view.hallLoading.textLabel.text = I18n.hallLoadingAuthDenied;
    },
    /** 请求用户授权成功 */
    _a[TYPES.AUTHORIZATION_SUCCEEDED] = function () {
        // $view.hall.userName.text = $data.myName
        // $view.hall.userHeadimg.source = $data.myHeadimg
        // $view.hall.userCoin.text = String($data.myCoin)
        // $view.hall.userGender.source = $data.myGender === 0 ? 'gender-0_png' : 'gender-1_png'
    },
    /** 连接游戏适配服务器 */
    _a[TYPES.CONNECT_TO_MATCH_SERVER] = function () {
        $view.hallLoading.textLabel.text = I18n.hallLoadingConnecting;
    },
    /** 连接游戏适配服务器失败 */
    _a[TYPES.MATCH_SERVER_DISCONNECTED] = function () {
        $view.hallLoading.textLabel.text = I18n.hallLoadingConnectFailed;
    },
    /** 连接游戏适配服务器成功 */
    _a[TYPES.MATCH_SERVER_CONNECTED] = function () {
        $view.hallLoading.textLabel.text = I18n.hallLoadingEnter;
    },
    /** 渲染大厅界面 */
    _a[TYPES.CREATE_HALL] = function () {
        // $view.hall = new Hall()
        // $view.hall.visible = false
        // $stage.addChild($view.hall)
        // $stage.swapChildren($view.hall, $view.hallLoading)    
        // $view.hall.visible = true
        $dispatch(TYPES.HALL_INITIALIZE);
    },
    /** 销毁大厅界面的 Loading */
    _a[TYPES.DESTROY_HALL_LOADING] = function () {
        egret.Tween.get($view.hallLoading).wait($data.hallLoadingRefreshInterval * 2).to({ alpha: 0 }, 100).call(function () {
            $stage.removeChild($view.hallLoading);
        });
    },
    // Phase 1 - Hall
    /** 大厅界面初始化 */
    _a[TYPES.HALL_INITIALIZE] = function () {
        $view.home = new Home();
        $stage.addChild($view.home);
        // $dispatch(TYPES.CREATE_GAME)
    },
    /** 开始匹配 */
    _a[TYPES.MATCH_BEGIN] = function () {
    },
    /** 匹配超时 */
    _a[TYPES.MATCH_TIMEOUT] = function () {
    },
    /** 匹配成功 */
    _a[TYPES.MATCH_SUCCEEDED] = function () {
    },
    /** 销毁大厅界面 */
    _a[TYPES.DESTROY_HALL] = function () {
    },
    // Phase 2 - GameLoading
    /** 创建游戏界面的 Loading */
    _a[TYPES.CREATE_GAME_LOADING] = function () {
    },
    /** 加载游戏界面的资源 */
    _a[TYPES.LOAD_GAME_RESOURCE] = function () {
    },
    /** 连接游戏对局服务器 */
    _a[TYPES.CONNECT_TO_GAME_SERVER] = function () {
    },
    /** 连接游戏对局服务器失败 */
    _a[TYPES.GAME_SERVER_DISCONNECTED] = function () {
    },
    /** 连接游戏对局服务器成功 */
    _a[TYPES.GAME_SERVER_CONNECTED] = function () {
    },
    /** 其他玩家载入超时 */
    _a[TYPES.OTHERS_LOAD_TIMEOUT] = function () {
    },
    /** 渲染游戏界面 */
    _a[TYPES.CREATE_GAME] = function () {
        $data.phase = 3;
        $view.game = new Game();
        $stage.addChild($view.game);
        $stage.removeChild($view.home);
    },
    /** 销毁游戏界面的 Loading */
    _a[TYPES.DESTROY_GAME_LOADING] = function () {
    },
    // Phase 3 - Game
    /** 游戏界面初始化 */
    _a[TYPES.GAME_INITIALIZE] = function () {
        $view.game = new Game();
        $stage.addChild($view.game);
        $stage.removeChild($view.home);
        // $dispatch(TYPES.GAME_START)
    },
    /** 游戏开始 */
    _a[TYPES.GAME_START] = function () {
    },
    /** 游戏暂停 */
    _a[TYPES.GAME_PAUSE] = function () {
    },
    /** 游戏继续 */
    _a[TYPES.GAME_RESUME] = function () {
    },
    /** 游戏结束 */
    _a[TYPES.GAME_OVER] = function () {
    },
    /** 游戏结束的结算 */
    _a[TYPES.GAME_OVER_RESULT] = function () {
    },
    /** 强制退出游戏 */
    _a[TYPES.FORCED_QUIT_GAME] = function () {
    },
    /** 强制退出游戏的结算 */
    _a[TYPES.FORCED_QUIT_GAME_RESULT] = function () {
    },
    /** 销毁游戏界面 */
    _a[TYPES.DESTROY_GAME] = function () {
    },
    // Universal
    /** 创建子视图 */
    _a[TYPES.CREATE_SUB_VIEW] = function () {
    },
    /** 销毁子视图 */
    _a[TYPES.DESTROY_SUB_VIEW] = function () {
    },
    /** 程序失去焦点 */
    _a[TYPES.LOSE_FOCUS] = function () {
    },
    /** 程序获得焦点 */
    _a[TYPES.OBTAIN_FOCUS] = function () {
    },
    _a);
window['Router'] = Router;
var _a;
//# sourceMappingURL=Router.js.map