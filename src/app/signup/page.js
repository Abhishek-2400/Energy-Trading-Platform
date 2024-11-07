"use client";
import React, { useState } from 'react';
import './page.css';
import Navbar from '../../../components/Navbar/Navbar'
import Auth from '../../../components/Auth/auth'
const Page = () => {

    return (
        <div className='auth-body'>
            <Navbar />
            <div >
                <Auth />
            </div>

        </div>
    );
};

export default Page;
