import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { registerServiceWorkers } from './service-worker';

ReactDOM.render(<App/>, document.getElementById("root"));
registerServiceWorkers();
