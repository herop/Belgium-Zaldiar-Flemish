(function (global) {
	"use strict";
	function Popup(elem) {
		this.self = 'popup';
		Popup.superclass.constructor.call(this, elem);
	}
	$.extend(Popup, Container);
	$.augment(Popup, Interface.InsideObjects);
	Popup.prototype.init = function () {
		var that = this,
			xbutton = document.createElement('xbutton'),
			selectors, scroll;
		xbutton.addEventListener($.events.start, function () {
			that.hide();
		}, false);
		this.element.appendChild(xbutton);
		selectors = this.element.querySelectorAll('item').filter(function (elem) { return elem.parentNode.parentNode === this.element; }, this);
		if (selectors) { 
			selectors.forEach(function (elem, index) {
				this.collection.push(new Item(elem));
				this.collection[index].index = index;
			}, this);
		}
		this.visible = false;
		scroll = this.element.querySelector('scroll');
		if (!scroll) {
			return;
		}
		this.scroll = $.createScroll(scroll, 'snap', function () { that.onScroll(this.pageX); });
		scroll = selectors = xbutton = null;
	};
	Popup.prototype.onScroll = function (slide) {
		if (!this.scroll || slide == this.currentItemIndex) {
			return;
		}
		var visibleCollection = this.collection.filter(function (item) { return item.visible; });
		this.lastItemIndex = this.currentItemIndex;
		this.currentItemIndex = slide;
		visibleCollection[this.lastItemIndex].leave();
		visibleCollection[this.currentItemIndex].enter();
		visibleCollection = null;
	};
	Popup.prototype.viewSelectItem = function (prev, next) {
		if (!this.scroll) {
			return;
		}
		this.scroll.scrollToPage(next, 0, '400ms');
	};
	Popup.prototype.show = function () {
		this.element.addClass('show');
		this.visible = true;
		this.enter();
		var currentSlide;
		currentSlide = this.collection[this.currentItemIndex];
		if (currentSlide) {
			currentSlide.enter();
		}
		if (this.scroll) {
			this.scroll.refresh();
		}
	};
	Popup.prototype.hide = function () {
		this.element.removeClass('show');
		this.visible = false;
		this.leave();
		var currentSlide = this.collection[this.currentItemIndex];
		if (currentSlide) {
			currentSlide.leave();
		}
	};
	function Item(elem) {
		this.self = 'item';
		Item.superclass.constructor.call(this, elem);
	}
	$.extend(Item, Component);
	function PopupFactory() {
		global.mediator.addComponent(this);
	}
	PopupFactory.prototype.onslidecreate = function (slide) {
		var selectors = slide.element.getElementsByTagName('popup');
		if (selectors) { 
			selectors.forEach(function (elem, index) {
				var popup = new Popup(elem),
					button = this.element.querySelector('[popup="' + popup.getId() + '"]');;
				popup.index = index;
				this.addInsideObject({
					leave: function () {
						if (popup.visible) {
							popup.hide();
						}
					}
				});
				if (button) {
					button.addEventListener($.events.start, function () {
						popup.show();
					}, false);
				}
				button = null;
			}, slide);
		}
		selectors = null;
	};
	if (global.modules) {
		global.modules.add(PopupFactory, 'initial');
	}
})(window);