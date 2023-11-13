import { PromptCategory } from './categories.enum';
import { IPrompt } from './interfaces';
import { Tag } from './tags.enum';

export const WriteTestsPrompt: IPrompt = {
  name: 'Write Tests',
  category: PromptCategory.Code,
  description: 'Instructs the LLM to write tests for a given piece of code.',
  tags: [Tag.Code, Tag.Test],
  content: `### Instruction ###
Write tests for the following code:

\`\`\`{language}
{code}
\`\`\`
`,
};

export const OptimizeCodePrompt: IPrompt = {
  name: 'Optimize Code',
  category: PromptCategory.Code,
  description: 'Instructs the LLM to optimize a given piece of code.',
  tags: [Tag.Code, Tag.Optimization],
  content: `### Instruction ###
Optimize the code below to make it more clean and efficient.

\`\`\`{language}
{code}
\`\`\`

Only return the rewritten code and nothing else.
`,
};

export const OptimizeCodeWithExplanationPrompt: IPrompt = {
  name: 'Optimize Code with Explanation',
  category: PromptCategory.Code,
  description:
    'Instructs the LLM to optimize a given piece of code along with explanation.',
  tags: [Tag.Code, Tag.Optimization],
  content: `### Instruction ###
Optimize the code below to make it more clean and efficient.

\`\`\`{language}
{code}
\`\`\`

Also explain the changes you made to the code.
`,
};

export const CodeErrorHelpPrompt: IPrompt = {
  name: 'Code Error Help',
  category: PromptCategory.Code,
  description: 'Asks the LLM to help fix a given piece of code.',
  tags: [Tag.Code, Tag.Error, Tag.Debugging],
  content: `I am getting this error in my code. Can you please help me?

\`\`\`{language}
{code}
\`\`\`
`,
};

export const SQLQueryPrompt: IPrompt = {
  name: 'SQL Query',
  category: PromptCategory.Code,
  description: 'Asks the LLM to write a SQL query for a given problem',
  tags: [Tag.Code, Tag.SQL],
  content: `### Instruction ###
Write a MySQL query for {problem}.

Use the following tables:
Table {table1}, columns = [{columns1}}]
Table {table2}, columns = [{columns2}}]
`,
};

export const SolveCodingChallengePrompt: IPrompt = {
  name: 'Solve Coding Challenge',
  category: PromptCategory.Code,
  description: 'Asks the LLM to solve a coding challenge.',
  tags: [Tag.Code, Tag.LeetCode],
  content: `### Instruction ###
You are an amazing software engineer solving leetcode problems. Solve the given problem in {language}:

\`\`\`
{challenge}
\`\`\`
  `,
};
