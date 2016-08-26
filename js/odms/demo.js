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
	};
	var updatePro = function(nodeCode, tag){
		updateNode(nodeCode, "pro", tag);
	};
	var updateEia = function(nodeCode, tag){
		updateNode(nodeCode, "eia", tag);
	};
	var updateBus = function(nodeCode, tag){
		updateNode(nodeCode, "bus", tag);
	};
	var updateReg = function(nodeCode, tag){
		updateNode(nodeCode, "reg", tag);
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
	
	$("#nodePro").change(function(){
		updatePro(getCode(), $(this).val());
	});
	
	$("#nodeEia").change(function(){
		updateEia(getCode(), $(this).val());
	});
	
	$("#nodeBus").change(function(){
		updateBus(getCode(), $(this).val());
	});
	
	$("#nodeReg").change(function(){
		updateReg(getCode(), $(this).val());
	});
	
	updateNodeTree(getNodes());
});