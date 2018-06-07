/** 
 * Orchid - Bridge.ts
 * 
 * 连接原生客户端 API 的 JS 桥梁组件。
 * 
 * @example 无参数调用：Bridge($data.BridgeCallbackType.gameOver) -> void
 * @example 带参数调用：Bridge($data.BridgeCallbackType.addFriend, 'Jay') -> void
 * 
 * @version 20180416
 * @author Winterwrath
 * @license 见 ORCHID-README
 */

// const Bridge: any = function (callbackName: string, param?: any) {
//   if (this instanceof Bridge) {
//     throw new Error(`@Winterwrath: 类 Bridge 无法实例化，请直接通过静态方法调用。`)
//   }

//   if (!param) {
//     if ($data.platform === 3) {
//       window[callbackName]()
//     } else {
//       window[$data.bridgePrefix][callbackName]()
//     }
//   } else {
//     if ($data.platform === 3) {
//       window[callbackName](param)
//     } else {
//       window[$data.bridgePrefix][callbackName](param)
//     }
//   }
// }
