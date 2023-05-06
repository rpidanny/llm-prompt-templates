import { QuestionTemplate, WriteTests, ImproveCode, CodeErrorTemplate } from './templates';

const CLASS_SELECTED = 'bg-gray-200';
const CLASS_OPTIONS = [
  'p-2',
  'cursor-pointer',
  'hover:bg-gray-200',
  'dark:hover:bg-gray-800',
];
const SELECTOR_TEXTAREA = 'div.relative > textarea';

const templates: Template[] = [
  {
    name: 'Question',
    content: QuestionTemplate,
  },
  {
    name: 'Write Tests',
    content: WriteTests,
  },
  {
    name: 'Improve Code',
    content: ImproveCode,
  },
  {
    name: 'Error Template',
    content: CodeErrorTemplate,
  },
  {
    name: 'Question',
    content: QuestionTemplate,
  },
  {
    name: 'Write Tests',
    content: WriteTests,
  },
  {
    name: 'Improve Code',
    content: ImproveCode,
  },
  {
    name: 'Error Template',
    content: CodeErrorTemplate,
  },
];

interface Template {
  name: string;
  content: string;
}

export class ChatGPTDom {
  selectedIndex = -1;
  textArea!: HTMLTextAreaElement;
  templatesList!: HTMLUListElement;
  selectTemplatesMode = false;

  constructor() {
    this.init = this.init.bind(this);
  }

  async init() {
    console.log('Initializing ChatGPTDom');
    this.textArea = await this.getTextArea();
    await this.addTemplates();
    await this.addEventListeners();
  }

  async getTextArea(): Promise<HTMLTextAreaElement> {
    const textArea =
      document.querySelector<HTMLTextAreaElement>(SELECTOR_TEXTAREA);

    if (!textArea) throw new Error('Could not find text area');

    return textArea;
  }

  async addTemplates() {
    const parent = this.textArea.parentNode;
    if (!parent) throw new Error('Could not find parent node');

    const dropdown = document.createElement('ul');
    dropdown.classList.add('templates-list');
    dropdown.style.maxHeight = this.textArea.style.maxHeight;
    dropdown.style.overflowY = 'scroll';

    for (const template of templates) {
      const option = document.createElement('div');
      option.classList.add(...CLASS_OPTIONS);
      option.textContent = template.name;
      option.addEventListener('click', () => {
        this.selectTemplatesMode = false;
        this.simulateTyping(template.content);
        dropdown.style.display = 'none';
      });
      dropdown.appendChild(option);
    }
    dropdown.style.display = 'none';

    parent.insertBefore(dropdown, this.textArea.nextSibling);
    this.templatesList = dropdown;
  }

  async showTemplates() {
    this.templatesList.style.display = 'block';
  }

  async hideTemplates() {
    this.templatesList.style.display = 'none';
  }

  async addEventListeners() {
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

    document.addEventListener('keydown', (e) => {
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
        e.preventDefault();
        this.selectTemplate(this.selectedIndex);
      }
    });
  }

  // updateSelectedTemplate(index: number) {
  //   console.log('Updating selected template to', index);
  //   for (let i = 0; i < this.templatesList.children.length; i++) {
  //     this.templatesList.children[i].classList.remove(CLASS_SELECTED);
  //   }

  //   this.templatesList.children[index].classList.add(CLASS_SELECTED);
  // }

  updateSelectedTemplate(index: number) {
    console.log('Updating selected template to', index);

    const items = this.templatesList.children as unknown as HTMLElement[];
    const visibleItemsCount = Math.floor(this.templatesList.offsetHeight / items[0].offsetHeight);
    const firstVisibleIndex = Math.floor(this.templatesList.scrollTop / items[0].offsetHeight);
    const lastVisibleIndex = firstVisibleIndex + visibleItemsCount - 1;

    // Remove the "selected" class from all templates
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove(CLASS_SELECTED);
    }

    // Add the "selected" class to the template at the given index
    items[index].classList.add(CLASS_SELECTED);

    // Scroll down if last visible item is selected and down arrow key is pressed
    if (index >= lastVisibleIndex && index < items.length - 1) {
      const scrollPosition = (index - visibleItemsCount + 2) * items[0].offsetHeight;
      this.templatesList.scrollTop = scrollPosition;
    }

    // Scroll up if first visible item is selected and up arrow key is pressed
    if (index <= firstVisibleIndex && index > 0) {
      const scrollPosition = (index - 1) * items[0].offsetHeight;
      this.templatesList.scrollTop = scrollPosition;
    }
  }


  selectTemplate(index: number) {
    console.log('Selecting template at index', index);
    this.selectTemplatesMode = false;

    const template = templates[index];
    this.simulateTyping(template.content);
    this.textArea.style.height = `${
      template.content.split('\n').length * 24
    }px`;
    this.hideTemplates();
  }

  simulateTyping(text: string) {
    this.textArea.value = '';
    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= text.length) {
        clearInterval(intervalId);
        return;
      }
      const char = text[i];
      this.textArea.value += text[i];
      const event = new KeyboardEvent('keypress', { key: char });
      this.textArea.dispatchEvent(event);
      this.textArea.style.height = this.textArea.scrollHeight + 'px';
      i++;
    }, 20); // type one character every 20ms
  }
}
