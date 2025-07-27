import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isToggling, setIsToggling] = useState(false);

  const toggleTheme = async () => {
    setIsToggling(true);
    
    // Add a brief delay for smooth visual feedback
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      setTimeout(() => setIsToggling(false), 150);
    }, 100);
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className={`
        relative w-10 h-10 rounded-full theme-button
        bg-gradient-to-br from-gray-100 to-gray-200 
        hover:from-gray-200 hover:to-gray-300
        dark:from-gray-800 dark:to-gray-700 
        dark:hover:from-gray-700 dark:hover:to-gray-600
        border border-gray-300 dark:border-gray-600
        shadow-sm hover:shadow-md
        transition-all duration-300 cubic-bezier(0.4, 0.0, 0.2, 1)
        ${isToggling ? 'scale-95 shadow-lg' : 'scale-100'}
        hover:scale-105 active:scale-95
        golden-glow
      `}
      onClick={toggleTheme}
      disabled={isToggling}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Background glow effect */}
        <div className={`
          absolute inset-0 rounded-full transition-all duration-300
          ${theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' 
            : 'bg-gradient-to-br from-amber-400/20 to-orange-400/20'
          }
          ${isToggling ? 'scale-110 opacity-100' : 'scale-100 opacity-0'}
        `} />
        
        {/* Sun icon */}
        <Sun className={`
          absolute h-5 w-5 text-amber-500 drop-shadow-sm
          transition-all duration-500 cubic-bezier(0.4, 0.0, 0.2, 1) transform
          ${theme === 'dark' 
            ? 'rotate-90 scale-0 opacity-0' 
            : 'rotate-0 scale-100 opacity-100'
          }
          ${!isToggling && theme === 'light' ? 'hover:scale-110' : ''}
        `} />
        
        {/* Moon icon */}
        <Moon className={`
          absolute h-5 w-5 text-blue-400 drop-shadow-sm
          transition-all duration-500 cubic-bezier(0.4, 0.0, 0.2, 1) transform
          ${theme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100' 
            : '-rotate-90 scale-0 opacity-0'
          }
          ${!isToggling && theme === 'dark' ? 'hover:scale-110' : ''}
        `} />
        
        {/* Animated ring during toggle */}
        {isToggling && (
          <div className="absolute inset-0 rounded-full border-2 border-golden animate-ping opacity-75" />
        )}
      </div>
      <span className="sr-only">
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
      </span>
    </Button>
  );
}