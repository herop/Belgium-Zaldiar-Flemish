(function (global) {
	"use strict";
	var $ = {};
	$.clone = (function () {
		function C(obj) {
			for (var i in obj) {
				this[i] = obj[i]; 
			}
		}
		return function (obj) {
			return new C(obj);
		};
	})();
	$.getHTMLElement = function (e) {
		return typeof e === 'string' ? /[\*\.\#\>\+\:\s\[\]\(\)]/g.test(e) ? document.querySelector(e) : document.getElementById(e) || document.getElementsByTagName(e)[0] : e instanceof HTMLElement ? e : null;
	};
	$.getHTMLElements = function (e) {
		return typeof e === 'string' ? /[\*\.\#\>\+\:\s\[\]\(\)]/g.test(e) ? document.querySelectorAll(e) : document.getElementsByTagName(e) : e instanceof HTMLElement ? e : e instanceof NodeList ? e : null;
	};
	$.extend = function (subClass, superClass) {
		var F = function () {};
		F.prototype = superClass.prototype;
		subClass.prototype = new F();
		subClass.prototype.constructor = subClass;
		subClass.superclass = superClass.prototype;
		superClass.prototype.constructor = superClass;
	};
	$.augment = function (receivingClass, givingClass) {
		var i, methodName;
		if (arguments[2]) {
			for (i = 2; i < arguments.length; i++) {
				receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
			}
		} else {
			for (methodName in givingClass.prototype) {
				receivingClass.prototype[methodName] = givingClass.prototype[methodName];
			}
		}
	};
	$.createScroll = function (element, additionalOptions, onScrollEnd) {  //additionalOptions = 'snap momentum bounce'
		element = $.getHTMLElement(element);
		var options = {
			snap: additionalOptions.indexOf('snap') !== -1,
			momentum: additionalOptions.indexOf('momentum') !== -1,
			bounce: additionalOptions.indexOf('bounce') !== -1
		};
		if (onScrollEnd) {
			options.onScrollEnd = onScrollEnd;	
		}
		return new Scroll(element, options);
	}
	global.$ = $;
})(window);