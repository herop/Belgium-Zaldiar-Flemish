(function (global) {
	"use strict";
	function ExtraNavigationBar() {
		global.mediator.addComponent(this);
	}
	ExtraNavigationBar.prototype.onpresentationcreate = function (presentation) {
		this.presentation = presentation;
		this.navSlide = new SwipeNavigation('nav');
		this.navSlide.clear();
		this.navSlide.leftSwipe = function () {
			presentation.selectItem(3);
		};
		this.navSlide.upSwipe = function () {
			presentation.selectItem(4);
		};
		this.navSlide.rightSwipe = function () {
			presentation.selectItem(1);
		};
		this.navSlide.downSwipe = function () {
			presentation.selectItem(2);
		};
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
			that = this;
		[infoButton, navigationButton, pdfButton].forEach(function (button) {
			wrapper.appendChild(button);	
		});
		element.appendChild(wrapper);
		infoButton.addEventListener($.events.start, function (event) {
			document.location.href = 'index-back.html';
		}, false);
		navigationButton.addEventListener($.events.start, function (event) {
			event.stopPropagation();
			that.navSlide.toggle();
		}, false);
		pdfButton.addEventListener($.events.start, function (event) {
			event.stopPropagation();
			alert('pdf');
		}, false);
	};
	function SwipeNavigation(element) {
		var that = this;
		this.element = $.getHTMLElement(element);
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
		this.element.removeClass('hide');
	};
	SwipeNavigation.prototype.hide = function () {
		this.element.addClass('hide');
	};
	SwipeNavigation.prototype.toggle = function () {
		this.element.toggleClass('hide');
	};
	SwipeNavigation.prototype.clear = function () {
		this.element.addClass('clear');
	};
	SwipeNavigation.prototype.unclear = function () {
		this.element.removeClass('unclear');
	};
	new ExtraNavigationBar();
})(window);