const axios = require('axios');
const cookieParser = require('cookie-parser');
const express = require('express');
const next = require('next');
const NodeCache = require('node-cache');
const jwt = require('next-auth/jwt');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const cache = new NodeCache();

async function getAccessToken() {
  try {
    const url = 'https://id.twitch.tv/oauth2/token';
    const id = process.env.TWITCH_ID;
    const secret = process.env.TWITCH_SECRET;
    const response = await axios.post(`${url}?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`);
    cache.set('access_token', response.data.access_token, response.data.expires_in);
    console.log('Set access token');
  } catch (error) {
    console.error(error);
  }
}

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  server.all('*', async (req, res) => {
    const secret = process.env.JWT_SECRET;
    const token = await jwt.getToken({ req, secret });
    if (token) {
      //console.log(token);
    }

    const value = cache.get('access_token');
    if (value === undefined) {
      await getAccessToken();
    }
    req.headers['Authorization'] = cache.get('access_token');
    req.headers['Client-Id'] = process.env.TWITCH_ID;
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});