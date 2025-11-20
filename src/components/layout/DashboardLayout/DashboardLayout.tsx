'use client';

import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './DashboardLayout.css';
import Navbar from "../Navbar/Navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <Navbar />
            <Sidebar />
            <main className="main-content">
                <div className="content-wrapper fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;

