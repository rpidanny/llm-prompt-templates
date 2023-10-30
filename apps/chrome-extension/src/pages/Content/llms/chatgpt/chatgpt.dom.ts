import { IPrompt } from '@rpidanny/llm-prompt-templates';

import { LLMDom } from '../llm.dom';

export class ChatGPTDom extends LLMDom {
  protected name = 'ChatGPT';
  protected textAreaSelector = 'div.relative > textarea';

  protected usePrompt(prompt: IPrompt) {
    const textArea = this.getTextArea();
    console.log('Setting text', prompt.content);
    textArea.focus();
    textArea.value = prompt.content;
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
