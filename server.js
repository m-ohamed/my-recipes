const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || '8080';

const recipesRouter = require('./routes/recipes');

require('dotenv').config();

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));
}

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

app.get('/', (req, res) => {
    return res.status(200).send('done');
});

app.use('/recipes', recipesRouter);


app.listen(port, () => 
{
    console.log(`Server is up and running. Port: ${port}`);
});
