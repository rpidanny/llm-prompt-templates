import { BaseDom } from '../../base.dom';

export class ChatGPTDom extends BaseDom {
  protected name = 'ChatGPT';
  protected textAreaSelector = 'div.relative > textarea';

  protected setText(text: string) {
    const textArea = this.getTextArea();
    console.log('Setting text', text);
    textArea.focus();
    textArea.value = text;
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
