(function (global) {
	"use strict";
	var isTouch = window.hasOwnProperty('ontouchstart'),
		events = {
			start: isTouch ? 'touchstart' : 'mousedown',
			move: isTouch ? 'touchmove' : 'mousemove',
			end: isTouch ? 'touchend' : 'mouseup'
		},
		eventsList = ['shorttouch', 'longtouch', 'swipeleft', 'swiperight', 'swipeup', 'swipedown'],
		customEvents = {},
		onStart = function (event) {
			var startTime = new Date().getTime(),
				touch = isTouch ? event.touches[0] : event,
				startX, startY,
				onEnd = function (event) {
					var endX, endY, diffX, diffY, 
						elem = event.target,
						endTime = new Date().getTime(),
						timeDiff = endTime - startTime,
						customEvent;
					touch = isTouch ? touch : event;
					endX = touch.clientX;
					endY = touch.clientY;
					diffX = endX - startX;
					diffY = endY - startY;
					if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
						elem.dispatchEvent(customEvents[timeDiff <= 500 ? 'shorttouch' : 'longtouch']);
					} else if (timeDiff < 500) {
						customEvent = 'swipe' + (Math.abs(diffX) >= Math.abs(diffY) ? diffX > 0 ? 'right' : 'left' : diffY > 0 ? 'down' : 'up');
						elem.dispatchEvent(customEvents[customEvent]);
					}
					document.removeEventListener(events.end, onEnd, false);
				};
			startX = touch.clientX;
			startY = touch.clientY;
			document.addEventListener(events.end, onEnd, false);
			
		},
		b = function (elem, event, func, multiple, type) {
			multiple = multiple || false;
			var elements = multiple ? $.getHTMLElements(elem) : $.getHTMLElement(elem), touch;
			if (!elements && typeof elem === 'array' && elem.every(function (e) { return e instanceof HTMLElement; })) {
				elements = elem;
				multiple = true;
			}
			touch = /touch(start|move|end)/i.exec(event);
			if (touch) {
				event = events[touch[1]];
			}
			if (!multiple) {
				elements = [elements];
			}
			elements.forEach(function (element) {
				element[type + 'EventListener'](event, func, false);
			});
		},
		bind = function (elem, event, func, multiple) {
			b.call(this, elem, event, func, multiple, 'add');
		},
		unbind = function (elem, event, func, multiple) {
			b.call(this, elem, event, func, multiple, 'remove');
		};
	eventsList.forEach(function (evt) {
		customEvents[evt] = document.createEvent('UIEvents');
		customEvents[evt].initEvent(evt, true, true);
	});
	function EventFactory() {
		global.mediator.addComponent(this);
	}
	EventFactory.prototype.onpresentationcreate = function (presentation) {
		presentation.element.querySelectorAll('scroll>*').forEach(function (elem) {
			elem.addEventListener(events.start, onStart, false);
		});
		document.querySelector('nav').addEventListener(events.start, onStart, false);
	};
	global.$.isTouch = isTouch;
	global.$.events = events;
	global.$.bind = bind;
	global.$.unbind = unbind;
	if (global.modules) {
		global.modules.add(EventFactory, 'initial');
	}
})(window);