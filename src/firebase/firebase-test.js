import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import styles from './firebase-test.css';

export default class FirebaseTest extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         token: null,
         topic: 'test'
      };
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
   getToken = () => {
      var that = this;
      const messaging = firebase.messaging();
      messaging.requestPermission()
      .then(function () {
         console.log('Have permission');
         return messaging.getToken();
      })
      .then(function (token) {
         console.log(token);
         that.setState({token: token});
      })
      .catch(function (err) {
         console.log(`Error occurred ${err}`);
      });
   }
   notify = () => {
      axios.post('/api/notify', {
         token: this.state.token
       })
       .then(function (response) {
         console.log(`Notification sent to ${this.state.token}`);
       })
       .catch(function (err) {
         console.log(`Error occurred ${err}`);
       });
   }
   subscribe = () => {
      axios.post('/api/subscribe', {
         token: this.state.token,
         topic: this.state.topic
       })
       .then(function (response) {
         console.log(`Subscribed ${this.state.token} to ${this.state.topic}`);
       })
       .catch(function (err) {
         console.log(`Error occurred ${err}`);
       });
   }
   notifyMany = () => {
      axios.post('/api/notifyMany', {
         topic: this.state.topic
       })
       .then(function (response) {
         console.log(`Notification sent to ${this.state.topic}`);
       })
       .catch(function (err) {
         console.log(`Error occurred ${err}`);
       });
   }
   render() {
      return (
         <div className={styles.container}>
            <fieldset>
               <legend>Firebase testing</legend>
               <button type="button" onClick={this.getToken}>Get token</button>
               <button type="button" onClick={this.notify}>Notify</button>
               <button type="button" onClick={this.subscribe}>Subscribe</button>
               <button type="button" onClick={this.notifyMany}>Notify subscription</button>
            </fieldset>
         </div>
      );
   }
}
