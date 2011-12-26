(function (global) {
	"use strict";
	function Mediator() {
		this.components = [];
	}
	Mediator.prototype.addComponent = function (component) {
		if (typeof component !== 'object') {
			return;
		}
		var is = this.components.filter(function (c) { return c[0].constructor === component.constructor; });
		if (is.length === 0) {
			this.components.push([component]);
		} else {
			is[0].push(component);
		}
	};
	Mediator.prototype.broadcast = function (evt, data) {
		var eventFunctionName = 'on' + evt.toLowerCase();
		this.components.forEach(function (component) {
			if (typeof component[0][eventFunctionName] === 'function') {
				component.forEach(function (obj) {
					obj[eventFunctionName](data);
				});
			}
		});
		if (config.log) {
			console.log('mediator broadcast event [', evt, '] with data [', data, ']');
		}
	};
	global.mediator = new Mediator();
})(window);