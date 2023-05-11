import { IPrompt } from '@rpidanny/llm-prompt-templates';
import { message } from 'antd';

import { BaseDom } from './base.dom';

export class GenericDom extends BaseDom {
  protected name = 'Generic';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected addCustomTrigger() {}

  protected usePrompt(prompt: IPrompt) {
    const clipboardItem = new ClipboardItem({
      'text/plain': new Blob([prompt.content], { type: 'text/plain' }),
    });
    navigator.clipboard.write([clipboardItem]);

    message.info(`${prompt.name} prompt copied to clipboard`);
  }
}

function init() {
  const genericDom = new GenericDom();

  setTimeout(genericDom.init, 1000);
}

init();
