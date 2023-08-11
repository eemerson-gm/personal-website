import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@picocss/pico';
import Layout from './Layout';
import StartupPage from './minecraft/Startup';
import TexturesPage from './minecraft/Textures';
import RecipesPage from './minecraft/Recipes';
import PracticePage from './other/Practice';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './Home';
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/minecraft/startup' element={<StartupPage />} />
            <Route path='/minecraft/textures' element={<TexturesPage />} />
            <Route path='/minecraft/recipes' element={<RecipesPage />} />
            <Route path='/other/japanese' element={<PracticePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
