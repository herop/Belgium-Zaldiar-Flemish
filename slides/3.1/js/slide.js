(function(){
	document.querySelectorAll('#slide31 .reference-list li').forEach(function(reference){
		var pdf = reference.getAttribute('pdf');
		reference.addEventListener('shorttouch', function(){
			openPDF(pdf);
		});
	});
})();