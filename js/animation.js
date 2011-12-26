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
animation.create('#yellow_1 ul li',{
		properties:{opacity:1},
		delay:[300,250,250],
		duration:200,
		dispatch:'eventManLiAppear'});		
animation.create('#yellow_0 .flyman-block .manLines',{
		properties:{opacity:1},
		delay:[280],
		duration:150,
		waitfor:'eventManFlied'});

animation.create('#slide3_2 ul li',{
	properties:{opacity:1},
	delay:[400],
	duration:400
});
/*
animation.create('#slide30 ul li',{
		properties:{opacity:1},
		delay:[400, 800, 800],
		duration:400
});*/