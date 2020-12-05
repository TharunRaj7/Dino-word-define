
console.log("content script loaded...")
// probably where we will create the pop up, and make it invisible
var definitionView = document.createElement("")

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("received a message...")
    if (request.greeting == "hello"){
      console.log("Received a definition!...")
      console.log(request.definition);
      sendResponse({farewell: "Content received definition..."});
      // after this point, can populate pop up, and make it visible.
    }
  });