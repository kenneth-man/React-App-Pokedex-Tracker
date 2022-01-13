import React, { useContext, useEffect, useState, useRef } from 'react';
import { Context } from '../Context';
import Page from '../Components/Page';
import Input from '../Components/Input';
import ResultsList from '../Components/ResultsList';
import Column from '../Components/Column';
import Row from '../Components/Row';
import Pagination from '../Components/Pagination';
import { ReactComponent as SearchIcon } from '../Res/Icons/magnifying-glass.svg';
import ButtonClear from '../Components/ButtonClear';

const Search = () => {
    const { searchData, setSearchData, searchQuery, setSearchQuery, totalSearchData, setTotalSearchData,
        searchPageNumber, setSearchPageNumber, fetchApiData,  setIsLoading, calcPageDataIndexes } = useContext(Context);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const isInitialRender = useRef(true);

    const fetchApiDataBySearch = async (query, setState) => {
        try {
            setIsLoading(true);

            const allCards = await fetchApiData('cards');
            const allSets = await fetchApiData('sets');
            const allObjects = allCards.concat(allSets);
            const filteredObjects = allObjects.filter(curr => curr.name.toLowerCase().includes(query.toLowerCase())); 

            const indexesObj = calcPageDataIndexes(searchPageNumber);

            setState(filteredObjects.slice(indexesObj.startElementIndex, indexesObj.endElementIndex));
            setIsSearchActive(false);
            setIsLoading(false);

            return filteredObjects;
        } catch(error){
            console.log(error);
        }
    }

    const searchButtonOnClick = () => {
        setIsSearchActive(true)
        setSearchPageNumber(1);
    }

    useEffect(async () => {
        if(isInitialRender.current){
            isInitialRender.current = false;
        } else if(isSearchActive){
            const totalResults = await fetchApiDataBySearch(searchQuery, setSearchData, searchPageNumber);
            setTotalSearchData(totalResults);
        }
    }, [isSearchActive, searchPageNumber])

    useEffect(() => {
        if(!isSearchActive){
            const indexesObj = calcPageDataIndexes(searchPageNumber);
            setSearchData(totalSearchData.slice(indexesObj.startElementIndex, indexesObj.endElementIndex));
        }
    }, [searchPageNumber])

    return (
        <Page>
            <Column extraClasses='w-full py-14 space-y-10 bg-gray-100'>
                <h1>Search for pokemon cards or set names...</h1>

                <Row extraClasses='bg-white rounded-full'>
                    <Input
                        type='text'
                        state={searchQuery}
                        setState={setSearchQuery}
                        placeHolder='Type the set card name or set name here...'
                    />
                    <ButtonClear extraClasses='h-full px-4 fill-gray-400 rounded-full hover:fill-gray-400' func={searchButtonOnClick}>
                        <SearchIcon/>
                    </ButtonClear>
                </Row>
            </Column>
            <ResultsList
                state={searchData}
            />
            <Pagination
                pageNumberState={searchPageNumber}
                pageNumberSetState={setSearchPageNumber}
                totalResults={totalSearchData}
            />
        </Page>
    )
}

export default Search;