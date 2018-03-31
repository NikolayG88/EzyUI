gridWorker = (function(){

	// var levelColorBase = ['#C2561A', '#DA611E', '#F16C20', '#F58A4B'];
	var gridBuilder = (function(){

		//TODO: Detect selected grid system
		var grid = new BSGrid();

		var newRow = (node) => {
			return new BSGridRow(node);
		};

		var newCol = (node) => {
			return new BSGridColumn(node);
		};

		return {
			grid: grid,
			newRow: newRow,
			newCol: newCol
		}
	})();

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
			
			if(gridBuilder.grid.isColumn(node)){
				
				var col = gridBuilder.newCol(node);
				//var row = gridBuilder.grid.getLastRow();
				gridBuilder.grid.addItemRecursive(col);
				//row.addChild(col);
				
				if(that.eachColumn != undefined){
					that.eachColumn(col, colLvl);
				}
				colLvl++;
			}else if(gridBuilder.grid.isRow(node)){
				var row = gridBuilder.newRow(node);
				gridBuilder.grid.addItemRecursive(row);
			}else{
				gridBuilder.grid.maskNonGridElement(node);
			}
			
			for(var i = 0; i < node.children.length; i++){
				_maskGrid(node.children[i], colLvl);
			}
			
			if(gridBuilder.grid.isColumn(node)|| gridBuilder.grid.isRow(node)){
				gridBuilder.grid.up();
				colLvl--;
			}
		}catch(err){
			console.log(err);
		}
	};
    
	function _parseGrid(gridItem){

	}
	
    function _getGrid(){
		//TODO: detect layout system and build the grid object as required
        return gridBuilder.grid;
    }

	return {
		each: undefined,
		eachRow: undefined,
		eachColumn: undefined,
		
		maskGrid: _maskGrid,
		getGrid: _getGrid 
	};
}());