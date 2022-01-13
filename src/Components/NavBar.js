import React, { useContext } from 'react';
import { Context } from '../Context';
import { Link, NavLink } from 'react-router-dom';
import ButtonStandard from './ButtonStandard';
import Row from './Row';
import Logo from '../Res/Images/logo.png';
import { navbarData } from '../Data/navbarData';

const NavBar = () => {
    const { auth, navbarName } = useContext(Context);

    return (
        <Row extraClasses='sticky top-0 left-0 justify-between h-20 min-h-[5rem] px-5 z-50 border-b-1 border-black/30 bg-black/70'>
            <Link to='/'>
                <img src={Logo} alt='logo-img' className='w-60'/>
            </Link>

            <h2 className='text-white italic'>{navbarName ? `Welcome back, ${navbarName}` : 'Loading...'}</h2>
            
            <Row extraClasses='space-x-10'>
                {
                    navbarData.map((curr, index) =>
                        <NavLink 
                            key={index} 
                            to={curr.path === '/Favourites' ? `/Favourites/${auth.currentUser.displayName}` : curr.path} 
                            className={({ isActive }) => isActive ? 'flex shadow-md shadow-cyan-200 rounded-3xl' : 'flex'}
                        >
                            <ButtonStandard row={true}>
                                {curr.text}
                                &nbsp;
                                <curr.icon/>
                            </ButtonStandard>
                        </NavLink>
                    )
                }
            </Row>
        </Row>
    )
}

export default NavBar;