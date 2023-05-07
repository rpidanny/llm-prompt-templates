export const WriteTests = `### Instruction ###
Write tests for the following code:

\`\`\`{language}
{code}
\`\`\`
`;

export const OptimizeCode = `### Instruction ###
Optimize the code below to make it more clean and efficient.

\`\`\`{language}
{code}
\`\`\`

Only return the rewritten code.
`;

export const OptimizeCodeWithDescription = `### Instruction ###
Optimize the code below to make it more clean and efficient.

\`\`\`{language}
{code}
\`\`\`
`;

export const CodeErrorHelp = `I am getting this error in my code. Can you please help me?

\`\`\`{language}
{code}
\`\`\`
`;

export const SQLQuery = `Table departments, columns = [DepartmentId, DepartmentName]
Table students, columns = [DepartmentId, StudentId, StudentName]
Create a MySQL query for all students in the Computer Science Department
`;
