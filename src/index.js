import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter as Router } from "react-router-dom";

import GlobalStyles from './components/GlobalStyles/GlobalStyles';

import { store } from './app/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </Router>
    </Provider>
  </React.StrictMode>
);

