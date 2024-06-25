const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

const paystack = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  },
});

const initializePayment = async (email, amount) => {
  try {
    const response = await paystack.post('/transaction/initialize', {
      email,
      amount: amount * 100, // Paystack amount is in kobo (smallest currency unit)
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const verifyPayment = async (reference) => {
  try {
    const response = await paystack.get(`/transaction/verify/${reference}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = { initializePayment, verifyPayment };
