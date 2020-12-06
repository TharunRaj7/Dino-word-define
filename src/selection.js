
console.log("content script loaded...")
// probably where we will create the pop up, and make it invisible
var div = document.createElement("div");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("received a message...")
    if (request.greeting == "hello"){
      console.log("Received a definition!...")

      div.setAttribute("id", "chromeextensionpopup");
      div.innerText = addDefinitionPopup(request.definition)
      console.log(div.innerText);
      document.body.appendChild(div);

      //console.log(request.definition);
      sendResponse({farewell: "Content received definition..."});
      // after this point, can populate pop up, and make it visible.
    }
  });

  function addDefinitionPopup(data){
    return data;
  }

var closelink = document.createElement("div");
closelink.setAttribute("id", "chromeextensionpopupcloselink");
closelink.innerText = 'X';
document.getElementById("chromeextensionpopup").appendChild(closelink);

document.getElementById("chromeextensionpopupcloselink").addEventListener("click", removeExtensionPopup);


function removeExtensionPopup(){
    document.getElementById("chromeextensionpopup").outerHTML='';
}
