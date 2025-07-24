import { Button } from '@/components/ui/button';
import reactLogo from '@/ui/assets/react.svg';
import { Eraser, Mic, Minus, Moon, Plus, Settings, Wifi } from 'lucide-react';
import type { HeaderProps } from '../../types/pages/header.type';

export default function AppHeader({
  fontSize,
  adjustFontSize,
  toggleDarkMode,
  onListenClick,
  listening,
}: HeaderProps) {
  return (
    <div className='flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6 transition-colors duration-300'>
      <div className='flex items-center w-32 flex-shrink-0'>
        <img src={reactLogo} alt='Scout AI' className='h-12 w-auto' />
      </div>

      <div className='flex items-center'>
        <Button
          variant='default'
          onClick={onListenClick}
          className='flex items-center gap-3 px-8 py-6 rounded-xl font-semibold text-white text-lg w-48 transition-all duration-200 transform hover:scale-105 active:scale-95 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
        >
          <Mic className='w-6 h-6' />
          {listening ? 'Stop' : 'Listen'}
        </Button>
      </div>

      <div className='flex items-center gap-3 w-96 justify-end flex-shrink-0'>
        <div className='flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1'>
          <button
            onClick={() => adjustFontSize('down')}
            className='p-2 rounded-md transition-colors duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-white'
          >
            <Minus className='w-4 h-4' />
          </button>
          <div className='px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 w-20 text-center'>
            {fontSize}
          </div>
          <button
            onClick={() => adjustFontSize('up')}
            className='p-2 rounded-md transition-colors duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-white'
          >
            <Plus className='w-4 h-4' />
          </button>
        </div>

        <button className='p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200'>
          <Eraser className='w-5 h-5 text-gray-600 dark:text-gray-300' />
        </button>

        <button
          className='p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200'
          onClick={toggleDarkMode}
        >
          <Moon className='w-5 h-5 text-gray-600 dark:text-gray-300' />
        </button>

        <div className='p-2 rounded-lg transition-colors duration-300 bg-green-100 dark:bg-green-900/20'>
          <Wifi className='w-5 h-5 text-green-600 dark:text-green-400' />
        </div>

        <button className='p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200'>
          <Settings className='w-5 h-5 text-gray-600 dark:text-gray-300' />
        </button>
      </div>
    </div>
  );
}
