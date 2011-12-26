(function(global){
	var Tweener, Tween, AnimationFactory,
		tweener, tween, animationfactory;
/*-----TWEENER-----*/	
	Tweener = function(element,options){
		var that = this;
		that.steps			= $.getHTMLElements(element);
		that.delays			= [];
		that.options		= options;
		that.current		= 0;
		that.waitForClick	= false;
		
		that.init(that);
	}

	tweener = Tweener.prototype; 
		
	tweener.init = function(that){
		that.defineOptions(that);
		that.handler 	= that.initializeHandler(that);
		that.steps 		= that.initializeSteps(that);
	};
	tweener.initializeHandler = function(that){
		var handler;
		
		if(that.options.handler){ //if handler is set in options ? get it
			handler = $.getHTMLElement(that.options.handler);
				
			$.bind(handler, that.event.end, function(){
				that.play(that, 0)
			}); 
		}
		else{ //default ? get parent slide as handler
			handler = parent(that.steps[0]);
				
			if(!that.options.waitfor){
				that.enter = function(){
					that.options.delay[0] !== 'click' ? that.play(that, that.current) : 0;
				};
				$.bind(handler, $.events.end, function(){
					if(that.waitForClick === true){
						that.play(that, that.current);
						that.waitForClick = false;
					}
				}); 
			};
		};
		return handler;
	},
		/*  STEPS  */
	tweener.initializeSteps = function(that){
		var options,tempStepsArray,steps,clonedProperties;
			
		options 		= that.options;
		tempStepsArray 	= [];//temporary array for tween objects
		steps 			= that.steps;
			
		that.has.textmode(that);
		clonedProperties = $.clone(options.properties);
			//------
		function fill(array, length){
			if(array === undefined){return};
			var j, result, loop_length;
			
			j		 	= 0;
			result 		= [];
			loop_length = array.length - 1;
				
			array.forEach(function(a){result.push(a)})
			for(var i = 0; i < length ; i++){
				j > loop_length ? j = 0 : 0;
				result[i] = array[j];
				j++;
			}
			return result;
		};
		n = 0;
		if(options.queue){
			var tArray = [];
			options.queue.forEach(function(o){
				tArray.push(steps[o])
			});
			steps = tArray;
		};
		//-----------------------------------
		steps.forEach(function(step, i){ //converting array of HTML elements to array of Tween objects
		var newOptions,newProperties;
			newOptions 		= $.clone(options);
			newProperties 	= newOptions.properties;
			var maxArray = [];
			
			for(property in clonedProperties){
				maxArray.push(clonedProperties[property].length || 0);
			};
			var max = arrayMax(maxArray);
			for(prop in clonedProperties){
				var property = clonedProperties[prop];
				if(property.constructor.name === 'Array'){ //for multiple input values
					n >= max ? n = 0 : 0 //check for current array item. If input array length is smaller than step`s array then it should implement in cycle
			    	property = fill(property, max);
			     	options.queue ? newProperties[prop] = property[options.queue[i]] : newProperties[prop] = property[n];
	  			}else if(property.constructor.name === 'String' && property === 'attr'){
	  				n >= max ? n = 0 : 0 //check for current array item. If input array length is smaller than step`s array then it should implement in cycle
  					
				  	var values = [];
				  	steps.forEach(function(s){
				  		values.push(s.getAttribute(prop))
				  	})
	  				
					property = fill(values, max);
			     	options.queue ? newProperties[prop] = property[options.queue[i]] : newProperties[prop] = property[n];
	  			};
		 	}
			if(options.value){ //cause creating a label with value
				newOptions.value = options.value[i];
			};
			that.delay = that.set.delay(that, i);
			newOptions.delay = that.delay //+ 'ms';
			
			var tween = new Tween(step,newOptions);
			tempStepsArray.push(tween);
			n++;
		});
		for(f in that.has){
			that.has[f](that, tempStepsArray)
		}
		tempStepsArray.forEach(function(step, _index){
			if(_index > tempStepsArray.length - 2){
				return;
			}
			tempStepsArray[_index].item.addEventListener('webkitTransitionStart',function(){
				if(tempStepsArray[_index + 1].delay === 'click'){
					that.waitForClick = true;
					return;
				}else{
					that.play(that, _index+1);
				}
			})
		})
		return tempStepsArray;
	},
		/*  START ANIMATION  */
	tweener.play = function(that, index){
		if(that.current > that.steps.length - 1){
			return;
		};
		if(that.steps[index].delay === 'click' && that.waitForClick !== true){
			that.waitForClick = true;
			return;
		}
		step = that.steps[index];
		step.play(step);
		that.current++;
	},
		/*  CLEAR  */
	tweener.clear = function(that){
		that.steps.forEach(function(step){step.clear(step);});
		that.current = 0;
	},
		/*  DEFINE OPTIONS  */
	tweener.defineOptions = function(that){//setting options
		var options = that.options;
			
		options.duration 	= (options.duration || 400) + 'ms';
		options.ease 		= options.ease || 'easein';
		options.delay		= [options.delay || '400']
	},
	tweener.leave = function(){
		this.clear(this);
	},
	tweener.enter = function(){}
	tweener.set = {
		delay:function(that, index){
			var delay;
			delay 	= that.options.delay[0];
			that.delays[0] === undefined ? that.delays = set() : 0;
			
			return that.delays[index];
			function set(){
				var max, type, array; 
				max		= that.steps.length;
				type 	= delay.constructor.name;
				array	= [];
				switch (type){
					case 'Array':
						var n = 0;
						
						for(var i = 0; i < max; i++){
							n > delay.length - 1 ? n = 0 : 0
							var node = delay[n];
							node.constructor.name !== 'String' ? node : 0; 
							array.push(node);
							n++;
						};
					break;
				};
				return array;
			}
		}
	}	
		/*  Service Functions  */
	tweener.has = {
			//------------//
		dispatch:function(that, tempStepsArray){
			var last, event, options;
			
			options = that.options;
				
			if(options.dispatch){ //set custom event for animation end. Helpful to cause different reactions between animations
				last 	= tempStepsArray[tempStepsArray.length - 1].item;
				event 	= options.dispatch;
				
				last.event = document.createEvent('UIEvents');
				last.event.initEvent(event, true, true);
				$.bind(last,'webkitTransitionEnd',function(e){
					e.currentTarget.dispatchEvent(e.currentTarget.event);
				});
			};
		},
			//------------//
		textmode:function(that, tempStepsArray){
		var string, lettersArray, options, steps;
				
			options = that.options;
			
			if(options.textmode === true){//let you to animate word letters as single objects
					
				string 			= steps[0].innerHTML;
				lettersArray 	= [];
				steps 			= that.steps; 
				
				for(var i = 0; i < string.length; i++){//letter`s array from word
					lettersArray.push(string[i]);
				};
				steps[0].innerHTML = '';
				lettersArray.forEach(function(l){//slicing word to letters and creating step array
					var letterElement;
						
					letterElement = document.createElement('div');
					letterElement.innerHTML = l;
					letterElement.style.display = 'inline-block';
					
					tempStepsArray.push(letterElement);
					steps[0].appendChild(letterElement);
				})
				steps = tempStepsArray;
			};
		},
			//------------//
		waitfor:function(that, tempStepsArray){
			var options;
			options = that.options;
			if(options.waitfor){
				$.bind(that.handler, options.waitfor, function(){
					that.play(that, 0);
				});
				$.bind(that.handler, $.events.end, function(){
					if(that.waitForClick === true){
						that.play(that, that.current);
						that.waitForClick = false;
					}
				});
			};
		}
	}

/*-------------------------*/
	Tween = function(element,options){ //single animation object
		var that = this;
		
		that.item 		= element;
		that.options 	= options;
		
		that.build(that);
	}
	tween = Tween.prototype; 
		
	tween.build = function(that){
		var properties, css, options;
				
		properties 	= that.options.properties;
		css 		= {reset:{}};//object with CSS properties and clearing data
		reset		= css.reset;
		options 	= that.options;
		that.delay 	= options.delay;
		
		for(prop in properties){
			var property, cssProperty;
				
			property 	= properties[prop];
			cssProperty = that.CSS[prop];
			
			(property === 'initial') ? property = getComputedStyle(that.item)[cssProperty] : 0; //getting property value from CSS file
			(that.cssNumber[prop] !== undefined) ? reset[cssProperty] = 0 : reset[cssProperty] = '';//set zero values depending to property value type
			css[cssProperty] = property;
		};
			//animation properties
		css[that.CSS.duration] 	= options.duration;
		css[that.CSS.ease] 		= options.ease;
			//css[that.CSS.delay] 	= options.delay;
			
		reset[that.CSS.duration] = reset[that.CSS.ease] = '' 
			//reset[that.CSS.delay] = '';
			
		that.css = css;
			
		if(options.reverse === true){//reverse ? play animation from start to end to start
			$.bind(that.item,'webkitTransitionEnd',function(){
				that.revert(that);
			})
		};
			
		if(options.value){//create label with value
			var label;
				
			label = document.createElement('span');
			label.innerHTML = options.value;
				
			that.item.appendChild(label)
		}
		that.clear(that);
	}
		//playback implementation
	tween.play = function(that){
		var startEvent, css; 
		startEvent = document.createEvent('UIEvents');
		css = that.item.style;
		
		startEvent.initEvent('webkitTransitionStart', false, false);
		
		that.timer = setTimeout(function(){
			for(property in that.css){
				css[property] = that.css[property];
			};
			that.item.dispatchEvent(startEvent)
		}, that.delay);
	}
	tween.revert = function(that){
		var css = that.item.style;
		for(property in that.css.reset){
			(property === that.CSS.duration || property === that.CSS.ease) ? (css[property] = css[property]) : (css[property] = that.css.reset[property]) 
		};
		css[that.CSS.delay] = '';
	}
	tween.clear = function(that){
		for(property in that.css.reset){
			that.item.style[property] = that.css.reset[property];
		};
		clearTimeout(that.timer)
	},
	tween.CSS = {//CSS properties dictionary
		duration:	'webkitTransitionDuration',
		ease:		'webkitTransitionTimingFunction',
		delay:		'webkitTransitionDelay',
		width:		'width',
		height:		'height',
		transform:	'webkitTransform',
		radius:		'borderRadius',
		origin:		'webkitTransformOrigin',
		background:	'background',
		color:		'color',
		opacity:	'webkitOpacity'
	},
		//properties types dictionaries
	tween.cssString = {
		transform:	'',
		color:		''
	},
	tween.cssNumber = {
		opacity:'',
		width:	'',
		height:	''
	}

/*  ANIMATION PARAMETERS  */
	/**/
	AnimationFactory = function(){
		var that = this;
		
		that.items = [];
		that.transform = [];
		
		global.mediator.addComponent(that);
		global.mediator.broadcast('animationFactoryCreate', that);
	};
	animationfactory = AnimationFactory.prototype;
	animationfactory.onslidecreate = function(slide){//creates Tweener objects declared in animation.js
		var that = this;
			
		that.items.forEach(function(item, i){
			if(parent($.getHTMLElements(item[0])[0]) === slide.element){//check for slide tweens
				var tweener;
				tweener = new Tweener(item[0],item[1]);
				slide.addInsideObject(tweener);
			}
		}, that)
	},
	animationfactory.onpopupcreate = function(slide){//creates Tweener objects declared in animation.js
		var that = this;
		that.items.forEach(function(item, i){
			if(parent($.getHTMLElements(item[0])[0]) === slide.element){//check for slide tweens
				var tweener;
				tweener = new Tweener(item[0],item[1]);
				slide.addInsideObject(tweener);
			}
		}, that)
	},
	animationfactory.create = function(){
		this.items.push(arguments);//get parameters for Tweener creation
	},
	animationfactory.array = function(value, initial){
		var result, that;
			
		result = [];
		that = this;
		switch (value.constructor.name){
			case 'Array':
				result = value;
			break;
			case 'Object':
				for (item in value){
					value[item] = that.array(value[item]);
					result.push(value[item])
				};
			break;
			default:
				result = [value]
			break
		}
		return result;
	};
	animationfactory.fill = function(array, length){
		if(array === undefined){return}
		if(array[0] === undefined){return array}

		var j, result, loop_length;
			
		j = 0;
		result = [];
		loop_length = array.length - 1;
		
		array.forEach(function(a){
			result.push(a)
		})
		for(var i = 0; i < length ; i++){
			j > loop_length ? j = 0 : 0;
			result[i] = array[j];
			j++;
		}
		
		return result;
	};
	animationfactory.adjust = function(value, max){
		var that, name;
			
		that = this;
		name = value.constructor.name;
			
		function set(node){
			if(node.length === 1){
				var def = node[0];
				for(i = 0; i < max; i++){
					node[i] = def;
				}
			}else{
				that.fill(node, max);
			}
		};
		switch(name){
			case 'Array':
				value.forEach(function(node){
					set(node);
				});
			break;
			case 'Object':
				for(node in value){
					if(value.hasOwnProperty(node)){
					set(value[node]);}
				};
			break
		};
	};
	animationfactory.compound = function(){
		var position, max, max_array, that, axis, args;
		that = this;
		axis = ['x', 'y', 'z']
		max_array = []
		position = {};
		args = that.array(arguments)
		args.forEach(function(item, i){
			position[axis[i]] = that.array(item, 0);
			max_array.push(position[axis[i]].length)
		})
		
		result = [];
		max = max_array.max();
			
		that.adjust(position, max);
		position.length = position.x.length;
			
		return position;
	};
	//creating CSS strings for animation parameters
	animationfactory.origin = function(point){
		point[1] ? 0 : (point[1] = point[0]);
		return point[0] + '% ' + point[1] + '%';
	};
	animationfactory.translate = function(x, y, z){
		var position, max, result, that, i, j;
		i = j = 0;
		that = this;
		x = x || 0; y = y || 0; z = z || 0;
		result = []
		position = that.compound(x,y,z)
		max = [
			position.x.length,
			position.y.length,
			position.z.length
		].max();
		that.transform = that.fill(that.transform, max);
		max = [max, that.transform.length].max()
		for(i; i < max; i++){
			var X, Y, Z; 
			j > position.length ? j = 0 : 0;
			X = (position.x[j] || 0) + 'px,';
			Y = (position.y[j] || 0) + 'px,';
			Z = (position.z[j] || 0) + 'px) ';
			j++;
			result[i] = (that.transform[i] || '') + 'translate3d(' + X + Y + Z;
		};
		that.transform = result;
		return that;
	};
	animationfactory.rotate = function(x, y, z){
			var position, max, result, that, i, j;
			i = j = 0;
			that = this;
			x = x || 0; y = y || 0; z = z || 0;
			result = []
			position = that.compound(x,y,z)
			max = [
				position.x.length,
				position.y.length,
				position.z.length
			].max();	
			that.transform = that.fill(that.transform, max);
			max = [max, that.transform.length].max()
			for(i; i < max; i++){
				var X, Y, Z;
				j > position.length ? j = 0 : 0;
				X = 'rotateX(' + (position.x[j] || 0) + 'deg) ';
				Y = 'rotateY(' + (position.y[j] || 0) + 'deg) ';
				Z = 'rotateZ(' + (position.z[j] || 0) + 'deg) ';
				
				result[i] = that.transform[i] + X + Y + Z;
				j++
			};
			that.transform = result;
			return that;
		},
	animationfactory.skew = function(x, y){
		var position, max, result, that, i, j;
		i = j = 0;
		that = this;
		x = x || 0; y = y || 0;
		result = []
		position = that.compound(x,y)
		max = [
			position.x.length,
			position.y.length
		].max();	
		that.transform = that.fill(that.transform, max);
		max = [max, that.transform.length].max()
		for(i; i < max; i++){
			var X, Y, Z;
			j > position.length ? j = 0 : 0;
			X = 'skewX(' + (position.x[j] || 0) + 'deg) ';
			Y = 'skewY(' + (position.y[j] || 0) + 'deg) ';
			result[i] = that.transform[i] + X + Y;
			j++
		};
		that.transform = result;
		return that;
	};
	animationfactory.scale = function(x, y){
		var position, max, result, that, i, j;
		i = j = 0;
		that = this;
		x = x || 1; y = y || x;
		result = []
		position = that.compound(x,y);
		max = [
			position.x.length,
			position.y.length
		].max();	
		that.transform = that.fill(that.transform, max);
		max = [max, that.transform.length].max();
		for(i; i < max; i++){
			var X, Y, Z;
			j > position.length ? j = 0 : 0;
			X = 'scale(' + (position.x[j] || 0) + ', ';
			Y = (position.y[j] || 0) + ') ';
			result[i] = that.transform[i] + X + Y;
			j++
		};
		that.transform = result;
		return that;
	};
	animationfactory.set = function(){
		return this.transform;
	},
	animationfactory.ease = {
		'default':	'default',
		linear:		'linear',
		'in':		'ease-in',
		out:		'ease-out',
		inOut:		'ease-in-out',
		cubic:		'cubic-bezier'
	},
	animationfactory.block = function(inputValue, inputUnit){
		var value, unit, result;
			
		inputUnit ? unit = inputUnit : unit = 'px';
		value = inputValue;
		result = [];
		
		(value && !value.length) ? (value = value + unit) : 0;
		
		if(value && value.length){
			value.forEach(function(item, i){
				value[i] = item + unit;
			});
		}
		else{
			value = 'initial';
		}
		value.forEach(function(item){
			result.push(item);
		})
		return result;
	};
	
	
	var	parent = function(o,tag,id,classes){
		var p = o.parentNode;
 		while(p){
			var isFind=true;
			if(isFind){isFind = p.tagName === ('SLIDE' || 'POPUP');}
			if(isFind && id){isFind = p.id === id;}
			if(isFind && classes){
				for(var i=0;i<classes.length;i++){
					isFind = p.hasClass(classes[i]);
				if(!isFind) break;
			}
		}
		if(isFind) break;
			p = p.parentNode;
		}
 		return p;
	}
	global.animation = new AnimationFactory();
	function arrayMax(array) {
		var max, len, i;
		
		max = array[0];
		len = array.length;
		i = 1
		for (i; i < len; i++){
			if (array[i] > max){
				max = array[i];
			}
			return max;
		}
	}
}(window))
/*  DICTIONARIES  */
	
	