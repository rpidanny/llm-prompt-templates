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

export interface ITemplate {
  name: string;
  content: string;
  description: string;
}

export const GeneralPrompts: ITemplate[] = [
  {
    name: 'Question with Reasoning',
    content: QuestionWithReasoning,
    description:
      "This prompt guides critical thinking by instructing the LLM to provide it's initial thoughts, critique them, and provide a final answer.",
  },
  {
    name: 'Question with Context',
    content: QuestionWithContext,
    description:
      'This prompt asks the LLM to answer a question based on a provided context.',
  },
  {
    name: 'Chain of Thought',
    content: ZeroShotCoT,
    description:
      'Chain-of-thought (CoT) prompting enables complex reasoning capabilities through intermediate reasoning steps. Useful for more complex arithmetic, commonsense, and symbolic reasoning tasks.',
  },
  {
    name: 'Chain of Thought (APE)',
    content: ZeroShotCoTAPE,
    description:
      'CoT prompt discovered by automatic prompt engineer (APE) which is better than the human engineered zero-shot CoT prompt.',
  },
  {
    name: 'General Knowledge',
    content: GeneralKnowledge,
    description:
      'Incorporates general knowledge or information to help the model make more accurate common sense reasoning.',
  },
];

export const CodePrompts: ITemplate[] = [
  {
    name: 'Write Tests',
    content: WriteTests,
    description: 'Instructs the LLM to write tests for a given piece of code.',
  },
  {
    name: 'Optimize Code',
    content: OptimizeCode,
    description: 'Instructs the LLM to optimize a given piece of code.',
  },
  {
    name: 'Optimize Code with Description',
    content: OptimizeCodeWithDescription,
    description:
      'Instructs the LLM to optimize a given piece of code along with explanation.',
  },
  {
    name: 'Code Error Help',
    content: CodeErrorHelp,
    description: 'Asks the LLM to help fix a given piece of code.',
  },
  {
    name: 'SQL Query',
    content: SQLQuery,
    description: 'Asks the LLM to write a SQL query for a given problem.',
  },
];

export const PromptTemplates: ITemplate[] = [...GeneralPrompts, ...CodePrompts];
