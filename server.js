import express from 'express';
import { google } from 'googleapis';
import cors from 'cors';

const app = express();
app.use(cors());

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_JSON);

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/business.manage'],
});

app.get('/reviews', async (req, res) => {
  try {
    console.log('GET /reviews hit');
    
    const client = await auth.getClient();
    app.get('/reviews', async (req, res) => {
  try {
    const client = await auth.getClient();

    const locationId = 'accounts/123456789012345678901/locations/17950674629835159127'; // Replace with real account ID
    const url = `https://mybusiness.googleapis.com/v4/${locationId}/reviews`;

    const response = await client.request({ url });

    const reviews = (response.data.reviews || []).map((r) => ({
      rating: r.starRating,
      text: r.comment,
      author: r.reviewer?.displayName || 'Anonymous',
    }));

    res.json(reviews);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Error fetching reviews');
  }
});
app.get('/accounts', async (req, res) => {
  try {
    const client = await auth.getClient();

    const url = 'https://mybusiness.googleapis.com/v4/accounts';
    const response = await client.request({ url });

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Error fetching accounts');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
