import React from 'react';
import { Toaster } from 'sonner';
import { AppRouter } from './router';

function App() {
  return (
    <>
      <AppRouter />
      <Toaster position="top-right" theme="dark" richColors />
    </>
  );
}

export default App;
