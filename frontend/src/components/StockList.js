import { useEffect, useState } from "react";
import finnHub from "../apis/finnHub";

import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { Search } from "./Search";
import { useNavigate } from "react-router-dom";
//This component is the stock watch list :)
export const StockList = () => {


    //This state contains all stocks that we would like to have on our watch list :)
    const [stock, setStock] = useState();
    const [watchlist, setWatchlist] = useState(localStorage.getItem("stocks")?.split(",") || ['AAPL', 'TSLA', 'GOOGL']);
    const navigate = useNavigate();


    



    //Changes color depending on value for change, and change %
    const checkPriceColor = (num) => {
        if (num < 0) {
            return ('whitespace-nowrap px-4 py-2 text-red-700');
        } else {
            return ("whitespace-nowrap px-4 py-2 text-green-700");
        }
    }


    //Changes symbol depending on value for change, and change%

    const checkPriceIcon = (num) => {
        if (num < 0) {
            return (<BsFillArrowDownCircleFill />);
        } else {
            return (<BsFillArrowUpCircleFill />);
        }
    }



    //Deletes stock from watchlist
    const deleteStock = (stock) => {
        setWatchlist(watchlist.filter((s) => {
            return s !== stock
        }));

    }


    //When stock is clicked on watchlist this returns the page for the details of the stock
    const selectStock = (stock) => {
        navigate(`detail/${stock}`);
    }



    //Makes a request to the FinnHub API, gets the data for the stocks
    const fetchInfo = async () => {
        let loaded = true;

        try {

            //Get data from all stocks in the array
            const responses = await Promise.all(watchlist.map((stock) => {

                return finnHub.get(`/quote?symbol=${stock}&token=${process.env.REACT_APP_API_KEY}`, {
                    params: {
                        symbol: stock
                    }
                });
            }));
            
            // Mapping data for each ticker/stock
            const data = responses.map((response) => {

                


               return {
                    data: response.data,
                    symbol: response.config.params.symbol
                }
            })


            

            //Setting stock state to datae from mapping above
            if (loaded) { setStock(data) };

            console.log(stock);

            return loaded;

        } catch (err) {
            console.log(err);
        }
    }


 

    //On users first page render and when watchlist is updated
    useEffect(() => {

        if (localStorage.getItem("stocks") == '') {
            localStorage.removeItem("stocks");
            setWatchlist(['AAPL', 'TSLA', 'GOOGL']);
        }
        
      
        
        

        fetchInfo().then((load) => (load = false));

    }, [watchlist]);

    return (
        <div className="container">

            <Search setWatchlist={setWatchlist} watchlist={watchlist} className="flex justify-center" />

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2  divide-gray-200 text-sm">
                <thead>
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Name</th>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Last</th>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Change</th>

                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Change%</th>

                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">High</th>

                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Low</th>

                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Open</th>

                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Close</th>


                    </tr>
                </thead>

                    <tbody class="divide-y divide-gray-200">

                        {stock && stock.map((s) => (


                            
                            <tr key={s.symbol}>
                                <td onClick={() => selectStock(s.symbol)} id="ticker-name" className="whitespace-nowrap px-4 py-2 font-medium text-blue-900">
                                    {s.symbol}
                                </td>
                                <td className={(parseInt(s.data.c) < 0 ? 'whitespace-nowrap px-4 py-2 text-red-700' : 'whitespace-nowrap px-4 py-2 text-gray-700')}>{s.data.c}</td>
                                <td className={checkPriceColor(s.data.d)}>{s.data.d} {checkPriceIcon(s.data.d)}</td>
                                <td className={checkPriceColor(s.data.dp)}>{s.data.dp} {checkPriceIcon(s.data.d)}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{s.data.h}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{s.data.l}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{s.data.o}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{s.data.pc}</td>
                                <button className="whitespace-nowrap px-4 py-2 text-gray-700" onClick={(e) => {
                                    e.stopPropagation()
                                    deleteStock(s.symbol)


                                }}>Remove</button>
                            </tr>
                            
                            ))}
                        
                </tbody>
            </table>
            </div>
        </div>



        
    );

}