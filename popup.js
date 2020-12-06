var div = document.createElement("div");
div.setAttribute("id", "chromeextensionpopup");
div.innerText = formatAMPM(new Date());
document.body.appendChild(div);

var closelink = document.createElement("div");
closelink.setAttribute("id", "chromeextensionpopupcloselink");
closelink.innerText = 'X';
document.getElementById("chromeextensionpopup").appendChild(closelink);

function formatAMPM(date){
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  //alert(strTime);
  return strTime;
}


document.getElementById("chromeextensionpopupcloselink").addEventListener("click", removeExtensionPopup);


function removeExtensionPopup(){
    document.getElementById("chromeextensionpopup").outerHTML='';
}