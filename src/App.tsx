import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@picocss/pico';
import LoadTime from './LoadTime';
import Layout from './Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/loadtime' element={<LoadTime />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
