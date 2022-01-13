import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import Page from '../Components/Page';
import ResultsList from '../Components/ResultsList';
import Pagination from '../Components/Pagination';

const Sets = () => {
    const { fetchApiData, setsPageNumber, setSetsPageNumber, totalSetsData, setTotalSetsData } = useContext(Context);
    const [setsData, setSetsData] = useState([]);

    useEffect(async () => {
        const allSets = await fetchApiData('sets', setsPageNumber, setSetsData);
        setTotalSetsData(allSets);
    }, [setsPageNumber])

    return (
        <Page>
            <ResultsList
                state={setsData}
            />
            <Pagination
                pageNumberState={setsPageNumber}
                pageNumberSetState={setSetsPageNumber}
                totalResults={totalSetsData}
            /> 
        </Page>
    )
}

export default Sets;