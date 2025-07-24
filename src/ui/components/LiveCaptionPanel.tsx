import { Volume2 } from 'lucide-react';

type Props = {
  text: string;
  language: string;
  onLanguageChange: (lang: string) => void;
};

export default function LiveCaptionPanel({
  text,
  language,
  onLanguageChange,
}: Props) {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <Volume2 className='w-6 h-6 text-gray-600 dark:text-gray-300' />
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
            Live Captions ({language})
          </h2>
        </div>
        <div className='flex items-center gap-3'>
          <button className='btn-secondary'>Caption Mode</button>
          <div className='bg-gray-200 dark:bg-gray-600 rounded-full px-3 py-1'>
            <select
              className='bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 outline-none'
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
            >
              <option value='en-US'>English (US)</option>
              <option value='es-ES'>Spanish</option>
              <option value='fr-FR'>French</option>
            </select>
          </div>
        </div>
      </div>
      <div className='min-h-[80px] p-6 bg-gray-50 dark:bg-gray-700 rounded-lg'>
        <p className='text-gray-900 dark:text-gray-100 text-xl'>
          {text || (
            <span className='text-gray-500 dark:text-gray-400 italic'>
              No transcript yet. Click Listen to start.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
