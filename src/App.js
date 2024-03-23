import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './features/page/Header';
import Footer from './features/page/Footer';
import Navmenu from './features/page/Navmenu';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import SettingsPage from './pages/SettingsPage';
import { keepUserSession } from './app/selectors/userSlice';


function App() {

  //This lets NavMenu know to collapse when something else is clicked
  const [homeClick, toggleHomeClick] = useState(false);

  const userState = useSelector(state=> state.user);
  const dispatch = useDispatch();
  
  //A listener to persist user data stored in session storage
  useEffect(()=>{
    dispatch(keepUserSession(userState));
  },[userState]);

  return (
    <div onClick={() => toggleHomeClick(!homeClick)} className='App'>
      {/*The above div has an onClick handler to detect when the page is clicked.
      This is to overcome the bootstrap issue where the navbar stays open when
      in small viewports*/}
      <Header />
      <Navmenu homeClick={homeClick} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/settings/' element={<SettingsPage />} />
        <Route path='/search/:searchCriteria' element={<SearchPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
library.add(fab, fas, far, faCheckSquare, faCoffee)