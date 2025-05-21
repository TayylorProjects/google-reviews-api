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
    console.log('Received GET /reviews');
    const client = await auth.getClient();
    const reviewsApi = google.mybusiness({ version: 'v4', auth: client });

    const locationId = 'locations/17950674629835159127'; // Replace with your actual location ID
    console.log('Fetching reviews for', locationId);

    });

    const reviews = (data.reviews || []).map((r) => ({
      rating: r.starRating,
      text: r.comment,
      author: r.reviewer.displayName,
    }));

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching reviews');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
