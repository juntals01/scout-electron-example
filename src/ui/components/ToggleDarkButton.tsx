import { Moon } from 'lucide-react';

export default function ToggleDarkButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className='icon-button' title='Toggle Dark Mode'>
      <Moon className='w-5 h-5' />
    </button>
  );
}
