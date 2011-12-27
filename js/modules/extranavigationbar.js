(function (global) {
	"use strict";
	var backPage = /back/.test(document.location.pathname);
	function ExtraNavigationBar() {
		global.mediator.addComponent(this);
	}
	ExtraNavigationBar.prototype.onpresentationcreate = function (presentation) {
		this.presentation = presentation;
		var chapters = ['right', 'down', 'left', 'up'],
			goto = function (index) {
				if (backPage) {
					return function () {
						document.location.href = 'index.html#' + chapters[index - 1];
					};
				} else {
					return function () {
						presentation.selectItem(index);	
					}
				}
			};
		this.navSlide = new SwipeNavigation(presentation);
		if (!backPage) {
			this.navSlide.show();
			if (document.location.hash) {
				this.navSlide.hide();
				presentation.selectItem(chapters.indexOf(document.location.hash.slice(1)) + 1);
			}
		} else {
			this.navSlide.hide();	
		}
		this.navSlide.leftSwipe = goto(3);
		this.navSlide.upSwipe = goto(4);
		this.navSlide.rightSwipe = goto(1)
		this.navSlide.downSwipe = goto(2);
		presentation.collection.forEach(function (chapter) {
			this.addBar(chapter.element.querySelector('footer'));
		}, this);
	};
	ExtraNavigationBar.prototype.addBar = function (element) {
		var infoButton = document.createElement('icon'),
			navigationButton = document.createElement('icon'),
			pdfButton = document.createElement('icon'),
			wrapper = document.createElement('bar'),
			presentation = this.presentation,
			that = this, currentChapter;
		[infoButton, navigationButton, pdfButton].forEach(function (button) {
			wrapper.appendChild(button);	
		});
		element.appendChild(wrapper);
		infoButton.addEventListener($.events.start, function (event) {
			document.location.href = backPage ? 'index.html' : 'index-back.html';
		}, false);
		navigationButton.addEventListener($.events.start, function (event) {
			event.stopPropagation();
			that.navSlide.toggle();
		}, false);
		pdfButton.addEventListener($.events.start, function (event) {
			var refPopupIndex = presentation.collection.length - 1,
				menu = document.querySelector('menu');
			if (menu) {
				menu = menu.menu;	
			}
			event.stopPropagation();
			if (presentation.collection[presentation.currentItemIndex].id === 'references') {
				presentation.selectItem(parseInt(sessionStorage.getItem('currentChapter'), 10));
				if (menu) {
					menu.show();
				}
			} else {
				sessionStorage.setItem('currentChapter', presentation.currentItemIndex);
				presentation.selectItem(presentation.collection.length - 1);
				if (menu) {
					menu.hide();
				}
			}
			that.navSlide.hide();
		}, false);
	};
	function SwipeNavigation(presentation) {
		var that = this;
		this.element = document.createElement('nav');
		this.presentation = presentation;
		presentation.collection.forEach(function (chapter) {
			if (!chapter.element.hasAttribute('role')) {
				that.element.appendChild(document.createElement('li'));	
			}
		});
		presentation.element.appendChild(this.element);
		this.element.addEventListener('swipeleft', function () {
			that.leftSwipe();
			that.hide();
		}, false);
		this.element.addEventListener('swipeup', function () {
			that.upSwipe();
			that.hide();
		}, false);
		this.element.addEventListener('swiperight', function () {
			that.rightSwipe();
			that.hide();
		}, false);
		this.element.addEventListener('swipedown', function () {
			that.downSwipe();
			that.hide();
		}, false);
	}
	SwipeNavigation.prototype.show = function () {
		if (this.presentation.currentItemIndex === 0 && !backPage) {
			this.clear();	
		} else {
			this.unclear();
		}
		this.element.removeClass('hide');
	};
	SwipeNavigation.prototype.hide = function () {
		this.element.addClass('hide');
	};
	SwipeNavigation.prototype.toggle = function () {
		this.element.hasClass('hide') ? this.show() : this.hide();
	};
	SwipeNavigation.prototype.clear = function () {
		this.element.addClass('clear');
	};
	SwipeNavigation.prototype.unclear = function () {
		this.element.removeClass('clear');
	};
	new ExtraNavigationBar();
})(window);