import { createRoot } from 'react-dom/client';
import './styles/App.css';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import { store } from './store/index';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
);
