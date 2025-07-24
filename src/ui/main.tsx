import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='min-h-screen overflow-y-auto bg-background text-foreground'>
      <App />
    </div>
  </StrictMode>
);
