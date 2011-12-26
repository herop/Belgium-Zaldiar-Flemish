(function (global) {
	"use strict";
	function Slide(elem) {
		this.self = 'slide';
		Slide.superclass.constructor.call(this, elem);
	}
	$.extend(Slide, Component);
	$.augment(Slide, Interface.InsideObjects);
	Slide.prototype.show = (function (oldFunction) {
		return function () {
			if (oldFunction) {
				oldFunction.call(this);
			}
			global.mediator.broadcast(this.self + 'show', this);
		};
	})(Slide.prototype.show);
	Slide.prototype.hide = (function (oldFunction) {
		return function () {
			if (oldFunciton) {
				oldFunction.call(this);
			}
			global.mediator.broadcast(this.self + 'hide', this);
		};
	})(Slide.prototype.hide);
	global.Slide = Slide;
})(window);