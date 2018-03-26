var deviceProfile = (function(){
	//TODO: actively get current selected device profile

	return {
		screenProfile: "md"//Medium
	};

})();

(function() {
    
    if (window.hasRun) {
        return;
    }
    
    window.hasRun = true;

	document.levelColorBase = ['#C2561A', '#DA611E', '#F16C20', '#F58A4B'];
 
  	var gw = gridWorker;
  
	var nodeIdx = 0;
	
	var gridContextMenu = new GridContextMenu(gw.buildGrid());
	gw.eachColumn = function(column){
		column.node.oncontextmenu = gridContextMenu.onColContextMenuMask;
	};
	gw.maskGrid();
	
	/**
	 * Listen for messages from the background script.
	 */
	browser.runtime.onMessage.addListener((message) => {
		alert(message);
	});

})();