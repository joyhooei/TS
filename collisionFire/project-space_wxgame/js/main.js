var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var MD5 = (function () {
    function MD5() {
        this.hexcase = 0;
        /* hex output format. 0 - lowercase; 1 - uppercase        */
        this.b64pad = "";
    }
    /* base-64 pad character. "=" for strict RFC compliance   */
    /*
     * These are the privates you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    MD5.prototype.hex_md5 = function (s) {
        return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s)));
    };
    MD5.prototype.b64_md5 = function (s) {
        return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s)));
    };
    MD5.prototype.any_md5 = function (s, e) {
        return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e);
    };
    MD5.prototype.hex_hmac_md5 = function (k, d) {
        return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
    };
    MD5.prototype.b64_hmac_md5 = function (k, d) {
        return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
    };
    MD5.prototype.any_hmac_md5 = function (k, d, e) {
        return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e);
    };
    /*
     * Perform a simple self-test to see if the VM is working
     */
    MD5.prototype.md5_vm_test = function () {
        return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
    };
    /*
     * Calculate the MD5 of a raw string
     */
    MD5.prototype.rstr_md5 = function (s) {
        return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
    };
    /*
     * Calculate the HMAC-MD5, of a key and some data (raw strings)
     */
    MD5.prototype.rstr_hmac_md5 = function (key, data) {
        var bkey = this.rstr2binl(key);
        if (bkey.length > 16)
            bkey = this.binl_md5(bkey, key.length * 8);
        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
        return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
    };
    /*
     * Convert a raw string to a hex string
     */
    MD5.prototype.rstr2hex = function (input) {
        try {
            this.hexcase;
        }
        catch (e) {
            this.hexcase = 0;
        }
        var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var output = "";
        var x;
        for (var i = 0; i < input.length; i++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F)
                + hex_tab.charAt(x & 0x0F);
        }
        return output;
    };
    /*
     * Convert a raw string to a base-64 string
     */
    MD5.prototype.rstr2b64 = function (input) {
        try {
            this.b64pad;
        }
        catch (e) {
            this.b64pad = '';
        }
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var output = "";
        var len = input.length;
        for (var i = 0; i < len; i += 3) {
            var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > input.length * 8)
                    output += this.b64pad;
                else
                    output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
            }
        }
        return output;
    };
    /*
     * Convert a raw string to an arbitrary string encoding
     */
    MD5.prototype.rstr2any = function (input, encoding) {
        var divisor = encoding.length;
        var i, j, q, x, quotient;
        /* Convert to an array of 16-bit big-endian values, forming the dividend */
        var dividend = Array(Math.ceil(input.length / 2));
        for (i = 0; i < dividend.length; i++) {
            dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
        }
        /*
         * Repeatedly perform a long division. The binary array forms the dividend,
         * the length of the encoding is the divisor. Once computed, the quotient
         * forms the dividend for the next step. All remainders are stored for later
         * use.
         */
        var full_length = Math.ceil(input.length * 8 /
            (Math.log(encoding.length) / Math.log(2)));
        var remainders = Array(full_length);
        for (j = 0; j < full_length; j++) {
            quotient = Array();
            x = 0;
            for (i = 0; i < dividend.length; i++) {
                x = (x << 16) + dividend[i];
                q = Math.floor(x / divisor);
                x -= q * divisor;
                if (quotient.length > 0 || q > 0)
                    quotient[quotient.length] = q;
            }
            remainders[j] = x;
            dividend = quotient;
        }
        /* Convert the remainders to the output string */
        var output = "";
        for (i = remainders.length - 1; i >= 0; i--)
            output += encoding.charAt(remainders[i]);
        return output;
    };
    /*
     * Encode a string as utf-8.
     * For efficiency, this assumes the input is valid utf-16.
     */
    MD5.prototype.str2rstr_utf8 = function (input) {
        var output = "";
        var i = -1;
        var x, y;
        while (++i < input.length) {
            /* Decode utf-16 surrogate pairs */
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }
            /* Encode output as utf-8 */
            if (x <= 0x7F)
                output += String.fromCharCode(x);
            else if (x <= 0x7FF)
                output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
            else if (x <= 0xFFFF)
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            else if (x <= 0x1FFFFF)
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        }
        return output;
    };
    /*
     * Encode a string as utf-16
     */
    MD5.prototype.str2rstr_utf16le = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
        return output;
    };
    MD5.prototype.str2rstr_utf16be = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
        return output;
    };
    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    MD5.prototype.rstr2binl = function (input) {
        var output = Array(input.length >> 2);
        for (var i = 0; i < output.length; i++)
            output[i] = 0;
        for (var i = 0; i < input.length * 8; i += 8)
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        return output;
    };
    /*
     * Convert an array of little-endian words to a string
     */
    MD5.prototype.binl2rstr = function (input) {
        var output = "";
        for (var i = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        return output;
    };
    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    MD5.prototype.binl_md5 = function (x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = this.safe_add(a, olda);
            b = this.safe_add(b, oldb);
            c = this.safe_add(c, oldc);
            d = this.safe_add(d, oldd);
        }
        return [a, b, c, d];
    };
    /*
     * These privates implement the four basic operations the algorithm uses.
     */
    MD5.prototype.md5_cmn = function (q, a, b, x, s, t) {
        return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
    };
    MD5.prototype.md5_ff = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    };
    MD5.prototype.md5_gg = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    };
    MD5.prototype.md5_hh = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
    };
    MD5.prototype.md5_ii = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    };
    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    MD5.prototype.safe_add = function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    };
    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    MD5.prototype.bit_rol = function (num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    };
    return MD5;
}());
__reflect(MD5.prototype, "MD5");
/**
 * Orchid - Data.ts
 *
 * 本项目的数据中心。
 * 使用方法请参见 OrchidData.ts 的注释。
 *
 * @version 20180521
 * @author Winterwrath
 * @license 见 ORCHID-README
 */
var $data = {
    // 系统常量
    gameID: 1005,
    wechatAppID: 'wx6937dace80289a44',
    sessionKey: 'AIDNWQSDKCLAS',
    hostTestURL: 'http://mirror.vqs.com',
    hostProductionURL: 'https://api2.vqs.com',
    uiSocketURL: 'wss://clj.vqs.com/cmd',
    gameSocketURL: 'wss://pks.vqs.com/mla',
    fontFamilyTitle: 'PingFang SC, Myriad Pro, Hiragino Sans GB, Microsoft YaHei, simHei, sans-serif',
    fontFamilyContent: '-apple-system, BlinkMacSystemFont, simHei, sans-serif',
    versionInfomation: 'Orchid version: 2.0.0',
    bridgePrefix: 'VqsGame',
    shareImageURL: 'resource/share.jpg',
    gameLoadingBackgroundURL: 'resource/gameLoading.jpg',
    hallLoadingProgressURL: 'resource/hallLoadingProgress.jpg',
    hallLoadingBackgroundURL: 'resource/hallLoading.jpg',
    // 状态信息
    phase: 0,
    isLogEnabled: true,
    isProductionEnvironment: false,
    // 全局配置项
    hallLoadingRefreshInterval: 500,
    hallLoadingAnimationCost: 300,
    gameLoadingRefreshInterval: 500,
    gameLoadingAnimationCost: 300,
    uiSocketTimeout: 25000,
    matchWaitingTimeout: 5000,
    ajaxTimeout: 60000,
    startInterval: 1000,
    // 玩家信息
    platform: 4,
    language: 'zh-CN',
    myID: 0,
    myName: '',
    myGender: 0,
    myAge: 0,
    myHeadimg: '',
    myCoin: 8888,
    myRoundCount: 0,
    // 对局信息
    roomID: 'GI9MK201',
    inviteTimestamp: 0,
    hasMatchedAI: false,
    opponentID: 0,
    opponentName: '',
    opponentGender: 0,
    opponentAge: 0,
    opponentHeadimg: '',
    // I18n 文本映射
    languageMap: {
        'zh-CN': {
            hallLoadingInit: '正在初始化',
            hallLoadingLoadResource: '正在加载文件',
            hallLoadingComplete: '加载完成',
            hallLoadingRequestAuth: '正在读取用户资料',
            hallLoadingAuthDenied: '用户资料读取失败',
            hallLoadingConnecting: '正在连接游戏适配服务器',
            hallLoadingConnectFailed: '游戏适配服务器连接失败',
            hallLoadingEnter: '正在进入游戏大厅',
            gameStart: '游戏开始',
            gameOver: '游戏结束',
            wechatAuthorizationFailTitle: '注意',
            wechatAuthorizationFailText: '您刚刚拒绝了授权，请10分钟后再次申请。',
            wechatShareTitle0: '谁人敢与我一战',
            wechatShareTitle1: '快来来大战三百回合',
            wechatShareTitle2: '我的战绩强无敌，求打败',
            wechatShareInvite0: '你还在玩儿跳一跳？落伍辣，快来看看这款魔性咸鱼',
            wechatShareInvite1: '作为咸鱼中最咸的一条，常因含盐量过高而独领风骚',
            wechatShareInvite2: '快来虐死这条咸鱼',
            wechatShareInvite3: '我手残了，也变强了，你能比我多上一层？',
            wechatShareInvite4: '小哥哥小姐姐，上天吗？',
            wechatShareInvite5: '我居然被一条咸鱼嘲笑了，不能忍不能忍！',
            wechatShareInvite6: '实时匹配，真人对战，你的男神女神都在这里',
            wechatShareInvite7: '玩儿这个游戏，隔着屏幕都笑出声',
            wechatShareInvite8: '毒性太大停不了，我保证玩完这把就关',
            wechatShareTitleResult: '我的战绩无敌强，求打败',
            shareFailedToast: '换个群分享吧',
            functionIsNotAvailable: '功能暂未开放'
        },
        'en-US': {
            uiLoadingInit: '',
            uiLoadingLoadResource: '',
            uiLoadingComplete: '',
            uiLoadingRequestAuth: '',
            uiLoadingAuthDenied: '',
            uiLoadingConnecting: '',
            uiLoadingConnectFailed: '',
            uiLoadingEnter: '',
            gameStart: '',
            gameOver: '',
            wechatAuthorizationFailTitle: '',
            wechatAuthorizationFailText: '',
            wechatShareTitle0: '',
            wechatShareTitle1: '',
            wechatShareTitle2: '',
            wechatShareInvite0: '',
            wechatShareInvite1: '',
            wechatShareInvite2: '',
            wechatShareInvite3: '',
            wechatShareInvite4: '',
            wechatShareInvite5: '',
            wechatShareInvite6: '',
            wechatShareInvite7: '',
            wechatShareInvite8: '',
            wechatShareTitleResult: '',
            shareFailedToast: '',
            functionIsNotAvailable: ''
        }
    },
    //  游戏配置信息
    squareList: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
    squareView: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
    pageX: 8,
    pageY: 10,
    score: 0,
    gold: 0,
    maxScore: 0,
    gameTitleTop: "0",
    gameTitleScore: "0",
    goldNumber: "",
    gamePay: 30,
    gameId: 1105,
    key: true,
    //  微信参数
    goldURL: 'https://wx.vvppw.com/wx/member/add',
    get_openURL: "https://wx.vvppw.com/wx/member/get_open",
    loginURL: "https://wx.vvppw.com/wx/member/register_third",
    reduceURL: "https://wx.vvppw.com/wx/member/reduce",
    moreGameURL: "https://wx.vvppw.com/wx/member/more",
    code: "",
    encryptedData: "",
    iv: "",
    userInfo: {},
    session_key: "",
    token: "",
    openid: "",
    userID: 0,
    reduceGold: "30",
    shareAddGold: 100,
    shareImage: "resource/hall/2.png",
    MD5: new MD5(),
    shareTextList: [
        "消出幸运草，未来一个月转运~666~",
        "佛系少女必备游戏~每天都是星期七",
        "陪伴我最长时间的游戏，消磨时间必备游戏~",
        "不氪金 消磨必备必备~",
        "天啦噜 一玩就几个小时候了~沉迷！",
        "秒杀2048的休闲益智游戏!",
        "居家旅行打发零碎时间必备游戏！",
        "消除消的根本停不下来！",
        "同学说很不屑的游戏，她试玩后根本停不下来！",
        "超耐玩易上手易上瘾!试玩三分钟沉迷一下午！",
        "让人一盘接一局根本停不下来的消除游戏！",
        "玩了几个小时，硬是没消出钻石！继续消！"
    ],
    version: 101,
    isShare: 1
};
window['$data'] = $data;
/**
 * Orchid - TYPES.ts
 *
 * 声明本项目中用到的状态名称。
 * 通过 $dispatch 方法改变。
 * 可根据需求的不同在此处定义新的状态。
 * 使用方法请参见 OrchidRouter.ts 的注释。
 *
 * @version 20180521
 * @author Winterwrath
 * @license 见 ORCHID-README
 */
var TYPES = (function () {
    function TYPES() {
    }
    // Phase 0 - HallLoading
    /** 创建大厅界面的 Loading */
    TYPES.CREATE_HALL_LOADING = 'CREATE_HALL_LOADING';
    /** 加载大厅界面的资源 */
    TYPES.LOAD_HALL_RESOURCE = 'LOAD_HALL_RESOURCE';
    /** 请求用户授权 */
    TYPES.REQUEST_AUTHORIZATION = 'REQUEST_AUTHORIZATION';
    /** 请求用户授权失败 */
    TYPES.AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED';
    /** 请求用户授权成功 */
    TYPES.AUTHORIZATION_SUCCEEDED = 'AUTHORIZATION_SUCCEEDED';
    /** 连接游戏适配服务器 */
    TYPES.CONNECT_TO_MATCH_SERVER = 'CONNECT_TO_MATCH_SERVER';
    /** 连接游戏适配服务器失败 */
    TYPES.MATCH_SERVER_DISCONNECTED = 'MATCH_SERVER_DISCONNECTED';
    /** 连接游戏适配服务器成功 */
    TYPES.MATCH_SERVER_CONNECTED = 'MATCH_SERVER_CONNECTED';
    /** 渲染大厅界面 */
    TYPES.CREATE_HALL = 'CREATE_HALL';
    /** 销毁大厅界面的 Loading */
    TYPES.DESTROY_HALL_LOADING = 'DESTROY_HALL_LOADING';
    // Phase 1 - Hall
    /** 大厅界面初始化 */
    TYPES.HALL_INITIALIZE = 'HALL_INITIALIZE';
    /** 开始匹配 */
    TYPES.MATCH_BEGIN = 'MATCH_BEGIN';
    /** 匹配超时 */
    TYPES.MATCH_TIMEOUT = 'MATCH_TIMEOUT';
    /** 匹配成功 */
    TYPES.MATCH_SUCCEEDED = 'MATCH_SUCCEEDED';
    /** 销毁大厅界面 */
    TYPES.DESTROY_HALL = 'DESTROY_HALL';
    // Phase 2 - GameLoading
    /** 创建游戏界面的 Loading */
    TYPES.CREATE_GAME_LOADING = 'CREATE_GAME_LOADING';
    /** 加载游戏界面的资源 */
    TYPES.LOAD_GAME_RESOURCE = 'LOAD_GAME_RESOURCE';
    /** 连接游戏对局服务器 */
    TYPES.CONNECT_TO_GAME_SERVER = 'CONNECT_TO_GAME_SERVER';
    /** 连接游戏对局服务器失败 */
    TYPES.GAME_SERVER_DISCONNECTED = 'GAME_SERVER_DISCONNECTED';
    /** 连接游戏对局服务器成功 */
    TYPES.GAME_SERVER_CONNECTED = 'GAME_SERVER_CONNECTED';
    /** 其他玩家载入超时 */
    TYPES.OTHERS_LOAD_TIMEOUT = 'OTHERS_LOAD_TIMEOUT';
    /** 渲染游戏界面 */
    TYPES.CREATE_GAME = 'CREATE_GAME';
    /** 销毁游戏界面的 Loading */
    TYPES.DESTROY_GAME_LOADING = 'DESTROY_GAME_LOADING';
    // Phase 3 - Game
    /** 游戏界面初始化 */
    TYPES.GAME_INITIALIZE = 'GAME_INITIALIZE';
    /** 游戏开始 */
    TYPES.GAME_START = 'GAME_START';
    /** 游戏暂停 */
    TYPES.GAME_PAUSE = 'GAME_PAUSE';
    /** 游戏继续 */
    TYPES.GAME_RESUME = 'GAME_RESUME';
    /** 游戏结束 */
    TYPES.GAME_OVER = 'GAME_OVER';
    /** 游戏结束的结算 */
    TYPES.GAME_OVER_RESULT = 'GAME_OVER_RESULT';
    /** 强制退出游戏 */
    TYPES.FORCED_QUIT_GAME = 'FORCED_QUIT_GAME';
    /** 强制退出游戏的结算 */
    TYPES.FORCED_QUIT_GAME_RESULT = 'FORCED_QUIT_GAME_RESULT';
    /** 销毁游戏界面 */
    TYPES.DESTROY_GAME = 'DESTROY_GAME';
    // Universal
    /** 创建子视图 */
    TYPES.CREATE_SUB_VIEW = 'CREATE_SUB_VIEW';
    /** 销毁子视图 */
    TYPES.DESTROY_SUB_VIEW = 'DESTROY_SUB_VIEW';
    /** 程序失去焦点 */
    TYPES.LOSE_FOCUS = 'LOSE_FOCUS';
    /** 程序获得焦点 */
    TYPES.OBTAIN_FOCUS = 'OBTAIN_FOCUS';
    return TYPES;
}());
__reflect(TYPES.prototype, "TYPES");
window['TYPES'] = TYPES;
/**
 * Orchid - View.ts
 *
 * 声明本项目中使用到的视图。
 * 在此处声明的视图可以实现 IDE 自动提示。
 *
 * @version 20180521
 * @author Winterwrath
 * @license 见 ORCHID-README
 */
var $view = (function () {
    function $view() {
    }
    return $view;
}());
__reflect($view.prototype, "$view");
window['$view'] = $view;
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
/**
 * Orchid - OrchidRouter.ts
 *
 * 本项目的路由控制器。
 *
 * @const $hub: egret.EventDispatcher
 * 一个全局唯一的事件调度中心
 * @function $dispatch(type: string) => void
 * 发布事件到事件调度中心
 *
 * @version 20180522
 * @author Winterwrath
 * @license 见 ORCHID-README
 */
var $hub = new egret.EventDispatcher();
var $dispatch = function (type, data) {
    if (data) {
        Log('Router', type, data);
        $hub.dispatchEvent(new egret.Event(type, false, false, data));
    }
    else {
        Log('Router', type);
        $hub.dispatchEvent(new egret.Event(type, false, false));
    }
};
window['$hub'] = $hub;
window['$dispatch'] = $dispatch;
/**
 * Orchid - Router.ts
 *
 * 项目的路由控制器。
 * 通过 $dispatch 方法调用。
 * 使用方法请参见 OrchidRouter.ts 的注释。
 *
 * @version 20180521
 * @author Winterwrath
 * @license 见 ORCHID-README
 */
var Router = (_a = {},
    // Phase 0 - HallLoading
    /** 创建大厅界面的 Loading */
    _a[TYPES.CREATE_HALL_LOADING] = function () {
        $data.phase = 0;
        this.initLocalData();
        this.initMapLanguage($data.language);
        $view.hallLoading = new HallLoading();
        $stage.addChild($view.hallLoading);
        Anime.fadeIn($view.hallLoading);
        $dispatch(TYPES.LOAD_HALL_RESOURCE);
    },
    /** 加载大厅界面的资源 */
    _a[TYPES.LOAD_HALL_RESOURCE] = function () {
        this.loadResource(function () {
            $dispatch(TYPES.REQUEST_AUTHORIZATION);
        }).catch(function () {
            throw new Error('@Orchid 资源加载失败。');
        });
    },
    /** 请求用户授权 */
    _a[TYPES.REQUEST_AUTHORIZATION] = function () {
        $view.hallLoading.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { AudioManager.playSound('tap_mp3'); }, $main);
        $view.hallLoading.textLabel.text = I18n.hallLoadingRequestAuth;
        // Connection.login()
        $dispatch(TYPES.CREATE_HALL);
    },
    /** 请求用户授权失败 */
    _a[TYPES.AUTHORIZATION_FAILED] = function () {
        $view.hallLoading.textLabel.text = I18n.hallLoadingAuthDenied;
    },
    /** 请求用户授权成功 */
    _a[TYPES.AUTHORIZATION_SUCCEEDED] = function () {
        // $view.hall.userName.text = $data.myName
        // $view.hall.userHeadimg.source = $data.myHeadimg
        // $view.hall.userCoin.text = String($data.myCoin)
        // $view.hall.userGender.source = $data.myGender === 0 ? 'gender-0_png' : 'gender-1_png'
    },
    /** 连接游戏适配服务器 */
    _a[TYPES.CONNECT_TO_MATCH_SERVER] = function () {
        $view.hallLoading.textLabel.text = I18n.hallLoadingConnecting;
    },
    /** 连接游戏适配服务器失败 */
    _a[TYPES.MATCH_SERVER_DISCONNECTED] = function () {
        $view.hallLoading.textLabel.text = I18n.hallLoadingConnectFailed;
    },
    /** 连接游戏适配服务器成功 */
    _a[TYPES.MATCH_SERVER_CONNECTED] = function () {
        $view.hallLoading.textLabel.text = I18n.hallLoadingEnter;
    },
    /** 渲染大厅界面 */
    _a[TYPES.CREATE_HALL] = function () {
        // $view.hall = new Hall()
        // $view.hall.visible = false
        // $stage.addChild($view.hall)
        // $stage.swapChildren($view.hall, $view.hallLoading)    
        // $view.hall.visible = true
        $dispatch(TYPES.DESTROY_HALL_LOADING);
    },
    /** 销毁大厅界面的 Loading */
    _a[TYPES.DESTROY_HALL_LOADING] = function () {
        egret.Tween.get($view.hallLoading).wait($data.hallLoadingRefreshInterval * 2).to({ alpha: 0 }, 100).call(function () {
            $stage.removeChild($view.hallLoading);
        });
        $dispatch(TYPES.HALL_INITIALIZE);
    },
    // Phase 1 - Hall
    /** 大厅界面初始化 */
    _a[TYPES.HALL_INITIALIZE] = function () {
        var _this = this;
        window['wx'].showShareMenu({
            withShareTicket: true
        });
        window['wx'].login({
            success: function (res) {
                console.log("login", res);
                $data.code = res.code;
                window['wx'].getUserInfo({
                    success: function (res) {
                        console.log("getUserInfo", res);
                        $data.encryptedData = res.encryptedData,
                            $data.iv = res.iv,
                            $data.userInfo = res.userInfo;
                        Ajax($data.get_openURL, {
                            postData: true,
                            js_code: $data.code,
                            game_id: $data.gameId,
                        }).then(function (res) {
                            console.log("jscode获取token和openid", res);
                            $data.session_key = res["data"].session_key,
                                console.log("sessionKey", $data.sessionKey);
                            Ajax($data.loginURL, {
                                postData: true,
                                encryptedData: $data.encryptedData,
                                iv: $data.iv,
                                session_key: $data.session_key,
                                game_id: $data.gameId,
                                version: $data.version
                            }).then(function (res) {
                                console.log("登录注册接口", res);
                                $data.token = res["data"].token;
                                $data.goldNumber = res["data"].gold;
                                $data.userID = res["data"].id;
                                $data.gameTitleTop = res["data"].max_score;
                                $data.isShare = res["data"].share_lock;
                                console.log("+++++++++++++++++++++2");
                                AudioManager.playLoop('hall_mp3');
                                $view.home = new Home();
                                $stage.addChild($view.home);
                                // $dispatch(TYPES.DESTROY_HALL_LOADING)
                                $view.home.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                                    AudioManager.playSound('button_mp3');
                                }, _this);
                            });
                        });
                    }
                });
            }
        });
        // $dispatch(TYPES.CREATE_GAME)
    },
    /** 开始匹配 */
    _a[TYPES.MATCH_BEGIN] = function () {
    },
    /** 匹配超时 */
    _a[TYPES.MATCH_TIMEOUT] = function () {
    },
    /** 匹配成功 */
    _a[TYPES.MATCH_SUCCEEDED] = function () {
    },
    /** 销毁大厅界面 */
    _a[TYPES.DESTROY_HALL] = function () {
    },
    // Phase 2 - GameLoading
    /** 创建游戏界面的 Loading */
    _a[TYPES.CREATE_GAME_LOADING] = function () {
    },
    /** 加载游戏界面的资源 */
    _a[TYPES.LOAD_GAME_RESOURCE] = function () {
    },
    /** 连接游戏对局服务器 */
    _a[TYPES.CONNECT_TO_GAME_SERVER] = function () {
    },
    /** 连接游戏对局服务器失败 */
    _a[TYPES.GAME_SERVER_DISCONNECTED] = function () {
    },
    /** 连接游戏对局服务器成功 */
    _a[TYPES.GAME_SERVER_CONNECTED] = function () {
    },
    /** 其他玩家载入超时 */
    _a[TYPES.OTHERS_LOAD_TIMEOUT] = function () {
    },
    /** 渲染游戏界面 */
    _a[TYPES.CREATE_GAME] = function () {
        AudioManager.playLoop('gameStare_mp3');
        $data.phase = 3;
        $view.game = new Game();
        $stage.addChild($view.game);
        $stage.removeChild($view.home);
    },
    /** 销毁游戏界面的 Loading */
    _a[TYPES.DESTROY_GAME_LOADING] = function () {
    },
    // Phase 3 - Game
    /** 游戏界面初始化 */
    _a[TYPES.GAME_INITIALIZE] = function () {
        AudioManager.playLoop('gameStare_mp3');
        $view.game = new Game();
        $stage.addChild($view.game);
        $stage.removeChild($view.home);
        // $dispatch(TYPES.GAME_START)
    },
    /** 游戏开始 */
    _a[TYPES.GAME_START] = function () {
    },
    /** 游戏暂停 */
    _a[TYPES.GAME_PAUSE] = function () {
    },
    /** 游戏继续 */
    _a[TYPES.GAME_RESUME] = function () {
    },
    /** 游戏结束 */
    _a[TYPES.GAME_OVER] = function () {
        AudioManager.stopMusic();
        AudioManager.playSound('false_mp3');
        $view.clear = new Clearing;
        $stage.addChild($view.clear);
    },
    /** 游戏结束的结算 */
    _a[TYPES.GAME_OVER_RESULT] = function () {
    },
    /** 强制退出游戏 */
    _a[TYPES.FORCED_QUIT_GAME] = function () {
    },
    /** 强制退出游戏的结算 */
    _a[TYPES.FORCED_QUIT_GAME_RESULT] = function () {
    },
    /** 销毁游戏界面 */
    _a[TYPES.DESTROY_GAME] = function () {
    },
    // Universal
    /** 创建子视图 */
    _a[TYPES.CREATE_SUB_VIEW] = function () {
    },
    /** 销毁子视图 */
    _a[TYPES.DESTROY_SUB_VIEW] = function () {
    },
    /** 程序失去焦点 */
    _a[TYPES.LOSE_FOCUS] = function () {
    },
    /** 程序获得焦点 */
    _a[TYPES.OBTAIN_FOCUS] = function () {
    },
    _a);
window['Router'] = Router;
var _a;
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
/**
 * Orchid - Anime.ts
 *
 * 动画与效果工具类。
 *
 * @function Anime.fadeIn(item: egret.DisplayObjectContainer): void
 * 淡入显示该对象，一般用于制作添加新视图时的过渡效果
 *
 * @version 20180525
 * @author Winterwrath
 * @license 见 ORCHID-README
 */
var Anime = (function () {
    function Anime() {
    }
    Anime.fadeIn = function (item) {
        Log('Anime', 'Fade in:', item.constructor.name);
        item.alpha = 0;
        egret.Tween.get(item).to({ alpha: 1 }, 100);
    };
    return Anime;
}());
__reflect(Anime.prototype, "Anime");
window['Anime'] = Anime;
/**
 * Orchid - ThemeAdapter.ts
 *
 * Egret RES 的资源适配器。
 *
 * @version 20180521
 * @author Egret
 * @license 见 EGRET-README
 */
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
/**
 * Orchid - AudioManager.ts
 *
 * 音频管理工具类。
 *
 * @const AudioManager.LOOP: string
 * 声音列表的循环模式：循环播放
 * @const AudioManager.RANDOM: string
 * 声音列表的循环模式：随机播放
 * @const AudioManager.ONCE: string
 * 声音列表的循环模式：顺序播放
 * @config AudioManager.isMusicAllowed: boolean
 * 是否允许播放音乐，默认值为 true
 * @config AudioManager.isSoundAllowed: boolean
 * 是否允许播放声音，默认值为 true
 * @function AudioManager.playLoop(audioName: string): void
 * 循环播放音乐，通常用于 BGM 的播放
 * @function AudioManager.playMusic(audioName: string): void
 * 播放音乐
 * @function AudioManager.playMusicList(musicList: string[], playMode: string): void
 * 播放音乐列表，有循环播放、随机播放、顺序播放三种方式
 * @function AudioManager.stopMusic(): void
 * 停止当前正在播放的音乐
 * @function AudioManager.playSound(audioName: string): void
 * 播放声音
 * @function AudioManager.stopSound(): void
 * 停止当前正在播放的所有声音
 *
 * @version 20180526
 * @author Winterwrath
 * @license 见 ORCHID-README
 */
var AudioManager = (function () {
    function AudioManager() {
    }
    AudioManager.playLoop = function (audioName) {
        if (AudioManager.isMusicAllowed) {
            AudioManager.stopMusic();
            Log('Audio', 'Play music in loop:', audioName);
            AudioManager.backgroundMusicChannel = RES.getRes(audioName).play(0, 0);
        }
    };
    AudioManager.playMusic = function (audioName) {
        if (AudioManager.isMusicAllowed) {
            AudioManager.stopMusic();
            Log('Audio', 'Play music:', audioName);
            AudioManager.backgroundMusicChannel = RES.getRes(audioName).play(0, 1);
        }
    };
    AudioManager.playMusicList = function (musicList, playMode) {
        var now = 0;
        function playModeLoop() {
            AudioManager.stopMusic();
            Log('Audio', 'Play list:', musicList[now], 'in loop mode');
            AudioManager.backgroundMusicChannel = RES.getRes(musicList[now++]).play(0, 1);
            AudioManager.backgroundMusicChannel.once(egret.Event.SOUND_COMPLETE, function () {
                if (now === musicList.length) {
                    now = 0;
                }
                playModeLoop();
            }, AudioManager.backgroundMusicChannel);
        }
        function playModeRandom() {
            AudioManager.stopMusic();
            Log('Audio', 'Play list:', musicList[now], 'in random mode');
            AudioManager.backgroundMusicChannel = RES.getRes(musicList[now]).play(0, 1);
            AudioManager.backgroundMusicChannel.once(egret.Event.SOUND_COMPLETE, function () {
                var temp;
                temp = musicList[musicList.length - 1];
                musicList[musicList.length - 1] = musicList[now];
                musicList[now] = temp;
                now = (Math.random() * musicList.length - 1) | 0;
                playModeRandom();
            }, AudioManager.backgroundMusicChannel);
        }
        function playModeOnce() {
            AudioManager.stopMusic();
            if (musicList.length > 0) {
                var musicName = musicList.shift();
                Log('Audio', 'Play list:', musicName, 'in once mode');
                AudioManager.backgroundMusicChannel = RES.getRes(musicName).play(0, 1);
                AudioManager.backgroundMusicChannel.once(egret.Event.SOUND_COMPLETE, function () {
                    playModeOnce();
                }, AudioManager.backgroundMusicChannel);
            }
            else {
                Log('Audio', 'Play list end in once mode');
            }
        }
        if (musicList.length > 0) {
            if (playMode === AudioManager.LOOP) {
                playModeLoop();
            }
            else if (playMode === AudioManager.RANDOM) {
                now = Math.random() * musicList.length | 0;
                playModeRandom();
            }
            else if (playMode === AudioManager.ONCE) {
                playModeOnce();
            }
            else {
                throw new Error('@Orchid: 列表播放类型只能为 AudioManager.LOOP、AudioManager.RANDOM 或 AudioManager.ONCE。');
            }
        }
        else {
            throw new Error("@Orchid: \u5728\u5217\u8868 " + musicList + " \u4E2D\u6CA1\u6709\u627E\u5230\u97F3\u4E50\u3002");
        }
    };
    AudioManager.stopMusic = function () {
        if (AudioManager.backgroundMusicChannel) {
            Log('Audio', 'Stop music');
            AudioManager.backgroundMusicChannel.stop();
            AudioManager.backgroundMusicChannel = null;
        }
    };
    AudioManager.playSound = function (audioName) {
        if (AudioManager.isSoundAllowed) {
            Log('Audio', 'Play sound:', audioName, 'at channel', AudioManager.soundChannelList.playCount % 8);
            var channel = 'channel' + AudioManager.soundChannelList.playCount++ % 8;
            AudioManager.soundChannelList[channel] = RES.getRes(audioName).play(0, 1);
        }
    };
    AudioManager.stopSound = function () {
        if (AudioManager.backgroundMusicChannel) {
            Log('Audio', 'Stop sound(s)');
            var channelList = ['channel0', 'channel1', 'channel2', 'channel3', 'channel4', 'channel5', 'channel6', 'channel7'];
            channelList.forEach(function (v) {
                AudioManager.soundChannelList[v].stop();
                AudioManager.soundChannelList[v] = null;
            });
        }
    };
    AudioManager.LOOP = 'LOOP';
    AudioManager.RANDOM = 'RANDOM';
    AudioManager.ONCE = 'ONCE';
    AudioManager.isSoundAllowed = true;
    AudioManager.isMusicAllowed = true;
    AudioManager.backgroundMusicChannel = null;
    AudioManager.soundChannelList = {
        channel0: null,
        channel1: null,
        channel2: null,
        channel3: null,
        channel4: null,
        channel5: null,
        channel6: null,
        channel7: null,
        playCount: 0
    };
    return AudioManager;
}());
__reflect(AudioManager.prototype, "AudioManager");
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
var $main = null;
var $stage = null;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        // 声明 $main 和 $stage 两个全局变量
        $main = this;
        $stage = new eui.Component();
        // Egret 自带的生命周期系统
        egret.lifecycle.onPause = function () { };
        egret.lifecycle.onResume = function () { };
        // 注册 AssetAdapter 和 ThemeAdapter
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        var $temp = {};
        // 注册声明周期函数
        Object.freeze(TYPES);
        Object.keys(TYPES).forEach(function (v) {
            $hub.addEventListener(v, Router[v], RouterContext);
        });
        // 适配 iPhone X 的屏幕
        this.addChild($stage);
        Warn($data.versionInfomation);
        if ($main.stage.$stageHeight <= 1335) {
            Log('Adapt to iPhone 5/SE/6/6 Plus/7/7 Plus/8/8 Plus');
            $stage.y = -154;
        }
        else if ($main.stage.$stageHeight <= 1467) {
            Log('Adapt to ?????');
            $stage.y = -88;
        }
        else {
            Log('Adapt to iPhone X');
            $stage.y = 0;
        }
        // 开始创建大厅的 Loading
        $dispatch(TYPES.CREATE_HALL_LOADING);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
window['$main'] = $main;
window['$stage'] = $stage;
// This file is exported by Orchid PSD Exporter v1.1.0
var Tutorial = (function (_super) {
    __extends(Tutorial, _super);
    function Tutorial() {
        var _this = _super.call(this) || this;
        _this.skinName = 'Exml.Tutorial';
        _this.tutorialHallReturnicon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            $stage.removeChild($view.tutorial);
        }, _this);
        return _this;
    }
    return Tutorial;
}(eui.Component));
__reflect(Tutorial.prototype, "Tutorial");
/**
 * Orchid - ThemeAdapter.ts
 *
 * Egret EUI 的主题适配器。
 *
 * @version 20180521
 * @author Egret
 * @license 见 EGRET-README
 */
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
// This file is exported by Orchid PSD Exporter v1.1.0
var AddCoin = (function (_super) {
    __extends(AddCoin, _super);
    function AddCoin() {
        var _this = _super.call(this) || this;
        _this.addNumber = 0;
        _this.skinName = 'Exml.AddCoin';
        _this.addTuijian.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            window['wx'].shareAppMessage({
                title: $data.shareTextList[Math.floor(Math.random() * $data.shareTextList.length)],
                imageUrl: $data.shareImage,
                success: function (res) {
                    _this.saveScore();
                    res['shareTickets'][0];
                    $view.shareing = new Share();
                    $stage.addChild($view.shareing);
                }
            });
        }, _this);
        _this.addMask.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.parent.removeChild(_this);
        }, _this);
        return _this;
    }
    AddCoin.prototype.saveScore = function () {
        var _this = this;
        Ajax($data.goldURL, {
            postData: true,
            user_id: $data.userID,
            game_id: $data.gameId,
            type: 1,
            token: $data.token,
            num: $data.shareAddGold,
            sign: $data.MD5.hex_md5('game_id=' + $data.gameId + '&num=' + $data.shareAddGold + '&postData=' + true + '&score=' + $data.score + '&token=' + $data.token + '&type=' + 1 + '&user_id=' + $data.userID),
            score: $data.score
        }).then(function (res) {
            console.log("share提交成绩", res);
            if (res["error"] == 0) {
                $data.goldNumber += $data.shareAddGold;
                $view.home.homeHallGold.text = "" + $data.goldNumber;
                window['wx'].showToast({
                    title: "分享成功！！！",
                    icon: "none"
                });
                $stage.removeChild($view.addIcon);
                // $dispatch(TYPES.HALL_INITIALIZE)
            }
            else if (res["error"] == 1) {
                _this.addNumber++;
                if (_this.addNumber < 7) {
                    window['wx'].showToast({
                        title: "获取信息失败，正在重新获取...",
                        icon: "none"
                    });
                    var key = setInterval(function () {
                        clearInterval(key);
                        _this.saveScore();
                    }, 1000);
                }
                else {
                    window['wx'].showToast({
                        title: "链接超时，请检查网络",
                        icon: "none"
                    });
                }
            }
            else if (res["error"] == 2) {
                window['wx'].showToast({
                    title: "链接超时，请检查网络",
                    icon: "none"
                });
                $view.home.homeHallPlayIcon.enabled = false;
            }
        });
    };
    return AddCoin;
}(eui.Component));
__reflect(AddCoin.prototype, "AddCoin");
// This file is exported by Orchid PSD Exporter v1.1.1
var Clearing = (function (_super) {
    __extends(Clearing, _super);
    function Clearing() {
        var _this = _super.call(this) || this;
        _this.number = 0;
        _this.skinName = 'Exml.Clearing';
        if ($data.isShare == 0) {
            _this.clearingChallenge.visible = true;
            _this.clearingShareRecord.visible = true;
        }
        else {
            _this.clearingChallenge.visible = false;
            _this.clearingShareRecord.visible = false;
        }
        _this.clearingAddGold.text = "+ " + $data.gold;
        _this.clearingScore.text = $data.score + "\u5206";
        _this.clearingFriendBest.text = $data.gameTitleTop + "\u5206";
        if ($data.score != 0) {
            _this.saveScore();
        }
        _this.clearingGameReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            $stage.removeChild($view.game);
            $stage.removeChild($view.clear);
            $dispatch(TYPES.CREATE_GAME_LOADING);
            $dispatch(TYPES.HALL_INITIALIZE);
        }, _this);
        _this.clearingChallenge.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            AudioManager.playSound('button_mp3');
            window['wx'].shareAppMessage({
                title: $data.shareTextList[Math.floor(Math.random() * $data.shareTextList.length)],
                imageUrl: $data.shareImage,
                success: function (res) {
                    _this.saveScore();
                    res['shareTickets'][0];
                }
            });
        }, _this);
        _this.clearingMoreGame.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            Ajax($data.moreGameURL, {
                postData: true,
                game_id: $data.gameId
            }).then(function (res) {
                window["wx"].previewImage({
                    current: res["data"].game_pic,
                    urls: [res["data"].game_pic]
                });
            });
        }, _this);
        _this.clearingShareRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            window['wx'].shareAppMessage({
                title: $data.shareTextList[Math.floor(Math.random() * $data.shareTextList.length)],
                imageUrl: $data.shareImage,
                success: function (res) {
                    _this.saveScore();
                    res['shareTickets'][0];
                }
            });
        }, _this);
        _this.clearingRankList.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            $view.rankList = new RankList;
            $stage.addChild($view.rankList);
        }, _this);
        _this.clearingPlayAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            if ($data.isShare == 1) {
                if (Number($data.reduceGold) != 1) {
                    $data.reduceGold = '1';
                }
            }
            else {
                if (Number($data.reduceGold) != 30) {
                    $data.reduceGold = '30';
                }
            }
            Ajax($data.reduceURL, {
                postData: true,
                user_id: $data.userID,
                token: $data.token,
                num: $data.reduceGold
            }).then(function (res) {
                if (res["error"] == 0) {
                    $stage.removeChild($view.game);
                    $dispatch(TYPES.GAME_INITIALIZE);
                    $stage.removeChild($view.clear);
                }
                else if (res["error"] == 2) {
                    window['wx'].showToast({
                        title: "网络链接中断，请检查网络",
                        icon: "none"
                    });
                }
                else if (res["error"] == 3) {
                    //  金币不足 跳转
                    window['wx'].showToast({
                        title: "金币不足",
                        icon: "none"
                    });
                }
            });
        }, _this);
        return _this;
    }
    Clearing.prototype.saveScore = function () {
        var _this = this;
        Ajax($data.goldURL, {
            postData: true,
            user_id: $data.userID,
            game_id: $data.gameId,
            type: 3,
            token: $data.token,
            num: $data.gold,
            sign: $data.MD5.hex_md5('game_id=' + $data.gameId + '&num=' + $data.gold + '&postData=' + true + '&score=' + $data.score + '&token=' + $data.token + '&type=' + 3 + '&user_id=' + $data.userID),
            score: $data.score
        }).then(function (res) {
            console.log("提交成绩", res);
            if (res["error"] == 0) {
                if (res["data"].is_max_score == 1) {
                    window['wx'].setUserCloudStorage({
                        KVDataList: [
                            { key: 'score', value: '' + $data.gameTitleTop }
                        ]
                    });
                }
                _this.clearingPlayAgain.enabled = true;
                _this.clearingChallenge.enabled = true;
            }
            else if (res["error"] == 1) {
                _this.number++;
                if (_this.number < 7) {
                    window['wx'].showToast({
                        title: "上传成绩失败，正在重新上传...",
                        icon: "none"
                    });
                    var key = setInterval(function () {
                        clearInterval(key);
                        _this.saveScore();
                    }, 1000);
                }
                else {
                    window['wx'].showToast({
                        title: "链接超时，请检查网络",
                        icon: "none"
                    });
                }
            }
            else if (res["error"] == 2) {
                window['wx'].showToast({
                    title: "网络链接中断，请重新登录",
                    icon: "none"
                });
            }
        });
    };
    return Clearing;
}(eui.Component));
__reflect(Clearing.prototype, "Clearing");
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.collisionArray = []; // 碰撞数组
        _this.syntheticNumber = 0; // 合成次数
        _this.skinName = "Exml.Game";
        _this.parkDetailScroller.viewport = _this.parkDetailView;
        // Ajax($data.loginURL, {
        // 	postData: true,
        // 	encryptedData: $data.encryptedData,
        // 	iv: $data.iv,
        // 	session_key: $data.session_key,
        // 	game_id: $data.gameId,
        // }).then(res => {
        // 	console.log("登录注册接口", res)
        // 	$data.token = res["data"].token,
        // 		$data.goldNumber = res["data"].gold,
        // 		$data.userID = res["data"].id,
        // 		$data.gameTitleTop = res["data"].max_score
        _this.gameTitleTop.text = "top: " + $data.gameTitleTop;
        _this.gameTitleScore.text = "" + $data.score;
        // })
        _this.init($data.pageX, $data.pageY);
        _this.gameStopIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            $view.stop = new Stop();
            $stage.addChild($view.stop);
            $view.stop.stopStopMask.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                AudioManager.playSound('button_mp3');
                $stage.removeChild($view.stop);
            }, _this);
        }, _this);
        return _this;
    }
    /**
    * 游戏主页面
    * @param x 方块行个数
    * @param y 方块列个数
    */
    Game.prototype.init = function (rx, ry) {
        var _this = this;
        var squareList = [];
        for (var i = 0; i < ry; i++) {
            squareList[i] = [];
            for (var j = 0; j < rx; j++) {
                squareList[i][j] = this.squareRandom();
            }
        }
        Data.observe('squareList', function (newValue) {
            _this.gameChessboard.removeChildren();
            for (var i = 0; i < $data.squareList.length; i++) {
                for (var j = 0; j < $data.squareList[i].length; j++) {
                    $data.squareView[i]["" + j] = new Square(i, j, newValue[i][j]);
                    _this.gameChessboard.addChild($data.squareView[i]["" + j]);
                }
            }
        }, 3, true);
        $data.squareList = squareList;
        this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (e.target.parent instanceof Square) {
                if (_this.gameChessboard.touchEnabled == true) {
                    _this.gameChessboard.touchEnabled = false;
                    //	逻辑操作 检查点击方块是否满足条件
                    _this.stageX = e.target.parent.x; // 在视图层上的X轴坐标
                    _this.stageY = e.target.parent.y; // 在视图层上的Y轴坐标
                    var arrayKey1 = _this.stageY / 92; // $data.squareList数组的第一维数组的key
                    var arrayKey2 = _this.stageX / 92; // $data.squareList数组的第二维数组的key
                    _this.findSquare(arrayKey1, arrayKey2);
                }
            }
        }, this.gameChessboard);
        this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            if (e.target.parent instanceof Square) {
                e.target.parent.fill.source = e.target.parent.fill.source.replace(/(\d)_png$/, '$1--active_png');
            }
        }, this.gameChessboard);
        this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            if (e.target.parent instanceof Square) {
                e.target.parent.fill.source = e.target.parent.fill.source.replace(/--active_png$/, '_png');
            }
        }, this.gameChessboard);
        this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function (e) {
            if (e.target.parent instanceof Square) {
                e.target.parent.fill.source = e.target.parent.fill.source.replace(/--active_png$/, '_png');
            }
        }, this.gameChessboard);
        this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_CANCEL, function (e) {
            if (e.target.parent instanceof Square) {
                e.target.parent.fill.source = e.target.parent.fill.source.replace(/--active_png$/, '_png');
            }
        }, this.gameChessboard);
    };
    /**
     * 寻找目标方块的方法
     */
    Game.prototype.findSquare = function (x, y) {
        //	这个寻找规则需要更改 4个for循环寻找目标方块
        //	有一个arrayKey1 = 0 和 arrayKey1 = 10 的情况
        this.collisionArray = [];
        var squareList = $data.squareList;
        var level = squareList[x][y]; // 所点击方块的level
        if (squareList[x][y] !== 0) {
            //	点击方块 生成一个方块
            // this.gameOver()
            this.creatNumber();
            AudioManager.playSound('error_mp3');
        }
        else {
            //	上寻
            if (x != 0) {
                for (var i = x - 1; i >= 0; i--) {
                    if (squareList[i][y] !== 0) {
                        this.collisionArray.push(i * 10 + y);
                    }
                }
            }
            //	右训
            if (y != 7) {
                for (var i = y + 1; i <= 7; i++) {
                    if (squareList[x][i] !== 0) {
                        this.collisionArray.push(x * 10 + i);
                    }
                }
            }
            // console.log(y)
            //	下寻
            if (x != 9) {
                for (var i = x + 1; i <= 9; i++) {
                    if (squareList[i][y] !== 0) {
                        this.collisionArray.push(i * 10 + y);
                    }
                }
            }
            //	左寻
            if (y != 0) {
                for (var i = y - 1; i >= 0; i--) {
                    if (squareList[x][i] !== 0) {
                        this.collisionArray.push(x * 10 + i);
                    }
                }
            }
        }
        // console.log("vvvvvvv", this.collisionArray)
        this.disposeCollisionArrat(x, y, this.collisionArray);
    };
    /**
     * 对碰撞数组进行处理
     * @param x 点击方块的一维数组的下标
     * @param y 点击方块的二维数组的下标
     * @param levelArray 从$data.squareList中提出的 等级数组	levelArray的key 等于this.collisionArray数组的key
     * @param keyArray 存放相同level的key
     */
    Game.prototype.disposeCollisionArrat = function (x, y, disposeArray) {
        var _this = this;
        var a = [];
        var levelArray = [];
        var keyArray = [];
        a = disposeArray;
        // this.collisionArray
        //	生成一个level数组 判断哪些方块需要合成
        for (var i = 0; i < a.length; i++) {
            //  ox 从a中提出的 一维数组的下标
            //  oy 从a中提出的 二维数组的下标
            var ox = (a[i] - a[i] % 10) / 10;
            var oy = a[i] % 10;
            var level = $data.squareList[ox][oy];
            levelArray.push(level);
        }
        // console.log("levelArray", levelArray)
        //	生成key数组 存放需要合成的方块的key
        var initNumber = Number(levelArray.slice().sort(function (a, b) { return b - a; }).toString().concat(',0,0,').match(/(\d+),\1,/)[1]);
        for (var i = 0; i < levelArray.length; i++) {
            if (levelArray[i] === initNumber) {
                keyArray.push(i);
            }
        }
        //	判断可以合成的方块之间有没有挡着的方块
        var disposeSquare;
        for (var i = keyArray.length - 1; i >= 0; i--) {
            //	ox disposeSquare数组中提出的 一维数组的下标
            //	ox disposeSquare数组中提出的 二维数组的下标
            disposeSquare = a[keyArray[i]];
            var ox = (disposeSquare - disposeSquare % 10) / 10;
            var oy = disposeSquare % 10;
            if (oy === y) {
                //	Y轴方向
                if (ox < x) {
                    //	Y轴正方向
                    for (var j = x - 1; j > ox; j--) {
                        if ($data.squareList[j][y] !== initNumber && $data.squareList[j][y] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
                else if (ox > x) {
                    //	Y轴负方向
                    for (var k = x + 1; k < ox; k++) {
                        if ($data.squareList[k][y] !== initNumber && $data.squareList[k][y] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
            }
            else if (ox === x) {
                //	X轴方向
                if (oy > y) {
                    //	X轴正方向
                    for (var m = y + 1; m < oy; m++) {
                        if ($data.squareList[x][m] !== initNumber && $data.squareList[x][m] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
                else if (oy < y) {
                    //	X轴负方向
                    for (var n = y - 1; n > oy; n--) {
                        if ($data.squareList[x][n] !== initNumber && $data.squareList[x][n] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
            }
        }
        // //	判断是否有同向的方块
        // let key = true
        // let sameSquare: number
        // let sameList = []
        // // console.log("a", a)
        // // console.log("keyArray", keyArray)
        // for (let i = 0; i < keyArray.length; i++) {
        // 	sameList.push(a[keyArray[i]])
        // }
        // // console.log("sameList", sameList)
        // sameSquare = a[keyArray[0]]
        // let indexX = (sameSquare - sameSquare % 10) / 10
        // let indexY = sameSquare % 10
        // if (indexY == y && indexX < x) {
        // 	for (let i = 0; i < sameList.length; i++) {
        // 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
        // 		let coordinatesY = sameList[i] % 10
        // 		if (coordinatesX < x && coordinatesY == y) {
        // 			key = false
        // 		} else {
        // 			key = true
        // 		}
        // 	}
        // } else if (indexY == y && indexX > x) {
        // 	for (let i = 0; i < sameList.length; i++) {
        // 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
        // 		let coordinatesY = sameList[i] % 10
        // 		if (coordinatesX > x && coordinatesY == y) {
        // 			key = false
        // 		} else {
        // 			key = true
        // 		}
        // 	}
        // } else if (indexX == x && indexY > y) {
        // 	for (let i = 0; i < sameList.length; i++) {
        // 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
        // 		let coordinatesY = sameList[i] % 10
        // 		if (coordinatesY > y && coordinatesX == x) {
        // 			key = false
        // 		} else {
        // 			key = true
        // 		}
        // 	}
        // } else if (indexX == x && indexY < y) {
        // 	for (let i = 0; i < sameList.length; i++) {
        // 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
        // 		let coordinatesY = sameList[i] % 10
        // 		if (coordinatesY < y && coordinatesX == x) {
        // 			key = false
        // 		} else {
        // 			key = true
        // 		}
        // 	}
        // } else {
        // 	key = true
        // }
        // if (!key) {
        // 	for (let i = keyArray.length - 1; i >= 0; i--) {
        // 		a.splice(keyArray[i], 1)
        // 	}
        // }
        // console.log("数组", a)
        var excessiveArray = [];
        for (var i = 0; i < a.length; i++) {
            var ox = (a[i] - a[i] % 10) / 10;
            var oy = a[i] % 10;
            if (initNumber === $data.squareList[ox][oy]) {
                excessiveArray.push(a[i]);
            }
        }
        a = excessiveArray;
        // console.log("之后的数组", a)
        if (a.length <= 1 && $data.squareList[x][y] === 0) {
            this.floorRepeat(this.collisionArray, x, y, initNumber);
        }
        else {
            var key = true;
            if (key) {
                AudioManager.playSound('synthetic_mp3');
                var _loop_1 = function (i) {
                    //	进行操作
                    var ox = (a[i] - a[i] % 10) / 10;
                    var oy = a[i] % 10;
                    egret.Tween.get($data.squareView[ox][oy]).to({ x: this_1.stageX, y: this_1.stageY }, 250).call(function () {
                        egret.Tween.get($data.squareView[ox][oy]["fill"]).to({ scaleX: 0, scaleY: 0 }, 250).call(function () {
                            var squareList2 = $data.squareList;
                            squareList2[ox][oy] = 0;
                            $data.squareList = squareList2;
                        });
                    });
                };
                var this_1 = this;
                for (var i = 0; i < a.length; i++) {
                    _loop_1(i);
                }
                var score = a.length * initNumber;
                var level = this.level(score);
                var totalScore = $data.score;
                var maxScore = void 0;
                //	当前游戏总分
                if ($data.squareList[x][y] !== 0) {
                    totalScore += 0;
                    $data.score = totalScore;
                }
                else {
                    totalScore += 5 * Math.pow(level, 2);
                    $data.score = totalScore;
                    //	点击次数
                    this.syntheticNumber += 1;
                    if (5 * Math.pow(level, 2) > $data.maxScore) {
                        maxScore = 5 * Math.pow(level, 2);
                        $data.maxScore = maxScore;
                    }
                }
                this.gameTitleScore.text = "" + $data.score;
                var squareList1_1 = $data.squareList;
                if ($data.squareList[x][y] === 0) {
                    var timeOut = null;
                    timeOut = setTimeout(function () {
                        $data.squareList = squareList1_1;
                        _this.creatNumber();
                        // this.gameOver()
                    }, 600);
                    squareList1_1[x][y] = Math.pow(2, level);
                }
            }
            else {
                this.creatNumber();
                // this.gameOver()
            }
        }
        // }
    };
    /**
     * 解决点击位置大的方块被挡住 不能让小的合成的功能
     */
    Game.prototype.floorRepeat = function (array, x, y, n) {
        var _this = this;
        var a = [];
        var initNumber;
        var levelArray = [];
        var keyArray = [];
        var aaaArray = [];
        a = array;
        //	生成一个level数组 判断那些方块需要合成
        for (var i = 0; i < a.length; i++) {
            //  ox 从a中提出的 一维数组的下标
            //  oy 从a中提出的 二维数组的下标
            var ox = (a[i] - a[i] % 10) / 10;
            var oy = a[i] % 10;
            var level = $data.squareList[ox][oy];
            levelArray.push(level);
        }
        for (var i = 0; i < levelArray.length; i++) {
            if (levelArray[i] === n) {
                levelArray[i] = 0;
            }
        }
        //	生成key数组 存放需要合成的方块的key
        initNumber = Number(levelArray.slice().sort(function (a, b) { return b - a; }).toString().concat(',0,0,').match(/(\d+),\1,/)[1]);
        for (var i = 0; i < levelArray.length; i++) {
            if (levelArray[i] === initNumber) {
                keyArray.push(i);
            }
        }
        //	判断可以合成的方块之间有没有挡着的方块
        var disposeSquare;
        for (var i = keyArray.length - 1; i >= 0; i--) {
            //	ox disposeSquare数组中提出的 一维数组的下标
            //	ox disposeSquare数组中提出的 二维数组的下标
            disposeSquare = a[keyArray[i]];
            var ox = (disposeSquare - disposeSquare % 10) / 10;
            var oy = disposeSquare % 10;
            if (oy === y) {
                //	Y轴方向
                if (ox < x) {
                    //	Y轴正方向
                    for (var j = x - 1; j > ox; j--) {
                        if ($data.squareList[j][y] !== initNumber && $data.squareList[j][y] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
                else if (ox > x) {
                    //	Y轴负方向
                    for (var k = x + 1; k < ox; k++) {
                        if ($data.squareList[k][y] !== initNumber && $data.squareList[k][y] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
            }
            else if (ox === x) {
                //	X轴方向
                if (oy > y) {
                    //	X轴正方向
                    for (var m = y + 1; m < oy; m++) {
                        if ($data.squareList[x][m] !== initNumber && $data.squareList[x][m] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
                else if (oy < y) {
                    //	X轴负方向
                    for (var n_1 = y - 1; n_1 > oy; n_1--) {
                        if ($data.squareList[x][n_1] !== initNumber && $data.squareList[x][n_1] !== 0) {
                            a.splice(keyArray[i], 1);
                            break;
                        }
                    }
                }
            }
        }
        // //	判断是否有同向的方块
        // let key = true
        // let sameSquare: number
        // let sameList = []
        // for (let i = 0; i < keyArray.length; i++) {
        // 	sameList.push(a[keyArray[i]])
        // }
        // sameSquare = a[keyArray[0]]
        // let indexX = (sameSquare - sameSquare % 10) / 10
        // let indexY = sameSquare % 10
        // if (indexY == y && indexX < x) {
        // 	for (let i = 0; i < sameList.length; i++) {
        // 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
        // 		let coordinatesY = sameList[i] % 10
        // 		if (coordinatesX < x && coordinatesY == y) {
        // 			key = false
        // 		} else {
        // 			key = true
        // 		}
        // 	}
        // } else if (indexY == y && indexX > x) {
        // 	for (let i = 0; i < sameList.length; i++) {
        // 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
        // 		let coordinatesY = sameList[i] % 10
        // 		if (coordinatesX > x && coordinatesY == y) {
        // 			key = false
        // 		} else {
        // 			key = true
        // 		}
        // 	}
        // } else if (indexX == x && indexY > y) {
        // 	for (let i = 0; i < sameList.length; i++) {
        // 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
        // 		let coordinatesY = sameList[i] % 10
        // 		if (coordinatesY > y && coordinatesX == x) {
        // 			key = false
        // 		} else {
        // 			key = true
        // 		}
        // 	}
        // } else if (indexX == x && indexY < y) {
        // 	for (let i = 0; i < sameList.length; i++) {
        // 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
        // 		let coordinatesY = sameList[i] % 10
        // 		if (coordinatesY < y && coordinatesX == x) {
        // 			key = false
        // 		} else {
        // 			key = true
        // 		}
        // 	}
        // } else {
        // 	key = true
        // }
        // if (!key) {
        // 	for (let i = keyArray.length - 1; i >= 0; i--) {
        // 		a.splice(keyArray[i], 1)
        // 	}
        // }
        console.log("删除操作之后的数组", a);
        var excessiveArray = [];
        for (var i = 0; i < a.length; i++) {
            var ox = (a[i] - a[i] % 10) / 10;
            var oy = a[i] % 10;
            if (initNumber === $data.squareList[ox][oy]) {
                excessiveArray.push(a[i]);
            }
        }
        a = excessiveArray;
        console.log("a", a);
        if (array.length == 0) {
            this.creatNumber();
            // this.gameOver()
        }
        else if (n == 0) {
            AudioManager.playSound('error_mp3');
            this.creatNumber();
            // this.gameOver()
        }
        else if (initNumber !== n || initNumber === 0 && array != []) {
            if (a.length <= 1 && $data.squareList[x][y] === 0) {
                this.floorRepeat(array, x, y, initNumber);
            }
            else {
                var key = void 0;
                key = true;
                // let indexX = (a[0] - a[0] % 10) / 10
                // let indexY = a[0] % 10
                // console.log(indexX, indexY)
                // console.log(x, y)
                // if (indexY == y && indexX < x) {
                // 	for (let i = 0; i < a.length; i++) {
                // 		let coordinatesX = (a[i] - a[i] % 10) / 10
                // 		let coordinatesY = a[i] % 10
                // 		if (coordinatesX < x && coordinatesY == y) {
                // 			console.log("向上同向")
                // 			key = false
                // 		} else {
                // 			key = true
                // 		}
                // 	}
                // } else if (indexY == y && indexX > x) {
                // 	for (let i = 0; i < a.length; i++) {
                // 		let coordinatesX = (a[i] - a[i] % 10) / 10
                // 		let coordinatesY = a[i] % 10
                // 		if (coordinatesX > x && coordinatesY == y) {
                // 			console.log("向下同向")
                // 			key = false
                // 		} else {
                // 			key = true
                // 		}
                // 	}
                // } else if (indexX == x && indexY > y) {
                // 	for (let i = 0; i < a.length; i++) {
                // 		let coordinatesX = (a[i] - a[i] % 10) / 10
                // 		let coordinatesY = a[i] % 10
                // 		if (coordinatesY > y && coordinatesX == x) {
                // 			console.log("向右同向")
                // 			key = false
                // 		} else {
                // 			key = true
                // 		}
                // 	}
                // } else if (indexX == x && indexY < y) {
                // 	for (let i = 0; i < a.length; i++) {
                // 		let coordinatesX = (a[i] - a[i] % 10) / 10
                // 		let coordinatesY = a[i] % 10
                // 		if (coordinatesY < y && coordinatesX == x) {
                // 			console.log("向左同向")
                // 			key = false
                // 		} else {
                // 			key = true
                // 		}
                // 	}
                // } else {
                // 	key = true
                // }
                if (key) {
                    AudioManager.playSound('synthetic_mp3');
                    for (var x_1 = 0; x_1 < a.length; x_1++) {
                        for (var y_1 = 0; y_1 < a.length; y_1++) {
                        }
                    }
                    var _loop_2 = function (i) {
                        //	进行操作
                        var ox = (a[i] - a[i] % 10) / 10;
                        var oy = a[i] % 10;
                        egret.Tween.get($data.squareView[ox][oy]).to({ x: this_2.stageX, y: this_2.stageY }, 250).call(function () {
                            egret.Tween.get($data.squareView[ox][oy]["fill"]).to({ scaleX: 0, scaleY: 0 }, 250).call(function () {
                                var squareList2 = $data.squareList;
                                squareList2[ox][oy] = 0;
                                $data.squareList = squareList2;
                            });
                        });
                    };
                    var this_2 = this;
                    for (var i = 0; i < a.length; i++) {
                        _loop_2(i);
                    }
                    var score = a.length * initNumber;
                    var level = this.level(score);
                    var totalScore = $data.score;
                    var maxScore = void 0;
                    //	当前游戏总分
                    if ($data.squareList[x][y] !== 0) {
                        totalScore += 0;
                        $data.score = totalScore;
                    }
                    else {
                        totalScore += 5 * Math.pow(level, 2);
                        $data.score = totalScore;
                        //	点击次数
                        this.syntheticNumber += 1;
                        if (5 * Math.pow(level, 2) > $data.maxScore) {
                            maxScore = 5 * Math.pow(level, 2);
                            $data.maxScore = maxScore;
                        }
                    }
                    this.gameTitleScore.text = "" + $data.score;
                    var squareList1_2 = $data.squareList;
                    if ($data.squareList[x][y] === 0) {
                        var timeOut = null;
                        timeOut = setTimeout(function () {
                            $data.squareList = squareList1_2;
                            _this.creatNumber();
                            // this.gameOver()
                        }, 600);
                        squareList1_2[x][y] = Math.pow(2, level);
                    }
                }
                else {
                    // this.gameOver()
                    this.creatNumber();
                }
            }
        }
        else {
            this.floorRepeat(array, x, y, initNumber);
        }
    };
    /**
     * 根据方块分数计算方块等级
     */
    Game.prototype.level = function (n) {
        var level = Math.floor(Math.log2(n));
        return level;
    };
    /**
     * 点击操作生成方块
     */
    Game.prototype.creatSquare = function () {
        var creatArray = [];
        for (var i = 0; i < $data.squareList.length; i++) {
            for (var j = 0; j < $data.squareList[i].length; j++) {
                if ($data.squareList[i][j] === 0) {
                    creatArray.push(i * 10 + j);
                }
            }
        }
        this.creatLenth = creatArray.length > 0 ? creatArray.length : 0;
        var randomLent = Math.floor(Math.random() * (this.creatLenth - 1));
        var randomNumber = creatArray[randomLent];
        var randomX = (randomNumber - randomNumber % 10) / 10;
        var randomY = randomNumber % 10;
        var squareList4 = $data.squareList;
        squareList4[randomX][randomY] = this.againRandom();
        $data.squareList = squareList4;
    };
    /**
     * 方块生成权重
     */
    Game.prototype.squareRandom = function () {
        var rand = Math.random();
        if (rand <= .83) {
            return 0;
        }
        else if (rand > .83 && rand <= .89) {
            return 2;
        }
        else if (rand > .89 && rand < .93) {
            return 4;
        }
        else if (rand > .93 && rand < .96) {
            return 8;
        }
        else if (rand > .96 && rand < .99) {
            return 16;
        }
        else {
            return 32;
        }
    };
    /**
     * 方块重新生成权重
     */
    Game.prototype.againRandom = function () {
        var rand = Math.random();
        if (rand <= .35) {
            return 2;
        }
        else if (rand > .35 && rand <= .58) {
            return 4;
        }
        else if (rand > .58 && rand < .76) {
            return 8;
        }
        else if (rand > .76 && rand < .89) {
            return 16;
        }
        else if (rand > .89 && rand < 1) {
            return 32;
        }
    };
    /**
     * 方块生成
     */
    Game.prototype.creatNumber = function () {
        var _this = this;
        var num = Math.floor(Math.random() * 2);
        var key = true;
        console.log("this.creatLenth", this.creatLenth);
        if (this.creatLenth <= 3) {
            num = 1;
        }
        for (var i = 0; i <= num; i++) {
            this.creatSquare();
        }
        for (var i = 0; i < $data.squareList.length; i++) {
            for (var j = 0; j < $data.squareList[i].length; j++) {
                if ($data.squareList[i][j] == 0) {
                    key = true;
                    break;
                }
                else {
                    key = false;
                }
            }
        }
        if (!key && this.creatLenth == 0) {
            console.log('--------------');
            var level = this.level($data.maxScore);
            // console.log("maxScore", $data.maxScore)
            var gold = $data.gold;
            if ($data.maxScore === 0) {
                level = 2;
            }
            gold = this.syntheticNumber + 10 * (level - 2);
            $data.gold = gold;
            $dispatch(TYPES.GAME_OVER);
            //	清空上局金币和分数
            $data.maxScore = 0;
            $data.score = 0;
        }
        var timeOut2 = null;
        timeOut2 = setTimeout(function () {
            _this.gameChessboard.touchEnabled = true;
        }, 500);
    };
    /**
     * gameOver
     */
    Game.prototype.gameOver = function () {
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
/**
 * Orchid - HallLoading.ts
 *
 * 大厅 Loading 界面的视图。
 *
 * @version 20180522
 * @author Winterwrath
 * @license 见 ORCHID-README
 */
var HallLoading = (function (_super) {
    __extends(HallLoading, _super);
    function HallLoading() {
        var _this = _super.call(this) || this;
        // 加载 Hall Loading 的背景图片
        var backgroundLoader = new egret.ImageLoader();
        backgroundLoader.once(egret.Event.COMPLETE, function (e) {
            var texture = new egret.Texture();
            texture.bitmapData = e.target.data;
            _this.background = new egret.Bitmap(texture);
            _this.addChild(_this.background);
            // 加载 Hall Loading 的进度条图片
            var progressLoader = new egret.ImageLoader();
            progressLoader.once(egret.Event.COMPLETE, function (e) {
                var texture = new egret.Texture();
                texture.bitmapData = e.target.data;
                _this.progressBar = new egret.Bitmap(texture);
                _this.addChild(_this.progressBar);
                _this.progressBar.x = -442;
                _this.progressBar.y = 979;
                _this.onLoadComplete();
            }, _this);
            progressLoader.load($data.hallLoadingProgressURL);
        }, _this);
        backgroundLoader.load($data.hallLoadingBackgroundURL);
        return _this;
    }
    HallLoading.prototype.onLoadComplete = function () {
        // 添加 Hall Loading 的文本
        this.textLabel = new egret.TextField();
        this.textLabel.x = 0;
        this.textLabel.y = 1040;
        this.textLabel.width = 750;
        this.textLabel.height = 24;
        this.textLabel.size = 24;
        this.textLabel.fontFamily = $data.fontFamilyContent;
        this.textLabel.textColor = 0xffffff;
        this.textLabel.textAlign = egret.HorizontalAlign.CENTER;
        this.textLabel.text = I18n.hallLoadingInit;
        this.addChild(this.textLabel);
        // 添加 Hall Loading 的进度条和遮罩
        this.progressBarMask = new egret.Shape();
        this.progressBarMask.graphics.beginFill(0xff3333);
        this.progressBarMask.graphics.lineTo(120, 978);
        this.progressBarMask.graphics.lineTo(632, 978);
        this.progressBarMask.graphics.curveTo(666, 999, 632, 1020);
        this.progressBarMask.graphics.lineTo(120, 1020);
        this.progressBarMask.graphics.curveTo(85, 999, 120, 978);
        this.progressBarMask.graphics.endFill();
        this.progressBar.mask = this.progressBarMask;
        this.addChild(this.progressBarMask);
    };
    return HallLoading;
}(eui.Component));
__reflect(HallLoading.prototype, "HallLoading");
// This file is exported by Orchid PSD Exporter v1.1.0
var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        var _this = _super.call(this) || this;
        _this.skinName = 'Exml.Home';
        console.log("+++++++++++1");
        _this.homeBestScore.text = "" + $data.gameTitleTop;
        _this.homeHallGold.text = "" + $data.goldNumber;
        console.log(Number($data.goldNumber) >= $data.gamePay);
        if (Number($data.goldNumber) >= $data.gamePay) {
            _this.homeHallPlayIcon.enabled = true;
        }
        else {
            _this.homeHallPlayIcon.enabled = false;
        }
        if ($data.isShare == 0) {
            _this.homeGetGold.visible = true;
            _this.homeHallHelpIcon.visible = true;
            _this.homeHallRankIcon.x = 101;
            _this.homeHallRankIcon.x = 331;
            _this.homeHallTutorialIcon.x = 543;
        }
        else {
            _this.homeGetGold.visible = false;
            _this.homeHallHelpIcon.visible = false;
            _this.homeHallRankIcon.x = 176;
            _this.homeHallTutorialIcon.x = 470;
        }
        _this.homeHallMoregame.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // AudioManager.playSound('button_mp3')
            Ajax($data.moreGameURL, {
                postData: true,
                game_id: $data.gameId
            }).then(function (res) {
                var yy = 812 - $main.stage.$stageHeight / 2;
                window["wx"].previewImage({
                    urls: [res['data'].game_pic + '?x-oss-process=image/crop,x_0,y_' + yy + ',w_' + $main.stage.$stageWidth + ',h_' + $main.stage.$stageHeight],
                });
            });
        }, _this);
        _this.homeHallHelpIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // AudioManager.playSound('button_mp3')
            $view.help = new HomeHelp();
            $stage.addChild($view.help);
            $view.help.homeMask.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                $stage.removeChild($view.help);
                var that = _this;
                $view.help.isColse = true;
                console.log('获得金币数：' + $view.help.addCoinNum);
                var addCoinNum = $view.help.addCoinNum;
                if (addCoinNum >= 40) {
                    Ajax($data.goldURL, {
                        postData: true,
                        user_id: $data.userID,
                        game_id: $data.gameId,
                        type: 2,
                        token: $data.token,
                        num: addCoinNum,
                        sign: $data.MD5.hex_md5('game_id=' + $data.gameId + '&num=' + addCoinNum + '&postData=' + true + '&score=' + $data.score + '&token=' + $data.token + '&type=' + 2 + '&user_id=' + $data.userID),
                        score: $data.score
                    }).then(function (res) {
                        console.log(res);
                        console.log(res['error']);
                        if (res['error'] == 0) {
                            $data.goldNumber += addCoinNum;
                            _this.homeHallGold.text = "" + $data.goldNumber;
                            var sharePage = new Share();
                            that.addChild(sharePage);
                        }
                        else {
                            window['wx'].showModal({
                                content: '金币增加失败',
                            });
                        }
                        if ($view.help.parent) {
                            that.removeChild($view.help);
                        }
                    });
                }
                else {
                    if ($view.help.parent) {
                        that.removeChild($view.help);
                    }
                }
            }, _this);
        }, _this);
        _this.homeHallRankIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // AudioManager.playSound('button_mp3')
            $view.rankList = new RankList;
            $stage.addChild($view.rankList);
        }, _this);
        _this.homeHallTutorialIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // AudioManager.playSound('button_mp3')
            $view.tutorial = new Tutorial();
            $stage.addChild($view.tutorial);
        }, _this);
        _this.homeHallPlayIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // AudioManager.playSound('button_mp3')
            if ($data.isShare == 1) {
                if (Number($data.reduceGold) != 1) {
                    $data.reduceGold = '1';
                }
            }
            else {
                if (Number($data.reduceGold) != 30) {
                    $data.reduceGold = '30';
                }
            }
            Ajax($data.reduceURL, {
                postData: true,
                user_id: $data.userID,
                token: $data.token,
                num: $data.reduceGold
            }).then(function (res) {
                console.log("金币扣除", res);
                if (res["error"] == 0) {
                    $dispatch(TYPES.CREATE_GAME);
                }
                else if (res["error"] == 2) {
                    window['wx'].showToast({
                        title: "获取信息失败，正在重新登录...",
                        icon: "none"
                    });
                    _this.login();
                }
                else if (res["error"] == 3) {
                    //  金币不足 跳转
                    window['wx'].showToast({
                        title: "金币不足",
                        icon: "none"
                    });
                }
            });
        }, _this);
        _this.homeGetGold.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // AudioManager.playSound('button_mp3')
            $view.addIcon = new AddCoin;
            $stage.addChild($view.addIcon);
        }, _this);
        var randomNum = null;
        setInterval(function () {
            randomNum = Math.floor(Math.random() * 2);
            if (randomNum == 0) {
                _this.homeGameTitle.source = "home-game-title_png";
            }
            else if (randomNum == 1) {
                _this.homeGameTitle.source = "home-game-title--active_png";
            }
            else {
                _this.homeGameTitle.source = "home-game-title--disabled_png";
            }
        }, 500);
        egret.Tween.get(_this.homeHallMoregame, { loop: true }).to({ rotation: 10 }, 400).to({ rotation: -10 }, 400);
        egret.Tween.get(_this.homeHallMoregame, { loop: true }).to({ y: 356 }, 6000).to({ y: 306 }, 6000);
        return _this;
    }
    Home.prototype.login = function () {
        var _this = this;
        window['wx'].login({
            success: function (res) {
                console.log("login", res);
                $data.code = res.code;
                window['wx'].getUserInfo({
                    success: function (res) {
                        console.log("getUserInfo", res);
                        $data.encryptedData = res.encryptedData,
                            $data.iv = res.iv,
                            $data.userInfo = res.userInfo;
                        Ajax($data.get_openURL, {
                            postData: true,
                            js_code: $data.code,
                            game_id: $data.gameId,
                        }).then(function (res) {
                            console.log("jscode获取token和openid", res);
                            $data.session_key = res["data"].session_key,
                                console.log("sessionKey", $data.sessionKey);
                            Ajax($data.loginURL, {
                                postData: true,
                                encryptedData: $data.encryptedData,
                                iv: $data.iv,
                                session_key: $data.session_key,
                                game_id: $data.gameId,
                                version: $data.version
                            }).then(function (res) {
                                console.log("登录注册接口", res);
                                $data.token = res["data"].token;
                                $data.goldNumber = res["data"].gold;
                                $data.userID = res["data"].id;
                                $data.gameTitleTop = res["data"].max_score;
                                $data.isShare = res["data"].share_lock;
                                _this.homeBestScore.text = "" + $data.gameTitleTop;
                                _this.homeHallGold.text = "" + $data.goldNumber;
                                if (res["data"].gold >= $data.gamePay) {
                                    _this.homeHallPlayIcon.enabled = true;
                                }
                            });
                        });
                    }
                });
            }
        });
    };
    return Home;
}(eui.Component));
__reflect(Home.prototype, "Home");
// This file is exported by Orchid PSD Exporter v1.1.0
var HomeHelp = (function (_super) {
    __extends(HomeHelp, _super);
    function HomeHelp() {
        var _this = _super.call(this) || this;
        _this.fire2Time = 65;
        _this.fire3Time = 65;
        _this.fire4Time = 65;
        _this.fire5Time = 65;
        _this.fireImg1 = 'home-fire-1_png';
        _this.fireImg2 = 'home-fire-2_png';
        _this.fireImg3 = 'home-fire-3_png';
        _this.fireImg4 = 'home-fire-4_png';
        _this.fireImg = '';
        _this.imgIndex = 1;
        _this.second = 60;
        _this.addCoinNum = 0;
        _this.isColse = false;
        _this.coinNum = 0; //火球随机数（不算第一个）
        _this.helpNumber = 0;
        _this.skinName = 'Exml.HomeHelp';
        var that = _this;
        setInterval(function () {
            if (that.imgIndex == 1) {
                that.fireImg = that.fireImg1;
                that.homeFire1.texture = RES.getRes(that.fireImg);
                that.homeFire2.texture = RES.getRes(that.fireImg);
                that.homeFire3.texture = RES.getRes(that.fireImg);
                that.homeFire4.texture = RES.getRes(that.fireImg);
                that.homeFire5.texture = RES.getRes(that.fireImg);
                that.imgIndex = 2;
            }
            else if (that.imgIndex == 2) {
                that.fireImg = that.fireImg2;
                that.homeFire1.texture = RES.getRes(that.fireImg);
                that.homeFire2.texture = RES.getRes(that.fireImg);
                that.homeFire3.texture = RES.getRes(that.fireImg);
                that.homeFire4.texture = RES.getRes(that.fireImg);
                that.homeFire5.texture = RES.getRes(that.fireImg);
                that.imgIndex = 3;
            }
            else if (that.imgIndex == 3) {
                that.fireImg = that.fireImg3;
                that.homeFire1.texture = RES.getRes(that.fireImg);
                that.homeFire2.texture = RES.getRes(that.fireImg);
                that.homeFire3.texture = RES.getRes(that.fireImg);
                that.homeFire4.texture = RES.getRes(that.fireImg);
                that.homeFire5.texture = RES.getRes(that.fireImg);
                that.imgIndex = 4;
            }
            else if (that.imgIndex == 4) {
                that.fireImg = that.fireImg4;
                that.homeFire1.texture = RES.getRes(that.fireImg);
                that.homeFire2.texture = RES.getRes(that.fireImg);
                that.homeFire3.texture = RES.getRes(that.fireImg);
                that.homeFire4.texture = RES.getRes(that.fireImg);
                that.homeFire5.texture = RES.getRes(that.fireImg);
                that.imgIndex = 1;
            }
        }, 100);
        _this.homeFire1.visible = false;
        _this.homeFire2.visible = false;
        _this.homeFire3.visible = false;
        _this.homeFire4.visible = false;
        _this.homeFire5.visible = false;
        _this.homeCountDown.visible = false;
        _this.homeInvite.visible = true;
        _this.homeAddCoin.text = '+0';
        _this.homeInvite.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.addCoin, _this);
        return _this;
        // this.homeClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHomeHelp, this)
    }
    HomeHelp.prototype.addCoin = function () {
        var _this = this;
        AudioManager.playSound('button_mp3');
        window['wx'].shareAppMessage({
            title: $data.shareTextList[Math.floor(Math.random() * $data.shareTextList.length)],
            imageUrl: $data.shareImage,
            success: function (res) {
                var that = _this;
                that.homeInvite.visible = false;
                that.homeCountDown.visible = true;
                setTimeout(function () {
                    that.homeFire1.visible = true;
                    that.addCoinNum += 40;
                    that.homeAddCoin.text = '+' + that.addCoinNum;
                }, 3000);
                that.coinNum = (Math.floor(Math.random() * 4) + 1);
                console.log("coinNum:" + that.coinNum);
                if (that.coinNum == 1) {
                    that.fire2Time = (Math.floor(Math.random() * 30) + 6);
                }
                if (that.coinNum == 2) {
                    that.fire2Time = (Math.floor(Math.random() * 16) + 5);
                    that.fire3Time = (Math.floor(Math.random() * 20) + 25);
                }
                if (that.coinNum == 3) {
                    that.fire2Time = (Math.floor(Math.random() * 12) + 5);
                    that.fire3Time = (Math.floor(Math.random() * 16) + 18);
                    that.fire4Time = (Math.floor(Math.random() * 16) + 35);
                }
                if (that.coinNum == 4) {
                    that.fire2Time = (Math.floor(Math.random() * 10) + 5);
                    that.fire3Time = (Math.floor(Math.random() * 12) + 16);
                    that.fire4Time = (Math.floor(Math.random() * 12) + 28);
                    that.fire5Time = (Math.floor(Math.random() * 15) + 40);
                }
                setTimeout(function () {
                    if (that.coinNum > 0 && !that.isColse) {
                        that.homeFire2.visible = true;
                        that.addCoinNum += 40;
                        that.homeAddCoin.text = '+' + that.addCoinNum;
                        that.coinNum--;
                    }
                }, that.fire2Time * 1000);
                setTimeout(function () {
                    if (that.coinNum > 0 && !that.isColse) {
                        that.homeFire3.visible = true;
                        that.addCoinNum += 40;
                        that.homeAddCoin.text = '+' + that.addCoinNum;
                        that.coinNum--;
                    }
                }, that.fire3Time * 1000);
                setTimeout(function () {
                    if (that.coinNum > 0 && !that.isColse) {
                        that.homeFire4.visible = true;
                        that.addCoinNum += 40;
                        that.homeAddCoin.text = '+' + that.addCoinNum;
                        that.coinNum--;
                    }
                }, that.fire4Time * 1000);
                setTimeout(function () {
                    if (that.coinNum > 0 && !that.isColse) {
                        that.homeFire5.visible = true;
                        that.addCoinNum += 40;
                        that.homeAddCoin.text = '+' + that.addCoinNum;
                        that.coinNum--;
                    }
                }, that.fire5Time * 1000);
                setTimeout(function () {
                    if (that.coinNum > 0 && !that.isColse) {
                        that.homeFire5.visible = true;
                        that.addCoinNum += 40;
                        that.homeAddCoin.text = '+' + that.addCoinNum;
                        that.coinNum--;
                    }
                }, 55000);
                var internal = setInterval(function () {
                    that.second--;
                    that.homeTime.text = that.second + 's';
                    if (that.second == 0) {
                        clearInterval(internal);
                        // that.homeInvite.visible = true;
                        // that.homeCountDown.visible = false;
                        if (!that.isColse) {
                            that.closeHomeHelp();
                        }
                    }
                }, 1000);
            }
        });
    };
    HomeHelp.prototype.closeHomeHelp = function () {
        this.isColse = true;
        var that = this;
        console.log('获得金币数：' + that.addCoinNum);
        var addCoinNum = that.addCoinNum;
        this.saveScore();
    };
    HomeHelp.prototype.saveScore = function () {
        var _this = this;
        Ajax($data.goldURL, {
            postData: true,
            user_id: $data.userID,
            game_id: $data.gameId,
            type: 2,
            token: $data.token,
            num: this.addCoinNum,
            sign: $data.MD5.hex_md5('game_id=' + $data.gameId + '&num=' + this.addCoinNum + '&postData=' + true + '&score=' + $data.score + '&token=' + $data.token + '&type=' + 2 + '&user_id=' + $data.userID),
            score: $data.score
        }).then(function (res) {
            console.log("help提交成绩", res);
            if (res["error"] == 0) {
                console.log("this.addCoinNum", _this.addCoinNum);
                $data.goldNumber += _this.addCoinNum;
                $view.home.homeHallGold.text = "" + $data.goldNumber;
                window['wx'].showToast({
                    title: "助力成功！！！",
                    icon: "none"
                });
                $stage.removeChild($view.help);
            }
            else if (res["error"] == 1) {
                _this.helpNumber++;
                if (_this.helpNumber < 7) {
                    window['wx'].showToast({
                        title: "网络连接失败，正在重新链接...",
                        icon: "none"
                    });
                    var key = setInterval(function () {
                        clearInterval(key);
                        _this.saveScore();
                    }, 1000);
                }
                else {
                    window['wx'].showToast({
                        title: "链接超时，请检查网络",
                        icon: "none"
                    });
                }
            }
            else if (res["error"] == 2) {
                window['wx'].showToast({
                    title: "网络链接中断，请重新登录",
                    icon: "none"
                });
            }
        });
    };
    return HomeHelp;
}(eui.Component));
__reflect(HomeHelp.prototype, "HomeHelp");
// This file is exported by Orchid PSD Exporter v1.1.0
var RankList = (function (_super) {
    __extends(RankList, _super);
    function RankList() {
        var _this = _super.call(this) || this;
        _this.isGroupRankList = false;
        _this.skinName = 'Exml.RankList';
        var openDataContext = window['wx'].getOpenDataContext();
        openDataContext.canvas.height = $main.stage.$stageHeight;
        openDataContext.canvas.width = $main.stage.$stageWidth;
        var bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        bitmapdata.$deleteSource = false;
        var texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        _this.sharedCanvas = new egret.Bitmap(texture);
        _this.sharedCanvas.width = $main.stage.$stageWidth;
        _this.sharedCanvas.height = $main.stage.$stageHeight;
        _this.addChild(_this.sharedCanvas);
        egret.startTick(function (timeStarmp) {
            egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
            bitmapdata.webGLTexture = null;
            return false;
        }, _this);
        _this.rankPrevious.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            openDataContext.postMessage({
                isGroupRankList: _this.isGroupRankList,
                isRequest: false,
                type: 'previous'
            });
        }, _this);
        _this.rankNext.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            openDataContext.postMessage({
                isGroupRankList: _this.isGroupRankList,
                isRequest: false,
                type: 'next'
            });
        }, _this);
        _this.rankBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            if (_this.isGroupRankList) {
                _this.isGroupRankList = false;
                _this.rankMyGroup.visible = true;
                _this.rankTitleGroup.visible = false;
                _this.rankTitleFriend.visible = true;
                openDataContext.postMessage({
                    isGroupRankList: _this.isGroupRankList,
                    isRequest: true
                });
            }
            else {
                openDataContext.postMessage({
                    isGroupRankList: _this.isGroupRankList,
                    isRequest: false,
                    type: 'exit'
                });
                $stage.removeChild($view.rankList);
            }
        }, _this);
        _this.rankMyGroupButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            new Promise(function (resolve, reject) {
                window['wx'].shareAppMessage({
                    title: $data.shareTextList[Math.floor(Math.random() * $data.shareTextList.length)],
                    imageUrl: $data.shareImage,
                    success: function (res) { resolve(res['shareTickets'][0]); },
                    fail: function (err) { reject(err); }
                });
            }).then(function (shareTicket) {
                _this.isGroupRankList = true;
                _this.rankMyGroup.visible = false;
                _this.rankTitleGroup.visible = true;
                _this.rankTitleFriend.visible = false;
                openDataContext.postMessage({
                    isGroupRankList: _this.isGroupRankList,
                    isRequest: true,
                    shareTicket: shareTicket
                });
            }).catch(function (e) { return Log(e); });
        }, _this);
        openDataContext.postMessage({
            isGroupRankList: _this.isGroupRankList,
            isRequest: true
        });
        return _this;
    }
    return RankList;
}(eui.Component));
__reflect(RankList.prototype, "RankList");
/**
 * The view of share.
 * 分享功能的视图。
 *
 * @version 20180413
 * @author Winterwrath
 * @license /license
 */
var Share = (function (_super) {
    __extends(Share, _super);
    function Share() {
        var _this = _super.call(this) || this;
        _this.skinName = 'Exml.Share';
        var _loop_3 = function (i) {
            egret.Tween.get(this_3["shareCoin" + i]).wait(i * 100).to({ y: this_3["shareCoin" + i].y + 940 }, (Math.random() * 500 | 0) + 200, egret.Ease.cubicOut).call(function () {
                egret.Tween.get(_this["shareCoin" + i], { loop: true }).to({ alpha: 0 }, 1000);
            });
        };
        var this_3 = this;
        for (var i = 0; i < 12; i++) {
            _loop_3(i);
        }
        egret.Tween.get(_this.shareCoinA).wait(300).to({ alpha: 1 }, 200);
        egret.Tween.get(_this.shareCoinB).wait(600).to({ alpha: 1 }, 200);
        egret.Tween.get(_this.shareCoinC).wait(900).to({ alpha: 1 }, 200);
        var that = _this;
        setTimeout(function () {
            if (that.parent) {
                that.parent.removeChild(that);
            }
        }, 2500);
        _this.shareSuccessClickMask.once(egret.TouchEvent.TOUCH_TAP, function () {
            egret.Tween.get(_this).to({ alpha: 0 }, 100).call(function () {
                for (var i = 0; i < 12; i++) {
                    egret.Tween.removeTweens(_this["shareCoin" + i]);
                }
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
            });
        }, _this);
        return _this;
    }
    return Share;
}(eui.Component));
__reflect(Share.prototype, "Share");
var Square = (function (_super) {
    __extends(Square, _super);
    function Square(y, x, n) {
        var _this = _super.call(this) || this;
        _this.skinName = "Exml.Square";
        _this.x = x * 92;
        _this.y = y * 92;
        _this.width = 92;
        _this.height = 92;
        if (n === 0) {
            _this.fill.source = "game-square-1_png";
            _this.alpha = 0;
        }
        else {
            _this.fill.source = "game-square-" + Math.log2(n) + "_png";
        }
        return _this;
    }
    return Square;
}(eui.Component));
__reflect(Square.prototype, "Square");
// This file is exported by Orchid PSD Exporter v1.1.0
var Stop = (function (_super) {
    __extends(Stop, _super);
    function Stop() {
        var _this = _super.call(this) || this;
        _this.addNumber = 0;
        _this.skinName = 'Exml.Stop';
        _this.musicImg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // $stage.addChild($view.stop)
            if ($data.key) {
                _this.musicImg.source = "stop-volume--active_png";
                console.log("声音已关闭");
                AudioManager.stopMusic();
                AudioManager.isMusicAllowed = false;
                AudioManager.isSoundAllowed = false;
                window['wx'].showToast({
                    title: "声音已关闭",
                    icon: "none"
                });
                $data.key = false;
                console.log("声音已关闭", $data.key);
            }
            else if (!$data.key) {
                _this.musicImg.source = "stop-volume_png";
                console.log("声音已开启");
                window['wx'].showToast({
                    title: "声音已开启",
                    icon: "none"
                });
                AudioManager.isMusicAllowed = true;
                AudioManager.isSoundAllowed = true;
                AudioManager.playLoop('gameStare_mp3');
                AudioManager.playSound('button_mp3');
                $data.key = true;
                console.log("声音已开启", $data.key);
            }
        }, _this);
        _this.stopBackHome.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            $dispatch(TYPES.CREATE_GAME_LOADING);
            $dispatch(TYPES.HALL_INITIALIZE);
            $stage.removeChild($view.stop);
            $stage.removeChild($view.game);
            $data.score = 0;
        }, _this);
        _this.stopStopShare.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            AudioManager.playSound('button_mp3');
            window['wx'].shareAppMessage({
                title: $data.shareTextList[Math.floor(Math.random() * $data.shareTextList.length)],
                imageUrl: $data.shareImage,
                success: function (res) {
                    _this.saveScore();
                    res['shareTickets'][0];
                    AudioManager.playLoop('hall_mp3');
                }
            });
        }, _this);
        return _this;
    }
    Stop.prototype.saveScore = function () {
        var _this = this;
        Ajax($data.goldURL, {
            postData: true,
            user_id: $data.userID,
            game_id: $data.gameId,
            type: 1,
            token: $data.token,
            num: $data.shareAddGold,
            sign: $data.MD5.hex_md5('game_id=' + $data.gameId + '&num=' + $data.shareAddGold + '&postData=' + true + '&score=' + $data.score + '&token=' + $data.token + '&type=' + 1 + '&user_id=' + $data.userID),
            score: $data.score
        }).then(function (res) {
            console.log("share提交成绩", res);
            if (res["error"] == 0) {
                $data.goldNumber += $data.shareAddGold;
                $view.home.homeHallGold.text = "" + $data.goldNumber;
                window['wx'].showToast({
                    title: "分享成功！！！",
                    icon: "none"
                });
                $stage.removeChild($view.addIcon);
                // $dispatch(TYPES.HALL_INITIALIZE)
            }
            else if (res["error"] == 1) {
                _this.addNumber++;
                if (_this.addNumber < 7) {
                    window['wx'].showToast({
                        title: "获取信息失败，正在重新获取...",
                        icon: "none"
                    });
                    var key = setInterval(function () {
                        clearInterval(key);
                        _this.saveScore();
                    }, 1000);
                }
                else {
                    window['wx'].showToast({
                        title: "链接超时，请检查网络",
                        icon: "none"
                    });
                }
            }
            else if (res["error"] == 2) {
                window['wx'].showToast({
                    title: "链接超时，请检查网络",
                    icon: "none"
                });
                $view.home.homeHallPlayIcon.enabled = false;
            }
        });
    };
    return Stop;
}(eui.Component));
__reflect(Stop.prototype, "Stop");
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
;window.Main = Main;