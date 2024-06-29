import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Navbar from './components/Navbar';
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
    <Router>
        <div><Navbar /></div>
        
        <div style={{marginTop: '30px'}}><App /></div>
    </Router>    
);
