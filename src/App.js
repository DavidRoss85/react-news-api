import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/page/Header';
import Footer from "./components/page/Footer"
import Navmenu from "./components/page/Navmenu";
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import { fetchBreakingNews, reloadNews } from './app/selectors/newsSlice';
import { fetchUserData, getUserInfo } from './app/selectors/userSlice';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
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

  // useEffect(() => {
  //   dispatch(fetchUserData());
  //   console.log('Fetch user data...')
  // }, [dispatch])

  // useEffect(() => {
  //   if (userInfo.fetchComplete && !initialFetchComplete) {
  //     dispatch(loadUserPreferences(userInfo));
  //     console.log('User Preferences Loaded')
  //     setInitialFetchComplete(true);
  //   }
  // }, [userInfo, dispatch, initialFetchComplete]);


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
library.add(fab, fas, far, faCheckSquare, faCoffee)