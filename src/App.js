import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './components/page/Header';
import Footer from "./components/page/Footer"
import Navmenu from "./components/page/Navmenu";
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'


function App() {

  //These let NavMenu know to collapse when something else is clicked
  const [homeClick, toggleHomeClick] = useState(false);

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