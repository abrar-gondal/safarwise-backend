const CityTour = require('../models/CityTour');

const getCityTours = (req, res) => {
  CityTour.find().sort({ createdAt: -1 }).then(tours => {
    return res.status(200).json({ success: true, count: tours.length, tours });
  }).catch(err => {
    return res.status(500).json({ success: false, message: err.message });
  });
};

const getCityTour = (req, res) => {
  CityTour.findById(req.params.id).then(tour => {
    if (!tour) {
      return res.status(404).json({ success: false, message: 'City tour not found' });
    }
    return res.status(200).json({ success: true, tour });
  }).catch(err => {
    return res.status(500).json({ success: false, message: err.message });
  });
};

const createCityTour = (req, res) => {
  const { name, duration, price, image, desc, highlights, difficulty, groupSize, overview, itinerary, includes, excludes, meetingPoint, featured } = req.body;

  if (!name || !duration || !price || !desc || !overview) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }
  CityTour.create({ name, duration, price, image, desc, highlights, difficulty, groupSize, overview, itinerary, includes, excludes, meetingPoint, featured }).then(tour => {
    return res.status(201).json({ success: true, message: 'City tour created', tour });
  }).catch(err => {
    return res.status(500).json({ success: false, message: err.message });
  });
};

const updateCityTour = (req, res) => {
  CityTour.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(tour => {
    if (!tour) {
      return res.status(404).json({ success: false, message: 'City tour not found' });
    }
    return res.status(200).json({ success: true, message: 'City tour updated', tour });
  }).catch(err => {
    return res.status(500).json({ success: false, message: err.message });
  });
};

const deleteCityTour = (req, res) => {
  CityTour.findByIdAndDelete(req.params.id).then(tour => {
    if (!tour) {
      return res.status(404).json({ success: false, message: 'City tour not found' });
    }
    return res.status(200).json({ success: true, message: 'City tour deleted' });
  }).catch(err => {
    return res.status(500).json({ success: false, message: err.message });
  });
};

module.exports = { getCityTours, getCityTour, createCityTour, updateCityTour, deleteCityTour };