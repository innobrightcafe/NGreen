//paystack
app.post('/paystack/pay', async (req, res) => {
    const { email, amount } = req.body;
    try {
      const response = await initializePayment(email, amount);
      res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/paystack/verify/:reference', async (req, res) => {
    const { reference } = req.params;
    try {
      const response = await verifyPayment(reference);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });