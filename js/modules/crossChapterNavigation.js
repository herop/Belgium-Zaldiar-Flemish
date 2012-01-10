(function (global) {
	//"use strict";
	function CrossChapterNavigation(presentation) {
		this.presentation = presentation;
		this.inaction = false;
		this.firstSlides = [];
		this.lastSlides = [];
		this.init();
		global.mediator.addComponent(this);
	}
	CrossChapterNavigation.prototype.init = function () {
		var that = this;
		this.presentation.collection.forEach(function (chapter) {
			this.firstSlides.push(chapter.collection[0]);
			this.lastSlides.push(chapter.collection[chapter.collection.length - 1]);
		}, this);
		this.firstSlides.forEach(function (slide) {
			slide.element.addEventListener('swiperight', function () {
				if (!that.inaction) {
					that.inaction = true;
					var currSlide = that.presentation.collection[that.presentation.currentItemIndex],
						prevSlide = that.presentation.collection[that.presentation.currentItemIndex - 1],
						removeClasses = function () {
							that.inaction = false;
							if (that.menu) {
								that.menu.activize();
							}
							prevSlide.element.removeClass("center");
							prevSlide.element.removeClass("left");
							currSlide.element.removeClass("right_anim");
							that.presentation.selectItem('prev');
							currSlide.element.removeEventListener('webkitTransitionEnd', removeClasses);
						};
					if (that.presentation.currentItemIndex > 0) {
						if (that.menu) {
							that.menu.deactivize();
						}
						prevSlide.element.addClass("left");
						prevSlide.show();
						currSlide.element.addClass("right_anim");
						prevSlide.element.addClass("center");
						currSlide.element.addEventListener('webkitTransitionEnd', removeClasses);
					} else {
						that.inaction = false;	
					}
					
				}
			}, this);
		}, this);
		this.lastSlides.forEach(function (slide) {
			slide.element.addEventListener('swipeleft', function () {
				if (!that.inaction) {
					that.inaction = true;
					var currSlide = that.presentation.collection[that.presentation.currentItemIndex],
						nextSlide = that.presentation.collection[that.presentation.currentItemIndex + 1],
						canGoToTheNextSlide = nextSlide.element.getAttribute('role') !== 'ref-popup',
						removeClasses = function () {
							that.inaction = false;
							if (that.menu) {
								that.menu.activize();
							}
							nextSlide.element.removeClass("center");
							nextSlide.element.removeClass("right");
							currSlide.element.removeClass("left_anim");
							that.presentation.selectItem('next');
							currSlide.element.removeEventListener('webkitTransitionEnd', removeClasses);
						};
					if (that.presentation.currentItemIndex < that.presentation.collection.length - 1 && canGoToTheNextSlide) {
						if (that.menu) {
							that.menu.deactivize();
						}
						nextSlide.element.addClass("right");
						nextSlide.show();
						currSlide.element.addClass("left_anim");
						that.presentation.collection[that.presentation.currentItemIndex + 1].element.addClass("center");
						currSlide.element.addEventListener('webkitTransitionEnd', removeClasses);
					} else {
						that.inaction = false;	
					}
				}
			}, this);
		}, this);
	};
	CrossChapterNavigation.prototype.onmenucreate = function (menu) {
		if (menu.presentation === this.presentation) {
			this.menu = menu;
		}
	};
	if (global.modules) {
		global.modules.add(CrossChapterNavigation, 'presentationcreate');
	}
})(window);