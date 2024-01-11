import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@picocss/pico';
import Layout from './Layout';
import { Home } from './Home';
import { Textures } from './minecraft/Textures';
import { Recipes } from './minecraft/Recipes';
import { Japanese } from './learning/Japanese';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/textures' element={<Textures />} />
            <Route path='/recipes' element={<Recipes />} />
            <Route path='/japanese' element={<Japanese />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
