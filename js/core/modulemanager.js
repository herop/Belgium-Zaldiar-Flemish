(function (global) {
	"use strict";
	function ModuleManager() {
		global.mediator.addComponent(this);
		global.mediator.broadcast('modulemanagercreate', this);
	}
	ModuleManager.prototype.add = function (Constructor, evt) {
		if (/initial/i.test(evt)) {
			new Constructor();
			return;
		}
		var funcName = 'on' + evt;
		this[funcName] = (function (oldFunction) {
			return function (data) {
				if (oldFunction) {
					oldFunction.call(this, data);
				}
				new Constructor(data);
			};
		})(this[funcName]);
	};
	if (global.config.modules) {
		global.modules = new ModuleManager();
	}
})(window);