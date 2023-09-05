import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@picocss/pico';
import Layout from './Layout';
import HomePage from './Home';
import TexturesPage from './minecraft/Textures';
import RecipesPage from './minecraft/Recipes';
import PracticePage from './other/Practice';
import NotesPage from './other/Notes';

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
            <Route path='/japanese' element={<PracticePage />} />
            <Route path='/notes' element={<NotesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
