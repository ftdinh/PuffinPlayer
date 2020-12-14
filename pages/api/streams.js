const axios = require('axios');
const BASE_URL = 'https://api.twitch.tv/helix/streams';

export default (req, res) => {
  return new Promise(resolve => {
    axios
      .get(`${BASE_URL}`, {
        headers: {
          'Authorization': 'Bearer ' + req.headers['Authorization'],
          'Client-Id': req.headers['Client-Id']
        }
      })
      .then(response => {
        res.json(response.data);
        resolve();
      })
      .catch(error => {
        res.send(error.message);
        resolve();
      });
  });
}