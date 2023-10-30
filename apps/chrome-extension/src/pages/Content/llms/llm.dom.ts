import { BaseDom } from '../base.dom';

export abstract class LLMDom extends BaseDom {
  protected abstract name: string;
  protected abstract textAreaSelector: string;

  protected getTextArea(): HTMLTextAreaElement {
    const textArea = document.querySelector<HTMLTextAreaElement>(
      this.textAreaSelector
    );

    if (!textArea) {
      throw new Error('Could not find text area');
    }

    return textArea;
  }

  protected addCustomTrigger() {
    this.getTextArea().addEventListener('input', (event) => {
      const input = event.target as HTMLTextAreaElement;
      const text = input.value;

      if (text === '/templates' || text === '/lpt') {
        this.showPrompts();
      } else if (this.isPromptsViewOpen) {
        this.hidePrompts();
      }
    });
  }
}
