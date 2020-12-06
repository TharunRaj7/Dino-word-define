var wordList = document.getElementById('wordList');
var appendText = "";
chrome.storage.sync.get(['wordsDefined'], function(result) {
    if (Object.keys(result).length == 0){
        return false;
    }
    words = result['wordsDefined'];

    for (var i = 0; i < words.length; i++){
        appendText += words[i].charAt(0).toUpperCase() + words[i].slice(1);
        appendText += "<br><br>";

    }
    wordList.innerHTML = appendText;
})