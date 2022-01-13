import React from 'react';

const ButtonStandard = ({ children, func, row, col, type, extraClasses }) => {
    return (
        <button 
            type={type}
            onClick={func}
            className={
                `px-5 py-2 rounded-3xl font-bold uppercase text-white fill-white bg-blue-500 shadow-lg shadow-blue-500/50
                hover:bg-blue-400 hover:shadow-blue-400/50 hover:cursor-pointer hover:-translate-y-1
                 active:bg-blue-500 active:shadow-blue-500/50 active:translate-y-0 
                ${row && 'flex items-center'} 
                ${col && 'flex flex-col items-center'}
                ${extraClasses}`
            }
        >
            {children}
        </button>
    )
}

export default ButtonStandard;