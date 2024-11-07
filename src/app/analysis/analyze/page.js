"use client";
import React from 'react'
import './page.css'
import Navbar from '../../../../components/Navbar/Navbar'
import UserDashboard from '../../../../components/Dashboard/dashboard'
const Daily = () => {
  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="content-layout">
        <UserDashboard />
      </div>
    </div>
  )
}

export default Daily