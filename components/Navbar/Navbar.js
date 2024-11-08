"use client";
import React, { useEffect, useState } from "react";
import './Navbar.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('/api/auth/checklogin');
                setIsAuthenticated(response.data.authenticated);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuthStatus();
    }, []);

    const logout = async () => {
        const response = await axios.get('/api/auth/logout');
        if (response?.data?.message) {
            alert(response.data.message);
            setIsAuthenticated(false);
        }
        else {
            alert(response?.data?.error || 'Logout failed');
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-heading"><Link href='/'>EnergyHive</Link></div>
            <ul className="navbar-menu">
                <li><Link href="/">Home</Link></li>
                {/* <li><Link href="/realtimePricing">Pricing</Link></li> */}
                <li><Link href="/worldmap">Traders</Link></li>
                <li><Link href="/bids">Bidding</Link></li>
                <li><Link href="/marketplace">Market</Link></li>
                {isAuthenticated && <li><Link href="/dashboard">Dashboard</Link></li>}
                {isAuthenticated ? <li><Link href="/"><button onClick={logout}>Logout</button></Link></li> :
                    <li><Link href="/signup"><button>Signup</button></Link></li>
                }

            </ul>
        </nav>
    );
}
