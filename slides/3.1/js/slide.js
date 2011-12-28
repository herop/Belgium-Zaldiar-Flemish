(function(){
	var scroll_element = document.querySelector('#slide31 .reference-list ul'),
		scrol_element_wrapper = scroll_element.parentNode,
		scroller = $.createScroll(scroll_element, 'momentum'),
		max_scroll_time = 10000,//time to scroll all list
		cicle_timeout, global_timeout,
		startScroller = function(){
			var translate = /^translate3d\(0px, ([\-0-9\.]+)px, 0px\)/g.exec(scroll_element.style.webkitTransform),
				offset = max_scroller_offset = scroll_element.offsetHeight - scrol_element_wrapper.offsetHeight,
				time = max_scroll_time;

			translate = parseInt(translate[1], 10);
			time = (max_scroller_offset + translate) / max_scroller_offset * max_scroll_time;
			time = time == 0 ? max_scroll_time : time;
			offset = max_scroller_offset != Math.abs(translate) ? -offset : 0;

			scroll_element.style.webkitTransitionDuration = time+'ms';
			scroll_element.style.webkitTransform = 'translate3d(0,'+offset+'px,0)';
			cicle_timeout = setTimeout(function(){
				clearTimeout(cicle_timeout);
				startScroller();
			}, time);
		},
		stopScroller = function(){
			clearTimeout(cicle_timeout);
			clearTimeout(global_timeout);
		};

	scroll_element.addEventListener($.events.start, stopScroller);
	scroll_element.addEventListener($.events.end, function(){
		global_timeout = setTimeout(function(){
			clearTimeout(global_timeout);
			startScroller();
		}, 5000);//wait time for auto scroll
	});

	document.querySelector('#slide31').slide.addInsideObject({
		enter: function(){
			scroller.refresh();
			startScroller();
		},
		leave: function(){
			stopScroller();
			scroll_element.style.webkitTransitionDuration = '0s';
			scroll_element.style.webkitTransform = 'translate3d(0,0,0)';
		}
	});
})();