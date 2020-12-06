document.getElementById("tester").onclick=testEmailAPI;
document.getElementById("email-choice").onclick=emailChoice;

chrome.storage.sync.get(['dinoEmailChoice'], function(result) {
    var dinoEmailChoice = Object.keys(result).length != 0?result['dinoEmailChoice']:"yes";
    console.log('Email is currently ' + dinoEmailChoice);
    var checkBox = document.getElementById("email-choice");
    checkBox.checked = dinoEmailChoice=="yes"?true:false;
  });

var Http = new XMLHttpRequest();
function testEmailAPI(){
  document.getElementById('tester').innerHTML = "brobro";
  var url = 'https://send-hkj-email.herokuapp.com/weekly';
  var email = 'nuraht.raj@gmail.com';
  var sendJson = JSON.stringify({ email: email, data: "waddup" });
  //console.log(sendJson);
  //Http.onreadystatechange = function () {
  Http.open("POST", url, true);
  console.log("reached");
  Http.setRequestHeader("Content-type", "application/json");
  Http.send(sendJson);
  //}
}

function emailChoice() {
    // Get the checkbox
    var checkBox = document.getElementById("email-choice");
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {
        chrome.storage.sync.set({"dinoEmailChoice": "yes"}, function() {
            console.log("Email ON");
    });
    } else {
        chrome.storage.sync.set({"dinoEmailChoice": "no"}, function() {
            console.log("Email OFF");
    });
    }
  }