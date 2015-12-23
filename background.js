chrome.runtime.onInstalled.addListener(function() 
{
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() 
	{
		//Check if user is watching a youtube video, show PageAction icon if so
		chrome.declarativeContent.onPageChanged.addRules([
		{
			//There's probably a better way to see if a YouTube video is in the active frame
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { urlContains: 'www.youtube.com/watch'},
				})
			],
			actions: [ new chrome.declarativeContent.ShowPageAction()]
		}
		]);
	});
});

chrome.pageAction.onClicked.addListener(function(tab){
	var screenCoverage = 0.25;

	chrome.system.display.getInfo(function(info) {
		//Adjust video dimensions to user's screen
		var vidHeight = Math.round(info[0].bounds.height*screenCoverage);
		var vidWidth = Math.round(info[0].bounds.width*screenCoverage);

		//Spit the active tab's url by watch?v=, the rest will be the vidID, possibly some other parameters
		var vidID = (tab.url.split("watch?v="))[1];

		//Strip the rest of parameters if they exist
		vidID = (vidID.split("&"))[0];

		//Haphazardly throw a new window on screen that's the embedded video
		//// TODO: So many things.
		//// 1. Frameless window
		//// 2. Get video ID straight from YT API instead of URL magic
		//// 3. Resume play from user's position in video
		chrome.windows.create({url:'https://www.youtube.com/v/'+vidID+'&autoplay=1',height:vidHeight,width:vidWidth, type:"panel"});


	});
	
});