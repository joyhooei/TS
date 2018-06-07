/** 
 * Orchid - Log.ts
 * 
 * 日志工具类。
 * 仅在 $data.isLogEnabled 为 true 且不为线上环境时才会向控制台打印日志。
 * 其中 Log 方法会在类型字符串后添加一个时间标记， Warn 方法会生成一条黄色背景的警告。
 * 
 * @example 打印日志：Log('Data', '123') -> [DATA] 1492.9980 123
 * @example 打印日志：Log($data.userID) -> [LOG] 1492.9980 10903000
 * @example 打印提醒：Warn('NOTICE') -> NOTICE（黄色背景）
 * 
 * @version 20180526
 * @author Winterwrath
 * @license 见 ORCHID-README
 */

function Log(typeString: any, ...param: any[]): void {
  if ($data.isLogEnabled && !$data.isProductionEnvironment) {
    switch (typeString) {
      case 'Data': //yyy
        console.log.call(null, '%c [' + typeString.toUpperCase() + '] ', 'background: #f33; color: #fff', performance.now().toFixed(4) + ' -', ...param)
        break
      case 'Phase': //yyy
        console.log.call(null, '%c [' + typeString.toUpperCase() + '] ', 'background: #b6ff93; color: #000', performance.now().toFixed(4) + ' -', ...param)
        break
      case 'Router': //yyy
        console.log.call(null, '%c [' + typeString.toUpperCase() + '] ', 'background: #6fa; color: #000', performance.now().toFixed(4) + ' -', ...param)
        break
      case 'Ajax': //yyy
        console.log.call(null, '%c [' + typeString.toUpperCase() + '] ', 'background: #ff983c; color: #fff', performance.now().toFixed(4) + ' -', ...param)
        break
      case 'Socket':
        console.log.call(null, '%c [' + typeString.toUpperCase() + '] ', 'background: #ba8cff; color: #fff', performance.now().toFixed(4) + ' -', ...param)
        break
      case 'Wechat':
        console.log.call(null, '%c [' + typeString.toUpperCase() + '] ', 'background: #40b0ff; color: #fff', performance.now().toFixed(4) + ' -', ...param)
        break
      case 'Anime':
        console.log.call(null, '%c [' + typeString.toUpperCase() + '] ', 'background: #4436ff; color: #fff', performance.now().toFixed(4) + ' -', ...param)
        break
      case 'Audio': //yyy
        console.log.call(null, '%c [' + typeString.toUpperCase() + '] ', 'background: #ffe270; color: #000', performance.now().toFixed(4) + ' -', ...param)
        break
      case 'Bridge':
        console.log.call(null, '%c [' + typeString.toUpperCase() + '] ', 'background: #ff6eec; color: #fff', performance.now().toFixed(4) + ' -', ...param)
        break
      default: //yyy
        console.log.call(null, '%c [LOG] ', 'background: #ddd; color: #000', performance.now().toFixed(4) + ' -', typeString, ...param)
    }
  }
}

function Warn(...param: any[]): void {
  if ($data.isLogEnabled && !$data.isProductionEnvironment) {
    console.warn.apply(null, param)
  }
}
