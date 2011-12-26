(function (global) {
	"use strict";
	var projectConfig = {
		initialConstructor: Presentation,
		initialElementQuery: 'presentation',
		slidesFilesQuery: 'slides/%slidename%/index.html',
		slidesJSQuery: 'slides/%slidename%/js/slide.js',
		slidesCSSQuery: 'slides/%slidename%/css/slide.css',
		slidesJSON: 'slides/slides.json',
		slidesBackJSON: 'slides/slides-back.json'
	};
	function SlideFactory(max) {
		this.slides = [];
		this.max = max || 0;	
	}
	SlideFactory.prototype.load = function (name) {
		var that = this,
			xhr = new XMLHttpRequest(),
			filename = projectConfig.slidesFilesQuery.replace('%slidename%', name);
		xhr.open('GET', filename, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				var body = xhr.responseText;
				if (/<body>/g.test(body)) {
					body = /<body>([\d\w\s\S]+)<\/body>/g.exec(body)[1];
				}
				that.slides.push({
					name: name,
					body: body,
					js: projectConfig.slidesJSQuery.replace('%slidename%', name),
					css: projectConfig.slidesCSSQuery.replace('%slidename%', name)
				});
				if (that.max === that.slides.length && that.onfinish) {
					that.onfinish(that.slides);
				}
			}
		};
		xhr.send(null);	
	};
	function ContentFactory(filename) {
		this.file = filename;
		this.load();
	}
	ContentFactory.prototype.load = function () {
		var that = this,
			slidesList = new SlideFactory(),
			slideshow,
			xhr = new XMLHttpRequest();
		slidesList.onfinish = function (slides) {
			that.build(slides, slideshow);	
		};
		xhr.open('GET', this.file, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				var json = JSON.parse(xhr.responseText);
				slideshow = json;
				slidesList.max = json.slides.length;
				json.slides.forEach(function (name) {
					slidesList.load(name);
				});
			}
		};
		xhr.send(null);
	};
	ContentFactory.prototype.build = function (slides, slideshow) {
		var presentation = document.createElement('presentation'),
			styleElement = document.createElement('style'),
			cssImport = '', 
			head = document.getElementsByTagName('head')[0];
		if (slideshow.id) {
			presentation.setAttribute('id', slideshow.id);
		}
		presentation.setAttribute('name', slideshow.name);
		slideshow.chapters.forEach(function (iChapter) {
			var chapter = document.createElement('chapter'),
				scroll = document.createElement('scroll'),
				scrollInner = '';
			if (iChapter.id) {
				chapter.setAttribute('id', iChapter.id);
			}
			if (iChapter.name) {
				chapter.setAttribute('name', iChapter.name);
			}
			if (iChapter.role) {
				chapter.setAttribute('role', iChapter.role);
			}
			iChapter.slides.forEach(function (iSlide) {
				var neededSlide = slides.filter(function (slide) { return slide.name === iSlide; });
				if (neededSlide) {
					scrollInner += neededSlide[0].body;	
				}
			});
			scroll.innerHTML = scrollInner;
			chapter.appendChild(scroll);
			presentation.appendChild(chapter);
		});
		document.body.appendChild(presentation);
		slides.forEach(function (slide) {
			var script = document.createElement('script');
			cssImport += '@import "' + slide.css + '";';
			script.src = slide.js;
			head.appendChild(script);
		});
		styleElement.innerHTML = cssImport;
		head.appendChild(styleElement);
		global.mediator.broadcast('contentload');
	};
	function ProjectFactory() {
		global.mediator.addComponent(this);
	}
	ProjectFactory.prototype.oncontentload = function () {
		if (!projectConfig.initialConstructor) {
			throw new Error('unable to create project');	
		}
		var elementsCollection = document.querySelectorAll(projectConfig.initialElementQuery),
			firstElement;
		if (elementsCollection) {
			elementsCollection.forEach(function (element) {
				var newComponent = new projectConfig.initialConstructor(element);
				if (!firstElement) {
					firstElement = newComponent;
				}
			});
		}
		if (!firstElement.visible) {
			firstElement.show();
		} else {
			firstElement.enter();
		}
	};
	global.project = new ProjectFactory();
	new ContentFactory(/back/.test(document.location.pathname) ? projectConfig.slidesBackJSON : projectConfig.slidesJSON);
})(window);
/* FIX: ugly default scrolling */
document.ontouchstart = document.ontouchmove = function (e) {
	e.preventDefault();
};