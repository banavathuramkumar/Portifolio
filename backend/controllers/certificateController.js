const asyncHandler = require('express-async-handler');
const Certificate = require('../models/Certificate');

// @desc    Get all certificates (public)
// @route   GET /api/certificates
// @access  Public
const getCertificates = asyncHandler(async (req, res) => {
  const certificates = await Certificate.find({}).sort({ order: 1 });
  res.json(certificates);
});

// @desc    Create a certificate (admin)
// @route   POST /admin/certificates
// @access  Private
const createCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.create(req.body);
  res.status(201).json(certificate);
});

// @desc    Update a certificate (admin)
// @route   PUT /admin/certificates/:id
// @access  Private
const updateCertificate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const certificate = await Certificate.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!certificate) {
    return res.status(404).json({ message: 'Certificate not found' });
  }
  res.json(certificate);
});

// @desc    Delete a certificate (admin)
// @route   DELETE /admin/certificates/:id
// @access  Private
const deleteCertificate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const certificate = await Certificate.findByIdAndDelete(id);
  if (!certificate) {
    return res.status(404).json({ message: 'Certificate not found' });
  }
  res.json({ message: 'Certificate removed' });
});

module.exports = {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};
