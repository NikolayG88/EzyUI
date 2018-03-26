gridWorker = (function(){

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
				 that.eachColumn(new GridColumn(node));
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