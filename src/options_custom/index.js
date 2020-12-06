var Http = new XMLHttpRequest();
var userEmail = "";
var ret = "";
chrome.identity.getProfileUserInfo(function(info){
    userEmail = info.email;
});

document.getElementById('tester').addEventListener("click", function (){
    document.getElementById('tester').innerHTML = "brobro";
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