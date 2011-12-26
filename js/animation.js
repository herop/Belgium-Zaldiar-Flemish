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
		properties:{transform:animation.translate(200).set()},
		delay:[100],
		duration:400,
		dispatch:'eventManFlied'});
		
animation.create('#yellow_0 .flyman-block .manLines',{
		properties:{opacity:1},
		delay:[500],
		duration:200,
		waitfor:'eventManFlied'});