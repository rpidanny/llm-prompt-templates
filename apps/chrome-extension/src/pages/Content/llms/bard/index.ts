import { BardDom } from './bard.dom';

function init() {
  const bardDom = new BardDom();

  setTimeout(bardDom.init, 1000);
}

init();
