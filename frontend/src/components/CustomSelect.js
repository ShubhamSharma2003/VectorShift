import { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

export const CustomSelect = ({ value, onChange, options, placeholder = 'Select...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : placeholder;
  };

  return (
    <div className="custom-select" ref={selectRef}>
      <button
        type="button"
        className={`custom-select__trigger ${isOpen ? 'custom-select__trigger--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-select__value">{getDisplayValue()}</span>
        <svg 
          className="custom-select__arrow" 
          width="12" 
          height="12" 
          viewBox="0 0 12 12"
          fill="none"
        >
          <path 
            d="M2.5 4.5L6 8L9.5 4.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="custom-select__dropdown">
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-select__option ${value === option.value ? 'custom-select__option--selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              <span className="custom-select__option-label">{option.label}</span>
              {value === option.value && (
                <svg 
                  className="custom-select__check" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path 
                    d="M11.5 3.5L5.5 9.5L2.5 6.5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
