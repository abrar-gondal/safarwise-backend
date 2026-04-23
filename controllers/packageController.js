const Package = require('../models/Package');

const getPackages = async (req, res) => {
  try {
    const { search, tag, featured } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
      ];
    }
    if (tag) query.tags = { $in: [tag] };
    if (featured) query.featured = true;
    const packages = await Package.find(query).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getPackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    return res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const createPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    return res.status(201).json({ success: true, data: pkg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    return res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    return res.status(200).json({ success: true, message: 'Package deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { getPackages, getPackage, createPackage, updatePackage, deletePackage };