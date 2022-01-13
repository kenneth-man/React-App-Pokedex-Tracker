import { ReactComponent as HomeIcon } from '../Res/Icons/home.svg';
import { ReactComponent as CardsIcon } from '../Res/Icons/drawer.svg';
import { ReactComponent as SetsIcon } from '../Res/Icons/folder-open.svg';
import { ReactComponent as SearchIcon } from '../Res/Icons/search.svg';
import { ReactComponent as FavouritesIcon } from '../Res/Icons/bookmarks.svg';

export const navbarData = [
    {
        path: '/',
        text: 'Home',
        icon: HomeIcon
    },
    {
        path: '/Cards',
        text: 'Cards',
        icon: CardsIcon
    },
    {
        path: '/Sets',
        text: 'Sets',
        icon: SetsIcon
    },
    {
        path: '/Search',
        text: 'Search',
        icon: SearchIcon
    },
    {
        path: '/Favourites',
        text: 'Favourites',
        icon: FavouritesIcon
    },
]