import React from 'react';
import Page from '../Components/Page';
import Row from '../Components/Row';
import Column from '../Components/Column';
import Image from '../Components/Image';
import { homeDataShowcase, homeDataGrid } from '../Data/homeData';

const Home = () => {

    return (
        <Page>
            <Column extraClasses='py-14 px-96 space-y-10 bg-gray-100'>
                <h1>PokeDex Tracker™</h1>
                <h2>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                     dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </h2>
            </Column>

            <Row extraClasses='py-24 px-28 space-x-28'>
                {homeDataShowcase.map((curr, index) => 
                    <Column key={index} extraClasses='space-y-8 fill-blue-400'>
                        <curr.icon/>
                        <h1>{curr.title}</h1>
                        <h3>{curr.text}</h3>
                    </Column>
                )}
            </Row>

            <div className='grid grid-rows-3 grid-cols-2 p-32 gap-32 items-center justify-items-center bg-gray-100'>
                {
                    homeDataGrid.map((curr, index) => 
                        curr.image ?
                        <Image key={index} img={curr.image} extraClasses='rounded-full shadow-lg shadow-cyan-200'/> :
                        <Column key={index} extraClasses='space-y-28'>
                            <h1>{curr.title}</h1>
                            <h3>{curr.text}</h3>
                        </Column>
                    )
                }
            </div>
        </Page>
    )
}

export default Home;