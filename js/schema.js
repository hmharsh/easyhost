const mongoose = require('mongoose');
module.exports = {
    visitSchema: new mongoose.Schema({
        "language": {
            "type": "String"
        },
        "cookieEnabled": {
            "type": "String"
        },
        "applicationName": {
            "type": "String"
        },
        "applicationCodeName": {
            "type": "String"
        },
        "browserEngine": {
            "type": "String"
        },
        "clientSideTime": {
            "type": "String"
        },
        "windowWidth": {
            "type": "String"
        },
        "windowHeight": {
            "type": "String"
        },
        "colorDepth": {
            "type": "String"
        },
        "pixelDepth": {
            "type": "String"
        },
        "screenWidth": {
            "type": "String"
        },
        "screenHeight": {
            "type": "String"
        },
        "availableWidth": {
            "type": "String"
        },
        "availableHeight": {
            "type": "String"
        },
        "url": {
            "type": "String"
        },
        "os": {
            "type": "String"
        },
        "Browser": {
            "type": "String"
        },
        "Mobile": {
            "type": "String"
        },
        "Flash": {
            "type": "String"
        },
        "fullUserAgent": {
            "type": "String"
        },
        "hardwareConcurrency": {
            "type": "String"
        },
        "maxTouchPoints": {
            "type": "String"
        },
        "zoomLevel": {
            "type": "String"
        },
        "supportFullCss3": {
            "type": "String"
        },
        "referrer": {
            "type": "String"
        },
        "previousSites": {
            "type": "String"
        },
        "javaEnabled": {
            "type": "String"
        },
        "isOnline": {
            "type": "String"
        },
        "networkEffectiveType": {
            "type": "String"
        },
        "isLocalStorageAvailable": {
            "type": "String"
        },
        "isProxy": {
            "type": "String"
        },
        "navigationStart": {
            "type": "String"
        },
        "unloadEventStart": {
            "type": "String"
        },
        "unloadEventEnd": {
            "type": "String"
        },
        "redirectStart": {
            "type": "String"
        },
        "redirectEnd": {
            "type": "String"
        },
        "fetchStart": {
            "type": "String"
        },
        "domainLookupStart": {
            "type": "String"
        },
        "domainLookupEnd": {
            "type": "String"
        },
        "connectStart": {
            "type": "String"
        },
        "connectEnd": {
            "type": "String"
        },
        "secureConnectionStart": {
            "type": "String"
        },
        "requestStart": {
            "type": "String"
        },
        "responseStart": {
            "type": "String"
        },
        "responseEnd": {
            "type": "String"
        },
        "domLoading": {
            "type": "String"
        },
        "domInteractive": {
            "type": "String"
        },
        "domContentLoadedEventStart": {
            "type": "String"
        },
        "domContentLoadedEventEnd": {
            "type": "String"
        },
        "domComplete": {
            "type": "String"
        },
        "loadEventStart": {
            "type": "String"
        },
        "loadEventEnd": {
            "type": "String"
        },
        "jsHeapSizeLimit": {
            "type": "String"
        },
        "totalJSHeapSize": {
            "type": "String"
        },
        "usedJSHeapSize": {
            "type": "String"
        },
        "domainLookupTimeInMs": {
            "type": "String"
        },
        "loadTimeTimeInMs": {
            "type": "String"
        },
        "domContentLoadTimeInMs": {
            "type": "String"
        },
        "localIpv4": {
            "type": "String"
        },
        "RENDERER": {
            "type": "String"
        },
        "VENDOR": {
            "type": "String"
        },
        "stime": {
            "type": "String"
        },
        "remoteAddress": {
            "type": "String"
        },
        "remotePort": {
            "type": "Number"
        },
        "uid": {
            "type": "String"
        },
        "ip": {
            "type": "String"
        },
        "dataSaveMode": {
            "type": "String"
        },
        "RAM": {
            "type": "String"
        },
        "audioVideoSupport": {
            "type": "String"
        },
        "plugins": {
            "type": "String"
        },
        "isTouchDevice": {
            "type": "String"
        },
        "pixelRatio": {
            "type": "String"
        },
        "adBlockEnabled": {
            "type": "String"
        },
        "btPercent": {
            "type": "String"
        },
        "btDischargeMin": {
            "type": "String"
        },
        "btChargeMin": {
            "type": "String"
        },
        "isBtCharging": {
            "type": "String"
        },
        "webKitSupport": {
            "type": "String"
        },
    }),
    hostedItemSchema: new mongoose.Schema({
        "uid": {
            "type": "String"
        },
        "lastAccess": {
            "type": "String"
        },
        "secretKey": {
            "type": "String"
        },
        "upload_time": {
            "type": "String"
        },
        "accessSecret": {
            "type": "String"
        },
        "visiterId": {
            "type": "String"
        },
        "stype": {
            "type": "String"
        },
        "ip": {
            "type": "String"
        }

    })
};


/*

Example json
{
  "language": "en-US",
  "cookieEnabled": "true",
  "applicationName": "Netscape",
  "applicationCodeName": "Mozilla",
  "browserEngine": "Gecko",
  "clientSideTime": "13/2/2021 @ 14:24:38",
  "windowWidth": "1479",
  "windowHeight": "766",
  "colorDepth": "24",
  "pixelDepth": "24",
  "screenWidth": "1536",
  "screenHeight": "864",
  "availableWidth": "1479",
  "availableHeight": "837",
  "url": "http://localhost:3000/",
  "os": "Linux -",
  "Browser": "Chrome 87",
  "Mobile": "false",
  "Flash": "no check",
  "fullUserAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36",
  "hardwareConcurrency": "8",
  "maxTouchPoints": "0",
  "zoomLevel": "2",
  "supportFullCss3": "true",
  "referrer": "",
  "previousSites": "2",
  "javaEnabled": "false",
  "isOnline": "true",
  "networkEffectiveType": "4g",
  "isLocalStorageAvailable": "true",
  "isProxy": "false",
  "navigationStart": "1613206477877",
  "unloadEventStart": "1613206477929",
  "unloadEventEnd": "1613206477929",
  "redirectStart": "0",
  "redirectEnd": "0",
  "fetchStart": "1613206477881",
  "domainLookupStart": "1613206477881",
  "domainLookupEnd": "1613206477881",
  "connectStart": "1613206477881",
  "connectEnd": "1613206477881",
  "secureConnectionStart": "0",
  "requestStart": "1613206477889",
  "responseStart": "1613206477924",
  "responseEnd": "1613206477925",
  "domLoading": "1613206477933",
  "domInteractive": "0",
  "domContentLoadedEventStart": "0",
  "domContentLoadedEventEnd": "0",
  "domComplete": "0",
  "loadEventStart": "0",
  "loadEventEnd": "0",
  "jsHeapSizeLimit": "2172649472",
  "totalJSHeapSize": "6740939",
  "usedJSHeapSize": "6544739",
  "domainLookupTimeInMs": "0",
  "loadTimeTimeInMs": "0",
  "domContentLoadTimeInMs": "0",
  "localIpv4": "d17e3f2e-ccbc-4a39-80d8-605ee1a6cccc.local",
  "RENDERER": "WebKit WebGL",
  "VENDOR": "WebKit",
  "Graphics": "ANGLE (Intel, Mesa Intel(R) UHD Graphics (CML GT2), OpenGL 4.6 core)",
  "stime": "Sat Feb 13 2021 14:24:40 GMT+0530 (India Standard Time)",
  "remoteAddress": "::1",
  "remotePort": 34004,
  "localAddress": "::1",
  "localPort": 3000,
  "uid": "161320648011255"
}

HostedItem

{ "uid": "161320811074101",
  "lastAccess": "60279a2e0000000000000000",
  "secretKey": "b7e244aece9e93f2030f7283f4cb8319",
  "upload_time": "Sat Feb 13 2021 14:51:50 GMT+0530 (India Standard Time)",
  "visiterId": "161320806612545",
  "stype": "File hosting"
  }

*/