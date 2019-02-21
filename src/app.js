import React from 'react';
import FirebaseTest from './firebase/firebase-test';
import AddressTest from './address/address-test';

export default class App extends React.Component {
   render() {
      return (
         <div>
            <FirebaseTest/>
            <AddressTest/>
         </div>
      );
   }
}
