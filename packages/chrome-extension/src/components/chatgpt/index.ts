import { ChatGPTDom } from './chatgpt.dom';

function init() {
  const chatGPTDom = new ChatGPTDom();

  setTimeout(chatGPTDom.init, 1000);
}


init();
