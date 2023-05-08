import {
  CodeErrorHelp,
  GeneralKnowledge,
  OptimizeCode,
  OptimizeCodeWithExplanation,
  QuestionWithContext,
  QuestionWithReasoning,
  SQLQuery,
  WriteTests,
  ZeroShotCoT,
  ZeroShotCoTAPE,
} from '@rpidanny/llm-prompt-templates';

export interface ITemplate {
  name: string;
  content: string;
  description: string;
  paper?: string;
}

export const GeneralPrompts: ITemplate[] = [
  QuestionWithReasoning,
  QuestionWithContext,
  ZeroShotCoT,
  ZeroShotCoTAPE,
  GeneralKnowledge,
];

export const CodePrompts: ITemplate[] = [
  WriteTests,
  OptimizeCode,
  OptimizeCodeWithExplanation,
  CodeErrorHelp,
  SQLQuery,
];

export const PromptTemplates: ITemplate[] = [...GeneralPrompts, ...CodePrompts];
