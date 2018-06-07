/**
 * Orchid - OrchidData.ts
 *
 * 本项目的数据中心模块。
 *
 * @config Data.isDeepMode: boolean
 * 是否使用深度遍历监听器以实现对多层对象、数组内部改变的直接监听，默认值为 false
 * 开启此选项的最低 Javascript 运行环境版本为 ES 2015
 * 注意：开启本选项后可能带来性能上的问题
 * @config Data.isRedefineObserverAllowed: boolean
 * 是否允许为一个已经设定观察器的属性重新指定新的观察器，默认值为 true
 * @function $observe(propertyName: string, callback: (newValue, oldValue?) => void, phase?: number, isSensitive?: boolean): void
 * 是 Data.observe 的别名
 * 详见 Data.observe 的注释
 * @function $dismiss(propertyName: string, initValue?: any): void
 * 是 Data.dismiss 的别名
 * 详见 Data.dismiss 的注释
 * @function Data.observe(propertyName: string, callback: (newValue, oldValue?) => void, phase?: number, isSensitive?: boolean): void
 * 在 $data 中的指定属性上绑定一个监听器，以实现视图随数据自动更新
 * 可选参数 phase 可以将监听器与一个指定的 phase 绑定，当离开所绑定的 $data.phase 后会自动解绑该监听器
 * 可选参数 isSensitive 为 true 时，即使从指定的 phase 跳转到相同的 phase 时也会自动解绑该监听器
 * 如果 Data.isRedefineObserverAllowed 为 true 时为同一个属性传入了不同的监听器则较早的监听器会被覆盖掉，但是之前传入的 phase 值仍然有效
 * @function Data.dismiss(propertyName: string, initValue?: any): void
 * 取消指定属性的数据绑定
 * 若指定 initValue 参数则将 initValue 赋给解绑后的属性
 * 若未指定 initValue 参数则保留当前的属性值
 * @function Data.dismissByPhase(phase: number): void
 * 根据 phase 的值解绑该 phase 下所有的观察器（不论 isSensitive 是否为 true）
 * @function Data.getAllObserverList(): string[]
 * 以数组的形式返回所有绑定了观察器的属性列表
 * @function Data.dismissAllObserver(): void
 * 取消所有已绑定的观察器
 *
 * @version 20180525
 * @author Winterwrath
 * @license 见 ORCHID-README
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data = (function () {
    function Data() {
    }
    Data.__propertyArray__ = [[[], []], [[], []], [[], []], [[], []]];
    Data.isDeepMode = false;
    Data.isRedefineObserverAllowed = true;
    Data.observe = function (propertyName, callback, phase, isSensitive) {
        if (!Data.isRedefineObserverAllowed && (typeof Object.getOwnPropertyDescriptor($data, propertyName)['set'] === 'function')) {
            throw new Error("@Orchid: \u5C5E\u6027 " + propertyName + " \u5DF2\u7ECF\u7ED1\u5B9A\u4E86\u89C2\u5BDF\u5668\uFF0C\u8BF7\u4F7F\u7528 $dismiss \u65B9\u6CD5\u53D6\u6D88\u5DF2\u7ED1\u5B9A\u7684\u89C2\u5BDF\u5668\u3002");
        }
        if (propertyName in $data) {
            if (propertyName === 'phase') {
                throw new Error("@Orchid: \u8BF7\u4E0D\u8981\u968F\u610F\u4FEE\u6539 $data.phase \u7684\u5185\u90E8\u5C5E\u6027\u548C\u65B9\u6CD5\u3002");
            }
            else {
                if (phase === 0 || phase === 1 || phase === 2 || phase === 3) {
                    Log('Data', "Observed " + propertyName + " on phase " + phase + (isSensitive ? '(sensitive)' : ''));
                    if (isSensitive) {
                        Data.__propertyArray__[phase][1].push(propertyName);
                    }
                    else {
                        Data.__propertyArray__[phase][0].push(propertyName);
                    }
                }
                else {
                    Log('Data', "Observed " + propertyName);
                }
                var value_1 = $data[propertyName];
                Object.defineProperty($data, propertyName, {
                    get: function () {
                        return value_1;
                    },
                    set: function (newValue) {
                        callback(newValue, value_1);
                        value_1 = newValue;
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        }
        else {
            throw new Error("@Orchid: \u5728 $data \u4E2D\u6CA1\u6709\u627E\u5230\u5C5E\u6027 " + propertyName + "\u3002");
        }
    };
    Data.dismiss = function (propertyName, initValue) {
        if (propertyName in $data) {
            if (propertyName === 'phase') {
                throw new Error("@Orchid: \u8BF7\u4E0D\u8981\u968F\u610F\u4FEE\u6539 $data.phase \u7684\u5185\u90E8\u5C5E\u6027\u548C\u65B9\u6CD5\u3002");
            }
            else {
                Log('Data', "Dismissed " + propertyName + (initValue === undefined ? '' : ' to initial value ') + (initValue === undefined ? '' : initValue));
                Object.defineProperty($data, propertyName, {
                    value: initValue === undefined ? $data[propertyName] : initValue,
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
        }
        else {
            throw new Error("@Orchid: \u5728 $data \u4E2D\u6CA1\u6709\u627E\u5230\u5C5E\u6027 " + propertyName + "\u3002");
        }
    };
    Data.dismissByPhase = function (phase) {
        if (phase === 0 || phase === 1 || phase === 2 || phase === 3) {
            Log('Data', "Dismissed all observer of phase " + phase);
            Data.__propertyArray__[phase][0].forEach(function (v) {
                Data.dismiss(v);
            });
            Data.__propertyArray__[phase][0] = [];
            Data.__propertyArray__[phase][1].forEach(function (v) {
                Data.dismiss(v);
            });
            Data.__propertyArray__[phase][1] = [];
        }
        else {
            throw new Error("@Orchid: $data.phase \u53EA\u80FD\u4E3A 0\u30011\u30012 \u6216 3\u3002");
        }
    };
    Data.getAllObserverList = function () {
        var result = [];
        Object.keys($data).forEach(function (v) {
            if (typeof Object.getOwnPropertyDescriptor($data, v)['set'] === 'function') {
                result.push(v);
            }
        });
        return result;
    };
    Data.dismissAllObserver = function () {
        Log('Data', "Dismissed all observer");
        Object.keys($data).forEach(function (v) {
            Data.dismiss(v);
        });
        Data.__propertyArray__ = [[[], []], [[], []], [[], []], [[], []]];
    };
    return Data;
}());
__reflect(Data.prototype, "Data");
var $observe = Data.observe;
var $dismiss = Data.dismiss;
function __initOrchidData__() {
    function onPhaseChange(newValue, oldValue) {
        Data.__propertyArray__[oldValue][1].forEach(function (v) {
            Data.dismiss(v);
        });
        Data.__propertyArray__[oldValue][1] = [];
        if (newValue !== oldValue) {
            Data.__propertyArray__[oldValue][0].forEach(function (v) {
                Data.dismiss(v);
            });
            Data.__propertyArray__[oldValue][0] = [];
        }
    }
    var phase = $data.phase;
    Object.preventExtensions($data);
    Object.preventExtensions(Data.__propertyArray__);
    Object.defineProperty($data, 'phase', {
        get: function () {
            return phase;
        },
        set: function (v) {
            if (v === 0 || v === 1 || v === 2 || v === 3) {
                Log('Phase', "Phase changed from " + $data.phase + " to " + v);
                onPhaseChange(v, $data.phase);
                phase = v;
            }
            else {
                throw new Error("@Orchid: $data.phase \u53EA\u80FD\u4E3A 0\u30011\u30012 \u6216 3\u3002");
            }
        },
        enumerable: false,
        configurable: false
    });
}
__initOrchidData__();
window['Data'] = Data;
window['$observe'] = $observe;
window['$dismiss'] = $dismiss;
//# sourceMappingURL=OrchidData.js.map