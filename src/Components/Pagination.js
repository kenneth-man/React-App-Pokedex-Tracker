import React, { useState, useEffect } from 'react';
import Row from '../Components/Row';
import ButtonClear from './ButtonClear';
import { ReactComponent as LeftArrowIcon } from '../Res/Icons/keyboard_arrow_left.svg';
import { ReactComponent as RightArrowIcon } from '../Res/Icons/keyboard_arrow_right.svg';

const Pagination = ({ pageNumberState, pageNumberSetState, totalResults }) => {
    const [lastPageNumber, setLastPageNumber] = useState('');

    const paginationOnClick = (incrementPage) => {
        incrementPage ?
        pageNumberSetState(pageNumberState => pageNumberState + 1) :
        pageNumberSetState(pageNumberState => pageNumberState - 1);
    }

    useEffect(() => setLastPageNumber(Math.ceil(totalResults.length / 100)), [totalResults])

    return (
        <Row extraClasses='sticky bottom-0 py-4 w-full justify-center bg-gray-100 border-t border-gray-300'>
            <ButtonClear 
                extraClasses='fill-blue-400 hover:fill-blue-500'
                func={() => totalResults.length > 0 && (pageNumberState === 1 ? pageNumberSetState(lastPageNumber) : paginationOnClick(false))}
            >
                <LeftArrowIcon/>
            </ButtonClear>

            <h1 className='mx-20'>Page {pageNumberState} of {totalResults.length > 0 ? lastPageNumber : '???'}</h1>

            <ButtonClear 
                extraClasses='fill-blue-400 hover:fill-blue-500' 
                func={() => totalResults.length > 0 && (pageNumberState === lastPageNumber ? pageNumberSetState(1) : paginationOnClick(true))}
            >
                <RightArrowIcon/>
            </ButtonClear>
        </Row>
    )
}

export default Pagination;