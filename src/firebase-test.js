import React from 'react';
import { Button } from 'react-bootstrap';
import firebase from 'firebase';
import axios from 'axios';

export default class FirebaseTest extends React.Component {
   constructor(props) {
      super(props);
      this.state = {token: null};
      var config = {
         apiKey: process.env.FIREBASE_API_KEY,
         authDomain: process.env.FIREBASE_AUTH_DOMAIN,
         databaseURL: process.env.FIREBASE_DATABASE_URL,
         projectId: process.env.FIREBASE_PROJECT_ID,
         storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
         messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
       };
      firebase.initializeApp(config);
   }
   receiveNotifications = () => {
      var that = this;
      const messaging = firebase.messaging();
      messaging.requestPermission()
      .then(function () {
         console.log('Have permission');
         return messaging.getToken();
      })
      .then(function (t) {
         console.log(t);
         that.setState({token: t});
      })
      .catch(function (err) {
         console.log(`Error occurred ${err}`);
      });
   }
   sendNotification = () => {
      axios.post('/api/notification', {
         token: this.state.token
       })
       .then(function (response) {
         console.log('Notification sent');
       })
       .catch(function (err) {
         console.log(`Error occurred ${err}`);
       });
   }
   render() {
      return (
         <div>
            <Button onClick={this.receiveNotifications}>Click here to receive notifications</Button> <Button onClick={this.sendNotification}>Send notification</Button>
         </div>
      );
   }
}
