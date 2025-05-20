const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const API_BASE = 'http://120.26.4.119:9094';
const USERNAME = 'DARWAT2023';
const PASSWORD = '123456';

app.use(cors());
app.use(express.json());

// Recharge Token
app.post('/api/recharge-token', async (req, res) => {
  const { meterCode, lukuMessage } = req.body;
  try {
    const response = await axios.post(`${API_BASE}/api/Power/GetVendingToken`, {
      UserName: USERNAME,
      Password: PASSWORD,
      MeterNo: meterCode,
      Message: lukuMessage,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to recharge token', details: error.message });
  }
});

// Clear Temper
app.post('/api/clear-temper', async (req, res) => {
  const { meterCode } = req.body;
  try {
    const response = await axios.post(`${API_BASE}/api/Power/GetClearTamperSignToken`, {
      UserName: USERNAME,
      Password: PASSWORD,
      MeterNo: meterCode,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear temper', details: error.message });
  }
});

// Clear Credit
app.post('/api/clear-credit', async (req, res) => {
  const { meterCode } = req.body;
  try {
    const response = await axios.post(`${API_BASE}/api/Power/GetClearCreditToken`, {
      UserName: USERNAME,
      Password: PASSWORD,
      MeterNo: meterCode,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear credit', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
