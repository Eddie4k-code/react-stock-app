import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import finnHub from "../apis/finnHub";
import { Alert } from "./Alert";


export const Search = ({setWatchlist, watchlist}) => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(false);





    //Handles input of the search bar by updating the search state
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }




    //Makes request to finnhub api 
    const getSearchResults = async () => {
        
        try {

            const response = await finnHub.get(`/search?q=${search}&token=${process.env.REACT_APP_API_KEY}`, {
                params: {
                    q: search
                }
            })



            setResults(response.data.result);
            



            

        } catch (err) {
            setErrorMsg(err);
            console.log(errorMsg);
        }
    }





    //Adds stock to watchlist 
    const addStock = (stock) => {

        if (watchlist.indexOf(stock) === -1) {
            setWatchlist([...watchlist, stock]);
            setSearch("");
        } else {
            setErrorMsg(!errorMsg);
        }
        
    }


    useEffect(() => {


        
        
        localStorage.setItem("stocks", watchlist);
        console.log(watchlist);
        

        

    }, [watchlist]);

    

  
    //Updates when search input changed
    useEffect(() => {

        if (search.length > 0) {
            getSearchResults();
        } else {
            setResults([]);
        }


      
        

    }, [search]);




    

    return (

        <div class="flex justify-center" >
            <div class="mb-3 xl:w-96">
                {errorMsg ? <Alert errorMsg={errorMsg} setErrorMsg={setErrorMsg} message="You already have this stock in your watchlist." /> : <h1></h1>}

                

                <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
                    <input type="search" onChange={handleSearch} value={search} class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon3" />
                    <div className="dropdown-menu border-solid md:border-dotted">
                        {
                            <ul id="box-res"  className={search? 'visible border' : 'invisible'}>

                                {results.map((res, index) => {

                                    return (

                                        <li onClick={() => addStock(res.symbol)} key={res.symbol} className="search-res">{res.symbol}</li>

                                        )

                                })}

                            </ul>
                        }
                    </div>
                     </div>
                </div>
        </div>






    );

}