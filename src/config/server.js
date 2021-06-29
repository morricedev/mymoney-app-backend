const express = require("express");
const queryParser = require("express-query-int");

const allowCors = require("./cors");

const PORT = 3003;

const app = express();

app.use(allowCors);
app.use(queryParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log("\x1b[36m%s\x1b[0m", `Listening on ${PORT}`);
});

module.exports = app;
