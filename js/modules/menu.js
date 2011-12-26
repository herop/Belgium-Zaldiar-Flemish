(function (global) {
	"use strict";
	function Menu(presentation) {
		this.self = 'menu';
		this.links = [];
		this.presentation = presentation;
		this.active = true;
		Menu.superclass.constructor.call(this, document.createElement('menu'));
	}
	$.extend(Menu, Component);
	Menu.prototype.init = function () {
		var that = this, homeChapterIndex;
		this.scrollElement = document.createElement('scroll');
		this.presentation.collection.forEach(function (chapter, index) {
			var li = document.createElement('li');
			li.innerText = chapter.name;
			if (chapter.element.hasAttribute('role')) {
				li.setAttribute('role', chapter.element.getAttribute('role'));
				if (chapter.element.getAttribute('role') === 'home') {
					homeChapterIndex = index;	
				}
			}
			this.scrollElement.appendChild(li);
			this.links.push(li);
			li.addEventListener('shorttouch', function (e) {
				e.preventDefault();
                if (that.active) {
					if (that.presentation.collection[that.presentation.currentItemIndex] !== chapter) {					
						that.presentation.selectItem(chapter);
						that.selectItem(index);
					}
                }
			}, false);
			li = null;
		}, this);
		this.element.appendChild(this.scrollElement);
		this.scroll = $.createScroll(this.scrollElement, 'momentum');
		this.selectItem(this.presentation.currentItemIndex);
		this.presentation.element.appendFirstChild(this.element);
		this.scroll.refresh();
		if (homeChapterIndex) {
			this.presentation.selectItem(homeChapterIndex);
			this.selectItem(homeChapterIndex);
		}
	};
	Menu.prototype.selectItem = function (index) {
		if ((typeof index !== 'number') || !(this.active)) {
			return;
		}
		var prev = this.element.querySelector('scroll>.active');
		if (prev) {
			prev.removeClass('active');
		}
		this.links[index].addClass('active');
		prev = null;
		this.scroll.scrollToElement(this.links[index], '400ms');
	};
    Menu.prototype.activize = function (index) {
        this.active = true;
    };
    Menu.prototype.deactivize = function (index) {
        this.active = false;
    };
	Menu.prototype.onchapterenter = function (data) {
		if (this.presentation.visible) {
			this.selectItem(data.index);
		}
	};
	if (global.modules) {
		global.modules.add(Menu, 'presentationcreate');
	}
})(window);