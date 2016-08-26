$(function(){
	var getCode = function(){
		return $("#nodeCode").val();
	};
	var getNodes = function(){
		return JSON.parse(localStorage.getItem("nodesCache"));
	};
	var setNodes = function(nodes){
		localStorage.removeItem("nodesCache");
		localStorage.setItem("nodesCache", JSON.stringify(nodes));
	};
	var getNode = function(nodeCode){
		var nodes = getNodes();
		for ( var index in nodes) {
			var node = nodes[index];
			if(nodeCode == node.code){
				return nodes[index];
			}
		}
		return {
			code: "",
			name: "未知节点",
			upper: "",
		};
	};
	
	// 更新组织树
	var updateNodeTree = function(nodes){
		var $tree = $(".st_tree");
		$tree.empty().append("<ul></ul>");
		$.each(nodes, function(index, node){
			var $a = $("<a>" + node.name + "</a>").click(function(){
				$tree.find("a.selected").removeClass("selected");
				$(this).addClass("selected");
				var myNode = getNode(node.code);
				$("#nodeName").text(myNode.name || "");
				$("#nodeCode").val(myNode.code || "");
				$("#nodeUpper").val(myNode.upper || "");
				$("#nodePro").val(myNode.pro || "");
				$("#nodeEia").val(myNode.eia || "");
				$("#nodeBus").val(myNode.bus || "");
				$("#nodeReg").val(myNode.reg || "");
				return false;
			});
			var $li = $("<li></li>").attr({
				"data-code" : node.code
			}).append($a);
			var $next = $tree.children("ul");
			if(!!node.upper){
				// 有上级节点
				var $upper = $("li[data-code='" + node.upper + "']");
				if(!!$upper[0]){
					// 有上级节点，并且找到
					$next = $upper.next();
					if(!$next.is("ul")){
						// 上级节点li的下一个兄弟节点不是ul
						// 添加上级节点li的下一个兄弟节点ul
						$next = $("<ul></ul>");
						$upper.after($next);
					}
				}
			}
			$next.append($li);
		});
		// 树形渲染
		$tree.SimpleTree();
		$tree.find("li:first").find("a").trigger("click");
		$tree.find("li:first").trigger("click");
	};
	
	var nodeTreeFilter = function(dimen, values){
		values = values || [];
		var selecteds = [];
		var nodes = getNodes();
		for ( var index in nodes) {
			var node = nodes[index];
			if(node[dimen]){
				if((!values.length && node[dimen]) || values.includes(node[dimen])){
					selecteds.push(node);
				}
			}
		}
		updateNodeTree(selecteds);
	};
	var updateTags = function(dimen){
		if(!dimen){
			return;
		}
		var tags = [];
		var nodes = getNodes();
		for ( var index in nodes) {
			var node = nodes[index];
			var tag = node[dimen];
			if(tag && !tags.includes(tag)){
				tags.push(tag);
			}
		}
		var $area = $("#" + dimen + "Area").empty();
		for ( var index in tags) {
			var tag = tags[index];
			$area.append($("<span>").text(tag).click(function(){
				$(".T-PAuth-table").find(".selected").removeClass("selected");
				var tag = $(this).addClass("selected").text();
				nodeTreeFilter($(this).parent().attr("id").replace("Area", ""), [tag]);
			}));
		}
	};
	var updateNode = function(nodeCode, tagKey, tagVale){
		var nodes = getNodes();
		for ( var index in nodes) {
			var node = nodes[index];
			if(nodeCode == node.code){
				node[tagKey] = tagVale;
				break;
			}
		}
		setNodes(nodes);
		updateTags("pro");
		updateTags("eia");
		updateTags("bus");
		updateTags("reg");
	};
	
	$("#nodePro").change(function(){
		updateNode(getCode(), "pro", $(this).val());
	});
	
	$("#nodeEia").change(function(){
		updateNode(getCode(), "eia", $(this).val());
	});
	
	$("#nodeBus").change(function(){
		updateNode(getCode(), "bus", $(this).val());
	});
	
	$("#nodeReg").change(function(){
		updateNode(getCode(), "reg", $(this).val());
	});
	
	$("#clearBtn").click(function(){
		$(".T-PAuth-table").find(".selected").removeClass("selected");
		updateNodeTree(getNodes());
	});
	
	$(".dimenBtn").click(function(){
		$(".T-PAuth-table").find(".selected").removeClass("selected");
		$(this).addClass("selected");
		nodeTreeFilter($(this).attr("id").replace("Btn", ""), []);
	});

	updateTags("pro");
	updateTags("eia");
	updateTags("bus");
	updateTags("reg");
	updateNodeTree(getNodes());
});