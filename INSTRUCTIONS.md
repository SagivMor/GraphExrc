# Security Graph Explorer

## Context

We store cloud infrastructure data in a graph database (Neptune). This data includes assets (servers, databases, users, credentials, etc.) and calculated attack paths that show how an attacker could move through the system.

## Your Task

Build an application that visualizes this data.

## Data

To make this exercise more straightforward, the data is in an S3 bucket. Treat it as though you're calling our internal graph database API - and make sure you apply good architural principals given that assumption.

- **Assets**: `https://coding-test-graph-data.s3.eu-central-1.amazonaws.com/assets.json`
- **Attack Paths**: `https://coding-test-graph-data.s3.eu-central-1.amazonaws.com/attack-paths.json`

A [LinkML](https://linkml.io/) schema (`schema.yaml`) is included describing the data types.  Note that this schema can be compiled into object models in many different languages: [Generators](https://linkml.io/linkml/generators/index.html)

## Guidelines

- Use any tech stack
- Use of AI to write code is encouraged, but remember that you are being evaluated also on general code quality
- Spend 4-6 hours max
- Include a README with setup instructions



Dont foreget:
- Include a README with setup instructions
