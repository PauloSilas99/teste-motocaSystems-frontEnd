import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Editar from './Editar';
import PagNencontrada from './PagNencontrada';
import Header from './Header';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/adicionar" element={<Editar />} />
        <Route path="editar/:id" element={<Editar />} />
        <Route path="*" element={<PagNencontrada />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
