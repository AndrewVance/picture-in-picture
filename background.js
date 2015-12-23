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

chrome.pageAction.onClicked.addListener(function(){
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
		//Spit the active tab's url by watch?v=, the rest will be the vidID, possibly some other parameters
		var vidID = (tabs[0].url.split("watch?v="))[1];

		//Strip the rest of parameters if they exist
		vidID = (vidID.split("&"))[0];

		//DEBUG
		console.log(vidID);

		//Haphazardly throw a new window on screen that's the embedded video
		chrome.windows.create({url:'https://www.youtube.com/v/'+vidID+'&autoplay=1',height:600,width:900});
	})
	
})