/**
 * Orchid - TYPES.ts
 *
 * 声明本项目中用到的状态名称。
 * 通过 $dispatch 方法改变。
 * 可根据需求的不同在此处定义新的状态。
 * 使用方法请参见 OrchidRouter.ts 的注释。
 *
 * @version 20180521
 * @author Winterwrath
 * @license 见 ORCHID-README
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TYPES = (function () {
    function TYPES() {
    }
    // Phase 0 - HallLoading
    /** 创建大厅界面的 Loading */
    TYPES.CREATE_HALL_LOADING = 'CREATE_HALL_LOADING';
    /** 加载大厅界面的资源 */
    TYPES.LOAD_HALL_RESOURCE = 'LOAD_HALL_RESOURCE';
    /** 请求用户授权 */
    TYPES.REQUEST_AUTHORIZATION = 'REQUEST_AUTHORIZATION';
    /** 请求用户授权失败 */
    TYPES.AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED';
    /** 请求用户授权成功 */
    TYPES.AUTHORIZATION_SUCCEEDED = 'AUTHORIZATION_SUCCEEDED';
    /** 连接游戏适配服务器 */
    TYPES.CONNECT_TO_MATCH_SERVER = 'CONNECT_TO_MATCH_SERVER';
    /** 连接游戏适配服务器失败 */
    TYPES.MATCH_SERVER_DISCONNECTED = 'MATCH_SERVER_DISCONNECTED';
    /** 连接游戏适配服务器成功 */
    TYPES.MATCH_SERVER_CONNECTED = 'MATCH_SERVER_CONNECTED';
    /** 渲染大厅界面 */
    TYPES.CREATE_HALL = 'CREATE_HALL';
    /** 销毁大厅界面的 Loading */
    TYPES.DESTROY_HALL_LOADING = 'DESTROY_HALL_LOADING';
    // Phase 1 - Hall
    /** 大厅界面初始化 */
    TYPES.HALL_INITIALIZE = 'HALL_INITIALIZE';
    /** 开始匹配 */
    TYPES.MATCH_BEGIN = 'MATCH_BEGIN';
    /** 匹配超时 */
    TYPES.MATCH_TIMEOUT = 'MATCH_TIMEOUT';
    /** 匹配成功 */
    TYPES.MATCH_SUCCEEDED = 'MATCH_SUCCEEDED';
    /** 销毁大厅界面 */
    TYPES.DESTROY_HALL = 'DESTROY_HALL';
    // Phase 2 - GameLoading
    /** 创建游戏界面的 Loading */
    TYPES.CREATE_GAME_LOADING = 'CREATE_GAME_LOADING';
    /** 加载游戏界面的资源 */
    TYPES.LOAD_GAME_RESOURCE = 'LOAD_GAME_RESOURCE';
    /** 连接游戏对局服务器 */
    TYPES.CONNECT_TO_GAME_SERVER = 'CONNECT_TO_GAME_SERVER';
    /** 连接游戏对局服务器失败 */
    TYPES.GAME_SERVER_DISCONNECTED = 'GAME_SERVER_DISCONNECTED';
    /** 连接游戏对局服务器成功 */
    TYPES.GAME_SERVER_CONNECTED = 'GAME_SERVER_CONNECTED';
    /** 其他玩家载入超时 */
    TYPES.OTHERS_LOAD_TIMEOUT = 'OTHERS_LOAD_TIMEOUT';
    /** 渲染游戏界面 */
    TYPES.CREATE_GAME = 'CREATE_GAME';
    /** 销毁游戏界面的 Loading */
    TYPES.DESTROY_GAME_LOADING = 'DESTROY_GAME_LOADING';
    // Phase 3 - Game
    /** 游戏界面初始化 */
    TYPES.GAME_INITIALIZE = 'GAME_INITIALIZE';
    /** 游戏开始 */
    TYPES.GAME_START = 'GAME_START';
    /** 游戏暂停 */
    TYPES.GAME_PAUSE = 'GAME_PAUSE';
    /** 游戏继续 */
    TYPES.GAME_RESUME = 'GAME_RESUME';
    /** 游戏结束 */
    TYPES.GAME_OVER = 'GAME_OVER';
    /** 游戏结束的结算 */
    TYPES.GAME_OVER_RESULT = 'GAME_OVER_RESULT';
    /** 强制退出游戏 */
    TYPES.FORCED_QUIT_GAME = 'FORCED_QUIT_GAME';
    /** 强制退出游戏的结算 */
    TYPES.FORCED_QUIT_GAME_RESULT = 'FORCED_QUIT_GAME_RESULT';
    /** 销毁游戏界面 */
    TYPES.DESTROY_GAME = 'DESTROY_GAME';
    // Universal
    /** 创建子视图 */
    TYPES.CREATE_SUB_VIEW = 'CREATE_SUB_VIEW';
    /** 销毁子视图 */
    TYPES.DESTROY_SUB_VIEW = 'DESTROY_SUB_VIEW';
    /** 程序失去焦点 */
    TYPES.LOSE_FOCUS = 'LOSE_FOCUS';
    /** 程序获得焦点 */
    TYPES.OBTAIN_FOCUS = 'OBTAIN_FOCUS';
    return TYPES;
}());
__reflect(TYPES.prototype, "TYPES");
window['TYPES'] = TYPES;
//# sourceMappingURL=TYPES.js.map