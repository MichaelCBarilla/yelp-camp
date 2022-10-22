const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campgroundsController = require('../controllers/campgrounds');

router.get('/', catchAsync(campgroundsController.campgroundIndex));

router.get('/new', isLoggedIn, campgroundsController.renderNewCampgroundForm);

router.post('/', isLoggedIn, validateCampground, catchAsync(campgroundsController.createCampground));

router.get('/:id', catchAsync(campgroundsController.showCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundsController.renderEditCampgroundForm));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundsController.editCampground));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgroundsController.deleteCampground));

module.exports = router;