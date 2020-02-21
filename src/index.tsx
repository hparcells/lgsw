import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import * as serviceWorker from './serviceWorker';

import App from './components/App';

import './styles/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));

// Tracking
if(process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-134185568-8');
  ReactGA.pageview('/');
}

serviceWorker.register();
