(function(){
	var scroller = $.createScroll(document.querySelector('#slide31 .reference-list ul'), 'momentum');
	document.querySelector('#slide31').slide.addInsideObject({
		enter: function(){
			scroller.refresh();
		}
	});
})();