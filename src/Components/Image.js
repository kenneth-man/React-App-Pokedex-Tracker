import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Image = ({ img, extraClasses, extraWrapperClasses }) => {
    return (
        <LazyLoadImage 
            effect='opacity' 
            threshold={0} 
            src={img} 
            alt='lazyload-img' 
            className={`h-full ${extraClasses}`} 
            wrapperClassName={`h-full ${extraWrapperClasses}`}
        />
    )
}

export default Image;