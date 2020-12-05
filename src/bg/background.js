// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

  searchUrbanDict = function(word){
    var query = word.selectionText;
    chrome.tabs.create({url: "http://www.urbandictionary.com/define.php?term=" + query});
    //chrome.tabs.create({url: "https://en.wikipedia.org/w/index.php?search=" + query + "&title=Special%3ASearch&go=Go"});
  };

  chrome.contextMenus.create({
    title: "Define Dino",
    contexts:["selection"],
    onclick: searchUrbanDict
  });

  //chrome-extension://mmcalmneajaoifmdjhdingdflilbedho/src/browser_action/browser_action.html