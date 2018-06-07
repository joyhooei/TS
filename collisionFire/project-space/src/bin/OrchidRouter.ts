/** 
 * Orchid - OrchidRouter.ts
 * 
 * 本项目的路由控制器。
 * 
 * @const $hub: egret.EventDispatcher
 * 一个全局唯一的事件调度中心
 * @function $dispatch(type: string) => void
 * 发布事件到事件调度中心
 * 
 * @version 20180522
 * @author Winterwrath
 * @license 见 ORCHID-README
 */

const $hub = new egret.EventDispatcher()
const $dispatch = function (type: string, data?: any): void {
  if (data) {
    Log('Router', type, data)
    $hub.dispatchEvent(new egret.Event(type, false, false, data))
  } else {
    Log('Router', type)
    $hub.dispatchEvent(new egret.Event(type, false, false))
  }
}

window['$hub'] = $hub
window['$dispatch'] = $dispatch
