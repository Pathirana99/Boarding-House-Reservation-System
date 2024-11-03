import React, { useState } from 'react';
import '../pages/login.css';
import CloseIcon from '@mui/icons-material/Close';

export default function EnterCodePopup({ onClose, onNext,setCode}) {
  const [code, setLocalCode] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;

    // Allow only numeric input and restrict to 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setLocalCode(value);
    }
  };

  const handleConfirm = () => {
    if (code.length === 6) {
      setCode(code);
      onNext();
    } else {
      // Optionally, handle the case where the code is not 6 digits
      console.log("Please enter exactly 6 digits.");
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <CloseIcon className="close-popup" onClick={onClose} />
        <h2>Enter 6-Digit Code</h2>
        <input
          type="text"
          placeholder="Enter the code"
          value={code}
          onChange={handleChange}
          className="input-field"
          maxLength="6" // Optional: restrict input length to 6 digits
        />
        <button
          className={`confirm-button ${code.length === 6 ? 'active' : ''}`} // Conditional class
          onClick={handleConfirm}
          disabled={code.length !== 6} // Disable button if code is not 6 digits
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
