const { application } = require('express');
const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile'));
require('dotenv').config(); // load .env variables
// const PORT = process.env.PORT || 8080;
const jwt = require('jsonwebtoken');
const {v4: uuid4} = require("uuid"); 
const app = express();
app.use(express.json());
const { PORT, JWT_SECRET } = process.env;

//ROUTES
const commentsRoutes = require("./router/commentsRoute");
const scoresRoutes = require("./router/scoresRoute");
const wordBankRoutes = require("./router/wordsRoute");
const userLoginRoutes = require("./router/userLoginRoute");

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use("/scores", scoresRoutes);
app.use("/comments", commentsRoutes);
app.use("/login", userLoginRoutes);
app.use("/words", wordBankRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


