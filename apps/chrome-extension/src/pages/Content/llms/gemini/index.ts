import { GeminiDom } from './gemini.dom';

function init() {
  const geminiDom = new GeminiDom();

  setTimeout(geminiDom.init, 1000);
}

init();
