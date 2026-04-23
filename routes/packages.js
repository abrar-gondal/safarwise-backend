const express = require('express');
const router = express.Router();
const {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
} = require('../controllers/packageController');
const { protect } = require('../middleware/auth');

router.get('/',       getPackages);
router.get('/:id',    getPackage);
router.post('/',      protect, createPackage);
router.put('/:id',    protect, updatePackage);
router.delete('/:id', protect, deletePackage);
module.exports = router;