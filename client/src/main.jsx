import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { persistor, store } from './Redux/store.js';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

// Loader component for rehydration
const Loader = () => <div className="loader">Loading...</div>;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
