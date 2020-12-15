const axios = require('axios');
const BASE_URL = 'https://api.twitch.tv/helix/users';

export default (req, res) => {
  const login = req.query.login;

  return new Promise(resolve => {
    if (!login) {
      res.send('Expected login name');
      resolve();
    } else {
      axios
        .get(`${BASE_URL}?login=${login}`, {
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