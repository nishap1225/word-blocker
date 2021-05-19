// <!-- Load TensorFlow.js. This is required to use the qna model. -->
// <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"> </script>
// <!-- Load the qna model. -->
// <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/qna"> </script>

// <!-- Place your code in the script tag below. You can also use an external .js file -->
// <script>
//   // Notice there is no 'import' statement. 'qna' and 'tf' is
//   // available on the index-page because of the script tag above.
//   // Load the model.
//   qna.load().then(model => {
//     model.findAnswers(question, passage).then(answers => {
//       console.log('Answers: ', answers);
//     });
//   });
// </script>

chrome.storage.sync.get(null, function(result) {  
    var storageArray = result['words'];
    var block_similar = result['similar'];
    var block_sentences = result['passage'];
    var elements = document.getElementsByTagName('*');
    if (block_similar) {
        console.log('block similar is true');
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
        var script_two = document.createElement('script');
        script_two.src = 'https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder';
        //script_two.src = 'https://cdn.jsdelivr.net/npm/@tensorflow-models/qna';
        script_two.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script_two);

        
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
        //require('@tensorflow/tfjs');
        //const use = require('@tensorflow-models/universal-sentence-encoder');
        // qna.load().then(model => {
        //     // Embed an array of sentences.
        //     model.embed(sentences).then(embeddings => {
        //     // `embeddings` is a 2D tensor consisting of the 512-dimensional embeddings for each sentence.
        //     // So in this example `embeddings` has the shape [2, 512].
        //         console.log('embedded sentences');
        //     });
        // });
        window.onload = function() {
            qna.load().then(model => {
                // Embed an array of sentences.
                model.embed(sentences).then(embeddings => {
                // `embeddings` is a 2D tensor consisting of the 512-dimensional embeddings for each sentence.
                // So in this example `embeddings` has the shape [2, 512].
                    console.log('embedded sentences');
                });
            });
          };
  

    } else if (block_sentences) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i]; 
            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j]; 
                if (node.nodeType === 3) {
                    var text = node.nodeValue; 
                    var these_sentences = text.split(/[.!?]+\s*/); //might not work 
                    for (var k = 0; k < these_sentences.length; k++) {
                        for (var l = 0; l < storageArray.length; l++) {
                            var word = storageArray[l]; 
                            if (these_sentences[k].includes(word)){
                                var length = these_sentences[k].length; 
                                var censor = new Array(length+1).join('*');
                                var regEx = new RegExp(these_sentences[k], "ig"); 
                                var replacedText = text.replaceAll(regEx,censor);
                                if (replacedText !== text) { //replacedText.localeCompare(text) != 0
                                    text = replacedText;
                                    
                                }
                                break; 
                            }
                            
                        }
                        
                    }
                    element.replaceChild(document.createTextNode(text), node);
                }
            }
        }

    } else {
        console.log(storageArray); 
        if (storageArray != null) {
            
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