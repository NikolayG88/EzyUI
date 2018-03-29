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