import './Popup.css';

import { Divider, Layout, Typography } from 'antd';
import React from 'react';

import EnabledPrompts from '../../components/EnabledPrompts';
import { promptCategories } from '../../pages/Content/templates';

const { Content } = Layout;
const { Title } = Typography;

function Popup() {
  return (
    <Layout className="layout" style={{ background: '#ffffff' }}>
      <Title
        level={5}
        style={{
          textAlign: 'center',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        LLM Prompt Templates
      </Title>
      <Content style={{ padding: '0 30px' }}>
        <Divider style={{ fontSize: '14px' }}>Enabled Prompts</Divider>
        <EnabledPrompts
          promptCategories={Object.entries(promptCategories).map(
            ([name, category]) => ({
              name,
              emoji: category.emoji,
            })
          )}
        />
        <Divider style={{ fontSize: '14px' }}>Hint</Divider>
        <div
          className="hint"
          style={{
            color: '#858585',
            fontSize: '12px',
            fontWeight: 100,
            letterSpacing: '0.3px',
            marginTop: '0px',
            textAlign: 'center',
          }}
        >
          <code>Ctrl + Shift + P</code> or typing <code>/templates</code> opens
          prompt templates page.
        </div>
      </Content>
    </Layout>
  );
}

export default Popup;