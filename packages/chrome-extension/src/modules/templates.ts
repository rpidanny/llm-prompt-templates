export const QuestionTemplate = `{question}

Reply in the following pattern:

THOUGHT: Your thought here
CRITICISM: Criticism of your thought
ANSWER: Your final answer
`

export const WriteTests = `Write tests for the following code:

\`\`\`
{code}
\`\`\`
`

export const ImproveCode = `Rewrite the code below to make it more clean, efficient, readable, and maintainable.

\`\`\`
{code}
\`\`\`

Only return the rewritten code.
`

export const CodeErrorTemplate = `I am getting this error. Can you please help me?

\`\`\`
{code}
\`\`\`
`
