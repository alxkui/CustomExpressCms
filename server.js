const express = require('express');

// Initialise Express server
const app = express();

const PORT = process.env.port || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
