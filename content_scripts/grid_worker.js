gridWorker = (function(){

	// var levelColorBase = ['#C2561A', '#DA611E', '#F16C20', '#F58A4B'];
	var grid = new BSGrid();
	function _isBSRow(node){
		var regex = RegExp('row');
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
		// var lvlColor = levelColorBase[colLvl >= levelColorBase.length ? levelColorBase.length - 1 : colLvl];
		// col.style.border = '1px solid ' + lvlColor;
		// col.style.visibility = 'visible';
		// col.style.cursor = 'pointer';
		// col.addEventListener("mouseover", function(e){
		// 	e.stopPropagation(); 
		// 	col.style.backgroundColor = lvlColor;
		// });

		// col.addEventListener("mouseout", function(e){
		// 	col.style.backgroundColor = 'unset';
		// });
	};

	var that = undefined;
	function _maskGrid (node, colLvl){
		try{
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
				//_maskBSColumn(node, colLvl);
				var col = new GridColumn(node);
				var row = grid.getLastRow();

				row.addCol(col);

				if(that.eachColumn != undefined){
					that.eachColumn(col, colLvl);
				}
				colLvl++;
			}else if(_isBSRow(node)){
				var row = new BSGridRow(node);
				grid.addRow(row);
			}else{
				_maskNonBSElement(node);
			}
			
			for(var i = 0; i < node.children.length; i++){
				
				_maskGrid(node.children[i], colLvl);
			}
			
			if(_isBSColumn(node)){
				colLvl--;
			}
		}catch(err){
			console.log(err);
		}
	};
    
    
    function _buildGrid(){
		//TODO: detect layout system and build the grid object as required
        return new BSGrid();
    }

	return {
		each: undefined,
		eachRow: undefined,
		eachColumn: undefined,
		
		maskGrid: _maskGrid,
		buildGrid: _buildGrid 
	};
}());