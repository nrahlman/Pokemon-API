import React from 'react';
import {Route, Routes} from "react-router-dom"
import Home from './Home';
import SinglePokemon from './SinglePokemon';

const RRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/:name' element={<SinglePokemon />}></Route>
            </Routes>

        </div>
    );
};

export default RRoutes;