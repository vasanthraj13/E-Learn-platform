import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function Main() {
    return (
        <App />
    );
}

createRoot(document.getElementById('root')).render(<Main />);
