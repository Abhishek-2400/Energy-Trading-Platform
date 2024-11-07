"use client";
import React from 'react';
import './page.css';
import Navbar from '../../../components/Navbar/Navbar';
import UserDashboard from '../../../components/Dashboard/dashboard';

const DashboardPage = () => {
    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="content-layout">
                <UserDashboard />
                <div className="dashboard-content">
                    {/* Content for each dashboard item goes here */}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
