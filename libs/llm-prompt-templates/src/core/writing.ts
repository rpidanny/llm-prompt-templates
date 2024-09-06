import { PromptCategory } from './categories.enum';
import { IPrompt } from './interfaces';
import { Tag } from './tags.enum';

export const RewriteFriendlyTextMessagePrompt: IPrompt = {
  name: 'Rewrite Friendly Text Message',
  description: `This prompt rewrites your text to make it friendly, funny and elegant. It's useful for making your text messages more fun and interesting.`,
  tags: [Tag.Transform, Tag.TextMessage],
  category: PromptCategory.Writing,
  content: `Rewrite the following text message to make it friendly, funny and elegant:

\`\`\`
{text}
\`\`\`
`,
};

export const RewriteToFormalPrompt: IPrompt = {
  name: 'Rewrite to Formal',
  description: `This prompt rewrites your text into formal writing. It's useful for writing emails, essays, reports, and other formal documents.`,
  tags: [Tag.Transform, Tag.Documentation],
  category: PromptCategory.Writing,
  content: `Translate the following text into formal writing:

\`\`\`
{text}
\`\`\`
`,
};

export const RewriteToCoolPrompt: IPrompt = {
  name: 'Rewrite to Cool',
  description: `This prompt rewrites your text to make it more cool and elegant. It's useful for making your writing cooler and have some style in it.`,
  tags: [Tag.Transform, Tag.Documentation],
  category: PromptCategory.Writing,
  content: `Rewrite the following text to make it more cool and elegant:

\`\`\`
{text}
\`\`\`
`,
};

export const ProofReadPrompt: IPrompt = {
  name: 'Proofread',
  description: `This prompt proofreads your text and suggests edits in it. It's useful for making your writing more professional and correct.`,
  tags: [Tag.ProofRead],
  category: PromptCategory.Writing,
  content: `Proofread and correct the following text and suggest improvements. If you don't find and errors, just say "No errors found".:

\`\`\`
{text}
\`\`\`
`,
};

export const ProofReadAndCorrectPrompt: IPrompt = {
  name: 'Proofread and Correct',
  description: `This prompt proofreads your text and corrects any mistakes in it. It's useful for making your writing more professional and correct.`,
  tags: [Tag.ProofRead],
  category: PromptCategory.Writing,
  content: `Proofread and correct the following text and rewrite the corrected version. If you don't find and errors, just say "No errors found". Don't use any punctuation around the text:

\`\`\`
{text}
\`\`\`
`,
};
