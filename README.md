# 🧠 Minimal GraphQL Engine in Node.js — Built from Scratch

This project is a learning-first implementation of a GraphQL-like query system using plain JavaScript.

No external libraries, no GraphQL packages — just raw recursion and logic to **understand how GraphQL really works under the hood**.

---

## 🔍 Features

- Supports nested queries like:
```graphql
{ user { name posts { title } } }
```
- Returns clean, structured responses:
```json
{
  "user": {
    "name": "John Doe",
    "posts": [
      { "title": "My First Post" },
      { "title": "Second Post" }
    ]
  }
}
```

- No overfetching — returns only what's requested

- Built with Express.js for easy testing via a /graphql POST endpoint

## 🛠️ Tech Stack
- Node.js

- Express

- Pure JavaScript (no GraphQL libraries)


## 📁 Structure
- utils.js: Contains the core parser and resolver logic

- server.js: Express server with /graphql endpoint

## 🚀 Getting Started
```bash
git clone https://github.com/yourusername/graphql-from-scratch
cd graphql-from-scratch
npm install
node server.js
```

Make a POST request:
```json
POST /graphql
{
  "query": "{ user { name posts { title } } }"
}
```

## 🛣️ Roadmap
- ✅ Nested querying

- 🔜 Multiple root queries

- 🔜 Schema validation

- 🔜 Variable & fragment support

## 📚 Why This?
Inspired by curiosity. GraphQL is powerful — but even more so when you understand how it works internally.

## 🧑‍💻 Author
Aman Tyagi — <a href="https://www.linkedin.com/in/aman-tyagi-700a06190/">LinkedIn</a>


