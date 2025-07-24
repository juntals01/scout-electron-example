export type HeaderProps = {
  fontSize: string;
  adjustFontSize: (dir: 'up' | 'down') => void;
  toggleDarkMode: () => void;
  onListenClick: () => void;
  listening: boolean;
};
