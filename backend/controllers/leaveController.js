const { validationResult } = require('express-validator');
const LeaveRequest = require('../models/LeaveRequest');

// @desc  Apply for leave
// @route POST /api/leaves/apply
const applyLeave = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  const { leaveType, startDate, endDate, reason } = req.body;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < start) {
    return res.status(400).json({
      success: false,
      message: 'End date must be on or after start date',
    });
  }

  try {
    const leave = await LeaveRequest.create({
      employeeId: req.user._id,
      leaveType,
      startDate: start,
      endDate: end,
      reason,
      status: 'Pending',
    });

    return res.status(201).json({ success: true, data: leave });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get logged-in employee's leave requests
// @route GET /api/leaves/my-requests
const getMyRequests = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ employeeId: req.user._id }).sort({
      createdAt: -1,
    });
    return res.json({ success: true, data: leaves });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get all leave requests (employer)
// @route GET /api/leaves/all
const getAllRequests = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find()
      .populate('employeeId', 'name email')
      .sort({ createdAt: -1 });
    return res.json({ success: true, data: leaves });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Approve a leave request
// @route PUT /api/leaves/:id/approve
const approveLeave = async (req, res) => {
  try {
    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'Approved' },
      { new: true }
    ).populate('employeeId', 'name email');

    if (!leave) {
      return res.status(404).json({ success: false, message: 'Leave request not found' });
    }
    return res.json({ success: true, data: leave });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Reject a leave request
// @route PUT /api/leaves/:id/reject
const rejectLeave = async (req, res) => {
  try {
    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'Rejected' },
      { new: true }
    ).populate('employeeId', 'name email');

    if (!leave) {
      return res.status(404).json({ success: false, message: 'Leave request not found' });
    }
    return res.json({ success: true, data: leave });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { applyLeave, getMyRequests, getAllRequests, approveLeave, rejectLeave };
