import React from 'react';
import {Line} from 'react-chartjs-2';
import './AccountChart.css';

const AccountChart = () => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    const dataValues = (months) => {
        let l = [];
        let d = months.length - (new Date().getMonth() + 1); //To calculate till current month
        for(let i = 0 ; i < months.length - d ; i++){
            // Get random number max 5000
            l.push(Math.floor(Math.random() * 5000));
        }
        return l;
    }

    const data = {
        labels: months,
        datasets: [{
                label: 'Average Balance ($)',
                data: dataValues(months),
                fill: false,
                backgroundColor: 'blue',
                borderColor: 'blue'
            }]
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                },
            ]
        }
    };

    return <Line className='account-chart' data={data} options={options}/>
}

export default AccountChart;
