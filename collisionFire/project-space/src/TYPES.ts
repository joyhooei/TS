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

class TYPES {
  // Phase 0 - HallLoading
  /** 创建大厅界面的 Loading */
  static readonly CREATE_HALL_LOADING: string = 'CREATE_HALL_LOADING'
  /** 加载大厅界面的资源 */
  static readonly LOAD_HALL_RESOURCE: string = 'LOAD_HALL_RESOURCE'
  /** 请求用户授权 */
  static readonly REQUEST_AUTHORIZATION: string = 'REQUEST_AUTHORIZATION'
  /** 请求用户授权失败 */
  static readonly AUTHORIZATION_FAILED: string = 'AUTHORIZATION_FAILED'
  /** 请求用户授权成功 */
  static readonly AUTHORIZATION_SUCCEEDED: string = 'AUTHORIZATION_SUCCEEDED'
  /** 连接游戏适配服务器 */
  static readonly CONNECT_TO_MATCH_SERVER: string = 'CONNECT_TO_MATCH_SERVER'
  /** 连接游戏适配服务器失败 */
  static readonly MATCH_SERVER_DISCONNECTED: string = 'MATCH_SERVER_DISCONNECTED'
  /** 连接游戏适配服务器成功 */
  static readonly MATCH_SERVER_CONNECTED: string = 'MATCH_SERVER_CONNECTED'
  /** 渲染大厅界面 */
  static readonly CREATE_HALL: string = 'CREATE_HALL'
  /** 销毁大厅界面的 Loading */
  static readonly DESTROY_HALL_LOADING: string = 'DESTROY_HALL_LOADING'

  // Phase 1 - Hall
  /** 大厅界面初始化 */
  static readonly HALL_INITIALIZE: string = 'HALL_INITIALIZE'
  /** 开始匹配 */
  static readonly MATCH_BEGIN: string = 'MATCH_BEGIN'
  /** 匹配超时 */
  static readonly MATCH_TIMEOUT: string = 'MATCH_TIMEOUT'
  /** 匹配成功 */
  static readonly MATCH_SUCCEEDED: string = 'MATCH_SUCCEEDED'
  /** 销毁大厅界面 */
  static readonly DESTROY_HALL: string = 'DESTROY_HALL'

  // Phase 2 - GameLoading
  /** 创建游戏界面的 Loading */
  static readonly CREATE_GAME_LOADING: string = 'CREATE_GAME_LOADING'
  /** 加载游戏界面的资源 */
  static readonly LOAD_GAME_RESOURCE: string = 'LOAD_GAME_RESOURCE'
  /** 连接游戏对局服务器 */
  static readonly CONNECT_TO_GAME_SERVER: string = 'CONNECT_TO_GAME_SERVER'
  /** 连接游戏对局服务器失败 */
  static readonly GAME_SERVER_DISCONNECTED: string = 'GAME_SERVER_DISCONNECTED'
  /** 连接游戏对局服务器成功 */
  static readonly GAME_SERVER_CONNECTED: string = 'GAME_SERVER_CONNECTED'
  /** 其他玩家载入超时 */
  static readonly OTHERS_LOAD_TIMEOUT: string = 'OTHERS_LOAD_TIMEOUT'
  /** 渲染游戏界面 */
  static readonly CREATE_GAME: string = 'CREATE_GAME'
  /** 销毁游戏界面的 Loading */
  static readonly DESTROY_GAME_LOADING: string = 'DESTROY_GAME_LOADING'

  // Phase 3 - Game
  /** 游戏界面初始化 */
  static readonly GAME_INITIALIZE: string = 'GAME_INITIALIZE'
  /** 游戏开始 */
  static readonly GAME_START: string = 'GAME_START'
  /** 游戏暂停 */
  static readonly GAME_PAUSE: string = 'GAME_PAUSE'
  /** 游戏继续 */
  static readonly GAME_RESUME: string = 'GAME_RESUME'
  /** 游戏结束 */
  static readonly GAME_OVER: string = 'GAME_OVER'
  /** 游戏结束的结算 */
  static readonly GAME_OVER_RESULT: string = 'GAME_OVER_RESULT'
  /** 强制退出游戏 */
  static readonly FORCED_QUIT_GAME: string = 'FORCED_QUIT_GAME'
  /** 强制退出游戏的结算 */
  static readonly FORCED_QUIT_GAME_RESULT: string = 'FORCED_QUIT_GAME_RESULT'
  /** 销毁游戏界面 */
  static readonly DESTROY_GAME: string = 'DESTROY_GAME'

  // Universal
  /** 创建子视图 */
  static readonly CREATE_SUB_VIEW: string = 'CREATE_SUB_VIEW'
  /** 销毁子视图 */
  static readonly DESTROY_SUB_VIEW: string = 'DESTROY_SUB_VIEW'
  /** 程序失去焦点 */
  static readonly LOSE_FOCUS: string = 'LOSE_FOCUS'
  /** 程序获得焦点 */
  static readonly OBTAIN_FOCUS: string = 'OBTAIN_FOCUS'
}

window['TYPES'] = TYPES
