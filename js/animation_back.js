/*animation.create('#betereGiTolerantieDanTramadol_Back bar',{
	properties:{height:'attr'},
	delay:[0, 200, 200, 200, 200, 200, 200, 200],
	duration:400
});*/
animation.create('#slide50 .graph .orange-line, #slide50 .graph ul li:nth-of-type(2)', {
	properties:{opacity:1},
	delay:['click',0],
	duration:1000,
	dispatch: 'eventSlide50FirstClick'
});
animation.create('#slide50 .graph .gray-lines, #slide50 .graph .yellow-line, #slide50 .graph ul li:nth-of-type(1)', {
	properties:{opacity:1},
	delay:['click', 0, 0],
	queue:[1, 0, 2],
	duration:1000,
	waitfor: 'eventSlide50FirstClick'
});