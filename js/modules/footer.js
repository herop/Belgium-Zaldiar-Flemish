(function (global) {
	"use strict";
	function Footer(chapter) {
		this.self = 'footer';
		this.chapter = chapter;
		Footer.superclass.constructor.call(this, document.createElement('footer'));
	}
	$.extend(Footer, Component);
	Footer.prototype.init = function () {
		this.chapter.element.appendChild(this.element);
	};
	if (global.modules) {
		global.modules.add(Footer, 'chaptercreate');	
	}
})(window);