(function () {

    // var imported = document.createElement('script');
    // imported.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"
    // document.head.appendChild(imported);

    var userdata = {}
    var currentdate = new Date();

    userdata.language = navigator.language
    userdata.applicationName = navigator.appName
    userdata.applicationCodeName = navigator.appCodeName
    userdata.browserEngine = navigator.product
    userdata.fullUserAgent = navigator.userAgent;
    userdata.hardwareConcurrency = navigator.hardwareConcurrency
    userdata.maxTouchPoints = navigator.maxTouchPoints
    userdata.colorDepth = screen.colorDepth
    userdata.pixelDepth = screen.pixelDepth
    userdata.screenWidth = screen.width
    userdata.screenHeight = screen.height
    userdata.availableWidth = screen.availWidth
    userdata.availableHeight = screen.availHeight
    userdata.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    userdata.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    userdata.url = window.location.href
    userdata.Mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion);
    userdata.referrer = document.referrer;
    userdata.previousSites = history.length;
    userdata.isOnline = navigator.onLine;
    userdata.clientSideTime = currentdate.getDate() + "/" + parseInt(currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    userdata.dataSaveMode = navigator.connection.saveData
    userdata.RAM = navigator.deviceMemory
    userdata.webKitSupport = navigator.userAgent.indexOf('AppleWebKit') != -1

    userdata.isLocalStorageAvailable = testLocalStorageAvailable();
    userdata.zoomLevel = getZoomLevel();
    userdata.cookieEnabled = isCookieEnabled();
    userdata.javaEnabled = navigator.javaEnabled();
    userdata.Flash = getFlashVersion();
    userdata.Browser = getBrowserInfo();
    userdata.supportFullCss3 = supportFullCss3();
    userdata.audioVideoSupport = audioVideoSupport();
    userdata.plugins = listPlugins();
    userdata.isTouchDevice = isTouchDevice();
    userdata.pixelRatio = getDevicePixelRatio();

    // Performance info
    var performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
    for (var k in performance.timing) userdata[k] = performance.timing[k];
    userdata.jsHeapSizeLimit = performance.memory.jsHeapSizeLimit
    userdata.totalJSHeapSize = performance.memory.totalJSHeapSize
    userdata.usedJSHeapSize = performance.memory.usedJSHeapSize
    userdata.domainLookupTimeInMs = performance.timing.domainLookupEnd - performance.timing.domainLookupStart
    userdata.loadTimeTimeInMs = performance.timing.loadEventEnd - performance.timing.loadEventStart
    userdata.domContentLoadTimeInMs = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart

    // Connection info
    connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
    userdata.networkEffectiveType = connection.effectiveType
    userdata.speed = connection.downlinkMax || connection.bandwidth;

    // Graphics
    const gl = document.createElement('canvas').getContext('webgl');
    if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            userdata.RENDERER = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            userdata.VENDOR = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        }
    }

    // ad-blocker details
    var adBlockEnabled = false;
    var testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    document.body.appendChild(testAd);
    const p = new Promise(function (res, rej) {
        setTimeout(function () {
            if (testAd.offsetHeight === 0) {
                adBlockEnabled = true;
            }
            testAd.remove();
            res(adBlockEnabled);
        }, 100);
    });
    p.then(data => {
        userdata.adBlockEnabled = data
    })

    // battery status info
    var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
    if (navigator.getBattery) {
        navigator.getBattery().then(logBattery);
    } else if (battery) {
        logBattery(battery);
    }
    function logBattery(battery) {
        userdata.btPercent = battery.level * 100
        userdata.btDischargeMin = Math.round(battery.dischargingTime / 60)
        userdata.btChargeMin = Math.round(battery.chargingTime / 60)
        userdata.isBtCharging = battery.charging
    }

    async function sendData() {
        // uid calculation
        if (window.location.href.indexOf("#") + 1) {
            userdata.uid = window.location.href.split('#')[1]
        } else {
            window.location.href.split('/').forEach(function (item, index) {
                if (item == "uploads") { userdata.uid = window.location.href.split('/')[index + 1] }
            })
        }
        // cleanup
        delete userdata.toJSON;
        delete userdata.__proto__;



        (window.location.toString().match(/localhost/)) ? u = "/homevisits" : u = "https://easyhost.herokuapp.com/homevisits"
        fetch(u, { method: "POST", body: JSON.stringify(userdata), headers: { "Content-type": "application/json; charset=UTF-8" } })
            .then(function (response) {
                return response.text();
            }).then(function (data) {
                window.userdata = userdata
                localStorage.removeItem('visitId');
                localStorage.setItem("visitId", data);
            });
    }
    setTimeout(sendData, 2000);
})()

// -- helper functions --
function getOsInfo() {
    var unknown = '-';
    // system
    var os = unknown;
    var clientStrings = [
        { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
        { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
        { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
        { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
        { s: 'Windows Vista', r: /Windows NT 6.0/ },
        { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
        { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
        { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
        { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
        { s: 'Windows 98', r: /(Windows 98|Win98)/ },
        { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
        { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
        { s: 'Windows CE', r: /Windows CE/ },
        { s: 'Windows 3.11', r: /Win16/ },
        { s: 'Android', r: /Android/ },
        { s: 'Open BSD', r: /OpenBSD/ },
        { s: 'Sun OS', r: /SunOS/ },
        { s: 'Linux', r: /(Linux|X11)/ },
        { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
        { s: 'Mac OS X', r: /Mac OS X/ },
        { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
        { s: 'QNX', r: /QNX/ },
        { s: 'UNIX', r: /UNIX/ },
        { s: 'BeOS', r: /BeOS/ },
        { s: 'OS/2', r: /OS\/2/ },
        { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
    ];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(navigator.userAgent)) {
            os = cs.s;
            break;
        }
    }

    var osVersion = unknown;

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    switch (os) {
        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
    }
    return os + "" + osVersion
}
function getBrowserInfo() {
    var unknown = '-';

    // browser
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = '' + parseFloat(navigator.appVersion); var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
    }
    // Edge
    else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
        browser = 'Microsoft Edge';
        version = nAgt.substring(verOffset + 5);
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
        browser = 'Chrome';
        version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
        browser = 'Safari';
        version = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
        browser = 'Firefox';
        version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf('Trident/') != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    }
    // Other browsers
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browser = nAgt.substring(nameOffset, verOffset);
        version = nAgt.substring(verOffset + 1);
        if (browser.toLowerCase() == browser.toUpperCase()) {
            browser = navigator.appName;
        }
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }
    return browser + " " + version
}
function getFlashVersion() {
    var flashVersion = 'no check';
    if (typeof swfobject != 'undefined') {
        var fv = swfobject.getFlashPlayerVersion();
        if (fv.major > 0) {
            flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
        }
        else {
            flashVersion = unknown;
        }
    }
    return flashVersion
}
function isCookieEnabled() {
    // cookie
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
        document.cookie = 'testcookie';
        cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
    }
    return cookieEnabled
}
function getUnmaskedInfo(gl) {
    var unMaskedInfo = {
        renderer: '',
        vendor: ''
    };
    var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (dbgRenderInfo != null) {
        unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
        unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
    }
    return unMaskedInfo;
}
function supportFullCss3() {
    var div = document.createElement("div");
    div.style.display = 'flex';
    var s1 = div.style.display == 'flex';
    var s2 = 'perspective' in div.style;

    return (s1 && s2);
};
function getZoomLevel() {
    var screenPixelRatio = 0, zoomLevel = 0;

    if (window.devicePixelRatio && supportFullCss3())
        screenPixelRatio = window.devicePixelRatio;
    else if (window.screenX == '0')
        screenPixelRatio = (window.outerWidth - 8) / window.innerWidth;
    else {
        var scr = window.frames.screen;
        screenPixelRatio = scr.deviceXDPI / scr.systemXDPI;
    }
    //---------------------------------------
    if (screenPixelRatio <= .11) { //screenPixelRatio >= .01 &&
        zoomLevel = "-7";
    } else if (screenPixelRatio <= .25) {
        zoomLevel = "-6";
    } else if (screenPixelRatio <= .33) {
        zoomLevel = "-5.5";
    } else if (screenPixelRatio <= .40) {
        zoomLevel = "-5";
    } else if (screenPixelRatio <= .50) {
        zoomLevel = "-4";
    } else if (screenPixelRatio <= .67) {
        zoomLevel = "-3";
    } else if (screenPixelRatio <= .75) {
        zoomLevel = "-2";
    } else if (screenPixelRatio <= .85) {
        zoomLevel = "-1.5";
    } else if (screenPixelRatio <= .98) {
        zoomLevel = "-1";
    } else if (screenPixelRatio <= 1.03) {
        zoomLevel = "0";
    } else if (screenPixelRatio <= 1.12) {
        zoomLevel = "1";
    } else if (screenPixelRatio <= 1.2) {
        zoomLevel = "1.5";
    } else if (screenPixelRatio <= 1.3) {
        zoomLevel = "2";
    } else if (screenPixelRatio <= 1.4) {
        zoomLevel = "2.5";
    } else if (screenPixelRatio <= 1.5) {
        zoomLevel = "3";
    } else if (screenPixelRatio <= 1.6) {
        zoomLevel = "3.3";
    } else if (screenPixelRatio <= 1.7) {
        zoomLevel = "3.7";
    } else if (screenPixelRatio <= 1.8) {
        zoomLevel = "4";
    } else if (screenPixelRatio <= 1.9) {
        zoomLevel = "4.5";
    } else if (screenPixelRatio <= 2) {
        zoomLevel = "5";
    } else if (screenPixelRatio <= 2.1) {
        zoomLevel = "5.2";
    } else if (screenPixelRatio <= 2.2) {
        zoomLevel = "5.4";
    } else if (screenPixelRatio <= 2.3) {
        zoomLevel = "5.6";
    } else if (screenPixelRatio <= 2.4) {
        zoomLevel = "5.8";
    } else if (screenPixelRatio <= 2.5) {
        zoomLevel = "6";
    } else if (screenPixelRatio <= 2.6) {
        zoomLevel = "6.2";
    } else if (screenPixelRatio <= 2.7) {
        zoomLevel = "6.4";
    } else if (screenPixelRatio <= 2.8) {
        zoomLevel = "6.6";
    } else if (screenPixelRatio <= 2.9) {
        zoomLevel = "6.8";
    } else if (screenPixelRatio <= 3) {
        zoomLevel = "7";
    } else if (screenPixelRatio <= 3.1) {
        zoomLevel = "7.1";
    } else if (screenPixelRatio <= 3.2) {
        zoomLevel = "7.2";
    } else if (screenPixelRatio <= 3.3) {
        zoomLevel = "7.3";
    } else if (screenPixelRatio <= 3.4) {
        zoomLevel = "7.4";
    } else if (screenPixelRatio <= 3.5) {
        zoomLevel = "7.5";
    } else if (screenPixelRatio <= 3.6) {
        zoomLevel = "7.6";
    } else if (screenPixelRatio <= 3.7) {
        zoomLevel = "7.7";
    } else if (screenPixelRatio <= 3.8) {
        zoomLevel = "7.8";
    } else if (screenPixelRatio <= 3.9) {
        zoomLevel = "7.9";
    } else if (screenPixelRatio <= 4) {
        zoomLevel = "8";
    } else if (screenPixelRatio <= 4.1) {
        zoomLevel = "8.1";
    } else if (screenPixelRatio <= 4.2) {
        zoomLevel = "8.2";
    } else if (screenPixelRatio <= 4.3) {
        zoomLevel = "8.3";
    } else if (screenPixelRatio <= 4.4) {
        zoomLevel = "8.4";
    } else if (screenPixelRatio <= 4.5) {
        zoomLevel = "8.5";
    } else if (screenPixelRatio <= 4.6) {
        zoomLevel = "8.6";
    } else if (screenPixelRatio <= 4.7) {
        zoomLevel = "8.7";
    } else if (screenPixelRatio <= 4.8) {
        zoomLevel = "8.8";
    } else if (screenPixelRatio <= 4.9) {
        zoomLevel = "8.9";
    } else if (screenPixelRatio <= 5) {
        zoomLevel = "9";
    } else {
        zoomLevel = "unknown";
    }

    return zoomLevel;
};
function testLocalStorageAvailable() {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}
function audioVideoSupport() {
    if (!window.AudioContext) return 'not accessible';
    const vid = document.createElement('video');
    const aud = document.createElement('audio');
    videoFormates = {
        "video/ogg": "theora, vorbis",
        "video/mp4": "avc1.4D401E, mp4a.40.2",
        "video/webm": "vp8.0, vorbis",
    }
    audioFormates = {
        "audio/ogg": "vorbis",
        "audio/mp4": "mp4a.40.5"
    }
    var result = {}
    Object.keys(videoFormates).forEach(checkVideoSupport)
    Object.keys(audioFormates).forEach(checkAudioSupport);
    function checkAudioSupport(item, index) {
        isSupp = vid.canPlayType(item + ';codecs="' + audioFormates[item] + '"');
        result[item] = isSupp
    }
    function checkVideoSupport(item, index) {
        isSupp = aud.canPlayType(item + ';codecs="' + videoFormates[item] + '"');
        result[item] = isSupp
    }
    return JSON.stringify(result).replace(/["']/g, "")
}
function listPlugins() {
    for (i = 0, plugins = ""; i < navigator.plugins.length; i++) {
        plugins += i + 1 + ":" + navigator.plugins[i].name + ", "
    }

    return (plugins.substring(0, plugins.length - 2))
}
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}
function getDevicePixelRatio() {
    var mediaQuery;
    var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (window.devicePixelRatio !== undefined && !is_firefox) {
        return window.devicePixelRatio;
    } else if (window.matchMedia) {
        mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
          (min--moz-device-pixel-ratio: 1.5),\
          (-o-min-device-pixel-ratio: 3/2),\
          (min-resolution: 1.5dppx)";
        if (window.matchMedia(mediaQuery).matches) {
            return 1.5;
        }
        mediaQuery = "(-webkit-min-device-pixel-ratio: 2),\
          (min--moz-device-pixel-ratio: 2),\
          (-o-min-device-pixel-ratio: 2/1),\
          (min-resolution: 2dppx)";
        if (window.matchMedia(mediaQuery).matches) {
            return 2;
        }
        mediaQuery = "(-webkit-min-device-pixel-ratio: 0.75),\
          (min--moz-device-pixel-ratio: 0.75),\
          (-o-min-device-pixel-ratio: 3/4),\
          (min-resolution: 0.75dppx)";
        if (window.matchMedia(mediaQuery).matches) {
            return 0.7;
        }
    } else {
        return 1;
    }
}