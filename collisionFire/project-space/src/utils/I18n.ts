/** 
 * Orchid - I18n.ts
 *
 * 文本国际化工具类。
 * 语言映射的文本存储于 $data.languageMap 中。
 * 在初始化语言种类之后可以通过 I18n.%IDENTIFIER% 或 I18n.%INDEX% 的方式输出国际化后的文本。
 * 
 * @example 初始化：I18n('zh-CN') -> void
 * @example 通过名称输出国际化后的文本：I18n.gameOver -> '游戏结束'
 * @example 通过序号输出国际化后的文本：I18n[2] -> '游戏结束'
 * 
 * @version 20180522
 * @author Winterwrath
 * @license 见 ORCHID-README
 */

const I18n: any = function (language: string): void {
  function _mapLanguage(language: string): void {
    let languageMap = $data.languageMap[language]
    if (!languageMap) {
      throw new Error(`@Orchid: 在 $data.languageMap 中没有找到 ${language} 的配置，请检查 $data.languageMap 中是否存在该语种。`)
    } else {
      Object.keys(languageMap).forEach((key, index) => {
        I18n[key] = languageMap[key]
        I18n[index] = languageMap[key]
      })
    }
  }

  if (this instanceof I18n) {
    throw new Error(`@Orchid: 类 I18n 无法实例化，请直接通过静态方法或构造函数的方式调用。`)
  }

  switch (language) {
    case 'zh-CN':
      _mapLanguage('zh-CN')
      break
    case 'en-US':
      _mapLanguage('en-US')
      break
    default:
      throw new Error(`@Orchid: 参数 language 的合法值不包括 ${language}，请使用 'zh-CN' 或 'en-US'。`)
  }
}
