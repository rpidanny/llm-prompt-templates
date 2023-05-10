import {
  CodeErrorHelp,
  GeneralKnowledge,
  IPromptTemplate,
  OptimizeCode,
  OptimizeCodeWithExplanation,
  PromptTemplateCategory,
  QuestionWithContext,
  QuestionWithReasoning,
  SQLQuery,
  WriteTests,
  ZeroShotCoT,
  ZeroShotCoTAPE,
} from '@rpidanny/llm-prompt-templates';

export interface IPromptCategory {
  prompts: IPromptTemplate[];
  emoji: string;
  color: string;
}

export interface IPromptCategories {
  [PromptTemplateCategory.Code]: IPromptCategory;
  [PromptTemplateCategory.General]: IPromptCategory;
}

const generalPrompts: IPromptTemplate[] = [
  QuestionWithReasoning,
  QuestionWithContext,
  ZeroShotCoT,
  ZeroShotCoTAPE,
  GeneralKnowledge,
];

const codePrompts: IPromptTemplate[] = [
  WriteTests,
  OptimizeCode,
  OptimizeCodeWithExplanation,
  CodeErrorHelp,
  SQLQuery,
];

export const promptCategories: IPromptCategories = {
  General: {
    prompts: generalPrompts,
    emoji: '📚',
    color: 'gold',
  },
  Code: {
    prompts: codePrompts,
    emoji: '💻',
    color: 'cyan',
  },
};
