import React, { Component, KeyboardEvent } from 'react';

import { ITemplate } from '../../templates';

type Props = {
  visible: boolean;
  templates: ITemplate[];
  onItemSelected?: (template: ITemplate) => void;
};

type State = {
  selectedItemIndex: number | null;
};

class TemplateList extends Component<Props, State> {
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
    if (this.props.onItemSelected) {
      this.props.onItemSelected(this.props.templates[index]);
    }
  };

  handleKeyDown(event: KeyboardEvent) {
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
          console.log('Preventing enter event');
          // Prevent default behavior
          event.preventDefault();
          // Stop event propagation
          event.stopPropagation();
          this.handleItemClick(selectedItemIndex);
        }
        break;

      default:
        break;
    }

    if (selectedItemIndex !== null) {
      const itemElement = document.getElementById(`item-${selectedItemIndex}`);

      if (itemElement) {
        itemElement.scrollIntoView({
          block: 'center',
        });
      }
    }
  }

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
      <div>
        {templates.map((template: ITemplate, index: number) => (
          <div
            id={`item-${index}`}
            key={index}
            onClick={() => this.handleItemClick(index)}
            onKeyPress={(event) => this.handleKeyPress(event, index)}
            tabIndex={0}
            style={{
              cursor: 'pointer',
              border: selectedItemIndex === index ? '2px solid' : 'none',
            }}
          >
            <p className="template-name">{template.name}</p>
            <p className="template-description">{template.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default TemplateList;
