document.getElementById('slide-1_2').slide.addInsideObject({
	leave:function(){document.getElementById('slide-1_2').removeClass('start-animation');},
	enter:function(){document.getElementById('slide-1_2').addClass('start-animation');}
});