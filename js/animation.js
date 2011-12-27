animation.create('#evenDoeltreffendAlsTramadol bar',{
	properties:{width:'attr'},
	delay:[0, 800],
	duration:800,
	dispatch:'evenDoeltreffendAlsTramadol'}
);
animation.create('#betereGiTolerantieDanTramadol bar',{
		properties:{height:'attr'},
		delay:['click', 200, 200, 200, 200, 200, 200, 200],
		duration:400,
		waitfor:'evenDoeltreffendAlsTramadol'});
		
animation.create('#yellow_0 .flyman-block .manFleing',{
		properties:{transform:animation.translate(0,0).set()},
		delay:[100],
		duration:300,
		dispatch:'eventManFlied'});
animation.create('#yellow_0 .flyman-block .manLines',{
		properties:{opacity:1},
		delay:[280],
		duration:150,
		waitfor:'eventManFlied'});

animation.create('#yellow_1 ul li',{
		properties:{opacity:1},
		delay:[300,250,250],
		duration:200,
		dispatch:'eventManLiAppear'});		
animation.create('#yellow_3 .animation-block .man2Fly',{
		properties:{transform:animation.translate(0,0).set()},
		delay:[100],
		duration:300,
		dispatch:'eventManFliedSlide3'});
animation.create('#yellow_3 .animation-block .tablet60',{
		properties:{opacity:1},
		delay:[350],
		duration:250,
 	    dispatch:'eventManFliedSlide3H2',
		waitfor:'eventManFliedSlide3'});
animation.create('#yellow_3 h2',{
		properties:{opacity:1},
		delay:[400],
		duration:200,
		waitfor:'eventManFliedSlide3H2'});
animation.create('#yellow_3 .arrows',{
		properties:{opacity:1},
		delay:[550],
		duration:200,
		waitfor:'eventManFliedSlide3H2'});

animation.create('#slide3_2 ul li',{
	properties:{opacity:1},
	delay:[400],
	duration:400
});
animation.create('#slide3_3 .tweener',{
	properties:{opacity:1},
	/*queue:[1,3,4,2],*/
	delay:[400],
	duration:400
});
/*
animation.create('#slide30 ul li',{
		properties:{opacity:1},
		delay:[400, 800, 800],
		duration:400
});*/