import { BaseDom } from '../../base.dom';

export class ChatGPTDom extends BaseDom {
  protected name = 'ChatGPT';
  protected textAreaSelector = 'div.relative > textarea';
  protected templateClasses = [
    // 'p-2',
    // 'cursor-pointer',
    // 'hover:bg-gray-200',
    // 'dark:hover:bg-gray-800',
  ];
  protected selectedClassName = 'bg-gray-200';

  protected setText(text: string) {
    console.log('Setting text', text);
    this.textArea.focus();
    this.textArea.value = text;
    this.textArea.style.height = this.textArea.scrollHeight + 'px';
  }

  private simulateTyping(text: string) {
    this.textArea.value = '';
    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= text.length) {
        clearInterval(intervalId);
        return;
      }
      const char = text[i];
      this.textArea.value += text[i];
      const event = new KeyboardEvent('keypress', { key: char });
      this.textArea.dispatchEvent(event);
      this.textArea.style.height = this.textArea.scrollHeight + 'px';
      i++;
    }, 20); // type one character every 20ms
  }
}
