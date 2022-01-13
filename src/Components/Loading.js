import React from 'react';
import LoadingGif from '../Res/Images/loading.gif';
import Row from '../Components/Row';

const Loading = ({ extraClasses }) => {
    return (
        <Row extraClasses='space-x-2'>
            <h1 className={extraClasses}>LOADING...</h1>
            <img src={LoadingGif} alt='loading-gif'/>  
        </Row>
    )
}

export default Loading;