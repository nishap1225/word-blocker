// document.body.querySelectorAll('*').forEach(function(node) {
//     chrome.storage.sync.get(null, function(result) {  
//     var storageArray = result['words']; 
//     var nodeLength = node.innerText.length;
//     if (storageArray != null) {
//         for (var i = 0; i < storageArray.length; i++) {
//             var length = storageArray[i].length; 
//             var censor = new Array(length+1).join('*');
//             var textSearch = node.innerText;
//             var searchLength = nodeLength;
//             //var wholeIndex = 0;
//             var index = textSearch.indexOf(storageArray[i]);
//             var check = index;
//             //while (index !== -1) {
//             while (check !== -1) {
//                   //innerHTML
//                 //wholeIndex += index;
  
//                 console.log("Word reached!");
//                 // ***** 
//                 // var length = node.innerText.length; 
//                 // var censor = new Array(length + 1).join('*');
//                 // node.innerText = censor; 
//                 //index += nodeLength - searchLength;
                
//                 //node.innerText = node.innerText.slice(0, wholeIndex) + censor + node.innerText.slice(wholeIndex + length);
//                 console.log('node', node.innerText.slice(index, index + length));
//                 node.innerText = node.innerText.slice(0, index) + censor + node.innerText.slice(index + length);
//                 textSearch = node.innerText.slice(index + length);
//                 searchLength = textSearch.length;
//                 //index = textSearch.indexOf(storageArray[i]);
//                 check = textSearch.indexOf(storageArray[i]);
//                 index += check;
//                 //wholeIndex += index + length;
                
//             }  
//         }
//     }
//     });
// });

var elements = document.getElementsByTagName('*');
for (var i = 0; i < elements.length; i++) {
    var element = elements[i]; 
    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j]; 
        if (node.nodeType === 3) {
            var storageArray; 
            chrome.storage.sync.get(null, function(result) {  
                storageArray = result['words']; 
            });
            //console.log('got storage array');
            if (storageArray != null) {
                //console.log('array is not null');
                var text = node.nodeValue; 
                for (var i = 0; i < storageArray.length; i++) {
                    var word = storageArray[i]; 
                    var length = storageArray[i].length; 
                    var censor = new Array(length+1).join('*');
                    var replacedText = text.replace(word,censor);
                    if (replacedText.localeCompare(text) != 0) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                } 
            }
        }
    }
}
//things to worry about: case sensitivity; doesn't work websites; kind of unreliable :) 

//Add a new function to the HTMLElement object so it cna be used on any HTMLElement
// HTMLElement.prototype.textNodes = function() {
//     return [...this.childNodes].filter((node) => {
//       return (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "");
//     });
//   }
  
//   //Use the new HTMLElement function
//   document.addEventListener('DOMContentLoaded', () => {
//     document.querySelector('#replaceAll').addEventListener('click', () => {
//       document.querySelector('#testSubject').textNodes().forEach((node) => {
//         console.log(node.textContent);
//         node.textContent = 'Replaced';
//       });
//     });
  
//     document.querySelector('#replaceFirst').addEventListener('click', function() {
//       document.querySelector('#testSubject').textNodes()[0].textContent = 'Replaced First';
//     });
//   });
  