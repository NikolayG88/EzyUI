var deviceProfile = (function () {
	//TODO: actively get current selected device profile

	return {
		screenProfile: "md"//Medium
	};

})();

(function () {

	if (window.hasRun) {
		return;
	}

	window.hasRun = true;

	var gw = gridWorker;

	var nodeIdx = 0;

	var gridContextMenu = new GridContextMenu(gw.getGrid());
	gw.eachColumn = function (column) {
		column.getNode().oncontextmenu = gridContextMenu.onColContextMenuMask;
	};
	gw.maskGrid();
	gw.getGrid().setState(new DefaultState())
	/**
	 * Listen for messages from the background script.
	 */
	browser.runtime.onMessage.addListener((message) => {
		alert(message);
	});

})();