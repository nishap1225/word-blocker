function newWord() {
  var word = document.getElementById("new_word").value; 
  chrome.storage.sync.get(null, function(result) { //key is "words" for the array of words 
    var storageArray = result['words']; 
    if (storageArray == null) {
      storageArray = [word]; 
    } else {
      if (!storageArray.includes(word)) {
        //append to the popup
        var ul = document.getElementById("list");
        var listItem = document.createElement("li");
        listItem.textContent = word;
        listItem.id = word; 
        ul.appendChild(listItem); 
        storageArray.push(word); 
      }
    }
    chrome.storage.sync.set({'words': storageArray}, function() {
      console.log('Array is set to ' + storageArray);
    }); //later, make it so that there is no callback function 
  });
}

function deleteWord() {
  var word = document.getElementById("new_word").value; 
  chrome.storage.sync.get(null, function(result) { //key is "words" for the array of words 
  var storageArray = result['words']; 
  if (storageArray != null && storageArray.includes(word)) {
    var ul = document.getElementById("list");
    var li = document.getElementById(word);
    console.log(ul); 
    console.log(li); 
    ul.removeChild(li); 
    var index = storageArray.indexOf(word); 
    storageArray.splice(index, 1); 
    chrome.storage.sync.set({'words': storageArray}, function() {
      console.log('Array is set to ' + storageArray);
    });
  }
});
}

window.onload = function() {
  populateList(); //i think this should be called instead of new word 
  var button = document.getElementById("submit");
  if (button.addEventListener)
    button.addEventListener("click", newWord, false);
  else if (button.attachEvent)
    button.attachEvent('onclick', newWord);
  
  var delete_button = document.getElementById("delete");
  if (delete_button.addEventListener)
    delete_button.addEventListener("click", deleteWord, false);
  else if (delete_button.attachEvent)
    delete_button.attachEvent('onclick', deleteWord);
  
}

function populateList() { //called at the beginning 
  var ul = document.getElementById("list");
  chrome.storage.sync.get(null, function(result) { //inputting null gets everything in the storage
    var storageArray = result['words']; 
    for (i = 0; i < storageArray.length; i++) {
      var word = storageArray[i]; 
      var listItem = document.createElement("li");
      listItem.textContent = word;
      listItem.id = word; 
      ul.appendChild(listItem);
    }
  });
}



//   //add event listener in popup.js for a button 

//   chrome.storage.onChanged.addListener(function(changes, namespace) {
//     console.log('hello');
//     for (var key in changes) {
//       var storageChange = changes[key];
//       console.log('Storage key "%s" in namespace "%s" changed. ' +
//                   'Old value was "%s", new value is "%s".',
//                   key,
//                   namespace,
//                   storageChange.oldValue,
//                   storageChange.newValue);
//     }
//     //populateList();
//   });

  //send the data to storage 