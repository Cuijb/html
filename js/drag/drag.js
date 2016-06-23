window.onload = function(){
	var box1 = getById("box1");
	var box2 = getById("box2");
	
	box1.ondragover = dragoverHandler;
	box2.ondragover = dragoverHandler;
	box1.ondrop = dropHandler;
	box2.ondrop = dropHandler;
	
	var imgs = document.getElementsByTagName("img");
	for(var i=0; i<imgs.length; i++){
		var img = imgs[i];
		img.ondragstart = function(e){
			e.dataTransfer.setData("dragId", e.target.id);
		};
		img.ondragover = dragoverHandler;
		img.ondrop = function(e){
			e.cancelBubble = true;
		};
	}
};

function dragoverHandler(e){
	e.preventDefault();
}

function dropHandler(e){
	e.preventDefault();
	var dragObj = getById(e.dataTransfer.getData("dragId"));
	showObj(e.target);
	e.target.appendChild(dragObj);
}

function showObj(obj){
	var msgDiv = getById("msg");
	var objStr = "";
	for(var key in obj){
		objStr += key + " : " + obj[key] + "<br>";
	}
	msgDiv.innerHTML = objStr;
}

function getById(id){
	return document.getElementById(id);
}