import React,{ useState } from 'react';
import ContextProvider from './Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Cards from './Pages/Cards';
import Favourites from './Pages/Favourites';
import ResultPage from './Pages/ResultPage';
import Search from './Pages/Search';
import Sets from './Pages/Sets';

//firebase sdk; 
//1) create project on firebase.com, add the sign in methods you require
//2) create firstore database in 'firestore database' and add a web app to your project in 'project settings'
//3) update database rules (permissions) https://stackoverflow.com/questions/46590155/firestore-permission-denied-missing-or-insufficient-permissions
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyArcG2sRcZf8kQnj0VIWbvYo8kw9XzxSQc",
  authDomain: "pokedex-tracker-3d318.firebaseapp.com",
  projectId: "pokedex-tracker-3d318",
  storageBucket: "pokedex-tracker-3d318.appspot.com",
  messagingSenderId: "520696813792",
  appId: "1:520696813792:web:16883cbed37e9cedba5885"
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const App = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  //onAuthStateChanged parses a 'user' object in the callback function if signed in, otherwise 'user' is null; 'auth.currentUser' is same as 'user'
  onAuthStateChanged(auth, user => user ? setIsUserSignedIn(true) : setIsUserSignedIn(false));

  return (
    <div className="App relative flex flex-col justify-start">
      <ContextProvider auth={auth} db={db}>
        <BrowserRouter>
          {
            isUserSignedIn && 
            <NavBar/>
          }
        
          <Routes>
            <Route path='/' exact element={isUserSignedIn ? <Home/> : <Login/>}/>
            <Route path='/Register' exact element={<Register/>}/>
            <Route path='/Cards' exact element={<Cards/>}/>
            <Route path='/Search' exact element={<Search/>}/>
            <Route path='/Sets' exact element={<Sets/>}/>
            <Route path='/Favourites/:userName' exact element={<Favourites/>}/>
            <Route path='/ResultPage/:name' exact element={<ResultPage/>}/>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;