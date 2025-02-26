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
                <div className="sidebar">
                    <UserDashboard />
                </div>
                <div className="dashboard-content">
     
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
