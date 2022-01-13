import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom';
import Page from '../Components/Page';
import ButtonStandard from '../Components/ButtonStandard';
import ResultsList from '../Components/ResultsList';

const Favourites = () => {
    const { logout, readDocumentOnSnapshot, readDocumentWoId, readAllDocuments, setIsLoading } = useContext(Context);
    const [favSnapshotData, setfavSnapshotData] = useState(undefined);
    const [favouritesResults, setFavouritesResults] = useState([]);
    const navigate = useNavigate();

    const logoutOnClick = async () => {
        await logout();
        navigate('/');
    }

    useEffect(async () => {
        const currUser = await readDocumentWoId('users');
        readDocumentOnSnapshot('users', currUser[0].id, setfavSnapshotData);
    }, [])

    useEffect(async () => {
        if(favSnapshotData){
            setIsLoading(true);

            const allResults = await readAllDocuments('results', false, false, false);
            const allFavouritedResults = allResults.filter(result => favSnapshotData.favouritesIds.find(id => id === result.id));
            setFavouritesResults(allFavouritedResults);

            setIsLoading(false);
        }
    }, [favSnapshotData])
    
    return (
        <Page extraClasses='bg-black/60'>
            <ResultsList state={favouritesResults}/>
            <div className='w-full flex items-center justify-center py-6 bg-black/30'>
                <ButtonStandard func={logoutOnClick}>Log out</ButtonStandard>
            </div>
        </Page>
    )
}

export default Favourites;