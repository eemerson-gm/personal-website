import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@picocss/pico';
import Layout from './Layout';
import HomePage from './Home';
import TexturesPage from './minecraft/Textures';
import RecipesPage from './minecraft/Recipes';
import { Notes } from './other/Notes';
import { Japanese } from './other/Japanese';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/textures' element={<TexturesPage />} />
            <Route path='/recipes' element={<RecipesPage />} />
            <Route path='/japanese' element={<Japanese />} />
            <Route path='/notes' element={<Notes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
