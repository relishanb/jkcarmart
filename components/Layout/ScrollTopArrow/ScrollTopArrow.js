import React, {useState, useEffect} from 'react';

const ScrollTopArrow = () =>{  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

  return (
    <span className="scrollbutton"  onClick={scrollToTop}>
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  </span>
  );
}

export default ScrollTopArrow;