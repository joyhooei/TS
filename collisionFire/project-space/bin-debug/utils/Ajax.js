/**
 * Orchid - Ajax.ts
 *
 * HTTP 连接工具类。
 *
 * @example Ajax('https://api.vqs.com/login') -> Promise
 * 第二个参数 postData 不存在或者值为 undefined 时使用 GET 方法，否则使用 POST 方法。
 *
 * @version 20180422
 * @author Winterwrath
 * @license 见 ORCHID-README
 */
function Ajax(url, postData) {
    return new Promise(function (resolve, reject) {
        var method = postData === undefined ? 'GET' : 'POST';
        var data = postData === undefined ? null : postData;
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.timeout = $data.ajaxTimeout;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    if (typeof xhr.response === 'string') {
                        try {
                            Log('Ajax', "Received from " + url + ":", xhr.response);
                            resolve(JSON.parse(xhr.response));
                        }
                        catch (e) {
                            reject(new Error('@Winterwrath: 服务器发送了错误的数据。'));
                        }
                    }
                    else {
                        Log('Ajax', "Received from " + url + ":", xhr.response);
                        resolve(xhr.response);
                    }
                }
                else {
                    reject(new Error('@Winterwrath: 服务器通信失败。'));
                }
            }
        };
        var rest = method === 'GET' ? "Sent to " + url : "Sent to " + url + ": " + postData;
        Log('Ajax', rest);
        xhr.send(data);
    });
}
//# sourceMappingURL=Ajax.js.map