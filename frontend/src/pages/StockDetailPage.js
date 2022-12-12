import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";
import { StockChart } from "../components/StockChart";

export const StockDetailPage = () => {

    const { symbol } = useParams();
    const [chartData, setChartData] = useState();

    //Formats our data for the graph of the stock
    const formatData = (data) => {
        return data.t.map((d, index) => {
            return {
                x: d * 1000,
                y: Math.floor(data.c[index])
            }
        });
    }

    

    /*
     * 
     * 
     * Makes request to finnhub api to get data for the stock 
     * 
     */
    const fetchInfo = async (timeframe) => {

        const date = new Date();

        const currentTime = Math.floor(date.getTime() / 1000);

        let oneDay;

        //Check if its a weekend
        if (date.getDate() == 6) {
            oneDay = currentTime - 2 * 24 * 60 * 60;
        } else if (date.getDate() == 0) {
            oneDay = currentTime - 3 * 24 * 60 * 60;
        } else {
            oneDay = currentTime - 24 * 60 * 60;
        }


        const oneWeek = currentTime - 7 * 24 * 60 * 60
        const oneYear = currentTime - 365 * 24 * 60 * 60;


        const responses = await Promise.all([finnHub.get(`/stock/candle?&token=${process.env.REACT_APP_API_KEY}`, {

            params: {
                symbol,
                from: oneDay,
                to: currentTime,
                resolution: 30
            }

        }), finnHub.get(`/stock/candle?&token=${process.env.REACT_APP_API_KEY}`, {

            params: {
                symbol,
                from: oneWeek,
                to: currentTime,
                resolution: 60,
            }

        }), finnHub.get(`/stock/candle?&token=${process.env.REACT_APP_API_KEY}`, {

            params: {
                symbol,
                from: oneYear,
                to: currentTime,
                resolution: "W",

            }

        })]);


        console.log(responses);


        setChartData({
            day: formatData(responses[0].data),
            week: formatData(responses[1].data),
            year: formatData(responses[2].data),


        })

    }


    /*Occurs when user first renders page, or when symbol is changed. */
    useEffect(() => {

        fetchInfo();


    }, [symbol]);


    if (chartData) {

        return (

            <div className="flex justify-center">
                {chartData &&
                    <StockChart chartData={chartData} symbol={symbol} />}



            </div>
        );

    } else {
        return <div className="flex justify-center">

            <div role="alert" class="rounded border-l-4 border-red-500 bg-red-50 p-4">
                <strong class="block font-medium text-red-700"> Loading {symbol}.. </strong>
            </div>




        </div>
    }

}

const chartData = {
    day: "data for one day",
    week: "data for a week",
    year: "data for a year"
}

const data = [{x:4, y:2}]