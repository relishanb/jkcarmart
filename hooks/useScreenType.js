import { useState, useEffect } from 'react';

const useScreenType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined to avoid SSR issues
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 600);
      };
      handleResize(); // Call it initially to set the value correctly
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return isMobile;
};

export default useScreenType;
