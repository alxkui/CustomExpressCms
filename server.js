const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env' });

// Connect to database
db();

// Initialise Express server
const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Show http methods in development mode
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

// Index Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Custom CMS - Node based custom CMS'
    })
});

// Login System
app.use('/api/auth', require('./routes/auth'));

// Post routes
app.use('/api/posts', require('./routes/posts'));



// Make express listen on port
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on port ${PORT}, running in ${process.env.NODE_ENV} mode`));
