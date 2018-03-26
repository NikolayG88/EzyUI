function GridColumn(domNode){
	if(domNode == null){
		throw "Invalid constructor parameter: DOM node is null !";
	}

	//TODO: Detect grid system and set menu items 
	this.node = domNode;
}

function Grid(){

    this.addRow = function(){
        console.log("Add Row");
    };

    this.addCol = function(){
        console.log("Add Column");
    };

    this.someFunc = function(){
        console.log("assign test success");
    };
}


function BSGrid(){
    var source = new Grid();

    Object.assign(this, source);

    this.addRow = function(){
        source.addRow();
        console.log("extended");
    };

    this.addCol = function(){
        source.addCol();
        console.log("extended");
    };
}