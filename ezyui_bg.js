/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
const overlay = `.col-overlay {
	position:fixed;
	background-color:lightskyblue;
	opacity:0.5;
}`;

const hLightGrid = `[class*=col-]:hover{
		background-color:orange;
		opacity:0.5;
	}`;

const style = `
	[class*=col-]:hover{
		opacity:0.8;
		transition:background-color 0.5s, opacity 0.5s;
	}
	[class*=row]:hover{
		opacity:0.8;
		transition:background-color 0.5s, opacity 0.5s;
	}
`;

const bg = `body{
		background-color:"#1f232d";
	}`;
/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
(function () {

	//execute when the toolbar button is clicked
	browser.browserAction.onClicked.addListener((e) => {

		browser.tabs.insertCSS({ code: bg });
		browser.tabs.insertCSS({ code: style });
		//browser.tabs.insertCSS({code: hLightGrid});
		//browser.tabs.insertCSS({code: overlay});
		browser.tabs.executeScript({ file: "/content_scripts/jquery.js" });

		browser.tabs.executeScript({ file: "/content_scripts/ezyui.js" }).then(function () {
			browser.tabs.executeScript({ file: "/content_scripts/grid.js" }).then(function () {
				browser.tabs.executeScript({ file: "/content_scripts/grid_worker.js" }).then(function () {
					browser.tabs.executeScript({ file: "/content_scripts/context_menu.js" }).then(function () {
						browser.tabs.executeScript({ file: "/content_scripts/state.js" }).then(function () {
							browser.tabs.executeScript({ file: "/content_scripts/content_init.js" });
						});
					});

				});
			});
		});




		function reportError(error) {
			console.error(error);
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