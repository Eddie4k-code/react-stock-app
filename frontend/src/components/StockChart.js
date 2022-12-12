import { useState } from 'react';
import Chart from 'react-apexcharts';

export const StockChart = ({ chartData, symbol }) => {




    const { day, week, year } = chartData;
    const [dateOption, setDateOption] = useState("1D");

    
     
    


    //returns the data corresponding to the proper date option
    const determineTimeFrame = (dateOption) => {
        if (dateOption == "1D") {

            return day;

        } else if (dateOption == "1W") {
            return week;
        } else if (dateOption == "1Y") {
            return year;
        }
    }




    //APEX CHARTS SETTINGS FOR OUR GRAPH
    const options = {
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px"
            }
        },
        chart: {
            id: "stock data",
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM"
            }
        }
    }

    const series = [{
        name: symbol,
        data: determineTimeFrame(dateOption)
    }]


    return (

        
        <div>
            <div classname="flex justify-center">
                <Chart id="graph" className="flex justify-center" options={options} series={series} />

                <a onClick={ () => setDateOption("1D")}
                    class="inline-block rounded bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-blue-500">
                    1D
                </a>


                <a onClick={ () => setDateOption("1W")}
                    class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-blue-600 transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-blue-500">
                    1W
                </a>

                <a onClick={() => setDateOption("1Y")}
                    class="inline-block rounded bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:-rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-blue-500">
                    1Y
                </a>


            </div>
            

        </div>

        

        

    )
}