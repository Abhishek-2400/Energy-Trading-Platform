"use client";
import React from 'react';
import Link from 'next/link';
import './dashboard.css';

const Dashboard = () => {
    return (
        <div className="sidebar">

            <div className="sidebar-item">
                <Link href='/analysis/realtimereading'>Real time meter analysis</Link>
            </div>
            <div className="sidebar-item">
                <Link href='/analysis/analyze'>Your Energy analysis</Link>
            </div>
            <div className="sidebar-item">
                <Link href='/analysis/list'>List Energy for sale</Link>
            </div>
            <div className="sidebar-item">
                <Link href='/analysis/manage'>Manage the listings</Link>
            </div>
            <div className="sidebar-item">
                <Link href='/analysis/history'>Transaction History</Link>
            </div>
        </div>
    );
};

export default Dashboard;
