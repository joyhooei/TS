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
var I18n = function (language) {
    function _mapLanguage(language) {
        var languageMap = $data.languageMap[language];
        if (!languageMap) {
            throw new Error("@Orchid: \u5728 $data.languageMap \u4E2D\u6CA1\u6709\u627E\u5230 " + language + " \u7684\u914D\u7F6E\uFF0C\u8BF7\u68C0\u67E5 $data.languageMap \u4E2D\u662F\u5426\u5B58\u5728\u8BE5\u8BED\u79CD\u3002");
        }
        else {
            Object.keys(languageMap).forEach(function (key, index) {
                I18n[key] = languageMap[key];
                I18n[index] = languageMap[key];
            });
        }
    }
    if (this instanceof I18n) {
        throw new Error("@Orchid: \u7C7B I18n \u65E0\u6CD5\u5B9E\u4F8B\u5316\uFF0C\u8BF7\u76F4\u63A5\u901A\u8FC7\u9759\u6001\u65B9\u6CD5\u6216\u6784\u9020\u51FD\u6570\u7684\u65B9\u5F0F\u8C03\u7528\u3002");
    }
    switch (language) {
        case 'zh-CN':
            _mapLanguage('zh-CN');
            break;
        case 'en-US':
            _mapLanguage('en-US');
            break;
        default:
            throw new Error("@Orchid: \u53C2\u6570 language \u7684\u5408\u6CD5\u503C\u4E0D\u5305\u62EC " + language + "\uFF0C\u8BF7\u4F7F\u7528 'zh-CN' \u6216 'en-US'\u3002");
    }
};
//# sourceMappingURL=I18n.js.map