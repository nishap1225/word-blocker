import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

console.log("from background")
// let active_tab_id = 0;
// chrome.tabs.onActivated.addListener(tab => {
//     chrome.tabs.get(tab.tabId, current_tab_info => {
//           active_tab_id = tab.tabId;
//           //chrome.tabs.insertCSS(null, {file: "./styles.css"});
//           //chrome.tabs.executeScript(null, {file: "./foreground.js"}, () => console.log("i injected"))
//           chrome.tabs.executeScript(null, {file: "./contentScript.js"}, () => console.log("i injected content"))
//     });
// }); //need to look for all the cases later, i.e. refresh the tab


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message == 'yo check the storage') {
//     chrome.tabs.sendMessage(active_tab_id, {message: 'yo i got your message'});
//     chrome.storage.local.get("password", value=> {
//       console.log(value);
//     })
//   }
// })
