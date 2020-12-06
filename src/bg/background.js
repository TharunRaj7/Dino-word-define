// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

const Http = new XMLHttpRequest();
getSelectionDefinition = function (word) {
  var query = word.selectionText;
  // chrome.tabs.create({url: "http://www.urbandictionary.com/define.php?term=" + query});
  var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + query;
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {
    // console.log(Http.responseText);
    var definition = Http.responseText;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", "definition": definition}, function(response) {
        //console.log(response.wordDefined);
      });  
    });
  }
};


chrome.contextMenus.create({
  title: "Define Dino",
  contexts: ["selection"],
  onclick: getSelectionDefinition
});

