
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
      var word= definitionJSON[0]["word"]
  var name = definitionView.innerText;
     var audioLink= definitionJSON[0]["phonetics"][0]["audio"]
  var exampleModal = getExampleModal();

  // Init the modal if it hasn't been already.
  if (!exampleModal) { exampleModal = initExampleModal(); }
  var html =
      '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">'+word+'</h5>' +
      '</div>' + 
      '<div class="modal-body">' +
        name +
      '</div>' + 
      '<div class="modal-body">' +
      '<audio controls> <source src='+audioLink+ ' type="audio/mpeg">Your browser does not support the audio element. </audio>' +
      '</div>';
      var linebreak= document.createElement('br')
      var footer= document.createElement('div');
      footer.classList.add('modal-footer');
      var button = document.createElement('button');
      button.classList.add('btn');
      button.classList.add('btn-primary');
      button.innerHTML="Add it to your list";
      var button2 = document.createElement('button');
      button2.classList.add('btn');
      button2.classList.add('btn-secondary');
      button2.innerHTML="Close";
      button.addEventListener("click", check);
      button2.addEventListener("click", remove);
      footer.appendChild(button);
      footer.appendChild(button2);
      

  setExampleModalContent(html, footer, linebreak);


  // Show the modal.
  // jQuery(exampleModal).modal('show');
      document.body.insertBefore(exampleModal, document.body.firstChild);
    }
  });

function check(){
  console.log("hello")
}

  function getExampleModal() {
    return document.getElementById('exampleModal');
  }

  function remove(){
    // getExampleModal().querySelector('.modal-content').removeChild(footer);
    getExampleModal().querySelector('.modal-content').innerHTML = "";
  }
  
  function setExampleModalContent(html, footer, linebreak) {
    getExampleModal().querySelector('.modal-content').innerHTML = html;
    getExampleModal().querySelector('.modal-content').appendChild(footer);
  }
  
  function initExampleModal() {
    var modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.setAttribute('id', 'exampleModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'exampleModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
          '<div class="modal-dialog" role="document">' +
            '<div class="modal-content"></div>' +
          '</div>';
    document.body.appendChild(modal);
    return modal;
  }