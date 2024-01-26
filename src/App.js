import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Footer from "./components/Footer"
import Navmenu from "./components/Navmenu";
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
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
  const appSettings = useSelector((state) => state.settings);
  const region = useSelector(getCurrentRegion);

  const initializeTiles = () => {
    // appSettings.data.current.homepage.map((tile, idx) => {
    //   const { search } = tile
    //   const immRegion = (search.country === 'default') ? region : search.country;
    //   if (idx < 99) { //Limit tiles for testing
    //     dispatch(reloadNews({ id: tile.id }));
    //     dispatch(fetchBreakingNews({ ...search, country: immRegion, id: tile.id }));
    //     return { [idx]: tile.title }
    //   }
    // });
    // setInitialFetchComplete(true);
    // console.log('call to fetch all')
  }

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch])

  useEffect(() => {
    if (userInfo.fetchComplete && !initialFetchComplete) {
      dispatch(loadUserPreferences(userInfo));
      console.log('User Preferences Loaded')
    }
  }, [userInfo, dispatch, initialFetchComplete]);

  useEffect(() => {
    if (appSettings.isLoaded && !initialFetchComplete) {
      initializeTiles();
      console.log('Initialized Tiles')
    }

  }, [appSettings, initialFetchComplete])

  // console.log('APP SETTINGS',appSettings)
  return (
    <div onClick={() => toggleHomeClick(!homeClick)} className="App">
      <Header />
      <Navmenu homeClick={homeClick} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search/:searchCriteria' element={<SearchPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
library.add(fab, faCheckSquare, faCoffee)