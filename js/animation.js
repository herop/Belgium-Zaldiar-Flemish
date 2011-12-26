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
animation.create('#slide30 ul li',{
		properties:{opacity:1},
		delay:[400, 800, 800],
		duration:400
});