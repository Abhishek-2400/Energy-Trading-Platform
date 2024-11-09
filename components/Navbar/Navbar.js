"use client";
import React, { useEffect, useState } from "react";
import './Navbar.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('/api/auth/checklogin');
                setToken(response.data.data[0].token);
                setIsAuthenticated(response.data.authenticated);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuthStatus();
    }, []);

    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         if (isAuthenticated) {
    //             try {
    //                 const response = await axios.get('/api/auth/userinfo', {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 });
    //                 setUserInfo(response.data);
    //             } catch (error) {
    //                 console.error("Failed to fetch user info:", error);
    //             }
    //         }
    //         else {
    //             console.error("User not authenticated");
    //             router.push('/');
    //         }
    //     };

    //     fetchUserInfo();
    // }, [token]);

    const logout = async () => {
        const response = await axios.get('/api/auth/logout');
        if (response?.data?.message) {
            alert(response.data.message);
            setIsAuthenticated(false);
            setToken(0);  // Reset token on logout
        } else {
            alert(response?.data?.error || 'Logout failed');
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-heading"><Link href='/'>EnergyHive</Link></div>
            <ul className="navbar-menu">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/worldmap">Traders</Link></li>
                <li><Link href="/bids">Bidding</Link></li>
                <li><Link href="/marketplace">Market</Link></li>
                {isAuthenticated && <li><Link href="/dashboard">Dashboard</Link></li>}

                {isAuthenticated && (
                    <li className="navbar-token">
                        <span>💰 Tokens: {token}</span>
                    </li>
                )}

                {isAuthenticated ? (
                    <li><Link href="/"><button onClick={logout}>Logout</button></Link></li>
                ) : (
                    <li><Link href="/signup"><button>Signup</button></Link></li>
                )}
            </ul>
        </nav>
    );
}
