import React from 'react';
import { Link } from 'react-router-dom';

const LinkStandard = ({ children, path, extraClasses }) => {
    return (
        <Link to={path} className={`hover:cursor-pointer underline ${extraClasses}`}>
           {children} 
        </Link>
    )
}

export default LinkStandard;