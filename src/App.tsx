import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@picocss/pico';
import Layout from './Layout';
import StartupPage from './minecraft/Startup';
import TexturesPage from './minecraft/Textures';
import PracticePage from './japanese/Practice';
import RecipesPage from './minecraft/Recipes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/minecraft/startup' element={<StartupPage />} />
            <Route path='/minecraft/textures' element={<TexturesPage />} />
            <Route path='/minecraft/recipes' element={<RecipesPage />} />
            <Route path='/japanese/practice' element={<PracticePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
