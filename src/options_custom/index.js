var Http = new XMLHttpRequest();
var userEmail = "";
var ret = "";

chrome.identity.getProfileUserInfo(function(info){
    userEmail = info.email;
});

document.getElementById("tester").onclick=sendEmail;
document.getElementById("email-choice").onclick=emailChoice;

function sendEmail (){
document.getElementById('tester').addEventListener("click", function (){
    //document.getElementById('tester').innerHTML = "brobro";
    var url = 'https://send-hkj-email.herokuapp.com/weekly';
    getAllWords();
    var data = ret;
    //console.log(data);
    var sendJson = JSON.stringify({'email': userEmail, 'data': data});
    console.log(sendJson);

    Http.open("POST", url, true);
    Http.setRequestHeader("Content-type", "application/json");
    Http.send(sendJson);
    console.log("Completed API call");
});
}

function getAllWords(){
    chrome.storage.sync.get(['wordsDefined', 'wordDefinitions'], function(result) {
    if(Object.keys(result).length == 0){
        ret += "You have not searched for any words :(";
    }
    else{
    ret += "<ul>";
    for(var i = 0; i < result['wordsDefined'].length; i++){
        ret += "<li>" + result['wordsDefined'][i] + "<p>" + result['wordDefinitions'][i] + "</p></li>";
    }
    chrome.storage.sync.remove(['wordsDefined', 'wordDefinitions']);
    ret += "</ul>";
    //console.log(ret);
}
    
})
// console.log(ret);
// return ret;
};

chrome.storage.sync.get(['dinoEmailChoice'], function(result) {
    var dinoEmailChoice = Object.keys(result).length != 0?result['dinoEmailChoice']:"yes";
    console.log('Email is currently ' + dinoEmailChoice);
    var checkBox = document.getElementById("email-choice");
    checkBox.checked = dinoEmailChoice=="yes"?true:false;
  });


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
