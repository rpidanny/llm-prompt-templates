import { IPromptTemplate } from './interfaces';
import { Tag } from './tags.enum';

export const WriteTests: IPromptTemplate = {
  name: 'Write Tests',
  description: 'Instructs the LLM to write tests for a given piece of code.',
  tags: [Tag.Code, Tag.Test],
  content: `### Instruction ###
Write tests for the following code:

\`\`\`{language}
{code}
\`\`\`
`,
};

export const OptimizeCode: IPromptTemplate = {
  name: 'Optimize Code',
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

export const OptimizeCodeWithExplanation: IPromptTemplate = {
  name: 'Optimize Code with Explanation',
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

export const CodeErrorHelp: IPromptTemplate = {
  name: 'Code Error Help',
  description: 'Asks the LLM to help fix a given piece of code.',
  tags: [Tag.Code, Tag.Error, Tag.Debugging],
  content: `I am getting this error in my code. Can you please help me?

\`\`\`{language}
{code}
\`\`\`
`,
};

export const SQLQuery: IPromptTemplate = {
  name: 'SQL Query',
  description: 'Asks the LLM to write a SQL query for a given problem',
  tags: [Tag.Code, Tag.SQL],
  content: `### Instruction ###
Write a MySQL query for {problem}.

Use the following tables:
Table {table1}, columns = [{columns1}}]
Table {table2}, columns = [{columns2}}]
`,
};
