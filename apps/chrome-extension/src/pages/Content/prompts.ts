import { IPrompt, PromptCategory } from '@rpidanny/llm-prompt-templates';
import {
  CodeErrorHelpPrompt,
  OptimizeCodePrompt,
  OptimizeCodeWithExplanationPrompt,
  SolveCodingChallengePrompt,
  SQLQueryPrompt,
  WriteTestsPrompt,
} from '@rpidanny/llm-prompt-templates/core/code';
import {
  BasicSummarizationPrompt,
  GeneralKnowledgePrompt,
  QuestionWithContextPrompt,
  QuestionWithReasoningPrompt,
  SummarizationIntoListPrompt,
  TreeOfThoughtPromptV1,
  TreeOfThoughtPromptV2,
  ZeroShotCoTAPEPrompt,
  ZeroShotCoTPrompt,
} from '@rpidanny/llm-prompt-templates/core/general';
import {
  ProofReadAndCorrectPrompt,
  ProofReadPrompt,
  RewriteToCoolPrompt,
  RewriteToFormalPrompt,
} from '@rpidanny/llm-prompt-templates/core/writing';

export interface IPromptCategory {
  prompts: IPrompt[];
  emoji: string;
  color: string;
  name: PromptCategory;
}

export interface IGroupedPrompts {
  [PromptCategory.Code]: IPromptCategory;
  [PromptCategory.Writing]: IPromptCategory;
  [PromptCategory.General]: IPromptCategory;
}

const generalPrompts: IPrompt[] = [
  QuestionWithReasoningPrompt,
  QuestionWithContextPrompt,
  ZeroShotCoTPrompt,
  ZeroShotCoTAPEPrompt,
  TreeOfThoughtPromptV1,
  TreeOfThoughtPromptV2,
  BasicSummarizationPrompt,
  SummarizationIntoListPrompt,
  GeneralKnowledgePrompt,
];

const codePrompts: IPrompt[] = [
  WriteTestsPrompt,
  OptimizeCodePrompt,
  OptimizeCodeWithExplanationPrompt,
  CodeErrorHelpPrompt,
  SolveCodingChallengePrompt,
  SQLQueryPrompt,
];

const writingPrompts: IPrompt[] = [
  RewriteToFormalPrompt,
  RewriteToCoolPrompt,
  ProofReadPrompt,
  ProofReadAndCorrectPrompt,
];

export const groupedPrompts: IGroupedPrompts = {
  [PromptCategory.General]: {
    prompts: generalPrompts,
    emoji: '🌍',
    color: 'gold',
    name: PromptCategory.General,
  },
  [PromptCategory.Writing]: {
    prompts: writingPrompts,
    emoji: '📝',
    color: 'green',
    name: PromptCategory.Writing,
  },
  [PromptCategory.Code]: {
    prompts: codePrompts,
    emoji: '💻',
    color: 'cyan',
    name: PromptCategory.Code,
  },
};
