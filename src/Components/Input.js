import React from 'react';

const Input = ({ type, state, setState, placeHolder, extraClasses }) => {
    return (
        <input 
            type={type} 
            value={state} 
            onChange={e => setState(e.target.value)} 
            placeholder={placeHolder} 
            className={
                `px-5 py-2 rounded-3xl w-96 text-center text-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-300 
                hover:cursor-pointer hover:ring-2 hover:ring-blue-300 ${extraClasses}`
            }
        />
    )
}

export default Input;