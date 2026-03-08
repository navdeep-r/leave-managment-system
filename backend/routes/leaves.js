const express = require('express');
const { body } = require('express-validator');
const {
  applyLeave,
  getMyRequests,
  getAllRequests,
  approveLeave,
  rejectLeave,
} = require('../controllers/leaveController');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');

const router = express.Router();

// Employee routes
router.post(
  '/apply',
  authMiddleware,
  requireRole('employee'),
  [
    body('leaveType')
      .isIn(['Sick Leave', 'Casual Leave', 'Vacation', 'Other'])
      .withMessage('Invalid leave type'),
    body('startDate').isISO8601().withMessage('Valid start date required'),
    body('endDate').isISO8601().withMessage('Valid end date required'),
    body('reason').notEmpty().withMessage('Reason is required'),
  ],
  applyLeave
);

router.get('/my-requests', authMiddleware, requireRole('employee'), getMyRequests);

// Employer routes
router.get('/all', authMiddleware, requireRole('employer'), getAllRequests);

router.put('/:id/approve', authMiddleware, requireRole('employer'), approveLeave);

router.put('/:id/reject', authMiddleware, requireRole('employer'), rejectLeave);

module.exports = router;
