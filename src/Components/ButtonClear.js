import React from 'react';

const ButtonClear = ({ children, func, row, col, type, extraClasses }) => {
    return (
        <button 
            type={type}
            onClick={func}
            className={
                `${row && 'flex items-center'} 
                ${col && 'flex flex-col items-center'}
                ${extraClasses}`
            }
        >
            {children}
        </button>
    )
}

export default ButtonClear;