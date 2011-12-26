(function (global) {
	"use strict";
	function Component(elem) {
		if (!this.self) {
			this.self = 'component';
		}
		this.element = $.getHTMLElement(elem);
		this.element[this.self] = this;
		this.name = this.element.getAttribute('name') || "untitled";
		this.id = this.element.getAttribute('id');
		this.visible = true;
		if (this.init) {
			this.init();
		}
		global.mediator.addComponent(this);
		global.mediator.broadcast(this.self + 'create', this);
	}
	Component.prototype.getName = function () {
		return this.name;
	};
	Component.prototype.getId = function () {
		return this.id;
	};
	Component.prototype.show = function () {
		this.element.removeClass('hide');
		this.visible = true;
	};
	Component.prototype.hide = function () {
		this.element.addClass('hide');
		this.visible = false;
	};
	Component.prototype.leave = function () {
		global.mediator.broadcast(this.self + 'leave', this);
	};
	Component.prototype.enter = function () {
		global.mediator.broadcast(this.self + 'enter', this);
	};
	function Container(elem) {
		this.collection = [];
		this.currentItemIndex = 0;
		Container.superclass.constructor.call(this, elem);
	}
	$.extend(Container, Component);
	Container.prototype.selectItem = function (index) {
		var visibleCollection, stringIndex;
		this.lastItemIndex = this.currentItemIndex;
		visibleCollection = this.collection.filter(function (item) { return item.visible; });
		stringIndex = function (index) {
			switch (index) {
			case 'prev':
				this.currentItemIndex = this.currentItemIndex >= 1 ? this.currentItemIndex - 1 : 0;
				break;
			case 'next':
				this.currentItemIndex = this.currentItemIndex < visibleCollection.length - 1 ? this.currentItemIndex + 1 : this.currentItemIndex;
				break;
			case 'last':
				this.currentItemIndex = visibleCollection.length - 1;
				break;
			case 'first':
				this.currentItemIndex = 0;
				break;
			default:
				var collectionById = visibleCollection.filter(function (item) { return item.id === index; });
				if (collectionById) {
					this.currentItemIndex = collectionById[0].index;
				}
			}
		}.bind(this);
		switch (typeof index) {
		case 'string':
			stringIndex(index);
			break;
		case 'number':
			if (index > visibleCollection.length - 1 || index < 0) {
				return;
			}
			this.currentItemIndex = index;
			break;
		case 'object':
			visibleCollection.forEach(function (item, i) {
				if (item === index) {
					this.currentItemIndex = i;
				}
			}, this);
			break;
		}
		visibleCollection[this.lastItemIndex].leave();
		visibleCollection[this.currentItemIndex].enter();
		if (this.viewSelectItem) {
			this.viewSelectItem(this.lastItemIndex, this.currentItemIndex);
		}
		visibleCollection = null;
		return this.collection[this.currentItemIndex];
	};
	function InsideObjects() {
		this.insideObjects = [];
	}
	InsideObjects.prototype.addInsideObject = function (obj) {
		if (typeof obj !== 'object' && typeof obj !== 'array' && this.insideObjects.some(function (o) { return o === obj; })) {
			return;
		}
		if (!this.insideObjects) {
			this.insideObjects = [];
		}
		if (typeof obj === 'object') {
			this.insideObjects.push(obj);
		} else {
			obj.forEach(function (o) { this.insideObjects.push(o); }, this);
		}
	};
	InsideObjects.prototype.removeInsideObject = function (obj) {
		this.insideObjects = this.insideObjects.filter(function (o) { return o !== obj; });
	};
	InsideObjects.prototype.leave = function () {
		global.mediator.broadcast(this.self + 'leave', this);
		if (this.insideObjects) {
			this.insideObjects.forEach(function (obj) {
				if (obj.leave) {
					obj.leave();
				}
			});
		}
	};
	InsideObjects.prototype.enter = function () {
		global.mediator.broadcast(this.self + 'enter', this);
		if (this.insideObjects) {
			this.insideObjects.forEach(function (obj) {
				if (obj.enter) {
					obj.enter();
				}
			});
		}
	};
	function ModuleEvents() {  }
	ModuleEvents.prototype.onslidehide = function (slide) {
		if (!this.ownSlide(slide)) {
			return;
		}
		try {
			this.collection[slide.index].hide();
		} catch (e) {
			this.collection[slide.index].addClass('hide');
		}
		this.selectItem(this.chapter.currentItemIndex);
	};
	ModuleEvents.prototype.onslideshow = function (slide) {
		if (!this.ownSlide(slide)) {
			return;
		}
		try {
			this.collection[slide.index].show();
		} catch (e) {
			this.collection[slide.index].removeClass('hide');
		}
		this.selectItem(this.chapter.currentItemIndex);
	};
	ModuleEvents.prototype.onslideenter = function (slide) {
		if (!this.ownSlide(slide)) {
			return;
		}
		this.selectItem(slide.index);
	};
	ModuleEvents.prototype.ownSlide = function (slide) {
		return this.chapter.collection.some(function (item) { return item === slide; });
	};
	var Interface = {};
	Interface.InsideObjects = InsideObjects;
	Interface.ModuleEvents = ModuleEvents;
	global.Component = Component;
	global.Container = Container;
	global.Interface = Interface;
})(window);