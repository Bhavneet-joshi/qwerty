import { useEffect, useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

export function useThemeTransition() {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousTheme, setPreviousTheme] = useState(theme);

  useEffect(() => {
    if (theme !== previousTheme) {
      setIsTransitioning(true);
      setPreviousTheme(theme);
      
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [theme, previousTheme]);

  return { 
    isTransitioning, 
    theme, 
    previousTheme,
    // Helper function to add transition classes
    getTransitionClass: (baseClass: string = '') => 
      `${baseClass} ${isTransitioning ? 'theme-changing' : ''} theme-transition`
  };
}

// Hook for components that need smooth theme-aware animations
export function useThemeAwareAnimation(animationClass?: string) {
  const { isTransitioning, theme, getTransitionClass } = useThemeTransition();
  
  return {
    isTransitioning,
    theme,
    className: getTransitionClass(animationClass),
    style: {
      transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
    }
  };
}