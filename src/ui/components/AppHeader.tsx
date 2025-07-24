import reactLogo from '@/ui/assets/react.svg';
import { Mic } from 'lucide-react';
import FontSizeControl from './FontSizeControl';
import ToggleDarkButton from './ToggleDarkButton';

type Props = {
  fontSize: string;
  adjustFontSize: (dir: 'up' | 'down') => void;
  toggleDarkMode: () => void;
  onListenClick: () => void;
  listening: boolean;
};

export default function AppHeader({
  fontSize,
  adjustFontSize,
  toggleDarkMode,
  onListenClick,
  listening,
}: Props) {
  return (
    <div className='flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4'>
      <div className='flex items-center'>
        <img src={reactLogo} alt='Scout AI' className='h-12 w-auto' />
      </div>
      <div className='flex items-center space-x-4'>
        <button
          className='btn-primary flex items-center gap-2'
          onClick={onListenClick}
        >
          <Mic className='w-6 h-6' />
          {listening ? 'Stop' : 'Listen'}
        </button>
        <FontSizeControl fontSize={fontSize} onChange={adjustFontSize} />
        <ToggleDarkButton onClick={toggleDarkMode} />
      </div>
    </div>
  );
}
