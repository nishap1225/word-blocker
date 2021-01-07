// var script = document.createElement('script');
// script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

// $(document).ready(function () {
//     $( "div:contains('John')" ).css( "text-decoration", "underline" );
//   });

document.body.querySelectorAll('*').forEach(function(node) {
    console.log('NEW NODE');
    chrome.storage.sync.get(null, function(result) {  
    var storageArray = result['words']; 
    var nodeLength = node.innerText.length;
    if (storageArray != null) {
        for (var i = 0; i < storageArray.length; i++) {
            var length = storageArray[i].length; 
            var censor = new Array(length+1).join('*');
            var textSearch = node.innerText;
            var searchLength = nodeLength;
            //var wholeIndex = 0;
            var index = textSearch.indexOf(storageArray[i]);
            var check = index;
            //while (index !== -1) {
            while (check !== -1) {
                  //innerHTML
                //wholeIndex += index;
  
                console.log("Word reached!");
                // ***** 
                // var length = node.innerText.length; 
                // var censor = new Array(length + 1).join('*');
                // node.innerText = censor; 
                //index += nodeLength - searchLength;
                
                //node.innerText = node.innerText.slice(0, wholeIndex) + censor + node.innerText.slice(wholeIndex + length);
                console.log('node', node.innerText.slice(index, index + length));
                node.innerText = node.innerText.slice(0, index) + censor + node.innerText.slice(index + length);
                textSearch = node.innerText.slice(index + length);
                searchLength = textSearch.length;
                //index = textSearch.indexOf(storageArray[i]);
                check = textSearch.indexOf(storageArray[i]);
                index += check;
                //wholeIndex += index + length;
                
            }  
        }
    }
    });
});

//things to worry about: case sensitivity; doesn't work websites; kind of unreliable :) 