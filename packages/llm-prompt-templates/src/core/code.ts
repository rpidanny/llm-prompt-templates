import { ITemplate } from './interfaces';

export const WriteTests: ITemplate = {
  name: 'Write Tests',
  description: 'Instructs the LLM to write tests for a given piece of code.',
  tags: ['code', 'tests'],
  content: `### Instruction ###
Write tests for the following code:

\`\`\`{language}
{code}
\`\`\`
`,
};

export const OptimizeCode: ITemplate = {
  name: 'Optimize Code',
  description: 'Instructs the LLM to optimize a given piece of code.',
  tags: ['code', 'optimization'],
  content: `### Instruction ###
Optimize the code below to make it more clean and efficient.

\`\`\`{language}
{code}
\`\`\`

Only return the rewritten code and nothing else.
`,
};

export const OptimizeCodeWithExplanation: ITemplate = {
  name: 'Optimize Code with Explanation',
  description:
    'Instructs the LLM to optimize a given piece of code along with explanation.',
  tags: ['code', 'optimization'],
  content: `### Instruction ###
Optimize the code below to make it more clean and efficient.

\`\`\`{language}
{code}
\`\`\`

Also explain the changes you made to the code.
`,
};

export const CodeErrorHelp: ITemplate = {
  name: 'Code Error Help',
  description: 'Asks the LLM to help fix a given piece of code.',
  tags: ['code', 'error', 'debugging'],
  content: `I am getting this error in my code. Can you please help me?

\`\`\`{language}
{code}
\`\`\`
`,
};

export const SQLQuery: ITemplate = {
  name: 'SQL Query',
  description: 'Asks the LLM to write a SQL query for a given problem',
  tags: ['code', 'sql'],
  content: `Table departments, columns = [DepartmentId, DepartmentName]
Table students, columns = [DepartmentId, StudentId, StudentName]
Create a MySQL query for all students in the Computer Science Department
`,
};
