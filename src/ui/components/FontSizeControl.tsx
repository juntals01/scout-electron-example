import { Minus, Plus } from 'lucide-react';
import type { FontControlProps } from '../../types/pages/fontsize.type';

export default function FontSizeControl({
  fontSize,
  onChange,
}: FontControlProps) {
  return (
    <div className='flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1'>
      <button onClick={() => onChange('down')} className='icon-button'>
        <Minus className='w-4 h-4' />
      </button>
      <div className='px-3 text-sm font-medium text-gray-700 dark:text-gray-300 w-20 text-center'>
        {fontSize}
      </div>
      <button onClick={() => onChange('up')} className='icon-button'>
        <Plus className='w-4 h-4' />
      </button>
    </div>
  );
}
