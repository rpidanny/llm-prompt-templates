import { IPromptTemplate } from '@rpidanny/llm-prompt-templates';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import PromptTemplates from './components/PromptTemplates';
import { promptTemplates } from './templates';

export abstract class BaseDom {
  protected abstract name: string;
  protected abstract textAreaSelector: string;

  templatesView!: HTMLDivElement;
  isTemplatesViewOpen = false;

  constructor() {
    this.init = this.init.bind(this);
    this.handleTemplateSelected = this.handleTemplateSelected.bind(this);
    this.hideTemplates = this.hideTemplates.bind(this);
  }

  protected abstract setText(text: string): void;

  init() {
    console.log(`Initializing ${this.name} DOM`);
    this.templatesView = this.createTemplatesElement();
    this.addEventListeners();
  }

  protected getTextArea(): HTMLTextAreaElement {
    const textArea = document.querySelector<HTMLTextAreaElement>(
      this.textAreaSelector
    );

    if (!textArea) throw new Error('Could not find text area');

    return textArea;
  }

  private handleTemplateSelected(template: IPromptTemplate): void {
    this.isTemplatesViewOpen = false;
    this.setText(template.content);
    this.hideTemplates();
  }

  private createTemplatesElement(): HTMLDivElement {
    const templatesView = document.createElement('div');
    document.body.appendChild(templatesView);
    return templatesView;
  }

  private render() {
    ReactDOM.render(
      <PromptTemplates
        templates={promptTemplates}
        visible={this.isTemplatesViewOpen}
        onItemSelected={this.handleTemplateSelected}
        onCancel={this.hideTemplates}
      />,
      this.templatesView
    );
  }

  private showTemplates() {
    this.isTemplatesViewOpen = true;
    this.render();
    this.templatesView.focus();
  }

  private hideTemplates() {
    this.isTemplatesViewOpen = false;
    this.render();
  }

  private addHotKeysEventListener() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'q') {
        this.hideTemplates();
      } else if (event.ctrlKey && event.key === 't') {
        this.showTemplates();
      }
    });
  }

  private addTextAreaEventListener() {
    this.getTextArea().addEventListener('input', (event) => {
      const input = event.target as HTMLTextAreaElement;
      const text = input.value;

      if (text === '/templates') {
        this.showTemplates();
      } else if (this.isTemplatesViewOpen) {
        this.hideTemplates();
      }
    });
  }

  private addEventListeners() {
    this.addHotKeysEventListener();
    this.addTextAreaEventListener();
  }
}
