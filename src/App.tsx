import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@picocss/pico';
import Layout from './Layout';
import StartupPage from './minecraft/Startup';
import TexturesPage from './minecraft/Textures';
import PracticePage from './misc/Practice';
import RecipesPage from './minecraft/Recipes';
import FinancePage from './misc/Finance';
import CommandsPage from './minecraft/Commands';

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
            <Route path='/minecraft/commands' element={<CommandsPage />} />
            <Route path='/misc/japanese' element={<PracticePage />} />
            <Route path='/misc/finance' element={<FinancePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
