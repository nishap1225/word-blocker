function newWord() {
  var word = document.getElementById("new_word").value; 
  //document.getElementById("demo").innerHTML = word;
  //add word to storage
  chrome.storage.sync.set({word: word}, function() {
    console.log('Value is set to ' + word);
  });
  chrome.storage.sync.set({'two': 'test2'}, function() {
    console.log('Value is set to ' + 'test2');
  });

  // chrome.storage.local.get([word], function(result) {
  //   console.log('Value currently is ' + result.word);
  // });

  // chrome.storage.sync.set({key: value}, function() {
  //   console.log('Value is set to ' + value);
  // });
  
  chrome.storage.sync.get(null, function(result) {
    console.log('Value currently is ' + result);
    for (var key in result) {
      var storageItem = result[key];
      console.log('item' + storageItem);
    }

  });


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

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log('hello');
    for (var key in changes) {
      var storageChange = changes[key];
      console.log('Storage key "%s" in namespace "%s" changed. ' +
                  'Old value was "%s", new value is "%s".',
                  key,
                  namespace,
                  storageChange.oldValue,
                  storageChange.newValue);
    }
    //populateList();
  });

  //send the data to storage 