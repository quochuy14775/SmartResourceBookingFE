'use client';

import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import './Login.css';

interface LoginProps {
    onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title gradient-text">Smart Resource Booking</h2>
                <p className="login-subtitle">Sign in to your account</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>Username</label>
                        <InputText
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="form-field">
                        <label>Password</label>
                        <Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            placeholder="Enter your password"
                        />
                    </div>

                    <Button
                        type="submit"
                        label="Login"
                        className="login-button p-button-rounded"
                        style={{ width: '100%' }}
                    />
                </form>

                <div className="login-footer">
                    <a href="#" className="forgot-password">Forgot password?</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
