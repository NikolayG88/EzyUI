function State() {
    this.operation = () => {
        throw "State.operation is not implemented !";
    };

    this.clearState = () => {
        throw "State.clearState is not implemented !";
    };
}

function DefaultState() {
    var base = new State();
    Object.assign(this, base);

    var rowHandlerMouseOver = null;
    var colHandlerMouseOver = null;
    var handlerMouseOut = null;
    //var levelColorCol = ['#C2561A', '#DA611E', '#F16C20', '#F58A4B'];
    //var levelColorRow = ['#800000', '#911111', '#9D1D1D', '#A72727'];
    // var getColLevelColor = (level) => {
    //     return levelColorCol[level >= levelColorCol.length ? levelColorCol.length - 1 : level];
    // };

    // var getRowLevelColor = (level) => {
    //     return levelColorRow[level >= levelColorRow.length ? levelColorRow.length - 1 : level];
    // };

    this.operation = (gridItem) => {
        var node = gridItem.getNode();

        if (rowHandlerMouseOver == null && colHandlerMouseOver == null && handlerMouseOut == null) {
            rowHandlerMouseOver = (event, item) => {
                event.stopPropagation();
                item.getNode().style.backgroundColor = item.getLevelColor();
            };

            colHandlerMouseOver = (event, item) => {
                event.stopPropagation();
                item.getNode().style.backgroundColor = item.getLevelColor();
            };

            handlerMouseOut = (event, item) => {
                item.getNode().style.backgroundColor = 'unset';
            };
        }

        if (gridItem.isType("GridRow")) {
            gridItem.addEventListener("mouseover", rowHandlerMouseOver);
        } else if (gridItem.isType("GridColumn")) {
            gridItem.addEventListener("mouseover", colHandlerMouseOver);
        }
        gridItem.addEventListener("mouseout", handlerMouseOut);
    };

    this.clearState = (gridItem) => {
        var node = gridItem.getNode();

        try {
            if (gridItem.isType("GridRow")) {

                gridItem.removeEventListener("mouseover", rowHandlerMouseOver);
            } else if (gridItem.isType("GridColumn")) {
                gridItem.removeEventListener("mouseover", colHandlerMouseOver);
            }

            gridItem.removeEventListener("mouseout", handlerMouseOut);
        } catch (err) {
            console.log(err);
        }
    };
};

function AddRowState() {
    var base = new State();
    Object.assign(this, base);

    this.operation = (gridItem) => {
        var node = gridItem.getNode();

        if (gridItem.isType("GridRow")) {

        } else if (gridItem.isType("GridColumn")) {

        }
    };
};

function AddColState() {
    var base = new State();
    Object.assign(this, base);

    this.operation = (gridItem) => {

        if (gridItem.isType("GridRow")) {

        } else if (gridItem.isType("GridColumn")) {
            //TODO: find out why this event gets invoket two times
            //Implement clearState
            if (parent != null && parent != undefined) {
                try {
                    gridItem.addEventListener("mouseover", (event, item) => {
                        var parent = item.getParent();
                        var node = item.getNode();

                        try {
                            event.stopPropagation();

                            var newColNode = document.createElement("div");

                            //TODO: calculate the column proportions and figure out a way to pass the grid builder here to create the needed grid item
                            newColNode.id = "add-col-preview";
                            newColNode.className = "col-md-1";

                            newColNode.style.minHeight = "200px";


                            node.parentNode.insertBefore(newColNode, node == undefined ? null : node);

                            parent.addChild(new BSGridColumn(newColNode));
                        } catch (err) {
                            console.log(err);
                        }
                    });

                    gridItem.addEventListener("mouseout", (event, item) => {
                        var parent = item.getNode().parentNode;
                        var target = parent.querySelector("#add-col-preview");

                        if (target != undefined) {
                            parent.removeChild(target);
                        }
                    });
                } catch (err) {
                    console.log(err);
                }

            }
        }


    };
};