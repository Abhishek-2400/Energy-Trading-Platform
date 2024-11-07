"use client";
import React, { useState } from 'react';
import './page.css';
import Navbar from '../../../components/Navbar/Navbar'
import UserDashboard from '../../../components/Dashboard/dashboard';
const Dashboard = () => {

    return (
        <div>
            <Navbar />
            <div >
                < UserDashboard />
            </div>

        </div>
    );
};

export default Dashboard;
