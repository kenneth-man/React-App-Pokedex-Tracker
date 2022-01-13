import React, { useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import Column from '../Components/Column';
import Row from './Row';
import Image from '../Components/Image';
import ButtonStandard from '../Components/ButtonStandard';
import pokemonCardBackImage from '../Res/Images/pokemonCardBack.jpg';

const Result = ({ resultData, resultState, resultIndex, isOnFavouritesPage }) => {
    const { setResultPageData, setResultPageAll, setResultPageIndex, createStringFromArray, readDocumentWoId, updateDocument } = useContext(Context);

    const viewDetailsOnClick = () => {
        setResultPageData(resultData);
        setResultPageAll(resultState);
        setResultPageIndex(resultIndex)
    }

    const removeFromFavOnClick = async () => {
        const currentUser = await readDocumentWoId('users');
        const filtereredArray = currentUser[0].favouritesIds.filter(curr => curr !== resultData.id);
        await updateDocument('users', currentUser[0].id, 'favouritesIds', filtereredArray); 
    }

    return (
        <div className='result h-[450px] w-[320px] rounded-2xl mx-16 mb-24 hover:cursor-pointer'>
            <div className='result__inner relative h-full w-full '>
                <div className='result__front absolute h-full w-full rounded-2xl'>
                    <Image 
                        img={resultData.images.large ? resultData.images.large : resultData.images.logo}
                        extraClasses={`shadow-lg shadow-black-200 rounded-2xl ${resultData.series ? 'object-contain' : 'object-cover'}`}
                    />
                </div>
                <Column extraClasses='result__back justify-evenly absolute h-full w-full px-10 rounded-2xl' backgroundImg={pokemonCardBackImage}>
                    <Column extraClasses='space-y-6'>
                        <h1 className='text-white uppercase'>
                            {resultData.name}
                        </h1>
                        <h2 className='text-white'>
                            {resultData.types ? `${createStringFromArray(resultData.types)} type` : resultData.releaseDate}
                        </h2>
                        <h3 className='text-white'>
                            {resultData.hp ? `${resultData.hp} HP` : `Contains ${resultData.total} cards`}
                        </h3>
                    </Column>

                    <Row extraClasses='w-full justify-center space-x-10'>
                        <Link to={`/ResultPage/${resultData.name}`} onClick={viewDetailsOnClick}>
                            <ButtonStandard>View details</ButtonStandard>
                        </Link>

                        {
                            isOnFavouritesPage &&
                            <ButtonStandard func={removeFromFavOnClick}>Remove from favourites</ButtonStandard>
                        }
                    </Row>
                </Column>
            </div>
        </div>
    )
}

export default Result;