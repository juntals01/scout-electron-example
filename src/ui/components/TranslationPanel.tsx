import { ChevronDown, Languages } from 'lucide-react';

export default function TranslationPanel() {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'></div>
        <div className='flex-shrink-0'>
          <div className='relative'>
            <button className='flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm w-40'>
              <span className='text-sm'>🇸🇦</span>
              <span className='font-medium text-xs truncate'>Arabic</span>
              <ChevronDown className='w-3 h-3 ml-auto transition-transform duration-200' />
            </button>
          </div>
        </div>
      </div>
      <div
        className='min-h-[150px] p-6 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300 text-right'
        dir='rtl'
      >
        <div className='text-center py-12'>
          <Languages className='w-16 h-16 text-gray-400 mx-auto mb-4' />
          <p className='text-gray-500 dark:text-gray-400 italic text-2xl'>
            No translations yet
          </p>
          <p className='text-gray-400 dark:text-gray-500 text-lg mt-2'>
            Click Listen to start translating
          </p>
        </div>
      </div>
    </div>
  );
}
