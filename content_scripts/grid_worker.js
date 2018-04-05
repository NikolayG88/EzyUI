gridWorker = (() => {
	var gridBuilder = (() => {

		//TODO: Detect selected grid system
		var grid = new BSGrid();

		var newRow = (node) => {
			return new BSGridRow(node);
		};

		var newCol = (node) => {
			return new BSGridColumn(node);
		};

		var hasChildren = (node) => {
			for (var child in node.children) {
				if (grid.isRow(node) || grid.isColumn(node)) {
					return true;
				}
			}
		};

		var addItemRecursive = (item) => {

			//Validate grid structure
			var head = grid.getHead();
			if(head != null){
				if(head.isType("GridRow") && item.isType("GridRow")){
					console.log("Warning: Impropper syntax, row can not be a child of another row !");
				}else if(head.isType("GridColumn") && item.isType("GridColumn")){
					console.log("Warning: Impropper syntax, column can not be a child of another column !");
				}
			}
			
			grid.addItemRecursive(item);
		}

		return {
			grid: grid,
			newRow: newRow,
			newCol: newCol,
			hasChildren: hasChildren,
			addItemRecursive: addItemRecursive
		}
	})();

	var that = undefined;
	function _maskGrid(node, colLvl) {
		try {

			if (that == undefined) {
				that = this;
			}

			if (that.each != undefined) {
				that.each(node);
			}

			if (node == undefined) {
				_maskGrid(document.body, colLvl);
				return;
			}

			var newItem = null;

			if (gridBuilder.grid.isColumn(node)) {

				var col = gridBuilder.newCol(node);
				newItem = col;

				if (that.eachColumn != undefined) {
					that.eachColumn(col, colLvl);
				}

			} else if (gridBuilder.grid.isRow(node)) {
				var row = gridBuilder.newRow(node);
				newItem = row;
			} else {
				gridBuilder.grid.maskNonGridElement(node);
			}

			if (newItem != null) {
				gridBuilder.addItemRecursive(newItem);

				if (gridBuilder.hasChildren(node)) {
					gridBuilder.grid.down(newItem);
				}
			}

			for (var i = 0; i < node.children.length; i++) {
				_maskGrid(node.children[i], colLvl);
			}

			if (gridBuilder.grid.isColumn(node) || gridBuilder.grid.isRow(node)) {
				gridBuilder.grid.up();
			}
		} catch (err) {
			console.log(err);
		}
	};

	function _getGrid() {
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
})();