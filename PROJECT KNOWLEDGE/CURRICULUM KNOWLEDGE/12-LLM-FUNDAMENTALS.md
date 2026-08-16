# LLM Fundamentals

## What Is an LLM?

A Large Language Model processes sequences of tokens and predicts likely
continuations based on learned patterns.

## Tokens

Text is converted into tokens before being processed by a language
model.

Tokenization affects: - Context usage - Cost in API-based systems -
Model input limits

## Context Window

The context window is the amount of information a model can process
within an interaction.

It can include: - Instructions - User input - Conversation - Retrieved
documents - Tool results

## Inference

Inference is the process of running a trained model to produce an
output.

## Prompt

A prompt provides information and instructions that guide model
behavior.

A strong prompt can specify: - Goal - Context - Constraints - Input -
Output format - Evaluation criteria

## Embeddings

An embedding represents information as a numerical vector capturing
semantic relationships.

Embeddings are commonly used for: - Semantic search - Retrieval -
Recommendations - Clustering

## RAG

Retrieval-Augmented Generation combines retrieval with generation.

Basic flow:

Question → Retrieval → Relevant context → LLM → Answer

## Tool Calling

An LLM can be connected to external tools so that it can request actions
or information from software systems.

Conceptually:

LLM → Tool request → Tool execution → Result → LLM

## Structured Output

Models can be instructed or constrained to produce structured data such
as JSON.

## Key Mental Model

An LLM is not a database, search engine, calculator, or autonomous
employee by default.

It is a model that generates outputs based on context and learned
patterns. Reliable applications add appropriate tools, data, validation,
and controls around it.
