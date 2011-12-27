(function(){
	var scroller = $.createScroll(document.querySelector('#references ol'), 'momentum');
	document.querySelector('#referencesSlide').slide.addInsideObject({
		enter: function(){
			scroller.refresh();
		}
	});
})();