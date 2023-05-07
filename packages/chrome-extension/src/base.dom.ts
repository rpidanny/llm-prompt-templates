import { templates } from './templates';

export abstract class BaseDom {
  protected abstract name: string;
  protected abstract textAreaSelector: string;
  protected abstract templateClasses: string[];
  protected abstract selectedClassName: string;

  selectedIndex = -1;
  textArea!: HTMLTextAreaElement;
  templatesList!: HTMLUListElement;
  selectTemplatesMode = false;

  constructor() {
    this.init = this.init.bind(this);
  }

  protected abstract setText(text: string): void;

  async init() {
    console.log(`Initializing ${this.name} DOM`);
    this.textArea = await this.getTextArea();
    this.templatesList = await this.addTemplates();
    await this.addEventListeners();
  }

  private async getTextArea(): Promise<HTMLTextAreaElement> {
    const textArea = document.querySelector<HTMLTextAreaElement>(
      this.textAreaSelector
    );

    if (!textArea) throw new Error('Could not find text area');

    return textArea;
  }

  private async addTemplates(): Promise<HTMLUListElement> {
    const parent = this.textArea.parentNode;
    if (!parent) throw new Error('Could not find parent node');

    const dropdown = document.createElement('ul');
    dropdown.classList.add('templates-list');
    dropdown.style.maxHeight = this.textArea.style.maxHeight;
    dropdown.style.overflowY = 'scroll';

    for (const template of templates) {
      const option = document.createElement('div');
      option.classList.add(...this.templateClasses);
      option.textContent = template.name;
      option.addEventListener('click', () => {
        this.selectTemplatesMode = false;
        this.setText(template.content);
        dropdown.style.display = 'none';
      });
      dropdown.appendChild(option);
    }
    dropdown.style.display = 'none';

    parent.insertBefore(dropdown, this.textArea.nextSibling);
    return dropdown;
  }

  private async showTemplates() {
    this.templatesList.style.display = 'block';
  }

  private async hideTemplates() {
    this.templatesList.style.display = 'none';
  }

  private async addEventListeners() {
    this.textArea.addEventListener('input', async (event) => {
      const input = event.target as HTMLTextAreaElement;
      const text = input.value;
      if (text === '/templates') {
        this.selectTemplatesMode = true;
        const rect = this.textArea.getBoundingClientRect();
        this.templatesList.style.top = `${
          rect.top + this.textArea.offsetHeight
        }px`;
        this.templatesList.style.left = `${rect.left}px`;

        this.showTemplates();
      } else {
        this.selectTemplatesMode = false;
        this.hideTemplates();
      }
    });

    this.textArea.addEventListener('keydown', (e) => {
      if (!this.selectTemplatesMode) return;

      if (e.key === 'ArrowUp' && this.selectedIndex > 0) {
        // Up arrow key pressed
        this.selectedIndex--;
        this.updateSelectedTemplate(this.selectedIndex);
      } else if (
        e.key === 'ArrowDown' &&
        this.selectedIndex < templates.length - 1
      ) {
        // Down arrow key pressed
        this.selectedIndex++;
        this.updateSelectedTemplate(this.selectedIndex);
      } else if (e.key === 'Enter') {
        // Enter key pressed
        // Prevent default behavior
        e.preventDefault();
        // Stop event propagation
        e.stopPropagation();
        this.selectTemplate(this.selectedIndex);
      }
    });
  }

  private updateSelectedTemplate(index: number) {
    console.log('Updating selected template to', index);

    const items = this.templatesList.children as unknown as HTMLElement[];
    const visibleItemsCount = Math.floor(
      this.templatesList.offsetHeight / items[0].offsetHeight
    );
    const firstVisibleIndex = Math.floor(
      this.templatesList.scrollTop / items[0].offsetHeight
    );
    const lastVisibleIndex = firstVisibleIndex + visibleItemsCount - 1;

    // Remove the "selected" class from all templates
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove(this.selectedClassName);
    }

    // Add the "selected" class to the template at the given index
    items[index].classList.add(this.selectedClassName);

    // Scroll down if last visible item is selected and down arrow key is pressed
    if (index >= lastVisibleIndex && index < items.length - 1) {
      const scrollPosition =
        (index - visibleItemsCount + 2) * items[0].offsetHeight;
      this.templatesList.scrollTop = scrollPosition;
    }

    // Scroll up if first visible item is selected and up arrow key is pressed
    if (index <= firstVisibleIndex && index > 0) {
      const scrollPosition = (index - 1) * items[0].offsetHeight;
      this.templatesList.scrollTop = scrollPosition;
    }
  }

  private selectTemplate(index: number) {
    console.log('Selecting template at index', index);
    this.selectTemplatesMode = false;

    const template = templates[index];
    this.setText(template.content);
    this.textArea.style.height = `${
      template.content.split('\n').length * 24
    }px`;
    this.hideTemplates();
  }
}
