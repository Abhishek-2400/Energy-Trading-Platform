"use client";
import React, { useState } from 'react';
import './page.css';
import Navbar from '../../../../components/Navbar/Navbar';
import UserDashboard from '../../../../components/Dashboard/dashboard';
import axios from 'axios';

const Listings = () => {
  const [payload, setPayload] = useState({
    sellername: "",
    priceperunit: 0,
    tokens: 0,
    locations: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', payload);
      if (response?.data?.message) {
        alert(response.data.message);
        router.push('/login');
      } else {
        alert(response?.data?.error || 'Signup failed');
      }
    } catch (error) {
      alert('Signup failed');
      console.log("Signup failed", error.message);
    }
  };

  const onChangeHandler = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="content-layout">
        <UserDashboard />
        <div className="dashboard-content">
          <h2>Add New Product</h2>
          <form className="form-container" onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="sellername">Seller Name</label>
              <input
                type="text"
                id="sellername"
                name="sellername"
                value={payload.sellername}
                onChange={onChangeHandler}
                placeholder="Enter seller name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="priceperunit">Price per Unit</label>
              <input
                type="number"
                id="priceperunit"
                name="priceperunit"
                value={payload.priceperunit}
                onChange={onChangeHandler}
                placeholder="Enter price per unit"
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="tokens">Tokens</label>
              <input
                type="number"
                id="tokens"
                name="tokens"
                value={payload.tokens}
                onChange={onChangeHandler}
                placeholder="Enter number of tokens"
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="locations">Location</label>
              <input
                type="text"
                id="locations"
                name="locations"
                value={payload.locations}
                onChange={onChangeHandler}
                placeholder="Enter location"
                required
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Listings;
