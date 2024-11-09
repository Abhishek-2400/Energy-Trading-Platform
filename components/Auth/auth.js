"use client";
import React, { useState } from 'react';
import './auth.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Auth = () => {
    const router = useRouter();
    const [signup, setsignup] = useState(true);
    const [payload, setPayload] = useState({
        username: "",
        password: "",
        email: "",
    });

    const signupHandler = () => {
        setsignup(!signup);
    };

    const loginsubmithandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', payload);
            if (response?.data?.message) {
                alert(response.data.message);
                router.push('/');
            } else {
                alert(response?.data?.error || 'Login failed');
            }
        } catch (error) {
            alert('Login failed');
            console.log("Login failed", error.message);
        }
    };

    const signupsubmithandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/signup', payload);
            if (response?.data?.message) {
                alert(response.data.message);
                router.push('/signup');
            } else {
                alert(response?.data?.error || 'Signup failed');
            }
        } catch (error) {
            alert('Signup failed');
            console.log("Signup failed", error.message);
        }
    };

    const submitHandler = signup ? signupsubmithandler : loginsubmithandler;

    const onChangeHandler = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value });
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <form onSubmit={submitHandler}>
                    <h1>{signup ? "Signup" : "Login"}</h1>
                    {signup && (
                        <>
                            <div>Enter Username</div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                                value={payload.username}
                                onChange={onChangeHandler}
                            />
                        </>
                    )}
                    <div>Enter Email</div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={payload.email}
                        onChange={onChangeHandler}
                    />
                    <div>Enter Password</div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={payload.password}
                        onChange={onChangeHandler}
                    />
                    <button type="submit">{signup ? "Signup" : "Login"}</button>
                </form>
                <div className="toggle-message">
                    {signup ? (
                        <>
                            Already have an account? <button onClick={signupHandler}>Login</button>
                        </>
                    ) : (
                        <>
                            Don’t have an account? <button onClick={signupHandler}>Signup</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;
