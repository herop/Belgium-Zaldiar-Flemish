(function (global) {
	"use strict";
	function Indicator(chapter) {
		this.self = 'indicator';
		this.chapter = chapter;
		this.collection = [];
		Indicator.superclass.constructor.call(this, document.createElement('indicator'));
	}
	$.extend(Indicator, Component);
	$.augment(Indicator, Interface.ModuleEvents);
	Indicator.prototype.init = function () {
		var dot, i;
		for (i = 0; i < this.chapter.collection.length; i++) {
			dot = document.createElement('dot');
			this.currentItemIndex = 0;
			this.collection.push(new Dot(dot));
			this.element.appendChild(this.collection[i].element);
			dot = null;
		}
		this.chapter.element.querySelector('footer').appendChild(this.element);
		this.selectItem(this.chapter.currentItemIndex);
	};
	Indicator.prototype.selectItem = function (index) {
		this.collection[this.currentItemIndex].disactivate();
		this.collection[index].activate();
		this.currentItemIndex = index;	
	};
	function Dot(elem) {
		this.element = $.getHTMLElement(elem);
		this.visible = true;
	}
	$.augment(Dot, Component, 'show', 'hide');
	Dot.prototype.activate = function () {
		this.element.addClass('active');
	};
	Dot.prototype.disactivate = function () {
		this.element.removeClass('active');
	};
	if (global.modules) {
		global.modules.add(Indicator, 'chaptercreate');
	}
})(window);