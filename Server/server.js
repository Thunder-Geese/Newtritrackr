const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res) => res.sendStatus(404));

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });