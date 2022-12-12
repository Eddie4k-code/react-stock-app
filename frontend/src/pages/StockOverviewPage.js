import { useState } from "react";
import { StockList } from "../components/StockList";
import axios from 'axios';
import homePIC  from "./assets/homePIC.jpg"

export const StockOverviewPage = () => {
    


    return (
        
    <div>

            <div class="flex flex-wrap justify-center whitespace-pre-wrap">
                <img
                    src={homePIC}
                    class="p-1 bg-white border rounded max-w-sm whitespace-normal"
                    alt="..."
                />
            </div>


            <StockList />
        
    </div>
    );
}