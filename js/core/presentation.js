(function (global) {
	"use strict";
	var index = 0;
	function Presentation(elem) {
		this.self = 'presentation';
		Presentation.superclass.constructor.call(this, elem);
	}
	$.extend(Presentation, Container);
	Presentation.prototype.init = function () {
		this.visible = false;
		this.index = index++;
		var selectors = this.element.querySelectorAll('chapter').filter(function (elem) { return elem.parentNode === this.element; }, this);
		if (selectors) { 
			selectors.forEach(function (elem, index) {
				this.collection.push(new Chapter(elem));
				this.collection[index].index = index;
			}, this);
		}
		selectors = null;
		if (this.index === 0) {
			this.show();
			this.enter();
		}
		this.collection[0].show();
	};
	Presentation.prototype.viewSelectItem = function (prev, next) {
		this.collection[prev].hide();
		this.collection[next].show();	
	};
	Presentation.prototype.show = function () {
		this.element.addClass('show');
		this.collection.filter(function (item) { return item.visible; })[this.currentItemIndex].enter();
		this.visible = true;
	};
	Presentation.prototype.hide = function () {
		this.element.removeClass('show');
		this.collection.filter(function (item) { return item.visible; })[this.currentItemIndex].leave();
		this.visible = false;
	};
	global.Presentation = Presentation;
})(window);