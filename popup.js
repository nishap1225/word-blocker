function newWord() {
  var word = document.getElementById("new_word").value; 
  //document.getElementById("demo").innerHTML = word; 

}

function populateList() {
  var ul = document.getElementById("list");
  for (var i = 0; i < toppings.length; i++) { //fix 
    var word = toppings[i]; //fix 

    var listItem = document.createElement("li");
    listItem.textContent = word;
    ul.appendChild(listItem);
  }
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