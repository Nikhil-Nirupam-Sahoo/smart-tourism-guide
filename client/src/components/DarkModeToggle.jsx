import { useDarkMode } from '../context/DarkModeContext';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const { darkMode, toggle } = useDarkMode();
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
