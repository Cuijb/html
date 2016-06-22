window.onload = function(){
	var box1 = getById("box1");
	var box2 = getById("box2");
	
	box1.ondragover = function(e){
		e.preventDefault()
	};
	box2.ondragover = function(e){
		e.preventDefault()
	};
	box1.ondrop = dropHandler;
	box2.ondrop = dropHandler;
	
	var imgs = document.getElementsByTagName("img");
	for(var i=0; i<imgs.length; i++){
		var img = imgs[i];
		showObj(img);
		img.ondragstart = function(e){
			e.dataTransfer.setData("imgId", this.id);
		};
		img.ondragover = function(e){
			showObj({imgover:"aaaaaaaa"});
			return false;
		}
		img.ondrop = function(e){
			showObj({imgdrop:"bbbbbbbb"});
			return false;
		};
	}
};

function dropHandler(e){
	e.target.appendChild(getById(e.dataTransfer.getData("imgId")));
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