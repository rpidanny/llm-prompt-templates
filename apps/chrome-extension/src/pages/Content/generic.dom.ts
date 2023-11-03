import { IPrompt } from '@rpidanny/llm-prompt-templates';

import { BaseDom } from './base.dom';

export class GenericDom extends BaseDom {
  protected name = 'Generic';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected addCustomTrigger() {}

  protected usePrompt(prompt: IPrompt) {
    this.copyPromptToClipboard(prompt);
  }
}

function init() {
  const genericDom = new GenericDom();

  setTimeout(genericDom.init, 1000);
}

init();
