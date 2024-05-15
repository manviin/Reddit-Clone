import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import "./index.css";
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from './store/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
// connecting Redux store to the components using Provider
root.render(       
<Provider store={store}>
<App/>
</Provider>

)

reportWebVitals();
