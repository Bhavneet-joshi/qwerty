import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(storageKey) as Theme;
    // Only allow 'light' or 'dark', default to 'light'
    return stored === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const body = document.body;

    // Add transition class for smooth theme switching
    root.style.transition = 'color 0.3s ease, background-color 0.3s ease';
    body.style.transition = 'color 0.3s ease, background-color 0.3s ease';

    root.classList.remove('light', 'dark');
    root.classList.add(theme === 'dark' ? 'dark' : 'light');

    // Apply theme attribute for additional styling hooks
    root.setAttribute('data-theme', theme);
    
    // Store theme preference
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      // Only allow 'light' or 'dark'
      const validTheme = newTheme === 'dark' ? 'dark' : 'light';
      localStorage.setItem(storageKey, validTheme);
      setTheme(validTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};