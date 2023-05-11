import { BaseDom } from '../../base.dom';

export class BardDom extends BaseDom {
  protected name = 'Bard';
  protected textAreaSelector = 'div > textarea';

  protected setText(text: string) {
    const textArea = this.getTextArea();
    console.log('Setting text', text);
    textArea.focus();
    textArea.value = text;
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
