import { useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';

export function ThemeTransition() {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    setShowOverlay(true);
    
    // Add theme-changing class to body for additional effects
    document.body.classList.add('theme-changing');
    
    const overlayTimer = setTimeout(() => setShowOverlay(false), 150);
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false);
      document.body.classList.remove('theme-changing');
    }, 400);
    
    return () => {
      clearTimeout(overlayTimer);
      clearTimeout(transitionTimer);
      document.body.classList.remove('theme-changing');
    };
  }, [theme]);

  if (!isTransitioning) return null;

  return (
    <>
      {/* Subtle overlay for smooth transition */}
      {showOverlay && (
        <div 
          className={`
            fixed inset-0 z-40 pointer-events-none
            transition-all duration-150 ease-out
            ${theme === 'dark' 
              ? 'bg-gradient-to-br from-gray-900/10 to-golden/5' 
              : 'bg-gradient-to-br from-white/10 to-navyblue/5'
            }
          `}
          style={{
            opacity: showOverlay ? 0.6 : 0,
          }}
        />
      )}
      
      {/* Animated particles effect */}
      <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-2 h-2 rounded-full
              ${theme === 'dark' ? 'bg-golden/30' : 'bg-navyblue/20'}
              animate-pulse
            `}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.6s',
            }}
          />
        ))}
      </div>
    </>
  );
}

// Hook for smooth theme transitions on individual components
export function useThemeTransition() {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [theme]);

  return { isTransitioning, theme };
}