(function(global){
    function Point(x,y){
        this.x=x;
        this.y=y;
    }
    Point.prototype={
        toString:function(){
            return '{x='+this.x+',y='+this.y+'}';
        },
        add:function(p){
            return new Point(this.x+p.x,this.y+p.y);
        },
        sub:function(p){
            return new Point(this.x-p.x,this.y-p.y);
        },
        mult:function(k){
            return new Point(this.x*k,this.y*k);
        },
        negative:function(){
            return new Point(-this.x,-this.y);
        }
    };

    var MathPoint={
        getNearIndex:function(arr,val){
            var delta=Math.abs(arr[0]-val),
				index=0, i, temp;
            for(i=0;i<arr.length;i++){
                temp=Math.abs(arr[i]-val);
                if(temp<delta){
                    delta=temp;
                    index=i;
                }
            }
            return index;
        },
        getNearIndexWithCaptureRadiusPoint: function (arr, radius, val, options) {
            if (arr.length === 0) {
				return -1;
			}
            var getLength, delta, index, i, temp;
			getLength = (function () {
				if (!options || (options.x && options.y && !options.IsTransformationSpace)) {
					return function (p1, p2) { return Math.getLength(p1, p2); };
				} else if (options.x && options.y && options.IsTransformationSpace) {
					return function (p1, p2) { return Math.sqrt(Math.pow(options.x * Math.abs(p1.x - p2.x), 2) + Math.pow(options.y * Math.abs(p1.y - p2.y), 2)); };
				} else if (options.x) {
					return function (p1, p2) { return Math.abs(p1.x - p2.x); };
				} else if (options.y) {
					return function (p1, p2) { return Math.abs(p1.y - p2.y); };
				}	
			})();
            delta = getLength(arr[0], val);
            index = 0;
            for (i = 0; i < arr.length; i++) {
                temp = getLength(arr[i], val);
                if (temp < delta) {
                    delta = temp;
                    index = i;
                }
            }
            if (delta > radius) {
                return -1;
            }
            return index;
        },
        bound:function(min,max,val){
            return Math.max(min,Math.min(max,val));
        },
        boundPoint:function(min,max,val){
            var x=Math.max(min.x,Math.min(max.x,val.x)),
				y=Math.max(min.y,Math.min(max.y,val.y));
            return new Point(x,y);
        },
        getLength:function(p1,p2){
            var dx=p1.x-p2.x,
				dy=p1.y-p2.y;
            return Math.sqrt(dx*dx+dy*dy);
        },
        isOnRectangle:function(rect,size,p){
            if(rect.x>p.x) return false;
            if(rect.x+size.x<p.x) return false;
            if(rect.y>p.y) return false;
            if(rect.y+size.y<p.y) return false;
            return true;
        },
        directCrossing:function(L1P1,L1P2,L2P1,L2P2){
			var temp, k1, k2, b1, b2, x, y;
            if(L2P1.x==L2P2.x){
                temp=L2P1;
                L2P1=L1P1;
                L1P1=temp;
                temp=L2P2;
                L2P2=L1P2;
                L1P2=temp;
            }
            if(L1P1.x==L1P2.x){
                k2=(L2P2.y-L2P1.y)/(L2P2.x-L2P1.x);
                b2=(L2P2.x*L2P1.y-L2P1.x*L2P2.y)/(L2P2.x-L2P1.x);
                x=L1P1.x;
                y=x*k2+b2;
                return new Point(x,y);
            }else{
                k1=(L1P2.y-L1P1.y)/(L1P2.x-L1P1.x);
                b1=(L1P2.x*L1P1.y-L1P1.x*L1P2.y)/(L1P2.x-L1P1.x);
                k2=(L2P2.y-L2P1.y)/(L2P2.x-L2P1.x);
                b2=(L2P2.x*L2P1.y-L2P1.x*L2P2.y)/(L2P2.x-L2P1.x);
                x=(b1-b2)/(k2-k1);
                y =x*k1+b1;
                return new Point(x,y);
            }
        },
        boundOnLine:function(LP1,LP2,P){
            var x, y;
			x= MathPoint.bound(Math.min(LP1.x,LP2.x),Math.max(LP1.x,LP2.x),P.x);
            if(x!=P.x){
                y=(x==LP1.x)?LP1.y:LP2.y;
                P=new Point(x,y);
            }
            y= MathPoint.bound(Math.min(LP1.y,LP2.y),Math.max(LP1.y,LP2.y),P.y);
            if(y!=P.y){
                x=(y==LP1.y)?LP1.x:LP2.x;
                P=new Point(x,y);
            }
            return P;
        },
        getPointInLine:function(LP1, LP2,percent){
            var dx = LP2.x - LP1.x,
				dy = LP2.y - LP1.y;
            return new Point(LP1.x + percent * dx , LP1.y + percent * dy );
        }
    };
    global.Point = Point;
    global.MathPoint = MathPoint;
})(window);