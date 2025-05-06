
"use client";
import React, { useEffect, useState } from "react";
import './Navbar.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const email = useSelector((state) => state.user.currentUser.data.email);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(0);
    const router = useRouter();
    console.log(email, 90);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const loginRes = await axios.get('/api/auth/checklogin');
                const isAuth = loginRes.data.authenticated;
                setIsAuthenticated(isAuth);

                if (isAuth && email) {
                    const tokenRes = await axios.post('/api/auth/gettoken', { email });
                    setToken(tokenRes.data.tokens);
                }
            } catch (error) {
                console.error("Auth/token fetch error:", error);
                setIsAuthenticated(false);
                setToken(0);
            }
        };

        checkAuthStatus();
    }, [email]);

    const logout = async () => {
        try {
            const response = await axios.get('/api/auth/logout');
            if (response?.data?.message) {
                alert(response.data.message);
                setIsAuthenticated(false);
                setToken(0);
                router.push('/');
            } else {
                alert(response?.data?.error || 'Logout failed');
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("Logout failed due to an error.");
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-heading">
                <Link href="/">EnergyHive</Link>
            </div>
            <ul className="navbar-menu">
                <li><Link href="/profile">Auto Trading</Link></li>
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
                    <li><button onClick={logout}>Logout</button></li>
                ) : (
                    <li><Link href="/signup"><button>Signup</button></Link></li>
                )}
            </ul>
        </nav>
    );
}
