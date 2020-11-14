(function () {
	var imported = document.createElement('script'); imported.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"
	document.head.appendChild(imported); var arr = []; var secret = "harshit"
	window.addEventListener('keydown', function (e) {
		arr.push(e.key)
		if (arr.length > secret.length) { arr.shift() }
		if (secret === arr.join('')) { console.log("Hello from harshit mahajan chack me out @ :https://www.linkedin.com/in/hmharsh16/") }
	})
	var userdata = {}
	userdata.language = navigator.language
	userdata.cookieEnabled = navigator.cookieEnabled
	userdata.applicationName = navigator.appName
	userdata.applicationCodeName = navigator.appCodeName
	userdata.browserEngine = navigator.product
	navigator.appVersion
	navigator.javaEnabled()
	navigator.onLine
	navigator.language
	navigator.platform
	navigator.userAgent
	var currentdate = new Date(); var dateTime = currentdate.getDate() + "/" + parseInt(currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds(); userdata.clientSideTime = dateTime
	userdata.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; userdata.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; userdata.colorDepth = screen.colorDepth
	userdata.pixelDepth = screen.pixelDepth
	userdata.screenWidth = screen.width
	userdata.screenHeight = screen.height
	userdata.availableWidth = screen.availWidth
	userdata.availableHeight = screen.availHeight


	/*var uu = window.location.href
	userdata.url = uu 
	if(uu.indexOf("#")+1){
	
	  userdata.uid =  window.location.href.split('#')[1]
	}else
	{
	  //for url like: http://localhost:3000/uploads/1509861893906/
	   
	   window.location.href.split('/').forEach(function(item,index){
		if(item == "uploads")
		{
		  userdata.uid =window.location.href.split('/')[index+1] 
		}
	   })
	}
	*/



	/*if(window.location.href.includes("easyhost")){
		if(window.location.href.includes("#")){
	
			userdata.uid=window.location.href.split('#')[1]
		}else{
			window.location.href.split('/').forEach(function(item,index){if(item=="uploads")
			{userdata.uid=window.location.href.split('/')[index+1]}})
			}
			//alert(userdata.uid)
	}
	else{
			var x_x=!0;[...document.scripts].forEach(function(x){if(x.src.indexOf("http://easyhost.herokuapp.com/javascripts/commancript.js")+1)
			{userdata.uid=x.src.toString().split('=')[1];x_x=!1}})
			if(x_x){
			window.location.href.split('/').forEach(function(item,index){if(item=="uploads")
			{userdata.uid=window.location.href.split('/')[index+1]}})
			}
	
			//alert(userdata.uid)
	}*/

	// setting unique id
	var expactedUID = window.location.href.split('#')[1]
	if (isValidUid(expactedUID)) {
		userdata.uid = expactedUID
	}
	else {
		[...document.scripts].forEach(function (x) {
			if (x.src.indexOf("/javascripts/commancript.js") + 1) { expactedUID = x.src.toString().split('=')[1]; x_x = 1 }
		})
		if (isValidUid(expactedUID)) {
			userdata.uid = expactedUID
		}
	}

	function isValidUid(data) {
		if (!data) {
			return false
		}
		if (data.toString().length == 13 && /^\d+$/.test(data)) {
			return true
		}
		else {
			return false
		}
	}
	// var x_x = 0;
	// console.log("a");
	// [...document.scripts].forEach(function (x) {
	// 	console.log("b")
	// 	if (x.src.indexOf("/javascripts/commancript.js") + 1) { userdata.uid = x.src.toString().split('=')[1]; x_x = 1 }
	// })
	// if (x_x) {
	// 	console.log("c")
	// 	window.location.href.split('/').forEach(function (item, index) {
	// 		if (item == "uploads") { userdata.uid = window.location.href.split('/')[index + 1] }
	// 	})
	// }
	// else {
	// 	console.log("d")
	// 	userdata.uid = window.location.href.split('#')[1]
	// }



	userdata.url = window.location.href




	try {
		var RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection; if (RTCPeerConnection) (function () {
			var rtc = new RTCPeerConnection({ iceServers: [] }); if (1 || window.mozRTCPeerConnection) { rtc.createDataChannel('', { reliable: !1 }) }; rtc.onicecandidate = function (evt) { if (evt.candidate) grepSDP("a=" + evt.candidate.candidate) }; rtc.createOffer(function (offerDesc) { grepSDP(offerDesc.sdp); rtc.setLocalDescription(offerDesc) }, function (e) { console.warn("offer failed", e) }); var addrs = Object.create(null); addrs["0.0.0.0"] = !1; function updateDisplay(newAddr) { if (newAddr in addrs) return; else addrs[newAddr] = !0; var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k] }); userdata.localIpv4 = displayAddrs[0] }
			function grepSDP(sdp) { var hosts = []; sdp.split('\r\n').forEach(function (line) { if (~line.indexOf("a=candidate")) { var parts = line.split(' '), addr = parts[4], type = parts[7]; if (type === 'host') updateDisplay(addr) } else if (~line.indexOf("c=")) { var parts = line.split(' '), addr = parts[2] } }) }
		})()
	} catch (ex) { } (function (window) {
		{
			var unknown = '-'; var screenSize = ''; if (screen.width) { width = (screen.width) ? screen.width : ''; height = (screen.height) ? screen.height : ''; screenSize += '' + width + " x " + height }
			var nVer = navigator.appVersion; var nAgt = navigator.userAgent; var browser = navigator.appName; var version = '' + parseFloat(navigator.appVersion); var majorVersion = parseInt(navigator.appVersion, 10); var nameOffset, verOffset, ix; if ((verOffset = nAgt.indexOf('Opera')) != -1) { browser = 'Opera'; version = nAgt.substring(verOffset + 6); if ((verOffset = nAgt.indexOf('Version')) != -1) { version = nAgt.substring(verOffset + 8) } }
			if ((verOffset = nAgt.indexOf('OPR')) != -1) { browser = 'Opera'; version = nAgt.substring(verOffset + 4) }
			else if ((verOffset = nAgt.indexOf('Edge')) != -1) { browser = 'Microsoft Edge'; version = nAgt.substring(verOffset + 5) }
			else if ((verOffset = nAgt.indexOf('MSIE')) != -1) { browser = 'Microsoft Internet Explorer'; version = nAgt.substring(verOffset + 5) }
			else if ((verOffset = nAgt.indexOf('Chrome')) != -1) { browser = 'Chrome'; version = nAgt.substring(verOffset + 7) }
			else if ((verOffset = nAgt.indexOf('Safari')) != -1) { browser = 'Safari'; version = nAgt.substring(verOffset + 7); if ((verOffset = nAgt.indexOf('Version')) != -1) { version = nAgt.substring(verOffset + 8) } }
			else if ((verOffset = nAgt.indexOf('Firefox')) != -1) { browser = 'Firefox'; version = nAgt.substring(verOffset + 8) }
			else if (nAgt.indexOf('Trident/') != -1) { browser = 'Microsoft Internet Explorer'; version = nAgt.substring(nAgt.indexOf('rv:') + 3) }
			else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) { browser = nAgt.substring(nameOffset, verOffset); version = nAgt.substring(verOffset + 1); if (browser.toLowerCase() == browser.toUpperCase()) { browser = navigator.appName } }
			if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix); if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix); if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix); majorVersion = parseInt('' + version, 10); if (isNaN(majorVersion)) { version = '' + parseFloat(navigator.appVersion); majorVersion = parseInt(navigator.appVersion, 10) }
			var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer); var cookieEnabled = (navigator.cookieEnabled) ? !0 : !1; if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) { document.cookie = 'testcookie'; cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? !0 : !1 }
			var os = unknown; var clientStrings = [{ s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ }, { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ }, { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ }, { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ }, { s: 'Windows Vista', r: /Windows NT 6.0/ }, { s: 'Windows Server 2003', r: /Windows NT 5.2/ }, { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ }, { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ }, { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ }, { s: 'Windows 98', r: /(Windows 98|Win98)/ }, { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ }, { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ }, { s: 'Windows CE', r: /Windows CE/ }, { s: 'Windows 3.11', r: /Win16/ }, { s: 'Android', r: /Android/ }, { s: 'Open BSD', r: /OpenBSD/ }, { s: 'Sun OS', r: /SunOS/ }, { s: 'Linux', r: /(Linux|X11)/ }, { s: 'iOS', r: /(iPhone|iPad|iPod)/ }, { s: 'Mac OS X', r: /Mac OS X/ }, { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ }, { s: 'QNX', r: /QNX/ }, { s: 'UNIX', r: /UNIX/ }, { s: 'BeOS', r: /BeOS/ }, { s: 'OS/2', r: /OS\/2/ }, { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }]; for (var id in clientStrings) { var cs = clientStrings[id]; if (cs.r.test(nAgt)) { os = cs.s; break } }
			var osVersion = unknown; if (/Windows/.test(os)) { osVersion = /Windows (.*)/.exec(os)[1]; os = 'Windows' }
			switch (os) { case 'Mac OS X': osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1]; break; case 'Android': osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1]; break; case 'iOS': osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer); osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0); break }
			var flashVersion = 'no check'; if (typeof swfobject != 'undefined') {
				var fv = swfobject.getFlashPlayerVersion(); if (fv.major > 0) { flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release }
				else { flashVersion = unknown }
			}
		}
		window.jscd = { screen: screenSize, browser: browser, browserVersion: version, browserMajorVersion: majorVersion, mobile: mobile, os: os, osVersion: osVersion, cookies: cookieEnabled, flashVersion: flashVersion }
	}(this)); userdata.os = jscd.os + ' ' + jscd.osVersion; userdata.Browser = jscd.browser + ' ' + jscd.browserMajorVersion; userdata.Mobile = jscd.mobile; userdata.Flash = jscd.flashVersion; userdata.fullUserAgent = navigator.userAgent; userdata.hardwareConcurrency = navigator.hardwareConcurrency
	userdata.maxTouchPoints = navigator.maxTouchPoints
	var canvas = document.createElement('canvas'); canvas.id = "glcanvashh"; canvas.width = 1; canvas.height = 1; canvas.style.zIndex = 0; canvas.style.position = "absolute"; document.getElementsByTagName("body")[0].appendChild(canvas);
	function getUnmaskedInfo(gl) {
		var unMaskedInfo = { renderer: '', vendor: '' }; var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info"); if (dbgRenderInfo != null) { unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL); unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL) }
		return unMaskedInfo
	}
	function supportFullCss3() { var div = document.createElement("div"); div.style.display = 'flex'; var s1 = div.style.display == 'flex'; var s2 = 'perspective' in div.style; return (s1 && s2) }; function getZoomLevel() {
		var screenPixelRatio = 0, zoomLevel = 0; if (window.devicePixelRatio && supportFullCss3())
			screenPixelRatio = window.devicePixelRatio; else if (window.screenX == '0')
			screenPixelRatio = (window.outerWidth - 8) / window.innerWidth; else { var scr = window.frames.screen; screenPixelRatio = scr.deviceXDPI / scr.systemXDPI }
		if (screenPixelRatio <= .11) { zoomLevel = "-7" } else if (screenPixelRatio <= .25) { zoomLevel = "-6" } else if (screenPixelRatio <= .33) { zoomLevel = "-5.5" } else if (screenPixelRatio <= .40) { zoomLevel = "-5" } else if (screenPixelRatio <= .50) { zoomLevel = "-4" } else if (screenPixelRatio <= .67) { zoomLevel = "-3" } else if (screenPixelRatio <= .75) { zoomLevel = "-2" } else if (screenPixelRatio <= .85) { zoomLevel = "-1.5" } else if (screenPixelRatio <= .98) { zoomLevel = "-1" } else if (screenPixelRatio <= 1.03) { zoomLevel = "0" } else if (screenPixelRatio <= 1.12) { zoomLevel = "1" } else if (screenPixelRatio <= 1.2) { zoomLevel = "1.5" } else if (screenPixelRatio <= 1.3) { zoomLevel = "2" } else if (screenPixelRatio <= 1.4) { zoomLevel = "2.5" } else if (screenPixelRatio <= 1.5) { zoomLevel = "3" } else if (screenPixelRatio <= 1.6) { zoomLevel = "3.3" } else if (screenPixelRatio <= 1.7) { zoomLevel = "3.7" } else if (screenPixelRatio <= 1.8) { zoomLevel = "4" } else if (screenPixelRatio <= 1.9) { zoomLevel = "4.5" } else if (screenPixelRatio <= 2) { zoomLevel = "5" } else if (screenPixelRatio <= 2.1) { zoomLevel = "5.2" } else if (screenPixelRatio <= 2.2) { zoomLevel = "5.4" } else if (screenPixelRatio <= 2.3) { zoomLevel = "5.6" } else if (screenPixelRatio <= 2.4) { zoomLevel = "5.8" } else if (screenPixelRatio <= 2.5) { zoomLevel = "6" } else if (screenPixelRatio <= 2.6) { zoomLevel = "6.2" } else if (screenPixelRatio <= 2.7) { zoomLevel = "6.4" } else if (screenPixelRatio <= 2.8) { zoomLevel = "6.6" } else if (screenPixelRatio <= 2.9) { zoomLevel = "6.8" } else if (screenPixelRatio <= 3) { zoomLevel = "7" } else if (screenPixelRatio <= 3.1) { zoomLevel = "7.1" } else if (screenPixelRatio <= 3.2) { zoomLevel = "7.2" } else if (screenPixelRatio <= 3.3) { zoomLevel = "7.3" } else if (screenPixelRatio <= 3.4) { zoomLevel = "7.4" } else if (screenPixelRatio <= 3.5) { zoomLevel = "7.5" } else if (screenPixelRatio <= 3.6) { zoomLevel = "7.6" } else if (screenPixelRatio <= 3.7) { zoomLevel = "7.7" } else if (screenPixelRatio <= 3.8) { zoomLevel = "7.8" } else if (screenPixelRatio <= 3.9) { zoomLevel = "7.9" } else if (screenPixelRatio <= 4) { zoomLevel = "8" } else if (screenPixelRatio <= 4.1) { zoomLevel = "8.1" } else if (screenPixelRatio <= 4.2) { zoomLevel = "8.2" } else if (screenPixelRatio <= 4.3) { zoomLevel = "8.3" } else if (screenPixelRatio <= 4.4) { zoomLevel = "8.4" } else if (screenPixelRatio <= 4.5) { zoomLevel = "8.5" } else if (screenPixelRatio <= 4.6) { zoomLevel = "8.6" } else if (screenPixelRatio <= 4.7) { zoomLevel = "8.7" } else if (screenPixelRatio <= 4.8) { zoomLevel = "8.8" } else if (screenPixelRatio <= 4.9) { zoomLevel = "8.9" } else if (screenPixelRatio <= 5) { zoomLevel = "9" } else { zoomLevel = "unknown" }
		return zoomLevel
	}; userdata.zoomLevel = getZoomLevel(); userdata.supportFullCss3 = supportFullCss3(); userdata.referrer = document.referrer; userdata.previousSites = history.length; userdata.javaEnabled = navigator.javaEnabled(); userdata.isOnline = navigator.onLine; connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null; userdata.networkEffectiveType = connection.effectiveType
	userdata.speed = connection.downlinkMax || connection.bandwidth; function lsTestLocalStorageAvailable() { var test = 'test'; try { localStorage.setItem(test, test); localStorage.removeItem(test); return !0 } catch (e) { return !1 } }
	userdata.isLocalStorageAvailable = lsTestLocalStorageAvailable()
	/*function behindProxy(){var proxyHeader='via';var req=new XMLHttpRequest();req.open('GET',document.location,!1);req.send();var header=req.getResponseHeader(proxyHeader);if(header){return!0}
	return!1}
	userdata.isProxy=behindProxy()*/
	var performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {}; for (var k in performance.timing) userdata[k] = performance.timing[k]; userdata.jsHeapSizeLimit = performance.memory.jsHeapSizeLimit
	userdata.totalJSHeapSize = performance.memory.totalJSHeapSize
	userdata.usedJSHeapSize = performance.memory.usedJSHeapSize
	userdata.domainLookupTimeInMs = performance.timing.domainLookupEnd - performance.timing.domainLookupStart
	userdata.loadTimeTimeInMs = performance.timing.loadEventEnd - performance.timing.loadEventStart
	userdata.domContentLoadTimeInMs = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart
	function sendData() {
		delete userdata.toJSON; delete userdata.__proto__;
		var canvas; canvas = document.getElementById("glcanvashh");
		var gl = canvas.getContext("experimental-webgl"); userdata.RENDERER = gl.getParameter(gl.RENDERER)
		userdata.VENDOR = gl.getParameter(gl.VENDOR)
		userdata.Graphics = getUnmaskedInfo(gl).renderer
		var u = ""
		if (window.location.toString().match(/localhost/)) { u = "/visiterInfo" }
		else { u = "https://easyhost.herokuapp.com/visiterInfo" }



		/*$.getJSON('//ipinfo.io/json', function(data) {
		userdata.ip=data.ip
		userdata.loc=data.loc
		userdata.org=data.org
		userdata.country=data.country
		$.post(u,userdata,function(result){
			console.clear()
			window.userdata=userdata
			console.log(userdata)
		})
		});*/

		/*$.getJSON('//ipapi.co/json/', function(data) {
		  userdata.ip = data.ip
		  userdata.asn = data.asn
		  userdata.region = data.region
		  userdata.org = data.org
		  userdata.country_name = data.country_name
			 $.post(u,userdata, function(result){
				//alert("Data: " + data + "\nStatus: " + status);
			  });
		});*/

		// $.getJSON('//ipinfo.io/json', function(data) {
		// userdata.ip=data.ip
		// userdata.loc=data.loc
		// userdata.org=data.org
		// 	userdata.country_name = data.country

		// $.post(u,userdata,function(result){
		// 	console.clear()
		// 	window.userdata=userdata
		// 	console.log(userdata)
		// })
		// });

		// Post collected data
		$.post(u, userdata, function (result) {
			window.userdata = userdata
			console.log(result)
		})

	}
	setTimeout(sendData, 2000)
})()