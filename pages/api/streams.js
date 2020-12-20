const axios = require('axios');
const BASE_URL = 'https://api.twitch.tv/helix/streams';

export default (req, res) => {
  let url = BASE_URL;
  const user_id = req.query.user_id;
  if (user_id) {
    const user_ids = ([].concat(user_id)).join('&user_id=');
    url += `?user_id=${user_ids}`;
  }

  return new Promise(resolve => {
    axios
      .get(url, {
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