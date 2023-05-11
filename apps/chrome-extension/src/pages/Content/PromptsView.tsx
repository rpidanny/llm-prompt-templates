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
  const enabledPromptCategoryKey = 'enabledPromptCategories';
  const favoritePromptsKey = 'favoritePrompts';

  const [enabledCategories, setEnabledCategories] = useState<string[]>([]);
  const [favoritePrompts, setFavoritePrompts] = useState<IPrompt[]>([]);

  useEffect(() => {
    chrome.storage.local.get(
      [enabledPromptCategoryKey, favoritePromptsKey],
      (result: { [x: string]: string }) => {
        // enabledPromptCategoryKey
        if (result[enabledPromptCategoryKey]) {
          setEnabledCategories(result[enabledPromptCategoryKey].split(','));
        } else {
          setEnabledCategories(Object.keys(PromptCategory));
        }

        // favoritePromptsKey
        if (result[favoritePromptsKey]) {
          setFavoritePrompts(JSON.parse(result[favoritePromptsKey]));
        } else {
          setFavoritePrompts([]);
        }
      }
    );
  }, [visible]);

  const handleFavoriteClick = (item: IPrompt) => {
    const newFavoritePrompts = favoritePrompts.filter(
      (p) => p.name !== item.name
    );
    if (newFavoritePrompts.length === favoritePrompts.length) {
      newFavoritePrompts.push(item);
    }
    setFavoritePrompts(newFavoritePrompts);
    chrome.storage.local.set({
      [favoritePromptsKey]: JSON.stringify(newFavoritePrompts),
    });
  };

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
        {favoritePrompts.length > 0 && (
          <PromptsList
            title={`⭐️ Favorites`}
            prompts={favoritePrompts}
            favoritePrompts={new Set(favoritePrompts.map((p) => p.name))}
            onItemSelected={onItemSelected}
            onFavoriteClick={handleFavoriteClick}
          />
        )}
        {(Object.entries(groupedPrompts) as [PromptCategory, IPromptCategory][])
          .filter(([categoryName]) => enabledCategories.includes(categoryName))
          .map(([categoryName, category]) => (
            <PromptsList
              title={`${category.emoji} ${categoryName}`}
              prompts={category.prompts}
              favoritePrompts={new Set(favoritePrompts.map((p) => p.name))}
              onItemSelected={onItemSelected}
              onFavoriteClick={handleFavoriteClick}
            />
          ))}
      </div>
    </Modal>
  );
};

export default PromptsView;
