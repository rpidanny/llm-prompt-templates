/// <reference types="chrome" />
import { Select, Space, Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

interface PromptCategory {
  name: string;
  emoji: string;
}

interface SelectPromptCategoriesProps {
  promptCategories: PromptCategory[];
}

const colorOptions: Record<string, string> = {
  General: 'gold',
  Code: 'cyan',
};

function PromptCategoriesSelect({
  promptCategories,
}: SelectPromptCategoriesProps) {
  const localStorageKey = 'enabledPromptCategories';

  const [enabledPromptCategories, setEnabledPromptCategories] = useState<
    string[]
  >([]);

  useEffect(() => {
    chrome.storage.local.get(
      [localStorageKey],
      (result: { [x: string]: string }) => {
        if (result[localStorageKey]) {
          setEnabledPromptCategories(result[localStorageKey].split(','));
        }
      }
    );
  }, []);

  const handleChange = async (values: string[]) => {
    setEnabledPromptCategories(values);
    await chrome.storage.local.set({ [localStorageKey]: values.join(',') });
  };

  const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;

    console.log(props);

    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={colorOptions[value]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Select
      title="Select prompt types to enable"
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="select prompt types to enable"
      value={enabledPromptCategories}
      onChange={handleChange}
      optionLabelProp="label"
      tagRender={tagRender}
    >
      {promptCategories
        .filter((o) => !enabledPromptCategories.includes(o.name))
        .map((promptCategory) => (
          <Option value={promptCategory.name} label={promptCategory.name}>
            <Space>
              <span role="img" aria-label={promptCategory.name}>
                {promptCategory.emoji}
              </span>
              {promptCategory.name}
            </Space>
          </Option>
        ))}
    </Select>
  );
}

export default PromptCategoriesSelect;
