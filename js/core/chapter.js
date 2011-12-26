(function (global) {
	"use strict";
	function Chapter(elem) {
		this.self = 'chapter';
		Chapter.superclass.constructor.call(this, elem);
	}
	$.extend(Chapter, Container);
	$.augment(Chapter, Interface.InsideObjects);
	Chapter.prototype.init = function () {
		var that = this,
			selectors = this.element.querySelectorAll('slide').filter(function (elem) { return elem.parentNode.parentNode === this.element; }, this);
		this.active = false;
		if (selectors) {
			selectors.forEach(function (elem, index) {
				this.collection.push(new Slide(elem));
				this.collection[index].index = index;
			}, this);
			selectors = null;
		}
		this.scroll = $.createScroll(this.element.querySelector('scroll'), 'snap', function () { that.onScroll(this.pageX); });
	};
	Chapter.prototype.onScroll = function (slide) {
		if (slide === this.currentItemIndex) {
			return;
		}
		var visibleCollection = this.collection.filter(function (item) { return item.visible; });
		this.lastItemIndex = this.currentItemIndex;
		this.currentItemIndex = slide;
		visibleCollection[this.lastItemIndex].leave();
		visibleCollection[this.currentItemIndex].enter();
		visibleCollection = null;
	};
	Chapter.prototype.viewSelectItem = function (prev, next) {
		this.scroll.scrollToPage(next, 0, '400ms');
	};
	Chapter.prototype.show = function () {
		this.element.addClass('show');
		this.active = true;
		this.scroll.refresh();
		this.collection.filter(function (item) { return item.visible; })[this.currentItemIndex].enter();
	};
	Chapter.prototype.hide = function () {
		this.element.removeClass('show');
		this.active = false;
		this.collection.filter(function (item) { return item.visible; })[this.currentItemIndex].leave();
	};
	Chapter.prototype.onslidehide = function (slide) {
		if (!this.ownSlide(slide)) {
			return;
		}
		/* TODO: если мы скрываем слайд на котором находимся - "перейти" на соседний слайд */
	};
	Chapter.prototype.onslideshow = function (slide) {
		if (!this.ownSlide(slide)) {
			return;
		}
		/* TODO: если мы скрываем слайд на котором находимся - "перейти" на соседний слайд */
	};
	Chapter.prototype.ownSlide = function (slide) {
		return this.collection.some(function (item) { return item === slide; });
	};
	global.Chapter = Chapter;
})(window);