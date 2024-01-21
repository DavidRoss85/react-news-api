import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Footer from "./components/Footer"
import Navmenu from "./components/Navmenu";
import HomePage from './pages/HomePage';
import { fetchBreakingNews, reloadNews } from './app/selectors/newsSlice';
import { fetchUserData, getUserInfo } from './app/selectors/userSlice';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { getAppSettings, getCurrentRegion, loadUserPreferences } from './app/selectors/settingsSlice';


function App() {

  //These let NavMenu know to collapse when something else is clicked
  const [homeClick, toggleHomeClick] = useState(false);
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);

  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  const appSettings = useSelector(getAppSettings);
  const region = useSelector(getCurrentRegion);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [])

  useEffect(() => {
    dispatch(loadUserPreferences(userInfo));
  }, [userInfo])

  useEffect(() => {
    if (initialFetchComplete) return
    appSettings.data.current.homepage.map((tile, idx) => {
      const immRegion = tile.country === 'default' ? region : tile.country
      if (idx < 99) { //Limit articles for testing
        dispatch(reloadNews({ id: tile.id }));
        dispatch(fetchBreakingNews({ ...tile, country: immRegion }));
        setInitialFetchComplete(true);
        console.log('App.js: Call to fetch')
      }
    });
  }, [])

  return (
    <div onClick={() => toggleHomeClick(!homeClick)} className="App">
      <Header />
      <Navmenu homeClick={homeClick} />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
library.add(fab, faCheckSquare, faCoffee)