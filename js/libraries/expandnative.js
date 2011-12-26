if (!Function.prototype.bind) {  
	Function.prototype.bind = function (oThis) {  
		if (typeof this !== "function") {  
			throw new TypeError();
		}  
		var fSlice = Array.prototype.slice,  
			aArgs = fSlice.call(arguments, 1),   
			fToBind = this,   
			Fnop = function () {},  
			fBound = function () {  
				return fToBind.apply(this instanceof Fnop ? this : oThis || window, aArgs.concat(fSlice.call(arguments)));  
			};
		Fnop.prototype = this.prototype;
		fBound.prototype = new Fnop();
		return fBound;  
	};  
}
HTMLElement.prototype.hasClass = function (c) {
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
    return re.test(this.className);
};
HTMLElement.prototype.addClass = function (c) {
    if (this.hasClass(c)) {
		return this;
	}
    this.className = (this.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
    return this;
};
HTMLElement.prototype.removeClass = function (c) {
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
    this.className = this.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
    return this;
};
HTMLElement.prototype.toggleClass = function (c) {
	this.hasClass(c) ? this.removeClass(c) : this.addClass(c);
	return this;	
};
HTMLElement.prototype.appendFirstChild = function (node) {
    this.firstChild ? this.insertBefore(node, this.firstChild) : this.appendChild(node);
};
HTMLElement.prototype.exchange = function(refNode) {
	var tempParentNode = refNode.parentNode,
		tempBeforeNode = refNode.nextElementSibling;
	this.parentNode.insertBefore(refNode,this);
	if (tempBeforeNode) {
		tempParentNode.insertBefore(this,tempBeforeNode);
	} else {
		tempParentNode.appendChild(this);
	}
	return refNode;
};
$.augment(NodeList, Array, 'forEach', 'indexOf', 'filter');