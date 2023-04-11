import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@picocss/pico';
import Layout from './Layout';
import StartupPage from './minecraft/Startup';
import KubeJSPage from './minecraft/KubeJS';
import PracticePage from './japanese/Practice';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/minecraft/startup' element={<StartupPage />} />
          <Route path='/minecraft/kubejs' element={<KubeJSPage />} />
          <Route path='/japanese/practice' element={<PracticePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
