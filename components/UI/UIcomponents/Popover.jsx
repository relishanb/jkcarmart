import { useState, useRef, useEffect } from 'react';

export default function Popover({ children, content: Content, position = 'bottom' , className}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const handleClickOutside = (event) => {

    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getPopoverPosition = () => {
    switch (position) {
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'bottom':
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
    }
  };

  return (
    <>
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)}>
      {Content}
      </div>


      {isOpen && (
        <div className={`absolute z-[1509]  bg-white ${className}    shadow-2xl   ${getPopoverPosition()}`}>
          {children}
        </div>
      )}

      
    </div>
      </>
  );
}