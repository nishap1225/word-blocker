function newWord() {
  var word = document.getElementById("new_word").value; 
  //document.getElementById("demo").innerHTML = word; 
  
}

window.onload = function() {
  var button = document.getElementById("submit");
  if (button.addEventListener)
    button.addEventListener("click", newWord, false);
  else if (button.attachEvent)
    button.attachEvent('onclick', newWord);
}

  //add event listener in popup.js for a button 
  //send the data to storage 