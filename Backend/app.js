const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ingredientRoutes = require('./routes/ingredientRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


const corsOptions = {
  // origin: 'http://192.168.0.117:5173', 
  origin: 'http://127.0.0.1:5173', 
  optionsSuccessStatus: 200
};
app.use(cors({
  origin: '*'
}));
//app.use(cors(corsOptions));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/nutrition_journal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
}).on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

app.use('/api/ingredients', ingredientRoutes);
app.use('/api/recipes', recipeRoutes);

module.exports = app;
