const axios = require('axios');
const BASE_URL = 'https://api.twitch.tv/helix/videos';

export default (req, res) => {
  const user_id = req.query.user_id;

  return new Promise(resolve => {
    axios
      .get(`${BASE_URL}?user_id=${user_id}`, {
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