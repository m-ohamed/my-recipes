const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || '8080';
const path = require('path');

const recipesRouter = require('./routes/recipes');

require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI,
{
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.once('open', () => 
{
    console.log('MongoDB connection was successful.');
});

app.use('/recipes', recipesRouter);

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('*', (req, res) =>
    {
        res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
    });
}

app.listen(port, () => 
{
    console.log(`Server is up and running. Port: ${port}`);
});
