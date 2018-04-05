function GridItem(domNode) {
    if (domNode == null) {
        throw "Invalid constructor parameter: DOM node is null !";
    }

    var _id = 0;
    var level = 0;
    var parent = null;
    var node = domNode;
    var children = [];
    var itemType = "";
    var lvlColor = null;

    this.addChild = (gridItem) => {
        gridItem.setLevel(level + 1);
        children.push(gridItem);
        gridItem.setParent(this);
    };

    this.getChildren = () => {
        return children;
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

    this.getLevel = () => {
        return level;
    }

    this.setId = (newId) => {
        _id = newId
        node.id = _id;
    };

    this.getId = () => {
        return _id;
    };

    this.hasChild = (item) => {
        return children.find((element) => {
            return element.getId() == item.getId();
        }) != undefined;
    };

    this.isType = (type) => {
        return itemType === type;
    };

    this.setType = (type) => {
        itemType = type;
    };

    var itemEvents = {
        mouseover: [ /*callbacks: []*/],
        mouseout: [ /*callbacks: []*/]
    };

    this.addEventListener = (name, callback) => {
        itemEvents[name].push(callback);
        node.addEventListener(name, (event) => {
            try {
                //var cbacks = itemEvents[name];
                for (var cback in itemEvents[name]) {
                    itemEvents[name][cback](event, this);
                }
            } catch (err) {
                console.log(err);
            }

        });
    };

    this.removeEventListener = (name, callback) => {

        var idx = itemEvents[name].indexOf(callback);

        if (idx >= 0) {
            itemEvents[name].splice(idx, 1);
        }
    };
    this.levelColors = [];
    this.getLevelColor = () => {
        return this.levelColors[level >= this.levelColors.length ? this.levelColors.length - 1 : level];
    }
}

function GridColumn(node) {
    var base = new GridItem(node);

    Object.assign(this, base);
    this.setType("GridColumn");

    base.levelColors = ['#C2561A', '#DA611E', '#F16C20', '#F58A4B'];

    node.style.border = '1px solid ' + this.getLevelColor();
    node.style.visibility = 'visible';
    node.style.cursor = 'pointer';
    node.style.padding = '5px';
}

function BSGridColumn(node) {
    var base = new GridColumn(node);
    Object.assign(this, base);
}

function GridRow(node) {
    var base = new GridItem(node);
    Object.assign(this, base);
    this.setType("GridRow");

    this.addChild = (col) => {

        base.addChild(col);
    };

    base.levelColors = ['#800000', '#911111', '#9D1D1D', '#A72727'];

    node.style.backgroundColor = "transparent";
    node.style.border = '1px solid' + this.getLevelColor();
    node.style.visibility = 'visible';
    node.style.cursor = 'pointer';
    node.style.padding = '5px';
}

function BSGridRow(node) {
    var gridRow = new GridRow(node);

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
    var gridState = null;

    this.resetHead = () => {
        head = root;
    };

    this.getHead = () => {
        return head;
    };

    this.addItemRecursive = (item) => {

        index++;

        item.setId(index);

        if (root == null) {
            root = item;
            head = root;
        } else {
            head.addChild(item);
        }
    };

    this.up = () => {
        if (head.getParent() != null) {
            head = head.getParent();
        }
    };

    this.down = (item) => {
        if (head == item) {
            return;
        }

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
        try {

            forEach(null, (item) => {

                if (gridState != null) {
                    gridState.clearState(item);
                }

                state.operation(item);
            });

            gridState = state;
        } catch (err) {
            console.log(err);
        }

    };

    function forEach(item, callback) {
        if (item == null) {
            item = root;
        }

        callback(item);

        for (var i = 0; i < item.getChildren().length; i++) {
            forEach(item.getChildren()[i], callback);
        }
    }
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