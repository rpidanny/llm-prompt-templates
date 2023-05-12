import {
  BasicSummarizationPrompt,
  CodeErrorHelpPrompt,
  GeneralKnowledgePrompt,
  IPrompt,
  OptimizeCodePrompt,
  OptimizeCodeWithExplanationPrompt,
  PromptCategory,
  QuestionWithContextPrompt,
  QuestionWithReasoningPrompt,
  SQLQueryPrompt,
  SummarizationIntoListPrompt,
  WriteTestsPrompt,
  ZeroShotCoTAPEPrompt,
  ZeroShotCoTPrompt,
} from '@rpidanny/llm-prompt-templates';

export interface IPromptCategory {
  prompts: IPrompt[];
  emoji: string;
  color: string;
  name: PromptCategory;
}

export interface IGroupedPrompts {
  [PromptCategory.Code]: IPromptCategory;
  [PromptCategory.General]: IPromptCategory;
}

const generalPrompts: IPrompt[] = [
  QuestionWithReasoningPrompt,
  QuestionWithContextPrompt,
  ZeroShotCoTPrompt,
  ZeroShotCoTAPEPrompt,
  BasicSummarizationPrompt,
  SummarizationIntoListPrompt,
  GeneralKnowledgePrompt,
];

const codePrompts: IPrompt[] = [
  WriteTestsPrompt,
  OptimizeCodePrompt,
  OptimizeCodeWithExplanationPrompt,
  CodeErrorHelpPrompt,
  SQLQueryPrompt,
];

export const groupedPrompts: IGroupedPrompts = {
  [PromptCategory.General]: {
    prompts: generalPrompts,
    emoji: '🌍',
    color: 'gold',
    name: PromptCategory.General,
  },
  [PromptCategory.Code]: {
    prompts: codePrompts,
    emoji: '💻',
    color: 'cyan',
    name: PromptCategory.Code,
  },
};
