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

	function _maskElement(node){
		node.style.visibility = 'hidden';
		node.style.border = 'none';
	};

	function _maskColumn(col, colLvl){
		//col.style.backgroundColor = document.levelColorBase[colLvl >= document.levelColorBase.length ? document.levelColorBase.length - 1 : colLvl] ;
		col.style.border = '1px solid ' + document.levelColorBase[colLvl >= document.levelColorBase.length ? document.levelColorBase.length - 1 : colLvl];
		col.style.visibility = 'visible';
		col.style.cursor = 'pointer';
	};

	var that = undefined;
	function _maskGrid (node, colLvl){
		
		if(that == undefined){
			that = this;
		}
		
		that.each(node);
		
		if(node == undefined){
			_maskGrid(document.body, colLvl);
			return;
		}
		
		if(colLvl == undefined){
			colLvl = 0;
		}
		
		if(_isBSColumn(node)){
			 _maskColumn(node, colLvl);
			 colLvl++;
		}else{
			_maskElement(node);
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
		maskGrid: _maskGrid
	};
	

}());

(function() {
	
	document.levelColorBase = ['#C2561A', '#DA611E', '#F16C20', '#F58A4B'];
 
  if (window.hasRun) {
    return;
  }
  
  window.hasRun = true;
  
  var gr = gridWorker;
  
  gr.each = function(node){
	  console.log(node);
  };
  gr.maskGrid();
  
  /**
   * Listen for messages from the background script.
  */
  browser.runtime.onMessage.addListener((message) => {
   alert(message);
  });

})();