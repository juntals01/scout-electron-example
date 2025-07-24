import { useState } from 'react';
import useSpeechRecognition from '../lib/useSpeechRecognition';
import './App.css';
import AppHeader from './components/AppHeader';
import LiveCaptionPanel from './components/LiveCaptionPanel';

function App() {
  const [fontSize, setFontSize] = useState('X-Large');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en-US');

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

  const { text, listening, start, stop } = useSpeechRecognition(language);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
      <div className='py-4 flex flex-col px-4 space-y-6'>
        <AppHeader
          fontSize={fontSize}
          adjustFontSize={adjustFontSize}
          toggleDarkMode={toggleDarkMode}
          onListenClick={listening ? stop : start}
          listening={listening}
        />
        {isDarkMode}
        <LiveCaptionPanel
          text={text}
          language={language}
          onLanguageChange={setLanguage}
        />
      </div>
    </div>
  );
}

export default App;
