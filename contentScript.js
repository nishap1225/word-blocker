chrome.storage.sync.get(null, function(result) {  
    var storageArray = result['words'];
    var block_similar = result['similar'];
    if (block_similar) {
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
        var elements = document.getElementsByTagName('*');
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i]; 
            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j]; 
                if (node.nodeType === 3) {
                    var text = node.nodeValue; 
                    var words = text.split(" ");
                    for (var k = 0; k < words.length; k++) {
                        var word = words[k];
                        
                    }
                }
            }
        }
    } else {
        console.log(storageArray); 
        if (storageArray != null) {
            var elements = document.getElementsByTagName('*');
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i]; 
                for (var j = 0; j < element.childNodes.length; j++) {
                    var node = element.childNodes[j]; 
                    if (node.nodeType === 3) {
                        var text = node.nodeValue; 
                        for (var k = 0; k < storageArray.length; k++) {
                            var word = storageArray[k]; 
                            var length = word.length; 
                            var censor = new Array(length+1).join('*');
                            var regEx = new RegExp(word, "ig"); 
                            var replacedText = text.replaceAll(regEx,censor);
                            if (replacedText !== text) { //replacedText.localeCompare(text) != 0
                                console.log('replacing text');
                                element.replaceChild(document.createTextNode(replacedText), node);
                            }
                        } 
                    }
                }
            }
        }

    }
    
});