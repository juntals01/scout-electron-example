import { Key, Languages, Shield, TestTube, Wifi } from 'lucide-react';

export default function TranslationStatusBar() {
  return (
    <div className='mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
          <Languages className='w-4 h-4' />
          <span className='font-medium capitalize'>offline</span>
        </div>
        <div className='text-sm text-gray-600 dark:text-gray-300'>
          2 languages selected
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2 text-sm text-green-600 dark:text-green-400'>
            <Wifi className='w-4 h-4' />
            <span className='font-medium'>Online</span>
          </div>
          <button
            className='flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200'
            title='Run Auto Test'
          >
            <TestTube className='w-4 h-4' />
            Run Tests
          </button>
          <button
            className='flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors duration-200'
            title='Admin Panel'
          >
            <Key className='w-4 h-4' />
            Admin
          </button>
          <button className='flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200'>
            <Shield className='w-4 h-4' />
            Threat Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
