function GridItem(domNode) {
    if (domNode == null) {
        throw "Invalid constructor parameter: DOM node is null !";
    }

    var _id = 0;
    var level = 0;
    var parent = null;
    var node = domNode;
    var children = [];

    this.addChild = (gridItem) => {
        gridItem.setLevel(level + 1);
        children.push(gridItem);
        gridItem.setParent(this);
    };

    this.setParent = (item) => {
        parent = item;
    }

    this.getParent = () => {
        return parent;
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

    var level = undefined;

    domNode.style.border = '1px solid #800000';
    domNode.style.visibility = 'visible';
    domNode.style.cursor = 'pointer';
    domNode.style.backgroundColor = "transparent";
    domNode.style.padding = '5px';


    this.addChild = (col) => {
        var lvlColor = levelColorBase[level >= levelColorBase.length ? levelColorBase.length - 1 : level];
        // col.getNode().style.border = '1px solid ' + lvlColor;
        // col.getNode().style.visibility = 'visible';
        // col.getNode().style.cursor = 'pointer';
        // col.getNode().style.padding = '5px';


        col.getNode().addEventListener("mouseover", function (e) {
            e.stopPropagation();
            col.getNode().style.backgroundColor = lvlColor;
        });

        col.getNode().addEventListener("mouseout", function (e) {
            col.getNode().style.backgroundColor = 'unset';
        });

        base.addChild(col);
        //columns.push(col);
    };

    // this.addCol = (col) => {

    //     var lvlColor = levelColorBase[level >= levelColorBase.length ? levelColorBase.length - 1 : level];
    //     col.getNode().style.border = '1px solid ' + lvlColor;
    //     col.getNode().style.visibility = 'visible';
    //     col.getNode().style.cursor = 'pointer';
    //     col.getNode().style.padding = '5px';


    //     col.getNode().addEventListener("mouseover", function(e){
    //         e.stopPropagation(); 
    //         col.getNode().style.backgroundColor = lvlColor;
    //     });

    //     col.getNode().addEventListener("mouseout", function(e){
    //         col.getNode().style.backgroundColor = 'unset';
    //     });

    //     columns.push(col);

    // };

    this.setLevel = (lvl) => {
        level = lvl;
    };

    this.getLevel = () => {
        return level;
    };
}

function BSGridRow(domNode) {
    var gridRow = new GridRow(domNode);

    Object.assign(this, gridRow);
    this.addChild = (col) => {
        if (col.hasNode()) {
            //Create new dom node
        } else {
            gridRow.addChild(col);
        }
    };
}

function Grid() {
    var rows = [];
    var index = 0;
    var root = null;
    var head = null;

    this.resetHead = () => {
        head = root;
    };

    this.addItemRecursive = (item) => {

        index++;

        item.setId(index);

        if (root == null) {
            console.log("add root with Id: " + index);
            root = item;
            head = root;
        } else {
            console.log("add item id: " + index + " to head id: " + head.getId());
            head.addChild(item);
            this.down(item);
        }
    };

    this.up = () => {
        if (!head.getParent() == null) {
            head = head.getParent();
        }
    };

    this.down = (item) => {
        console.log("change head to item id: " + item.getId());
        if (!head.hasChild(item)) {
            throw "Invalid argument, target grid item must be a child of the current head !";
        }

        head = item;
    };

    this.addRow = (row) => {

        //TODO: More accurate depth leveling
        row.setLevel(rows.length);

        rows.push(row);

        row.getNode().addEventListener("mouseover", function (e) {
            e.stopPropagation();
            row.getNode().style.backgroundColor = "#800000";
        });

        row.getNode().addEventListener("mouseout", function (e) {
            row.getNode().style.backgroundColor = 'unset';
        });
    };

    this.getLastRow = () => {
        if (rows.length == 0) {
            throw "There are no rows in the grid !";
        }
        var lastRow = rows[rows.length - 1];
        return lastRow;
    };

    this.isRow = (node) => {
        throw "Not Implemented !";
    };

    this.isColumn = (node) => {
        throw "Not Implemented !";
    };

    this.maskNonGridElement = (node) => {
        node.style.visibility = 'hidden';
        node.style.border = 'none';
    };

    this.setState = (state) => {

    };
}


function BSGrid() {
    var base = new Grid();

    Object.assign(this, base);

    //Even better the options can be displayed directly in the clumn itself splitting it in two providing options to insert to left or right
    //Change the column mode to row mode so only rows are displayed and possible actions provided

    //Split the menu item Insert Column in two parts, providing selection to which side a column to be inserted
    //Add col algorithm: get siblings of selected column, count the occupied slots and insert a column with size 1 with respect to device profile
    //Note: When 12 col limit exceeded show a modeless popup informing that nesting should occur.
    //Auto nesting option can be provided at later stage

    this.addRow = function (row) {
        base.addRow(row);
    };

    this.addCol = function (col) {
        base.addCol(col);
    };

    //overrides base method
    this.isRow = (node) => {
        var regex = RegExp('row');
        return regex.test(node.className);
    };

    //overrides base method
    this.isColumn = (node) => {
        var regex = RegExp('col-[a-z]+-[0-9]+');
        return regex.test(node.className);
    };
}