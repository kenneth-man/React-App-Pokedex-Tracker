import React from 'react';

const Column = ({ children, extraClasses, backgroundImg }) => {
    return (
        <div 
            className={`flex flex-col items-center ${extraClasses}`}
            style={backgroundImg && 
                { 
                    backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.3), rgba(0,0,0,0.9)), url(${backgroundImg})`,
                    backgroundSize: 'cover'
                }
            }
        >
            {children}
        </div>
    )
}

export default Column;