import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TemplateList from './components/TemplateList';
import { ITemplate, PromptTemplates } from './templates';

export abstract class BaseDom {
  protected abstract name: string;
  protected abstract textAreaSelector: string;
  protected abstract templateClasses: string[];
  protected abstract selectedClassName: string;

  selectedIndex = -1;
  textArea!: HTMLTextAreaElement;
  templatesList!: HTMLDivElement;
  selectTemplatesMode = false;

  constructor() {
    this.init = this.init.bind(this);
    this.handleTemplateSelected = this.handleTemplateSelected.bind(this);
  }

  protected abstract setText(text: string): void;

  async init() {
    console.log(`Initializing ${this.name} DOM`);
    this.textArea = this.getTextArea();
    this.templatesList = await this.createTemplatesElement();
    await this.addEventListeners();
  }

  private async handleTemplateSelected(template: ITemplate) {
    console.log(`Selected template: ${template.name}`);
    this.selectTemplatesMode = false;
    this.setText(template.content);
    this.hideTemplates();
  }

  private getTextArea(): HTMLTextAreaElement {
    if (this.textArea) return this.textArea;

    const textArea = document.querySelector<HTMLTextAreaElement>(
      this.textAreaSelector
    );

    if (!textArea) throw new Error('Could not find text area');

    return textArea;
  }

  private async createTemplatesElement(): Promise<HTMLDivElement> {
    const textArea = this.getTextArea();

    const parent = textArea.parentNode;
    if (!parent) throw new Error('Could not find parent node');

    const dropdown = document.createElement('div');
    dropdown.id = 'templates-list';
    dropdown.tabIndex = 0;
    dropdown.classList.add('templates-list');
    dropdown.style.maxHeight = textArea.style.maxHeight;
    dropdown.style.overflowY = 'scroll';

    parent.insertBefore(dropdown, textArea.nextElementSibling);
    return dropdown;
  }

  private async render() {
    ReactDOM.render(
      <TemplateList
        templates={PromptTemplates}
        visible={this.selectTemplatesMode}
        onItemSelected={this.handleTemplateSelected}
      />,
      this.templatesList
    );
  }

  private async showTemplates() {
    this.selectTemplatesMode = true;
    this.templatesList.style.display = 'block';
    this.render();
    this.templatesList.focus();
  }

  private async hideTemplates() {
    this.selectTemplatesMode = false;
    this.templatesList.style.display = 'none';
    this.render();
  }

  private async addEventListeners() {
    // hotkeys listener
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        console.log('Closing templates');
        this.hideTemplates();
      } else if (event.ctrlKey && event.key === 't') {
        console.log('Hotkey pressed');
        this.showTemplates();
      }
    });

    // textarea listener
    this.getTextArea().addEventListener('input', async (event) => {
      const input = event.target as HTMLTextAreaElement;
      const text = input.value;

      if (text === '/templates') {
        this.showTemplates();
      } else if (this.selectTemplatesMode) {
        this.hideTemplates();
      }
    });
  }
}
