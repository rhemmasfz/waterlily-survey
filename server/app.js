const express = require('express');
const surveyRouter = require('./routes/survey');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const cors = require('cors');

const app = express();

const port = 3000;

app.use(express.json());

// CORS must be applied before routers to ensure headers and preflight are handled
const origins = ['http://localhost:3001', 'http://localhost:5173', 'http://localhost:3002'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }
        if (origin && origins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
}));

// Handle preflight for all routes
app.options('*', cors());

// Routers (applied after CORS)
app.use('/survey', surveyRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.listen(port, () =>
{
    console.log(`Listening on port ${port}!`)
});

module.exports = app;
