# Generative AI Notes

These are simple notes about GenAI, LLMs, tokens, tools, and using AI in websites.

## What is Generative AI?

Generative AI creates new content from a request. It can create:

- Text and chat answers
- Code
- Images
- Audio and video
- Summaries
- JSON data

Examples:

- A chatbot answers a customer's question.
- An AI tool writes a React component.
- A website summarizes a long PDF.
- An image tool creates a product picture.
- A speech tool changes audio into text.

AI can give useful answers, but it can also be wrong. Always check important answers.

## What is an LLM?

LLM means **Large Language Model**. It is an AI model that reads and writes text.

An LLM can:

- Answer questions
- Translate text
- Summarize documents
- Write and explain code
- Extract information
- Classify text
- Create JSON

An LLM does not automatically know your private database or the latest information. Your application must give it that information or connect it to a tool.

## What is a Token?

A token is a small piece of text that an AI model reads. A token can be a word, part of a word, a number, or punctuation.

For normal English text, these are rough examples:

- 1 token is about 3 or 4 characters.
- 100 tokens is about 75 words.
- 1,000 tokens is about 750 words.

This is only an estimate. Code, JSON, numbers, and other languages may use more tokens.

Tokens are important because:

- AI companies usually charge by the number of tokens.
- Every model has a maximum number of tokens it can read at once.
- More tokens usually means more time and more cost.

Keep prompts short and send only useful information. Old chat messages can be summarized instead of sending all of them every time.

## Common AI Words

### Prompt

The message or question sent to the AI.

### System message

Instructions that tell the AI how to behave.

### Temperature

A setting that controls how creative the answer is. A low value is good for exact answers. A higher value is useful for ideas and creative writing.

### Embedding

A list of numbers that represents the meaning of text. Embeddings help us find text with a similar meaning.

### RAG

RAG means **Retrieval-Augmented Generation**. The application searches documents first, then gives the useful results to the AI. This helps the AI answer questions about private or new information.

### Fine-tuning

Training a model with your own examples. This can help with a special style or repeated task. It is usually not the best way to add information that changes often.

### Tool calling

The AI asks the application to run a function. For example, it can ask a website to check an order or find a flight.

## Why Do We Use Generative AI?

GenAI can help people work faster and use information more easily.

Common uses:

- Write emails, documents, tests, and code.
- Search company documents with normal language.
- Summarize meetings, tickets, and long pages.
- Translate or simplify information.
- Answer common customer questions.
- Read a document and return useful fields.
- Recommend products or content.
- Help users through a website.

Do not use AI for every problem. A normal search, database query, or simple rule may be faster, cheaper, and more accurate.

## AI Tools

### Model APIs

Model providers give APIs that applications can use. These APIs can support chat, images, audio, embeddings, and tool calling.

### SDKs

An SDK is a library that makes it easier to call an AI API from JavaScript, TypeScript, Python, or another language.

### AI frameworks

Frameworks can help with chat history, streaming, tools, and RAG.

### Vector databases

These databases store embeddings. They are useful for finding documents with a similar meaning.

### Monitoring tools

These tools show errors, response time, token usage, cost, and user feedback.

### Local models

Some open models can run on your own computer or server. This can give more control over data, but it needs more hardware and setup.

## How to Choose an LLM

There is no single best model. Choose a model based on your own task.

### 1. Understand the task

Ask:

- What should the AI do?
- Does it need current or private information?
- Does it need to read images, audio, or files?
- Should it return normal text or JSON?
- Does it need to use tools?

### 2. Test real examples

Make a small list of real questions from your users. Test different models with the same questions.

Check:

- Is the answer correct?
- Does it follow instructions?
- Is it fast enough?
- Does it return the right format?
- Does it make too many mistakes?

### 3. Compare cost and speed

Check the input price, output price, response time, and usage limits. A smaller model may be enough for simple tasks. A larger model may be better for difficult questions.

### 4. Check privacy

Find out how the provider stores and uses your data. Do not send private information unless your data rules allow it.

A common setup is:

- A small model for simple tasks.
- A larger model for difficult tasks.
- An embedding model for document search.
- A vision or speech model when needed.

## How to Write a Good Prompt

Tell the AI:

1. What role it has.
2. What it should do.
3. What information it can use.
4. What it should do when it does not know.
5. What format it should return.

Example:

```text
You are a customer support assistant.

Answer using only the CONTEXT below. If the answer is not in the context,
say: "I do not have enough information."

Return JSON with these fields:
{
	"answer": "string",
	"needs_human_help": true
}

CONTEXT:
{{company_policy}}

QUESTION:
{{customer_question}}
```

Do not trust the AI output blindly. Check the output in your application.

## Using AI in Web Development

A simple website flow looks like this:

```text
Browser
	-> Your server
	-> Validate the user request
	-> Add useful data or call a search tool
	-> Call the LLM
	-> Check the answer
	-> Send the answer to the browser
```

The browser should call your server. Do not put the AI API key in browser code. Your server should protect the key and check who is allowed to use each feature.

### Simple TypeScript example

```ts
type ChatRequest = {
	question: string;
};

export async function answerQuestion(request: ChatRequest) {
	if (!request.question.trim()) {
		throw new Error("Question is required");
	}

	const response = await llm.responses.create({
		model: process.env.LLM_MODEL,
		input: [
			{
				role: "system",
				content: "Answer clearly and say when you do not know.",
			},
			{ role: "user", content: request.question },
		],
	});

	return { answer: response.output_text };
}
```

This is only an example. A real application should also add login checks, rate limits, timeouts, error handling, and output checks.

### Streaming

Streaming shows the answer as it is being created. It makes a chat page feel faster. The server still needs to handle errors and allow the user to stop a request.

### RAG example

For a company document chatbot:

1. Read the company documents.
2. Split them into small parts.
3. Create embeddings for the parts.
4. Store the embeddings.
5. Create an embedding for the user's question.
6. Find the closest document parts.
7. Send those parts to the LLM.
8. Show the answer and document links.

Always check document permissions. A user must not see a document just because the search found it.

### Tool calling example

An order chatbot could use a function like this:

```ts
const tools = [
	{
		name: "get_order_status",
		description: "Get the status of an order",
		parameters: {
			type: "object",
			properties: { orderId: { type: "string" } },
			required: ["orderId"],
		},
	},
];
```

The server must check the user, the order ID, and the user's permission before running the function. Never let the AI decide permissions by itself.

## Safety and Security

- Keep API keys on the server.
- Check user input.
- Check AI output before using it.
- Do not send unnecessary private data.
- Check permissions in normal application code.
- Do not run AI-generated code directly.
- Use limits so one user cannot spend too much money.
- Add a human review step for important decisions.
- Treat user text and uploaded documents as untrusted content.

An instruction in a prompt is not a security system. Login, permissions, and business rules must be handled by your application.

## Simple Checklist

- Start with one small problem.
- Test the AI with real examples.
- Choose a model that is good enough and affordable.
- Keep the API key on the server.
- Use RAG for private or changing information.
- Use tools for actions such as checking an order.
- Validate JSON and other AI output.
- Add error handling, limits, and monitoring.
- Keep a human option for difficult or risky cases.

The main idea is: let the LLM handle language, but let normal application code handle users, permissions, money, databases, and important actions.


