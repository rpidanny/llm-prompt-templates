import './styles.css';

import { StarOutlined, StarTwoTone } from '@ant-design/icons';
import { IPrompt } from '@rpidanny/llm-prompt-templates';
import { List, Tag, Typography } from 'antd';
import React, { MouseEvent } from 'react';

const { Text } = Typography;

type Props = {
  title: string;
  prompts: IPrompt[];
  favoritePromptsSet: Set<string>;
  onItemSelected: (template: IPrompt) => void;
  onFavoriteClick: (template: IPrompt) => void;
};

const PromptsList: React.FC<Props> = ({
  title,
  prompts,
  favoritePromptsSet,
  onItemSelected,
  onFavoriteClick,
}) => {
  const handleItemClick = (index: number) => {
    onItemSelected(prompts[index]);
  };

  const handleFavoriteClick = (item: IPrompt, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteClick(item);
  };

  return (
    <List
      itemLayout="horizontal"
      size="small"
      header={<Text strong>{title}</Text>}
      bordered
      dataSource={prompts}
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
          onClick={() => handleItemClick(idx)}
          className={'template-list-item'}
        >
          {favoritePromptsSet.has(item.name) ? (
            <StarTwoTone
              type="star"
              twoToneColor="gold"
              style={{ fontSize: '20px', marginRight: '12px' }}
              onClick={(e) => handleFavoriteClick(item, e)}
            />
          ) : (
            <StarOutlined
              type="star"
              style={{ fontSize: '20px', marginRight: '12px', color: 'gray' }}
              onClick={(e) => handleFavoriteClick(item, e)}
            />
          )}
          <List.Item.Meta title={item.name} description={item.description} />
        </List.Item>
      )}
    />
  );
};

export default PromptsList;
