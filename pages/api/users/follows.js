const axios = require('axios');
const BASE_URL = 'https://api.twitch.tv/helix/users/follows';

export default (req, res) => {
  const fromId = req.query.from_id;

  return new Promise(resolve => {
    if (!fromId) {
      res.send('Expected from id');
      resolve();
    } else {
      axios
        .get(`${BASE_URL}?from_id=${fromId}&first=${100}`, {
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