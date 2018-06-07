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
function Log(typeString) {
    var param = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        param[_i - 1] = arguments[_i];
    }
    if ($data.isLogEnabled && !$data.isProductionEnvironment) {
        switch (typeString) {
            case 'Data'://yyy
                (_a = console.log).call.apply(_a, [null, '%c [' + typeString.toUpperCase() + '] ', 'background: #f33; color: #fff', performance.now().toFixed(4) + ' -'].concat(param));
                break;
            case 'Phase'://yyy
                (_b = console.log).call.apply(_b, [null, '%c [' + typeString.toUpperCase() + '] ', 'background: #b6ff93; color: #000', performance.now().toFixed(4) + ' -'].concat(param));
                break;
            case 'Router'://yyy
                (_c = console.log).call.apply(_c, [null, '%c [' + typeString.toUpperCase() + '] ', 'background: #6fa; color: #000', performance.now().toFixed(4) + ' -'].concat(param));
                break;
            case 'Ajax'://yyy
                (_d = console.log).call.apply(_d, [null, '%c [' + typeString.toUpperCase() + '] ', 'background: #ff983c; color: #fff', performance.now().toFixed(4) + ' -'].concat(param));
                break;
            case 'Socket':
                (_e = console.log).call.apply(_e, [null, '%c [' + typeString.toUpperCase() + '] ', 'background: #ba8cff; color: #fff', performance.now().toFixed(4) + ' -'].concat(param));
                break;
            case 'Wechat':
                (_f = console.log).call.apply(_f, [null, '%c [' + typeString.toUpperCase() + '] ', 'background: #40b0ff; color: #fff', performance.now().toFixed(4) + ' -'].concat(param));
                break;
            case 'Anime':
                (_g = console.log).call.apply(_g, [null, '%c [' + typeString.toUpperCase() + '] ', 'background: #4436ff; color: #fff', performance.now().toFixed(4) + ' -'].concat(param));
                break;
            case 'Audio'://yyy
                (_h = console.log).call.apply(_h, [null, '%c [' + typeString.toUpperCase() + '] ', 'background: #ffe270; color: #000', performance.now().toFixed(4) + ' -'].concat(param));
                break;
            case 'Bridge':
                (_j = console.log).call.apply(_j, [null, '%c [' + typeString.toUpperCase() + '] ', 'background: #ff6eec; color: #fff', performance.now().toFixed(4) + ' -'].concat(param));
                break;
            default://yyy
                (_k = console.log).call.apply(_k, [null, '%c [LOG] ', 'background: #ddd; color: #000', performance.now().toFixed(4) + ' -', typeString].concat(param));
        }
    }
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}
function Warn() {
    var param = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        param[_i] = arguments[_i];
    }
    if ($data.isLogEnabled && !$data.isProductionEnvironment) {
        console.warn.apply(null, param);
    }
}
//# sourceMappingURL=Log.js.map