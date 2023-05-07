import {
  CodeErrorHelp,
  GeneralKnowledge,
  OptimizeCode,
  OptimizeCodeWithDescription,
  QuestionWithContext,
  QuestionWithReasoning,
  SQLQuery,
  WriteTests,
  ZeroShotCoT,
  ZeroShotCoTAPE,
} from '@rpidanny/llm-prompt-templates';

export interface Template {
  name: string;
  content: string;
}

export const templates: Template[] = [
  {
    name: 'Question /w Reasoning',
    content: QuestionWithReasoning,
  },
  {
    name: 'Question /w Context',
    content: QuestionWithContext,
  },
  {
    name: 'Chain of Thought',
    content: ZeroShotCoT,
  },
  {
    name: 'Chain of Thought (APE)',
    content: ZeroShotCoTAPE,
  },
  {
    name: 'Write Tests',
    content: WriteTests,
  },
  {
    name: 'Optimize Code',
    content: OptimizeCode,
  },
  {
    name: 'Optimize Code /w Description',
    content: OptimizeCodeWithDescription,
  },
  {
    name: 'Code Error Help',
    content: CodeErrorHelp,
  },
  {
    name: 'SQL Query',
    content: SQLQuery,
  },
  {
    name: 'General Knowledge',
    content: GeneralKnowledge,
  },
];
