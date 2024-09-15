"use client";
import React, { useState, useEffect } from "react";
import "./bid.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Bar } from "react-chartjs-2";
import io from "socket.io-client";
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import Navbar from "../../../components/Navbar/Navbar";

Chartjs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


let socket;
const Bid = () => {
    const [data, setData] = useState([]);

    const processData = (data) => {
        return {
            labels: data.filter((row) => row.timer > 0).map((row) => row.sellerName),
            datasets: [
                {
                    label: 'Highest Bid',
                    data: data.map((row) => row.highestBid),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const [initialBid, setInitialBid] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        socket = io('http://localhost:5000');

        socket.on('bids', (bids) => {
            console.log('Bids received');
            let newData = [...data];
            newData = bids;
            newData = newData.sort((a, b) => b.highestBid - a.highestBid);
            setData(newData);
        });
        return () => {
            socket.off('bids');
        }
    }, []);


    const bidHandler = (name) => {
        console.log(name, initialBid);
        const updatedData = data.map((row) => {
            if (row.sellerName === name && initialBid > row.highestBid) {
                return { ...row, highestBid: initialBid };
            }
            return row;
        });
        setData(updatedData);
        socket.emit('newBid', updatedData);
        setOpen(false);
    };

    const handleInput = (e) => {
        setInitialBid(Number(e.target.value));
    };

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <>
            <Navbar />
            <div className="table-container">
                <h1>Welcome to Bid Arena</h1>

                <Bar className="barchart" data={processData(data)} />
                <table className="energy-table">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Seller Name</th>
                            <th>Highest Bid (kWh)</th>
                            <th>Bid (Enter Your Bid)</th>
                            <th>Timer (Running)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) =>
                            row.timer > 0 ? (
                                <tr key={row.sno}>
                                    <td>{row.sno}</td>
                                    <td>{row.sellerName}</td>
                                    <td>{row.highestBid}</td>
                                    <td>
                                        <button className="bidbutton" onClick={onOpenModal}>
                                            Bid
                                        </button>
                                        <Modal
                                            open={open}
                                            onClose={onCloseModal}
                                            center
                                            classNames={{
                                                overlay: "customOverlay",
                                                modal: "customModal",
                                            }}
                                        >
                                            <h2 className="modalTitle">Place Your Bid</h2>
                                            <p className="modalDescription">
                                                Enter your desired bid amount for {row.sellerName}.
                                            </p>
                                            <input type="number" placeholder="Enter bid" className="bidInput" onChange={handleInput} />
                                            <button className="submitBidButton" onClick={() => { bidHandler(row.sellerName) }}>Submit Bid</button>
                                        </Modal>
                                    </td>
                                    <td>{formatTime(row.timer)}</td>
                                </tr>
                            ) : null
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Bid;
