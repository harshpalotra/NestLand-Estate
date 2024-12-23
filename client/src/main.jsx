import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { persistor, store } from './Redux/store.js';
import { Provider } from 'react-redux'; // Ensure this is included
import { StrictMode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap App with Provider */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>  
    </Provider>
  </StrictMode>
);
