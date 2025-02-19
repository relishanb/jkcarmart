import { useState } from 'react';

function SearchField({ placeholder, value, inputRef, onChange }) {
    return (
        <div className='fixed top-16 right-0 left-0 bg-white w-full py-8'>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                ref={inputRef}
                className="fixed top-[80px] right-4 left-4 px-3.5 py-2.5 border border-gray-300 rounded-full z-50"
            />
        </div>
    );
}

export default SearchField;