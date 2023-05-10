/// <reference types="chrome" />

import './styles.css';

import { IPrompt, PromptCategory } from '@rpidanny/llm-prompt-templates';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

import PromptsList from '../../components/PromptsList';
import { IGroupedPrompts, IPromptCategory } from './prompts';

type Props = {
  visible: boolean;
  groupedPrompts: IGroupedPrompts;
  onCancel: () => void;
  onItemSelected: (template: IPrompt) => void;
};

const PromptsView: React.FC<Props> = ({
  visible,
  groupedPrompts,
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
          setEnabledCategories(Object.keys(PromptCategory));
        }
      }
    );
  }, [visible]);

  return (
    <Modal
      title={
        <a
          href="https://github.com/rpidanny/llm-prompt-templates"
          target="_blank"
          style={{ textAlign: 'center' }}
        >
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
        {(Object.entries(groupedPrompts) as [PromptCategory, IPromptCategory][])
          .filter(([categoryName]) => enabledCategories.includes(categoryName))
          .map(([categoryName, category]) => (
            <PromptsList
              title={`${category.emoji} ${categoryName}`}
              prompts={category.prompts}
              onItemSelected={onItemSelected}
            />
          ))}
      </div>
    </Modal>
  );
};

export default PromptsView;
