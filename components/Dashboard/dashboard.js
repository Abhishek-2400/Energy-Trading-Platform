"use client";
import React from 'react';
import Link from 'next/link';
import './dashboard.css';
import { useSelector } from 'react-redux';
const Dashboard = () => {
    const userDetails = useSelector((state) => state.user.currentUser.data);
    const id = userDetails.email;
    return (
        <div className="sidebar">

            <div className="sidebar-item">
                <Link href='/analysis/realtimereading'>Real time meter analysis</Link>
            </div>
            {/* <div className="sidebar-item">
                <Link href='https://mqyj3pmnxrtwjlup8dvle6.streamlit.app'>Your Energy analysis</Link>
            </div> */}
            <div className="sidebar-item">
                <Link href='/analysis/addlisting'>List Energy for sale</Link>
            </div>
            <div className="sidebar-item">
                <Link href='/analysis/manage'>Manage the listings</Link>
            </div>
            <div className="sidebar-item">
                <Link href='/analysis/history'>Transaction History</Link>
            </div>
            <div className="sidebar-item">
                <Link href={`/analysis/smartmeter/${id}`}>Smart Meter</Link>

            </div>
        </div>
    );
};

export default Dashboard;
