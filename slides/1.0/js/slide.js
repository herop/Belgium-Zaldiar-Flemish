var slide_1_0 = document.getElementById('slide-1_0');
slide_1_0.addEventListener('click',function(e){
    var zaldiarBox = document.querySelector('#slide-1_0 .zaldiar');
    zaldiarBox.addClass('active');
},false);
slide_1_0.addInsideObject({
    leave:function(){
        if(zaldiarBox.hasClass('active')){
            zaldiarBox.removeClass('active');
        }
    }
});