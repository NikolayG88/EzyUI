/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
const overlay = `.col-overlay {
	position:fixed;
	background-color:lightskyblue;
	opacity:0.5;
}`;

const hLightGrid = `[class*=col-]{
		background-color:lightskyblue;
		opacity:0.5;
		border: 1px solid grey;
	}`;

	
const bg =`body{
		background-color:"#1f232d";
	}`; 
/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
(function() {
	
	//execute when the toolbar button is clicked
	browser.browserAction.onClicked.addListener((e) => {
		
		browser.tabs.insertCSS({code: bg});
		//browser.tabs.insertCSS({code: hLightGrid});
		//browser.tabs.insertCSS({code: overlay});
		
		browser.tabs.executeScript({file: "/content_scripts/jquery.js"});
		browser.tabs.executeScript({file: "/content_scripts/ezyui.js"});
		
		function reportError(error) {
			console.error(`Could not beastify: ${error}`);
		}
	});
})();

/**,
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
 // document.querySelector("#popup-content").classList.add("hidden");
 // document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute ezyui content script: ${error.message}`);
}


// .then(listenForClicks)
// .catch(reportExecuteScriptError);