"use client";
import React from 'react';
import Link from 'next/link';
import './dashboard.css';

const Dashboard = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-item">
                <Link href='/analysis/daily'>Daily Consumption Analysis</Link>
            </div>
            <div className="sidebar-item">
                <Link href='/analysis/weekly'>Weekly Consumption Analysis</Link>
            </div>
            <div className="sidebar-item">
                <Link href='/analysis/monthly'>Monthly Consumption Analysis</Link>
            </div>
            <div className="sidebar-item">
                <Link href='/analysis/history'>Transaction History</Link>
            </div>
        </div>
    );
};

export default Dashboard;
