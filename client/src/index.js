import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from './store'
import Loader from './components/loader/Loader';
import { supportReactDevTools } from 'react-universal-hooks';

supportReactDevTools ({ active: process.env!=="production" });

ReactDOM.render(
<Provider store={store}>
<PersistGate loading={<Loader/>} persistor={persistor}>
    <App/>
</PersistGate>
</Provider>
, document.getElementById('root'));

serviceWorker.unregister();
