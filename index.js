const express = require('express');
const mountRoutes = require('./routes');

// Initialize app
const app = express();

// Body Parser
app.use(express.json());

// Mount routes
mountRoutes(app);

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} ...`));
