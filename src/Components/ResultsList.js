import React, { useContext } from 'react';
import { Context } from '../Context';
import Result from './Result';
import Loading from './Loading';

const ResultsList = ({ state }) => {
    const { isLoading } = useContext(Context);

    return (
        <div className='flex items-start justify-center flex-wrap w-full h-full pt-24'>
            {
                isLoading ?
                <Loading extraClasses='text-black'/> :
                (
                    state.length > 0 ?
                    state.map((curr, index) => 
                        <Result
                            key={index}
                            resultData={curr}
                            resultState={state}
                            resultIndex={index}
                        />
                    ) :
                    <h1>No data found...</h1>
                )
            }
        </div>
    )
}

export default ResultsList;