import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Notfound from './pages/404';
import './App.css';
import RecipePage from "./pages/recipe";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                {/*<Route path="/recipe/:id" element={<RecipePage />} />*/}
                <Route path="*" element={<Notfound />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
