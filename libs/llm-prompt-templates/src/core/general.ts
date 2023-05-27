import { PromptCategory } from './categories.enum';
import { IPrompt } from './interfaces';
import { Tag } from './tags.enum';

export const QuestionWithReasoningPrompt: IPrompt = {
  name: 'Question with Reasoning',
  description: `This prompt guides critical thinking by instructing the LLM to provide it's initial thoughts, critique them, and provide a final answer.`,
  tags: [Tag.Question, Tag.Reasoning],
  category: PromptCategory.General,
  content: `{question}

Reply in the following pattern:
THOUGHT: // Your thought here
CRITICISM: // Criticism of your thought
ANSWER: // Your final answer`,
};

export const QuestionWithContextPrompt: IPrompt = {
  name: 'Question with Context',
  description: `This prompt asks the LLM to answer a question based on a provided context.`,
  tags: [Tag.Question, Tag.Context],
  category: PromptCategory.General,
  content: `Answer the question based on the context below. Keep the answer short. Respond "Unsure about answer" if not sure about the answer.

Context: {context}

Question: {question}

Answer:`,
};

// https://arxiv.org/abs/2205.11916
export const ZeroShotCoTPrompt: IPrompt = {
  name: 'Zero-Shot CoT',
  description: `Chain-of-thought (CoT) prompting enables complex reasoning capabilities through intermediate reasoning steps. Useful for more complex arithmetic, commonsense, and symbolic reasoning tasks.`,
  tags: [Tag.ChainOfThought, Tag.Reasoning],
  category: PromptCategory.General,
  paper: 'https://arxiv.org/abs/2205.11916',
  content: `{question}

Let's think step by step.`,
};

// https://arxiv.org/abs/2211.01910
export const ZeroShotCoTAPEPrompt: IPrompt = {
  name: 'Zero-Shot CoT (APE)',
  description: `Chain-of-thought (CoT) prompt discovered by automatic prompt engineer (APE) which is better than the human engineered zero-shot CoT prompt.`,
  tags: [Tag.ChainOfThought, Tag.Reasoning, Tag.AutomaticPromptEngineer],
  category: PromptCategory.General,
  paper: 'https://arxiv.org/abs/2211.01910',
  content: `{question}

Let's work this out in a step by step way to be sure we have the right answer.`,
};

export const TreeOfThoughtPromptV1: IPrompt = {
  name: 'Tree of Thought V1',
  description:
    "The Tree of Thoughts (ToT) framework improves language models' problem-solving abilities by allowing deliberate decision making through exploration and strategic lookahead",
  tags: [Tag.TreeOfThought, Tag.Reasoning],
  category: PromptCategory.General,
  paper: 'https://arxiv.org/abs/2305.10601',
  content: `Imagine three different experts are answering this question.
All experts will write down 1 step of their thinking, then share it with the group.
Then all experts will go on to the next step, etc.
If any expert realises they're wrong at any point then they leave. The question is...

{question}
`,
};

export const TreeOfThoughtPromptV2: IPrompt = {
  name: 'Tree of Thought V2',
  description:
    "The Tree of Thoughts (ToT) framework improves language models' problem-solving abilities by allowing deliberate decision making through exploration and strategic lookahead",
  tags: [Tag.TreeOfThought, Tag.Reasoning],
  category: PromptCategory.General,
  paper: 'https://arxiv.org/abs/2305.10601',
  content: `Simulate three brilliant, logical experts collaboratively answering a question.
Each one verbosely explains their thought process in real-time, considering the prior explanations of others and openly acknowledging mistakes.
At each step, whenever possible, each expert refines and builds upon the thoughts of others, acknowledging their contributions.
They continue until there is a definitive answer to the question.
For clarity, your entire response should be in a markdown table. The question is...

{question}
`,
};

export const BasicSummarizationPrompt: IPrompt = {
  name: 'Basic Summarization',
  description: `This prompt asks the LLM to summarize a given text.`,
  tags: [Tag.Summarization],
  category: PromptCategory.General,
  content: `Write a concise summary of the following text delimited by triple backquotes.
Please provide your output in a manner that a 5 year old would understand.

\`\`\`
{text}
\`\`\`

SUMMARY:`,
};

export const SummarizationIntoListPrompt: IPrompt = {
  name: 'Summarization Into List',
  description: `This prompt asks the LLM to summarize a given text into a list of bullet points.`,
  tags: [Tag.Summarization],
  category: PromptCategory.General,
  content: `Write a concise summary of the following text delimited by triple backquotes.
Return your response in bullet points which covers the key points of the text.

\`\`\`
{text}
\`\`\`

BULLET POINT SUMMARY:`,
};

// https://arxiv.org/abs/2110.08387
export const GeneralKnowledgePrompt: IPrompt = {
  name: 'General Knowledge',
  description: `Incorporates general knowledge or information to help the model make more accurate common sense reasoning.`,
  tags: [Tag.GeneralKnowledge, Tag.Reasoning],
  category: PromptCategory.General,
  paper: 'https://arxiv.org/abs/2110.08387',
  content: `Input: Greece is larger than mexico.
Knowledge: Greece is approximately 131,957 sq km, while Mexico is approximately 1,964,375 sq km, making Mexico 1,389% larger than Greece.

Input: Glasses always fog up.
Knowledge: Condensation occurs on eyeglass lenses when water vapor from your sweat, breath, and ambient humidity lands on a cold surface, cools, and then changes into tiny drops of liquid, forming a film that you see as fog. Your lenses will be relatively cool compared to your breath, especially when the outside air is cold.

Input: A fish is capable of thinking.
Knowledge: Fish are more intelligent than they appear. In many areas, such as memory, their cognitive powers match or exceed those of 'higher' vertebrates including non-human primates. Fish's long-term memories help them keep track of complex social relationships.

Input: A common effect of smoking lots of cigarettes in one's lifetime is a higher than normal chance of getting lung cancer.
Knowledge: Those who consistently averaged less than one cigarette per day over their lifetime had nine times the risk of dying from lung cancer than never smokers. Among people who smoked between one and 10 cigarettes per day, the risk of dying from lung cancer was nearly 12 times higher than that of never smokers.

Input: A rock is the same size as a pebble.
Knowledge: A pebble is a clast of rock with a particle size of 4 to 64 millimeters based on the Udden-Wentworth scale of sedimentology. Pebbles are generally considered larger than granules (2 to 4 millimeters diameter) and smaller than cobbles (64 to 256 millimeters diameter).

Input: {question}
Knowledge:`,
};
