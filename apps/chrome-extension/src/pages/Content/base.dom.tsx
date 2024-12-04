import { IPrompt } from '@rpidanny/llm-prompt-templates';
import { message } from 'antd';
import mixpanel from 'mixpanel-browser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Metrics } from './metrics';
import { groupedPrompts } from './prompts';
import PromptsView from './PromptsView';

mixpanel.init('1eb7876e8cc0adf4a46631b5ba85b4d5');

export abstract class BaseDom {
  protected abstract name: string;

  promptsView!: HTMLDivElement;
  isPromptsViewOpen = false;

  constructor() {
    this.init = this.init.bind(this);
    this.handlePromptSelected = this.handlePromptSelected.bind(this);
    this.hidePrompts = this.hidePrompts.bind(this);
  }

  protected abstract addCustomTrigger(): void;
  protected abstract usePrompt(prompt: IPrompt): void;

  init() {
    console.log(`Initializing ${this.name} DOM`);
    mixpanel.identify('local');

    this.promptsView = this.createPromptsElement();
    this.addTriggers();
  }

  private handlePromptSelected(prompt: IPrompt): void {
    console.log('Saving prompt selected metric');
    mixpanel.track(Metrics.PromptSelected, {
      promptName: prompt.name,
      promptCategory: prompt.category,
    });

    this.isPromptsViewOpen = false;
    try {
      this.usePrompt(prompt);
    } catch (error) {
      console.error(error);
      message.error(
        'Failed to use prompt. Copying prompt to clipboard instead.',
        5
      );
      this.copyPromptToClipboard(prompt);
    }
    this.hidePrompts();
  }

  private createPromptsElement(): HTMLDivElement {
    const promptsView = document.createElement('div');
    document.body.appendChild(promptsView);
    return promptsView;
  }

  private async render() {
    ReactDOM.render(
      <PromptsView
        groupedPrompts={groupedPrompts}
        visible={this.isPromptsViewOpen}
        onItemSelected={this.handlePromptSelected}
        onCancel={this.hidePrompts}
      />,
      this.promptsView
    );
  }

  protected copyPromptToClipboard(prompt: IPrompt) {
    const clipboardItem = new ClipboardItem({
      'text/plain': new Blob([prompt.content], { type: 'text/plain' }),
    });
    navigator.clipboard.write([clipboardItem]);

    message.info(`${prompt.name} prompt copied to clipboard`, 7);
  }

  protected async showPrompts() {
    mixpanel.track(Metrics.PromptListShown);

    this.isPromptsViewOpen = true;
    await this.render();
    this.promptsView.focus();
  }

  protected async hidePrompts() {
    this.isPromptsViewOpen = false;
    await this.render();
  }

  private addHotKeysTrigger() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'q') {
        this.hidePrompts();
      } else if (
        (event.ctrlKey && event.key === 't') ||
        ((event.altKey ||
          event.code === 'AltLeft' ||
          event.code === 'AltRight') &&
          event.shiftKey &&
          event.code === 'KeyP')
      ) {
        this.showPrompts();
      }
    });
  }

  private addTriggers() {
    this.addHotKeysTrigger();
    this.addCustomTrigger();
  }
}
