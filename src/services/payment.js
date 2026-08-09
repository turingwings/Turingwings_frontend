import { api } from './api';

export const paymentService = {
  /**
   * Creates a payment order for Razorpay
   * POST /api/v1/payments/create-order
   */
  createOrder: async (cohortId) => {
    return api.post('/api/v1/payments/create-order', { cohortId });
  },

  /**
   * Verifies the Razorpay payment signature and registers the student
   * POST /api/v1/payments/verify
   */
  verifyPayment: async (payload) => {
    return api.post('/api/v1/payments/verify', payload);
  },
};
