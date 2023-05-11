import { IPrompt } from '@rpidanny/llm-prompt-templates';

import { BaseDom } from '../../base.dom';

export class ChatGPTDom extends BaseDom {
  protected name = 'ChatGPT';
  protected textAreaSelector = 'div.relative > textarea';

  private getTextArea(): HTMLTextAreaElement {
    const textArea = document.querySelector<HTMLTextAreaElement>(
      this.textAreaSelector
    );

    if (!textArea) throw new Error('Could not find text area');

    return textArea;
  }

  protected addCustomTrigger() {
    this.getTextArea().addEventListener('input', (event) => {
      const input = event.target as HTMLTextAreaElement;
      const text = input.value;

      if (text === '/templates') {
        this.showPrompts();
      } else if (this.isPromptsViewOpen) {
        this.hidePrompts();
      }
    });
  }

  protected usePrompt(prompt: IPrompt) {
    const textArea = this.getTextArea();
    console.log('Setting text', prompt.content);
    textArea.focus();
    textArea.value = prompt.content;
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
