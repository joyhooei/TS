/** 
 * Orchid - Main.ts
 * 
 * 本项目的入口类。
 * 声明了 $main 与 $stage 两个变量以便调用。
 * 
 * @const $main: Main
 * 指向 Main 类的实例
 * @const $stage: egret.Stage
 * 指向舞台的实例
 * 
 * @version 20180521
 * @author Winterwrath
 * @license 见 EGRET-README 和 ORCHID-README
 */

let $main: Main = null
let $stage: eui.Component = null

class Main extends eui.UILayer {
  protected createChildren(): void {
    super.createChildren()
    // 声明 $main 和 $stage 两个全局变量
    $main = this
    $stage = new eui.Component()

    // Egret 自带的生命周期系统
    egret.lifecycle.onPause = () => {}
    egret.lifecycle.onResume = () => {}

    // 注册 AssetAdapter 和 ThemeAdapter
    egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter())
    egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter())
    const $temp = {}

    // 注册声明周期函数
    Object.freeze(TYPES)    
    Object.keys(TYPES).forEach(v => {
      $hub.addEventListener(v, Router[v], RouterContext)
    })
    
    // 适配 iPhone X 的屏幕
    this.addChild($stage)
    Warn($data.versionInfomation)
    if ($main.stage.$stageHeight <= 1335) {
      Log('Adapt to iPhone 5/SE/6/6 Plus/7/7 Plus/8/8 Plus')
      $stage.y = -154
    } else if ($main.stage.$stageHeight <= 1467) {
      Log('Adapt to ?????')
      $stage.y = -88
    } else {
      Log('Adapt to iPhone X')
      $stage.y = 0
    }

    // 开始创建大厅的 Loading
    $dispatch(TYPES.CREATE_HALL_LOADING)
  }
}

window['$main'] = $main
window['$stage'] = $stage
