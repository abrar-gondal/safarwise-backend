const express = require('express');
const router  = express.Router();
const {
  getCityTours,
  getCityTour,
  createCityTour,
  updateCityTour,
  deleteCityTour,
} = require('../controllers/cityTourController');
const { protect } = require('../middleware/auth');

router.get('/',     getCityTours);
router.get('/:id',  getCityTour);
router.post('/',    protect, createCityTour);
router.put('/:id',  protect, updateCityTour);
router.delete('/:id', protect, deleteCityTour);
module.exports = router;