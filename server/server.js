const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json()); // Parse JSON data

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
