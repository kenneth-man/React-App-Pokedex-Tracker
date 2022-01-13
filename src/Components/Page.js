import React from 'react';

const Page = ({ children, extraClasses, backgroundImg }) => {
    return (
        <div 
            className={`Page flex flex-col flex-1 justify-start items-center ${extraClasses}`} 
            style={backgroundImg && 
                { 
                    backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.4), rgba(0,0,0,1)), url(${backgroundImg})` 
                }
            }
        >
            {children}
        </div>
    )
}

export default Page;