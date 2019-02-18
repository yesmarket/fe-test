const axios = require('axios');
require('dotenv').config();

module.exports = {
   subscribe: function (token, topic) {
      post(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, null);
   },
   notify: function (token) {
      post('https://fcm.googleapis.com/fcm/send', getData(token));
   },
   notifyMany: function (topic) {
      post('https://fcm.googleapis.com/fcm/send', getData(`/topics/${topic}`));
   },
};

function getData(to) {
   var data = {
      "notification": {
         "title": "test",
         "body": "this is a test"
      },
      "to": to
   };
   return data;
}

function post(url, data) {
   var headers = {
      'Authorization': `key=${process.env.FIREBASE_API_KEY}`
   };
   axios.post(url, data, headers);
}
