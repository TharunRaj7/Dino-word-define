
console.log("content script loaded...")
// probably where we will create the pop up, and make it invisible
var definitionView = document.createElement("h1");
definitionView.innerHTML = "";

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log("received a message...")
    if (request.greeting == "hello") {
      console.log("Received a definition!...")
      console.log(request.definition);
      sendResponse({ farewell: "Content received definition..." });
      // after this point, can populate pop up, and make it visible.
      definitionJSON = JSON.parse(request.definition);
      console.log(definitionJSON);
      definitionView.innerText = definitionJSON[0]["meanings"][0]["definitions"][0]["definition"]
      document.body.insertBefore(definitionView, document.body.firstChild);
    }
  });