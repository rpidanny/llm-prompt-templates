import './styles.css';

import { ITemplate } from '@rpidanny/llm-prompt-templates';
import React, { Component, KeyboardEvent } from 'react';

type Props = {
  visible: boolean;
  templates: ITemplate[];
  onItemSelected?: (template: ITemplate) => void;
};

type State = {
  selectedItemIndex: number | null;
};

class TemplateList extends Component<Props, State> {
  private itemElements: HTMLDivElement[] = [];

  state: State = {
    selectedItemIndex: null,
  };

  componentDidMount() {
    document.addEventListener('keydown', (event) =>
      this.handleKeyDown(event as unknown as KeyboardEvent)
    );
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', (event) =>
      this.handleKeyDown(event as unknown as KeyboardEvent)
    );
  }

  handleItemClick = (index: number) => {
    const { onItemSelected, templates } = this.props;

    if (onItemSelected) {
      onItemSelected(templates[index]);
    }

    this.setState({
      selectedItemIndex: index,
    });

    this.itemElements[index].focus();
  };

  handleKeyDown = (event: KeyboardEvent) => {
    const { selectedItemIndex } = this.state;
    const { templates, visible } = this.props;
    if (!visible) return;

    switch (event.key) {
      case 'ArrowUp':
        this.setState({
          selectedItemIndex:
            selectedItemIndex != null ? Math.max(selectedItemIndex - 1, 0) : 0,
        });
        event.preventDefault();
        break;

      case 'ArrowDown':
        this.setState({
          selectedItemIndex:
            selectedItemIndex != null
              ? Math.min(selectedItemIndex + 1, templates.length - 1)
              : 0,
        });
        event.preventDefault();
        break;

      case 'Enter':
        if (selectedItemIndex != null) {
          event.preventDefault();
          event.stopPropagation();
          this.handleItemClick(selectedItemIndex);
        }
        break;

      default:
        break;
    }

    if (selectedItemIndex !== null) {
      const itemElement = this.itemElements[selectedItemIndex];

      if (itemElement) {
        itemElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    }
  };

  handleKeyPress = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === 'Enter') {
      this.handleItemClick(index);
    }
  };

  render() {
    const { selectedItemIndex } = this.state;
    const { templates, visible } = this.props;

    if (!visible) return;

    return (
      <div tabIndex={0}>
        {templates.map((template: ITemplate, index: number) => (
          <div
            id={`item-${index}`}
            ref={(element) =>
              (this.itemElements[index] = element as HTMLDivElement)
            }
            key={index}
            onClick={() => this.handleItemClick(index)}
            // onKeyPress={(event) => this.handleKeyPress(event, index)}
            // tabIndex={0}
            style={{
              // cursor: 'pointer',
              border: selectedItemIndex === index ? '1px solid' : 'none',
              borderRadius: '4px',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.1)',
              margin: '5px',
              padding: '3px',
            }}
          >
            <div className="template-title">
              <span className="template-name">{template.name}</span>
              {template.tags &&
                template.tags.map((tag: string) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
            </div>
            <div>
              <span className="template-description">
                {template.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default TemplateList;
