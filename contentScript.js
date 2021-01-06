// var script = document.createElement('script');
// script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

// $(document).ready(function () {
//     $( "div:contains('John')" ).css( "text-decoration", "underline" );
//   });

document.body.querySelectorAll('*').forEach(function(node) {
    chrome.storage.sync.get(null, function(result) {  
    var storageArray = result['words']; 
    if (storageArray != null) {
        for (var i = 0; i < storageArray.length; i++) {
            var index = node.innerText.indexOf(storageArray[i]);  //innerHTML
            if(index !== -1) {
                console.log("Word reached!");
                // ***** 
                // var length = node.innerText.length; 
                // var censor = new Array(length + 1).join('*');
                // node.innerText = censor; 
                var length = storageArray[i].length; 
                var censor = new Array(length+1).join('*');
                node.innerText = node.innerText.slice(0, index) + censor + node.innerText.slice(index + length);
            }
        }
    }
    });
});

//things to worry about: case sensitivity; doesn't work websites; kind of unreliable :) 