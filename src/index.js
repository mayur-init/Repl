import React from 'react';
import App from './App';
import "./index.css";
import { createRoot } from 'react-dom/client';

//react 17 and older 
/*ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);*/

//from react 18
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);