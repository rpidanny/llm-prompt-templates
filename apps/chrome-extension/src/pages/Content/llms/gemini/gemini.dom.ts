import { IPrompt } from '@rpidanny/llm-prompt-templates';

import { LLMDom } from '../llm.dom';

export class GeminiDom extends LLMDom {
  protected name = 'Gemini';
  protected textAreaSelector = 'rich-textarea > .ql-editor';

  protected usePrompt(prompt: IPrompt) {
    const textArea = this.getTextArea();
    console.log('Setting text', prompt.content);
    textArea.focus();
    textArea.textContent = prompt.content;
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
