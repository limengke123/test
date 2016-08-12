var container = document.getElementById('container'),
	list = document.getElementById('list'),
	button = document.getElementById('buttons'),
	buttons = button.getElementsByTagName('span'),
	prev = document.getElementById('prev'),
	next = document.getElementById('next'),
	animated = false,
	len = 5,
	index = 1,
	buts = document.getElementById('test'),
	timex=null,
	timer =null;
next.onclick = function(){
	if(animated){
		return;
	}
	move(1);
	console.log(list.offsetLeft)
	index+=1;
	showbutton();
}
prev.onclick = function(){
	if(animated){
		return;
	}
	move(-1);
	console.log(list.offsetLeft)
	index-=1;
	showbutton();
}
function move(n){
	animated =true;
	clearInterval(timer);
	
	if(list.offsetLeft<-3000){
		console.log("back to -600")
		list.style.left =-600+"px";
	}
	if(list.offsetLeft>-600){
		list.style.left =-3000+"px";
		console.log("back to -3000")
	}
	var offset = list.offsetLeft -n*600;
	var go =function(){
			timer=setInterval(function(){
			if(((list.offsetLeft>offset)&&n>0)||((list.offsetLeft<offset)&&n<0)){
				list.style.left = list.offsetLeft -60*n+"px";
			} else{
				clearInterval(timer);
				animated =false;
			}
		},30)
	}
	go();	
}
for(var i=0;i<buttons.length;i++){
	buttons[i].onclick = function(){
		if(animated){
			return;
		}
		var myIndex = parseInt(this.getAttribute("index"));
		move(myIndex-index);
		index=myIndex;
		showbutton();
	}
}


function showbutton(){
	if(index>5){
		index =1;
	}
	if(index<1){
		index =5;
	}
	for(var i=0;i<len;i++){
		buttons[i].className="";
	}
	buttons[index-1].className = "on";
}
function play(){
	timex=setTimeout(function(){
		next.onclick();
		play();
	},1000)
}
function stop(){
	clearInterval(timex);
}
window.onload = function(){
	container.onmouseout =play;
	container.onmouseover =stop;
	play();
	
}
