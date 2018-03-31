function GridColumn(domNode, colLvl){
	if(domNode == null){
		throw "Invalid constructor parameter: DOM node is null !";
	}
     
	this.node = domNode;
}

function GridRow(domNode){
	if(domNode == null){
		throw "Invalid constructor parameter: DOM node is null !";
    }

    this.getNode = () => {
        return node;
    };

    this.hasNode = () => {
        return node == undefined || node == null;
    };

    this.setLevel = (lvl) => {
        level = lvl;
    };

    this.setId = (newId) => {
        _id = newId
    };

    this.getId = () => {
        return _id;
    };

    this.hasChild = (item) => {
        return children.find((element) => {
            return element.getId() == item.getId();
        }) != undefined;
    };
}

function GridColumn(domNode) {
    var base = new GridItem(domNode);

    domNode.style.border = '1px solid white';
    domNode.style.visibility = 'visible';
    domNode.style.cursor = 'pointer';
    domNode.style.padding = '5px';
    Object.assign(this, base);
}

function BSGridColumn(node) {
    var base = new GridColumn(node);
    Object.assign(this, base);
}

function GridRow(domNode) {
    var base = new GridItem(domNode);
    Object.assign(this, base);

    var levelColorBase = ['#C2561A', '#DA611E', '#F16C20', '#F58A4B'];
    
    this.level = undefined;

    this.columns = [];

    this.node = domNode;

    this.addCol = (col) => {
       console.log("row level: " + this.level);
        var lvlColor = levelColorBase[this.level >= levelColorBase.length ? levelColorBase.length - 1 : this.level];
        col.node.style.border = '1px solid ' + lvlColor;
        col.node.style.visibility = 'visible';
        col.node.style.cursor = 'pointer';

        col.node.addEventListener("mouseover", function(e){
            e.stopPropagation(); 
            col.node.style.backgroundColor = lvlColor;
        });

        col.node.addEventListener("mouseout", function(e){
            col.node.style.backgroundColor = 'unset';
        });
 
        this.columns.push(col);
      
    };
}

function BSGridRow(domNode){
    var gridRow = new GridRow(domNode);

    //Object.assign(this, gridRow);
    this.base = gridRow;
    this.addCol = (col) => {
        if(col.node == undefined || col.node == null){
            //Create new dom node
        }else{
            gridRow.addCol(col);
        }
    }
}

function Grid(){
    this.rows = [];
   
    this.addRow = function(row){
        row.base.level = that.rows.length;
        //console.log("adding row: " + JSON.stringify(row));
        that.rows.push(row);
    };

    this.getLastRow = function(){
        if(that.rows.length == 0){
            throw "There are no rows in the grid !";
        }
        var lastRow = that.rows[that.rows.length-1];
        return lastRow;
    };

    var that = this;
}


function BSGrid(){
    var source = new Grid();

    Object.assign(this, source);

    //Even better the options can be displayed directly in the clumn itself splitting it in two providing options to insert to left or right
    //Change the column mode to row mode so only rows are displayed and possible actions provided

    //Split the menu item Insert Column in two parts, providing selection to which side a column to be inserted
    //Add col algorithm: get siblings of selected column, count the occupied slots and insert a column with size 1 with respect to device profile
    //Note: When 12 col limit exceeded show a modeless popup informing that nesting should occur.
    //Auto nesting option can be provided at later stage

    this.addRow = function(row){
        source.addRow(row);
        console.log("extended");
    };

    this.addCol = function(col){
        source.addCol(col);
        console.log("extended");
    };
}