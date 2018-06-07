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
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RouterContext = (function () {
    function RouterContext() {
    }
    RouterContext.initLocalData = function () {
        Warn('@Winterwrath: initLocalData 中使用的是测试用数据。');
        $data.platform = 4;
        $data.language = 'zh-CN';
    };
    RouterContext.initMapLanguage = function (language) {
        I18n(language);
    };
    RouterContext.loadResource = function (onLoadFinished) {
        return RES.loadConfig("resource/default.res.json", "resource/").then(function () { return new Promise(function (resolve, reject) {
            var theme = new eui.Theme("resource/default.thm.json", $main.stage);
            theme.once(egret.Event.COMPLETE, function () {
                resolve();
            }, $main);
        }); }).then(function () {
            RES.loadGroup("preload", 0, {
                onProgress: function (current, total) {
                    RouterContext.hallLoadingCurrent++;
                    RouterContext.hallLoadingTimeoutCount = 0;
                    if (RouterContext.hallLoadingCurrent === 1) {
                        RouterContext.hallLoadingTotal = total;
                        // 防止渲染太频繁造成卡顿，故设计成每一段时间渲染一次
                        var progressDebounceTimer_1 = setInterval(function () {
                            var percentage = Math.floor(RouterContext.hallLoadingCurrent * 100 / RouterContext.hallLoadingTotal) / 100;
                            $view.hallLoading.textLabel.text = I18n.hallLoadingLoadResource + " " + RouterContext.hallLoadingCurrent + " / " + RouterContext.hallLoadingTotal;
                            egret.Tween.get($view.hallLoading.progressBar).to({ x: Math.floor(percentage * 545) - 442 }, $data.hallLoadingAnimationCost, egret.Ease.cubicIn);
                            if (RouterContext.hallLoadingCurrent === RouterContext.hallLoadingTotal) {
                                $view.hallLoading.textLabel.text = I18n.hallLoadingComplete;
                                clearInterval(progressDebounceTimer_1);
                                setTimeout(function () {
                                    onLoadFinished();
                                }, $data.hallLoadingAnimationCost);
                            }
                            else {
                                RouterContext.hallLoadingTimeoutCount++;
                                if (RouterContext.hallLoadingTimeoutCount > 3) {
                                    RouterContext.hallLoadingTimeoutCount = 0;
                                    RouterContext.hallLoadingCurrent++;
                                }
                            }
                        }, $data.hallLoadingRefreshInterval);
                    }
                }
            });
        });
    };
    RouterContext.hallLoadingCurrent = 0;
    RouterContext.hallLoadingTotal = 0;
    RouterContext.hallLoadingTimeoutCount = 0;
    return RouterContext;
}());
__reflect(RouterContext.prototype, "RouterContext");
window['RouterContext'] = RouterContext;
//# sourceMappingURL=RouterContext.js.map