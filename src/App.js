import {Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from "./components/Footer"
import Navmenu from "./components/Navmenu";
import HomePage from './pages/HomePage';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

function App() {

  //These let NavMenu know to collapse when something else is clicked
  const [homeClick, toggleHomeClick] = useState(false);
  const [region, setRegion] = useState("us");

  return (
    <div onClick={()=>toggleHomeClick(!homeClick)} className="App">
      <Header />
      <Navmenu homeClick={homeClick} region={region} setRegion={setRegion}/>
      <Routes>
        <Route path='/' element={<HomePage region={region}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
library.add(fab, faCheckSquare, faCoffee)