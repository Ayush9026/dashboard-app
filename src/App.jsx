import { Provider } from 'react-redux';
import { store } from './store/store.js';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App
