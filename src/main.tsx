import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import './styles/global.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter basename="/pokemon-card-collection">
      <App />
    </BrowserRouter>
  </Provider>
)
