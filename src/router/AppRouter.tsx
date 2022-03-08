import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Gateways from '../pages/Gateways';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Gateways />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;