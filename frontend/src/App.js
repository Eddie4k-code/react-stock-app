import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { WatchListContextProvider } from './components/context/watchListContext';
import { StockDetailPage } from './pages/StockDetailPage';
import { StockOverviewPage } from './pages/StockOverviewPage';

function App() {
    return (

        
       

        <div className="flex justify-center">
            
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<StockOverviewPage/>} />
                    <Route path="/detail/:symbol" element={<StockDetailPage />} />

                </Routes>
                </BrowserRouter>
            

            </div>


        
       
  );
}

export default App;
