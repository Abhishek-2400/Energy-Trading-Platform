"use client"
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { io } from 'socket.io-client';
import Navbar from '../../../components/Navbar/Navbar';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './page.css'
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const RealTimeGraph = () => {
    const [dataPoints, setDataPoints] = useState({
        labels: [],
        datasets: [
            {
                label: 'Energy Price ($/kWh)',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
        ],
    });

    useEffect(() => {
        // Connect to the server
        const socket = io('https://websocket-p2p.onrender.com');
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        // Listen for price updates
        socket.on('priceUpdate', (newData) => {
            setDataPoints((prevData) => {
                const updatedLabels = [...prevData.labels, newData.time];
                const updatedData = [...prevData.datasets[0].data, newData.price];

                return {
                    labels: updatedLabels.slice(-10), // Show only the last 10 points
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: updatedData.slice(-10), // Show only the last 10 points
                        },
                    ],
                };
            });
        });

        // Cleanup on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            <Navbar />
            <div className='chartcont'>
                <h2>Real-Time Energy Trading Price</h2>
                <Line
                    data={dataPoints}
                    options={{
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Time',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Price ($/kWh)',
                                },
                                min: 0,
                            },
                        },
                    }}
                />
            </div>
        </>
    );
};

export default RealTimeGraph;
// function Apps() {
//     return (
//         <div className="Apps">
//             <RealTimeGraph />
//         </div>
//     );
// }

// export default Apps;
