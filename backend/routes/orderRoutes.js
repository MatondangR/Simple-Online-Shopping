import express from 'express'
import {
  addOrderItems,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from '../controllers/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, admin, addOrderItems).get(protect, getOrders)

router
  .route('/:id')
  .get(protect, getOrderById)
  .put(protect, updateOrder)
  .delete(protect, deleteOrder)

export default router
