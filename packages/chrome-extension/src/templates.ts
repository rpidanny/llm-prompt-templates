import {
  CodeErrorHelp,
  GeneralKnowledge,
  IPromptTemplate,
  OptimizeCode,
  OptimizeCodeWithExplanation,
  QuestionWithContext,
  QuestionWithReasoning,
  SQLQuery,
  WriteTests,
  ZeroShotCoT,
  ZeroShotCoTAPE,
} from '@rpidanny/llm-prompt-templates';

export const GeneralPrompts: IPromptTemplate[] = [
  QuestionWithReasoning,
  QuestionWithContext,
  ZeroShotCoT,
  ZeroShotCoTAPE,
  GeneralKnowledge,
];

export const CodePrompts: IPromptTemplate[] = [
  WriteTests,
  OptimizeCode,
  OptimizeCodeWithExplanation,
  CodeErrorHelp,
  SQLQuery,
];

export const promptTemplates: IPromptTemplate[] = [
  ...GeneralPrompts,
  ...CodePrompts,
];
