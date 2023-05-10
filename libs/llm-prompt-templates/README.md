# LLM Prompt Templates NPM Package

The LLM Prompt Templates NPM Package provides a collection of reusable prompt templates that can be used to enhance the quality and relevance of responses in various LLMs. With this package installed, you can easily generate effective and accurate prompts in your code.

## Installation

To use the LLM Prompt Templates NPM Package, simply install it from the npm registry:

```bash
npm i --save llm-prompt-templates
```

## Usage

Using the LLM Prompt Templates NPM Package is simple. Import the desired prompt template from the package and use it in your code. Here's an example:

```typescript
import { ZeroShotCoT } from 'llm-prompt-templates';
```

## Available Prompt Templates

The LLM Prompt Templates NPM Package provides a variety of prompt templates, including:

- `ZeroShotCoT`: Chain-of-thought (CoT) prompting enables complex reasoning capabilities through intermediate reasoning steps. Useful for more complex arithmetic, commonsense, and symbolic reasoning tasks.
- `ZeroShotCoTAPE`: Chain-of-thought (CoT) prompt discovered by automatic prompt engineer (APE) which is better than the human engineered zero-shot CoT prompt.
- `GeneralKnowledge`: Incorporates general knowledge or information to help the model make more accurate common sense reasoning.
- `QuestionWithReasoning`: A prompt that guides critical thinking by instructing the LLM to provide it's initial thoughts, critique them, and provide a final answer.
- `QuestionWithContext`: A prompt that asks the LLM to answer a question based on a provided context.

## Contributing

We welcome contributions from anyone interested in improving the quality and effectiveness of LLM prompts. If you have a suggestion for a new prompt template or would like to improve an existing one, please feel free to submit a pull request.

## License

The LLM Prompt Templates NPM Package is licensed under the MIT License. See the `LICENSE` file for details.
