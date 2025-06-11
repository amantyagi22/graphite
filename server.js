const express = require("express");
const { parseQueryString } = require("./utils"); // Assuming parseQueryString is defined in utils/parseQueryString.js

const app = express();

const port = 3000;

app.use(express.json());

app.get("/health-check", (req, res) => {
  res.status(200).send("OK");
});

app.post("/graphql", (req, res) => {
  const parsedQuery = parseQueryString(req.body.query);
  res.send(parsedQuery);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
