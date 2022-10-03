const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
  .then(() => {
    console.log('mongo connection open');
  })
  .catch((err) => {
    console.log('oh no mongo connection error!');
    console.log(err);
  });

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/makecampground', async (req, res) => {
  const newCampground = new Campground({ title: 'My Backyard', description: 'Cheap camping!'});
  await newCampground.save();
  res.send(newCampground);
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});