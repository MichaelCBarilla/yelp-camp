const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campgroundsController = require('../controllers/campgrounds');

router.route('/')
  .get(catchAsync(campgroundsController.campgroundIndex))
  .post(
    isLoggedIn, 
    validateCampground, 
    catchAsync(campgroundsController.createCampground)
  );

router.get('/new', 
  isLoggedIn, 
  campgroundsController.renderNewCampgroundForm
);

router.route('/:id')
  .get(catchAsync(campgroundsController.showCampground))
  .put(
    isLoggedIn, 
    isAuthor, 
    validateCampground, 
    catchAsync(campgroundsController.editCampground)
  )
  .delete(
    isLoggedIn, 
    isAuthor, 
    catchAsync(campgroundsController.deleteCampground)
  );

router.get('/:id/edit', 
  isLoggedIn, 
  isAuthor, 
  catchAsync(campgroundsController.renderEditCampgroundForm)
);

module.exports = router;