import { Mic, Minus, Moon, Plus, Volume2 } from 'lucide-react';
import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';

function App() {
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('X-Large');

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  const adjustFontSize = (direction: 'up' | 'down') => {
    const sizes = ['Small', 'Medium', 'Large', 'X-Large', 'XX-Large'];
    let index = sizes.indexOf(fontSize);

    if (direction === 'up' && index < sizes.length - 1) index++;
    if (direction === 'down' && index > 0) index--;

    setFontSize(sizes[index]);
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
      <div className='py-4 flex flex-col px-4 space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4'>
          <div className='flex items-center'>
            <img src={reactLogo} alt='Scout AI' className='h-12 w-auto' />
          </div>
          <div className='flex items-center space-x-4'>
            <button className='btn-primary flex items-center gap-2'>
              <Mic className='w-6 h-6' />
              Listen
            </button>

            {/* Font Size Control */}
            <div className='flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1'>
              <button
                onClick={() => adjustFontSize('down')}
                className='icon-button'
              >
                <Minus className='w-4 h-4' />
              </button>
              <div className='px-3 text-sm font-medium text-gray-700 dark:text-gray-300 w-20 text-center'>
                {fontSize}
              </div>
              <button
                onClick={() => adjustFontSize('up')}
                className='icon-button'
              >
                <Plus className='w-4 h-4' />
              </button>
            </div>

            {/* Toggle Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className='icon-button'
              title='Toggle Dark Mode'
            >
              <Moon className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Live Caption Section */}
        <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-2'>
              <Volume2 className='w-6 h-6 text-gray-600 dark:text-gray-300' />
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Live Captions (English)
              </h2>
            </div>
            <div className='flex items-center gap-3'>
              <button className='btn-secondary'>Caption Mode</button>
              <div className='bg-gray-200 dark:bg-gray-600 rounded-full px-3 py-1'>
                <select
                  className='bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 outline-none'
                  defaultValue='en-US'
                >
                  <option value='en-US'>English (US)</option>
                  <option value='es-ES'>Spanish</option>
                  <option value='fr-FR'>French</option>
                </select>
              </div>
            </div>
          </div>
          <div className='min-h-[80px] p-6 bg-gray-50 dark:bg-gray-700 rounded-lg'>
            <p className='text-gray-500 dark:text-gray-400 italic text-xl'>
              No transcript yet. Click Listen to start.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
