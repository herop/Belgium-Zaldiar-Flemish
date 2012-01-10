animation.create('#evenDoeltreffendAlsTramadol bar',{
	properties:{width:'attr'},
	delay:[0, 800],
	duration:800,
	dispatch:'evenDoeltreffendAlsTramadol'}
);
animation.create('#betereGiTolerantieDanTramadol bar',{
	properties:{height:'attr'},
	delay:[200, 200, 200, 200, 200, 200, 200, 200],
	duration:400,
	waitfor:'evenDoeltreffendAlsTramadol',
	dispatch:'betereGiTolerantieDanTramadol'}
);
animation.create('#betereGiTolerantieDanTramadol .markers',{
	properties:{opacity:1},
	delay:[0],
	duration:800,
	waitfor:'betereGiTolerantieDanTramadol'}
);
animation.create('#yellow_0 .flyman-block',{
		properties:{transform:animation.translate(0,0).set()},
		delay:[100],
		duration:300,
		dispatch:'eventManFlied'});
animation.create('#yellow_0 h2',{
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
/*animation.create('#yellow_3 h2',{
		properties:{opacity:1},
		delay:[400],
		duration:200,
		waitfor:'eventManFliedSlide3H2'});*/
animation.create('#slide3_2 ul li',{
	properties:{opacity:1},
	delay:[400],
	duration:400
});
animation.create('#slide3_3 .tweener',{
	properties:{opacity:1},
	delay:[800],
	queue:[0,2,1],
	duration:600
});
animation.create('#slide30 ul li',{
		properties:{opacity:1},
		delay:[400, 800, 800],
		duration:400
});
animation.create('#slide-1_0 .tween',{
    properties:{opacity:1},
    delay:['click'],
    duration:1000
});
animation.create('#slide-1_1 .topBlock',{
    properties:{opacity:1},
    delay:[0],
    duration:500
});
animation.create('#slide-1_1 p',{
    properties:{opacity:1},
    delay:['click'],
    duration:500
});
animation.create('#slide-1_2 .tween',{
    properties:{opacity:1},
    delay:[800],
	queue:[0,2,1],
    duration:600
});
animation.create('#slide-1_2 .tab60',{
    properties:{opacity:1},
    delay:[500],
    duration:500
});
animation.create('#slide-1_2 .tab20',{
    properties:{opacity:1},
    delay:[1000],
    duration:500
});
animation.create('#slide-1_2 .yellowRect',{
    properties:{opacity:1},
    delay:[1500],
    duration:500
});

animation.create('#up_3 .resume',{
	properties:{opacity:1},
	delay:['click'],
	duration:1000
});

/*animation.create('#slide-2_2 .manBlock',{
	handler:'#slide-2_2 ul li:nth-of-type(2)',*/

animation.create('#slide-2_2 .tween',{
	properties:{opacity:1},
	delay:['click',0],
	duration:500
});
animation.create('#meerPijnverlichtingBijPatientenMetPijn bar',{
	properties:{height:'attr'},
	delay:[0],
	duration:800,
	dispatch:'meerPijnverlichtingBijPatientenMetPijn'}
);
animation.create('#meerPijnverlichtingBijPatientenMetPijn .bargroup num',{
	properties:{opacity:1},
	delay:[0],
	duration:800,
	waitfor:'meerPijnverlichtingBijPatientenMetPijn'}
);