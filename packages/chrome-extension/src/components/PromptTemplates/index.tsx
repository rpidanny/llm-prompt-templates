import './styles.css';

import { IPromptTemplate } from '@rpidanny/llm-prompt-templates';
import { List, Modal, Tag } from 'antd';
import React, { Component } from 'react';

type Props = {
  visible: boolean;
  templates: IPromptTemplate[];
  onCancel: () => void;
  onItemSelected: (template: IPromptTemplate) => void;
};

type State = object;

class PromptTemplates extends Component<Props, State> {
  render() {
    const { templates, visible, onCancel } = this.props;

    return (
      <Modal
        title={
          <a href="https://github.com/rpidanny/llm-prompt-templates">
            LLM Prompt Templates
          </a>
        }
        centered
        open={visible}
        onCancel={onCancel}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
        width={'70%'}
        footer={null}
      >
        <div>
          <List
            itemLayout="horizontal"
            size="small"
            bordered
            style={{ maxHeight: '80vh', overflowY: 'scroll' }}
            dataSource={templates}
            renderItem={(item, idx) => (
              <List.Item
                key={item.name}
                actions={
                  item.paper
                    ? [
                        <a
                          href={item.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Tag color="green">Paper</Tag>
                        </a>,
                      ]
                    : []
                }
                extra={
                  <div>
                    {item.tags?.map((tag) => (
                      <Tag key={tag} bordered={false} color="blue">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                }
                onClick={() => this.handleItemClick(idx)}
                className={'template-list-item'}
              >
                <List.Item.Meta
                  title={item.name}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>
    );
  }

  private handleItemClick(index: number) {
    const { onItemSelected, templates } = this.props;

    onItemSelected(templates[index]);
  }
}

export default PromptTemplates;
