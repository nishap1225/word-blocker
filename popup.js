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

function switchBlockSimilar() {
  chrome.storage.sync.get(null, function(result) {
    var block_similar = result['similar'];
    chrome.storage.sync.set({'similar': !block_similar}, function() {
      //console.log('switch block similar to' + !block_similar);
      if (block_similar) {
        document.getElementById('block_similar').value = 'Block Similar Sentences: OFF';
      } else {
        document.getElementById('block_similar').value = 'Block Similar Sentences: ON';
      }
    });

  });

}

function switchBlockPassage() {
  chrome.storage.sync.get(null, function(result) {
    var block_passage = result['passage'];
    chrome.storage.sync.set({'passage': !block_passage}, function() {
      if (block_passage) {
        document.getElementById('block_passage').value = 'Block Whole Sentences: OFF';
      } else {
        document.getElementById('block_passage').value = 'Block Whole Sentences: ON';
      }
    });

  });

}


window.onload = function() {
  populateList(); //i think this should be called instead of new word
  //checking block passage
  chrome.storage.sync.get(null, function(result) {
    var block_passage = result['passage'];
    if (block_passage == null) {
      chrome.storage.sync.set({'passage': false});
    } else if (block_passage) {
      document.getElementById('block_passage').value = 'Block Whole Sentences: ON';
    }
  });
  //checking block similar
  chrome.storage.sync.get(null, function(result) {
    var block_passage = result['similar'];
    if (block_passage == null) {
      chrome.storage.sync.set({'similar': false});
    } else if (block_passage) {
      document.getElementById('block_similar').value = 'Block Similar Sentences: ON';
    }
  });
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

  var block_similar_button = document.getElementById("block_similar");
  if (block_similar_button.addEventListener)
    block_similar_button.addEventListener("click", switchBlockSimilar, false);
  else if (block_similar_button.attachEvent)
    block_similar_button.attachEvent('onclick', switchBlockSimilar);

  var block_passage_button = document.getElementById("block_passage");
  if (block_passage_button.addEventListener)
    block_passage_button.addEventListener("click", switchBlockPassage, false);
  else if (block_passage_button.attachEvent)
    block_passage_button.attachEvent('onclick', switchBlockPassage);
  
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