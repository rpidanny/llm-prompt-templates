export const QuestionWithReasoning = `{question}

Reply in the following pattern:
THOUGHT: // Your thought here
CRITICISM: // Criticism of your thought
ANSWER: // Your final answer`

export const QuestionWithContext = `Answer the question based on the context below. Keep the answer short. Respond "Unsure about answer" if not sure about the answer.

Context: {context}

Question: {question}

Answer:`

// https://arxiv.org/abs/2205.11916
export const ZeroShotCoT = `{question}

Let's think step by step.`

// https://arxiv.org/abs/2211.01910
export const ZeroShotCoT_APE = `{question}

Let's work this out in a step by step way to be sure we have the right answer.`

// https://arxiv.org/pdf/2110.08387.pdf
export const GeneralKnowledge = `Input: Greece is larger than mexico.
Knowledge: Greece is approximately 131,957 sq km, while Mexico is approximately 1,964,375 sq km, making Mexico 1,389% larger than Greece.

Input: Glasses always fog up.
Knowledge: Condensation occurs on eyeglass lenses when water vapor from your sweat, breath, and ambient humidity lands on a cold surface, cools, and then changes into tiny drops of liquid, forming a film that you see as fog. Your lenses will be relatively cool compared to your breath, especially when the outside air is cold.

Input: A fish is capable of thinking.
Knowledge: Fish are more intelligent than they appear. In many areas, such as memory, their cognitive powers match or exceed those of ’higher’ vertebrates including non-human primates. Fish’s long-term memories help them keep track of complex social relationships.

Input: A common effect of smoking lots of cigarettes in one’s lifetime is a higher than normal chance of getting lung cancer.
Knowledge: Those who consistently averaged less than one cigarette per day over their lifetime had nine times the risk of dying from lung cancer than never smokers. Among people who smoked between one and 10 cigarettes per day, the risk of dying from lung cancer was nearly 12 times higher than that of never smokers.

Input: A rock is the same size as a pebble.
Knowledge: A pebble is a clast of rock with a particle size of 4 to 64 millimetres based on the Udden-Wentworth scale of sedimentology. Pebbles are generally considered larger than granules (2 to 4 millimetres diameter) and smaller than cobbles (64 to 256 millimetres diameter).

Input: {question}
Knowledge:`
