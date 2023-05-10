/// <reference types="chrome" />

import './styles.css';

import {
  IPromptTemplate,
  PromptTemplateCategory,
} from '@rpidanny/llm-prompt-templates';
import { List, Modal, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import {
  IPromptCategories,
  IPromptCategory,
} from '../../pages/Content/templates';

const { Text } = Typography;

type Props = {
  visible: boolean;
  promptCategories: IPromptCategories;
  onCancel: () => void;
  onItemSelected: (template: IPromptTemplate) => void;
};

const PromptTemplates: React.FC<Props> = ({
  visible,
  promptCategories,
  onCancel,
  onItemSelected,
}) => {
  const localStorageKey = 'enabledPromptCategories';

  const [enabledCategories, setEnabledCategories] = useState<string[]>([]);

  useEffect(() => {
    chrome.storage.local.get(
      [localStorageKey],
      (result: { [x: string]: string }) => {
        if (result[localStorageKey]) {
          setEnabledCategories(result[localStorageKey].split(','));
        } else {
          setEnabledCategories(Object.keys(PromptTemplateCategory));
        }
      }
    );
  }, [visible]);

  const handleItemClick = (group: PromptTemplateCategory, index: number) => {
    onItemSelected(promptCategories[group].prompts[index]);
  };

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
      width={'80%'}
      footer={null}
    >
      <div style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
        {(
          Object.entries(promptCategories) as [
            PromptTemplateCategory,
            IPromptCategory
          ][]
        )
          .filter(([categoryName]) => enabledCategories.includes(categoryName))
          .map(([categoryName, category]) => (
            <List
              itemLayout="horizontal"
              size="small"
              header={
                <Text strong>
                  {category.emoji} {categoryName}
                </Text>
              }
              bordered
              dataSource={category.prompts}
              style={{ marginBottom: '1rem' }}
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
                  onClick={() =>
                    handleItemClick(categoryName as PromptTemplateCategory, idx)
                  }
                  className={'template-list-item'}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          ))}
      </div>
    </Modal>
  );
};

export default PromptTemplates;
