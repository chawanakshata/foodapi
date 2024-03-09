const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/food-nutrition-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Mongoose Schema
const foodSchema = new mongoose.Schema({
  foodItemName: { type: String, required: true },
  foodGroup: String,
  description: String,
  nutritionalInformation: {
    calories: Number,
    macronutrients: {
      proteins: Number,
      fats: {
        saturated: Number,
        unsaturated: Number,
        trans: Number,
      },
      carbohydrates: {
        total: Number,
        sugar: Number,
      },
    },
    micronutrients: {
      vitamins: {
        A: Number,
        C: Number,
        D: Number,
      },
      minerals: {
        iron: Number,
        calcium: Number,
        potassium: Number,
      },
      // Additional micronutrients as needed
    },
    fiber: Number,
    sodium: Number,
    cholesterol: Number,
  },
  servingSize: String,
  allergens: [String],
  ingredients: [String],
  preparationMethods: [String],
  certifications: [String],
  countryOfOrigin: String,
  brandOrManufacturer: String,
  dietaryRestrictions: [String],
  healthBenefits: [String],
  bestPractices: String,
});

const Food = mongoose.model('Food', foodSchema);

const sampleFoodData = {
  foodItemName: 'Avocado',
  foodGroup: 'Fruits',
  description: 'A creamy and nutrient-dense fruit with a rich taste.',
  nutritionalInformation: {
    calories: 160,
    macronutrients: {
      proteins: 2,
      fats: {
        saturated: 2,
        unsaturated: 14,
        trans: 0,
      },
      carbohydrates: {
        total: 9,
        sugar: 0.7,
      },
    },
    micronutrients: {
      vitamins: {
        A: 146,
        C: 10,
        D: 0,
      },
      minerals: {
        iron: 0.6,
        calcium: 12,
        potassium: 485,
      },
      
    },
    fiber: 7,
    sodium: 7,
    cholesterol: 0,
  },
  servingSize: '1 medium-sized avocado (about 200g)',
  allergens: ['None'],
  ingredients: ['Avocado'],
  preparationMethods: ['Slice and serve'],
  certifications: ['Organic'],
  countryOfOrigin: 'Mexico',
  brandOrManufacturer: 'Fresh Farms Co.',
  dietaryRestrictions: ['Vegetarian', 'Vegan'],
  healthBenefits: ['Rich in healthy fats', 'High in potassium'],
  bestPractices: 'Choose ripe avocados for better taste and texture.',
};

const saveSampleFoodData = async () => {
  try {
    const exampleFoodInstance = new Food(sampleFoodData);
    const savedFood = await exampleFoodInstance.save();
    console.log('Sample food data saved successfully:', savedFood);
  } catch (err) {
    console.error('Error saving sample food data:', err);
  }
};

saveSampleFoodData();

app.get('/', (req, res) => {
  res.send('Welcome to the Food and Nutrition API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

