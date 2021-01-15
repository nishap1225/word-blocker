chrome.storage.sync.get(null, function(result) {  
    var storageArray = result['words'];
    var block_similar = result['similar'];
    if (block_similar) {
        //<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs';
        //script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
        //<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder"></script>
        var script_two = document.createElement('script');
        script_two.src = 'https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder';
        //script_two.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script_two);

        var elements = document.getElementsByTagName('*');
        var list_indices = []; 
        var page_indices = []; 
        const sentences = []; 
        var sentences_index = 0; 
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i]; 
            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j]; 
                if (node.nodeType === 3) {
                    var text = node.nodeValue; 
                    var these_sentences = text.split(/[.!?]+\s*/); //might not work 
                    for (var k = 0; k < these_sentences.length; k++) {
                        if (these_sentences[k].length >= 3) { //filtering useless sentences 
                            sentences.push(these_sentences[k]);   
                            page_indices.push([i, j]); // [element number, node number]
                            for (var l = 0; l < storageArray.length; l++) {
                                if (these_sentences[k].includes(storageArray[l])){
                                    list_indices.push(sentences_index); 
                                    break; 
                                }
                            }
                            sentences_index++; 
                        }
                    }
                }
            }
        }
        // Load the model.
        use.load().then(model => {
            // Embed an array of sentences.
            model.embed(sentences).then(embeddings => {
            // `embeddings` is a 2D tensor consisting of the 512-dimensional embeddings for each sentence.
            // So in this example `embeddings` has the shape [2, 512].
                console.log('embedded sentences');
            });
        });
  

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