(function (global) {
	"use strict";
	function Monitoring() {
		this.currentSlide = null;
		this.currentChapter = null;
		this.pdfPath = 'pdf/';
		global.mediator.addComponent(this);
		global.mediator.broadcast('monitoringcreate', this);
	}
	Monitoring.prototype.onslidecreate = function (slide) {
		var that = this,
			links = slide.element.querySelectorAll('[pdf]');
		if (links) {
			$.bind(links, 'shorttouch', function () {
				openPDF(that.pdfPath + this.getAttribute('pdf'));
			}, true);
		}
	};
	Monitoring.prototype.onchapterenter = function (chapter) {
		this.currentChapter = chapter;
	};
	Monitoring.prototype.onslideenter = function (slide) {
		submitSlideEnter(slide.getId(), slide.getName(), slide.index + 1, this.currentChapter.getName());
		this.currentSlide = slide;
	};
	if (config.monitoring && global.modules) {
		global.modules.add(Monitoring, 'initial');
	}
})(window);
if (!openPDF) {
	var openPDF = function () { throw new Error('openPDF is not defined'); };
}
if (!submitCustomEvent) {
	var submitCustomEvent = function () { throw new Error("submitCustomEvent is not defined"); };
}
if (!submitSlideEnter) {
	var submitSlideEnter = function () { throw new Error("submitSlideEnter is not defined"); };
}
openPDF = (function (openPDF) {
	return function (pdf) {
		try { 
			openPDF.apply(this, arguments);
			submitDocumentOpen(arguments[0], arguments[0]);
		} catch (e) { /*console.log('openPDF',arguments);*/ }
	};
})(openPDF);
submitCustomEvent = (function (submitCustomEvent) {
	return function () {
		try {
			submitCustomEvent.apply(this, arguments);
		} catch (e) { /*console.log('submitCustomEvent',arguments);*/ }
	};
})(submitCustomEvent);
submitSlideEnter = (function (submitSlideEnter) {
	return function () {
		try {
			submitSlideEnter.apply(this, arguments);
		} catch (e) { /*console.log('submitSlideEnter',arguments);*/ }	
	};
})(submitSlideEnter);