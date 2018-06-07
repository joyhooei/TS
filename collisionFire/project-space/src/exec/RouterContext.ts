/** 
 * Orchid - RouterContext.ts
 * 
 * 项目路由控制器的上下文对象。
 * 作用是为 Router.ts 中的函数提供 this。
 * 使用方法请参见 OrchidRouter.ts 的注释。
 * 
 * @version 20180521
 * @author Winterwrath
 * @license 见 ORCHID-README
 */

class RouterContext {
  public static hallLoadingCurrent: number = 0
  public static hallLoadingTotal: number = 0
  public static hallLoadingTimeoutCount: number = 0

  public static initLocalData(): void {
    Warn('@Winterwrath: initLocalData 中使用的是测试用数据。')
    $data.platform = 4
    $data.language = 'zh-CN'
  }

  public static initMapLanguage(language: string): void {
    I18n(language)
  }

  public static loadResource(onLoadFinished: Function): Promise<void> {
    return RES.loadConfig("resource/default.res.json", "resource/").then(() => new Promise((resolve, reject) => {
      let theme = new eui.Theme("resource/default.thm.json", $main.stage)
      theme.once(egret.Event.COMPLETE, () => {
        resolve()
      }, $main)
    })).then(() => {
      RES.loadGroup("preload", 0, {
        onProgress(current: number, total: number): void {
          RouterContext.hallLoadingCurrent++
          RouterContext.hallLoadingTimeoutCount = 0
          if (RouterContext.hallLoadingCurrent === 1) {
            RouterContext.hallLoadingTotal = total

            // 防止渲染太频繁造成卡顿，故设计成每一段时间渲染一次
            let progressDebounceTimer = setInterval(() => {
              let percentage = Math.floor(RouterContext.hallLoadingCurrent * 100 / RouterContext.hallLoadingTotal) / 100
              $view.hallLoading.textLabel.text = `${I18n.hallLoadingLoadResource} ${RouterContext.hallLoadingCurrent} / ${RouterContext.hallLoadingTotal}`
              egret.Tween.get($view.hallLoading.progressBar).to({ x: Math.floor(percentage * 545) - 442 }, $data.hallLoadingAnimationCost, egret.Ease.cubicIn)
              if (RouterContext.hallLoadingCurrent === RouterContext.hallLoadingTotal) {
                $view.hallLoading.textLabel.text = I18n.hallLoadingComplete
                clearInterval(progressDebounceTimer)
                setTimeout(() => {
                  onLoadFinished()
                }, $data.hallLoadingAnimationCost)
              } else {
                RouterContext.hallLoadingTimeoutCount++
                if (RouterContext.hallLoadingTimeoutCount > 3) {
                  RouterContext.hallLoadingTimeoutCount = 0
                  RouterContext.hallLoadingCurrent++
                }
              }
            }, $data.hallLoadingRefreshInterval)
          }
        }
      })
    })
  }
}

window['RouterContext'] = RouterContext
