import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import Page from '../Components/Page';
import ResultsList from '../Components/ResultsList';
import Pagination from '../Components/Pagination';

const Cards = () => {
    const { fetchApiData, cardsPageNumber, setCardsPageNumber, totalCardsData, setTotalCardsData } = useContext(Context);
    const [cardsData, setCardsData] = useState([]);

    useEffect(async () => {
        const totalCards = await fetchApiData('cards', cardsPageNumber, setCardsData);
        setTotalCardsData(totalCards);
    }, [cardsPageNumber])

    return (
        <Page>
            <ResultsList 
                state={cardsData}
            />
            <Pagination 
                pageNumberState={cardsPageNumber}
                pageNumberSetState={setCardsPageNumber} 
                totalResults={totalCardsData}
            />
        </Page>
    )
}

export default Cards;