import React, { useContext, useEffect, useState, useRef } from 'react';
import { Context } from '../Context';
import Page from '../Components/Page';
import Column from '../Components/Column';
import Row from '../Components/Row';
import ButtonClear from '../Components/ButtonClear';
import ButtonStandard from '../Components/ButtonStandard';
import { ReactComponent as LeftArrowIcon} from '../Res/Icons/keyboard_arrow_left.svg';
import { ReactComponent as RightArrowIcon} from '../Res/Icons/keyboard_arrow_right.svg';
import { ReactComponent as FavouritesIcon } from '../Res/Icons/bookmarks.svg';
import { ReactComponent as BinIcon } from '../Res/Icons/trash-o.svg';

const ResultPage = () => {
    const { resultPageData, setResultPageData, resultPageAll, resultPageIndex,
        setResultPageIndex, scrollToTop, createStringFromArray, updateDocument, readDocumentWoId, readAllDocuments, createDocument } = useContext(Context);
    const [previousElementName, setPreviousElementName] = useState('START');
    const [nextElementName, setNextElementName] = useState('END');
    const [isAlreadyFav, setIsAlreadyFav] = useState(false);
    const [currentUserData, setCurrentUserData] = useState([]);
    const isInitialRender = useRef(true);
    const isFirstIndex = resultPageIndex === 0;
    const isLastIndex = resultPageIndex === resultPageAll.length - 1;

    const calcNeighbourElements = () => {
        !isFirstIndex ? setPreviousElementName(resultPageAll[resultPageIndex - 1]?.name) : setPreviousElementName('START');
        !isLastIndex ? setNextElementName(resultPageAll[resultPageIndex + 1]?.name) : setNextElementName('END');
    }

    const updatePageIndex = navigateNext => 
        navigateNext ? 
        ( !isLastIndex && setResultPageIndex(resultPageIndex + 1) ) :
        ( !isFirstIndex && setResultPageIndex(resultPageIndex - 1) );  
        
    const addToFavouritesOnClick = async () => {
        const removedFavIdArray = currentUserData.favouritesIds.filter(curr => curr !== resultPageData.id);

        const allResultDocs = await readAllDocuments('results', false, false , false);

        //onClick adding result data to 'results' collection if doesn't already exist; instead of adding all 350ish results at same time; performance issues
        !allResultDocs.find(curr => curr.id === resultPageData.id) &&
        await createDocument('results', resultPageData);
        
        isAlreadyFav ?
        await updateDocument('users', currentUserData.id, 'favouritesIds', removedFavIdArray) :
        await updateDocument('users', currentUserData.id, 'favouritesIds', resultPageData.id, false);

        setIsAlreadyFav(!isAlreadyFav);
    }
    
    useEffect(() => calcNeighbourElements(), [resultPageData])

    useEffect(async () => {
        const currUser = await readDocumentWoId('users');
        setIsAlreadyFav(currUser[0].favouritesIds?.includes(resultPageAll[resultPageIndex].id));
        setCurrentUserData(currUser[0]);

        if(isInitialRender.current){
            isInitialRender.current = false;
        } else {
            setResultPageData(resultPageAll[resultPageIndex]);
            scrollToTop();
        }
    }, [resultPageIndex])

    return (
        <Page backgroundImg={resultPageData.images.large ? resultPageData.images.large : resultPageData.images.logo} extraClasses='bg-repeat'>
            <Row extraClasses='py-20 w-full justify-center space-x-52 bg-black/70'>
                <img src={resultPageData.images.small ? resultPageData.images.small : resultPageData.images.logo} alt='resultPage-img' className='h-96 rounded-2xl'/>
                
                <Column extraClasses='space-y-12'>
                    <h1 className='text-white uppercase'>{resultPageData.name}</h1>
                    <h2 className='text-white'>{resultPageData.artist ? `Artist - ${resultPageData.artist}` : `Released -${resultPageData.releaseDate}`}</h2>
                    <h2 className='text-white'>{resultPageData.rarity ? `Rarity - ${resultPageData.rarity}` : `Series - ${resultPageData.series}`}</h2>
                    <h2 className='text-white'>{resultPageData.set ? `Set - ${resultPageData.set.name}` : `Total Cards - ${resultPageData.total}`}</h2>
                    <h2 className='text-white'>{resultPageData.types ? `Type/s - ${createStringFromArray(resultPageData.types)}` : `PTCGO code - ${resultPageData.ptcgoCode}`}</h2>
                </Column>
            </Row>
            {
                resultPageData.attacks &&
                <Column extraClasses='w-full bg-black/40'>
                    {
                        resultPageData.attacks.map((curr, index) =>
                            <Column key={index} extraClasses='h-96 w-full justify-evenly border-t border-t-gray-500'>
                                <h1 className='text-white'>{curr.name}</h1>
                                <h2 className='text-white'>Damage - {curr.damage ? curr.damage : 0} dmg</h2>
                                <h2 className='text-white'>{`Cost - ${createStringFromArray(curr.cost)}`}</h2>
                                <h3 className='text-white w-1/2 text-center'>{curr.text}</h3>
                            </Column>
                        )
                    }
                </Column>
            }

            <div className='w-full flex items-center justify-center py-10 bg-black/40'>
                <ButtonStandard func={addToFavouritesOnClick} row={true}>
                    {isAlreadyFav ? 'Remove from favourites' : 'Add to favourites'}
                    &nbsp;
                    {isAlreadyFav ? <BinIcon/> : <FavouritesIcon/>}
                </ButtonStandard>
            </div>

            <Row extraClasses='w-full justify-between px-20 py-10 bg-black/40 border-t border-t-gray-500'>
                <ButtonClear 
                    row={true} 
                    extraClasses='fill-white hover:fill-gray-500' 
                    func={() => updatePageIndex(false)}
                >
                    <LeftArrowIcon/>
                    &nbsp;
                    <h1 className='text-white'>{previousElementName}</h1>
                </ButtonClear>

                <ButtonClear 
                    row={true} 
                    extraClasses='fill-white hover:fill-gray-500' 
                    func={() => updatePageIndex(true)}
                >      
                    <h1 className='text-white'>{nextElementName}</h1>
                    &nbsp;
                    <RightArrowIcon/>
                </ButtonClear>
            </Row>
        </Page>
    )
}

export default ResultPage;