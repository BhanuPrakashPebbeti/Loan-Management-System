import React from 'react';
import { Chart } from "react-google-charts";
import "./Dashboard.css";

const PieChart = ({ data }) => {
    const options = {
        title: "Loan Applications per Category",
        is3D: true,
        backgroundColor: 'transparent',
        pieSliceTextStyle: {
            color: 'white',
        },
    };


    const dataNew = [["Category", "No of Loans"]];
    const processData = (data) => {
        console.log(data, "raw");
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const newObject = [key, data[key]]
                dataNew.push(newObject);
            }
        }
        return dataNew;
    };

    return (
        <>

            <Chart
                chartType="PieChart"
                data={processData(data)}
                options={options}
                width={"100%"}
                height={"357px"}
            />
        </>

    )
}

export default PieChart
