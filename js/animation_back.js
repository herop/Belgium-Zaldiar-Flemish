animation.create('#betereGiTolerantieDanTramadol_Back bar',{
	properties:{height:'attr'},
	delay:[0, 200, 200, 200, 200, 200, 200, 200],
	duration:400
});
animation.create('#slide50 .graph .orange-line', {
	properties:{opacity:1},
	delay:['click'],
	duration:1000,
	dispatch: 'eventSlide50FirstClick'
});
animation.create('#slide50 .graph .gray-lines, #slide50 .graph .yellow-line, #slide50 .graph ul', {
	properties:{opacity:1},
	delay:['click', 1000, 1000],
	queue:[1, 0, 2],
	duration:1000,
	waitfor: 'eventSlide50FirstClick'
});