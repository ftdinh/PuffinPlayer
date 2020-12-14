const axios = require('axios');
const BASE_URL = 'https://api.twitch.tv/helix/search/channels';

export default (req, res) => {
  const query = req.query.query;

  return new Promise(resolve => {
    if (!query) {
      res.send('Need a query value');
      resolve();
    } else {
      axios
        .get(`${BASE_URL}?query=${query}`, {
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
    }
  });
 }
