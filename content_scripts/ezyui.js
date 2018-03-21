//Min versions: G:8, E:10, FF:3.6, S:5.1, O: 11.5


//TODO: put this in a separate file gridWorker.js and inject it from the bg script
var gridWorker = (function(){

	function _isBSRow(node){
		var regex = RegExp('^row\s|\row\s');
		return regex.test(node.className);
	};

	function _isBSColumn(node){
		var regex = RegExp('col-[a-z]+-[0-9]+');
		return regex.test(node.className);
	};

	function getBSGridColClasses(node){
		//Find bootstrap columns class array.
		if(typeof(node.className) == "string"){
			var regex = RegExp('col-[a-z]+-[0-9]+');
			var result = regex.exec(node.className);
			return result != null ? result : [];
		}
		
		return [];
	};

	function _maskNonBSElement(node){
		node.style.visibility = 'hidden';
		node.style.border = 'none';
	};

	function _maskBSColumn(col, colLvl){
		col.style.border = '1px solid ' + document.levelColorBase[colLvl >= document.levelColorBase.length ? document.levelColorBase.length - 1 : colLvl];
		col.style.visibility = 'visible';
		col.style.cursor = 'pointer';
	};

	var that = undefined;
	function _maskGrid (node, colLvl){
		
		if(that == undefined){
			that = this;
		}
		
		if(that.each != undefined){
			that.each(node);
		}
		
		if(node == undefined){
			_maskGrid(document.body, colLvl);
			return;
		}
		
		if(colLvl == undefined){
			colLvl = 0;
		}
		
		if(_isBSColumn(node)){
			 _maskBSColumn(node, colLvl);
			 if(that.eachColumn != undefined){
				 that.eachColumn(node);
			 }
			 colLvl++;
		}else{
			_maskNonBSElement(node);
		}
		
		for(var i = 0; i < node.children.length; i++){
			
			_maskGrid(node.children[i], colLvl);
		}
		
		if(_isBSColumn(node)){
			 colLvl--;
		}
	};
	
	return {
		each: undefined,
		eachRow: undefined,
		eachColumn: undefined,
		maskGrid: _maskGrid
	};
}());

var bsGridContextMenu = (function(){
	//TODO: count columns and distribute the sizes evenly
	
	var colContextMenu = undefined;
	
	var colMenuHtml = `
		<style>
			#colContextMenu{
				position:fixed;
				visibility:visible;
				width:200px;
				height:100px;
				background-color:#F2F2F2;
				top:0px;
				left:0px;
				z-index:1000;
			}

			#colContextMenu ul{
				padding:5px;
				list-style-type:none;
			}

			#colContextMenu li{
				margin:5px;
				color:black;
				cursor:arrow;
				-webkit-user-select: none;  
				-moz-user-select: none;    
				-ms-user-select: none;      
				user-select: none;
			}

			#colContextMenu li:hover{
				background-color:#D7D7D7;
			}

			#colContextMenu hr{
				border-top:1px solid #D7D7D7;
				margin:0px;
				margin-left:5px;
				margin-right:5px;
				margin-bottom:5px;
			}
			
		</style>
		<div>
			<ul>
				<li>Insert Rows</li>
				<hr />
				<li>Insert Columns</li>
				<hr />
			</ul>
		</div>`;

	function _openColMenu(event){
		
		try{
			if(colContextMenu == undefined){
				colContextMenu = document.createElement("div");

				colContextMenu.innerHTML = colMenuHtml;
				colContextMenu.id = "colContextMenu";
				colContextMenu.style.visibility = "visible";

				document.body.appendChild(colContextMenu);

				window.onclick = function(evt){
					if(evt.button == 0){
						colContextMenu.style.visibility = "hidden";
					}
				};
			}else{
				colContextMenu.style.visibility = "visible"; 
			}
			
			colContextMenu.style.top = event.clientY + 'px';
			colContextMenu.style.left = event.clientX + 'px';

			
			event.stopPropagation();
		}catch(err){
			console.log(err.message);
		}
	};
	
	function _onColContextMenuMask(event){
		event.preventDefault();
		_openColMenu(event);
	}
	
	return {
		onColContextMenuMask: _onColContextMenuMask
	};
	
})();

(function() {
	
	document.levelColorBase = ['#C2561A', '#DA611E', '#F16C20', '#F58A4B'];
 
	if (window.hasRun) {
		return;
	}
	
  	window.hasRun = true;
  
  	var gw = gridWorker;
  
	var nodeIdx = 0;

	gw.eachColumn = function(colNode){
		colNode.oncontextmenu = bsGridContextMenu.onColContextMenuMask;
		if(colNode.id != "" && colNode.id >= nodeIdx){
			console.log("Duplicate node " + colNode.id);
		}
		else{
			colNode.id = nodeIdx;
			nodeIdx++;
		}
		
		//console.log(colNode);
	};
	gw.maskGrid();
	
	/**
	 * Listen for messages from the background script.
	 */
	browser.runtime.onMessage.addListener((message) => {
	alert(message);
	});

})();