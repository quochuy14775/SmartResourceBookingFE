'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import './dashboard.css';

export default function Dashboard() {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Bookings',
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                borderColor: '#667eea',
                backgroundColor: '#667eea',
                tension: 0.4
            }
        ]
    };

    const chartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#6b7280'
                },
                grid: {
                    display: false
                }
            },
            y: {
                ticks: {
                    color: '#6b7280'
                },
                grid: {
                    color: '#e5e7eb'
                }
            }
        }
    };

    const stats = [
        {
            title: 'Total Bookings',
            value: '1,234',
            icon: 'pi-calendar',
            color: '#667eea',
            trend: '+12%',
            trendUp: true
        },
        {
            title: 'Active Resources',
            value: '45',
            icon: 'pi-box',
            color: '#764ba2',
            trend: '+8%',
            trendUp: true
        },
        {
            title: 'Total Users',
            value: '89',
            icon: 'pi-users',
            color: '#3b82f6',
            trend: '+5%',
            trendUp: true
        },
        {
            title: 'Pending Requests',
            value: '12',
            icon: 'pi-clock',
            color: '#f59e0b',
            trend: '-3%',
            trendUp: false
        }
    ];

    return (
        <DashboardLayout>
            <div className="dashboard-page">
                <div className="dashboard-header">
                    <div>
                        <h1 className="page-title gradient-text">Dashboard</h1>
                        <p className="page-subtitle">Welcome back! Here's what's happening today.</p>
                    </div>
                </div>

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <Card key={index} className="stat-card-dashboard scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="stat-content">
                                <div className="stat-icon-wrapper" style={{ background: `${stat.color}15` }}>
                                    <i className={`pi ${stat.icon}`} style={{ color: stat.color, fontSize: '1.5rem' }}></i>
                                </div>
                                <div className="stat-details">
                                    <div className="stat-title">{stat.title}</div>
                                    <div className="stat-value-large">{stat.value}</div>
                                    <div className={`stat-trend ${stat.trendUp ? 'trend-up' : 'trend-down'}`}>
                                        <i className={`pi ${stat.trendUp ? 'pi-arrow-up' : 'pi-arrow-down'}`}></i>
                                        <span>{stat.trend} from last month</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="dashboard-grid">
                    <Card className="chart-card card-hover fade-in" title="Booking Trends">
                        <Chart type="line" data={chartData} options={chartOptions} style={{ height: '300px' }} />
                    </Card>

                    <Card className="recent-activity-card card-hover fade-in" title="Recent Activity">
                        <div className="activity-list">
                            <div className="activity-item">
                                <div className="activity-icon success">
                                    <i className="pi pi-check"></i>
                                </div>
                                <div className="activity-content">
                                    <div className="activity-text">Conference Room A booked</div>
                                    <div className="activity-time">2 hours ago</div>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-icon info">
                                    <i className="pi pi-user-plus"></i>
                                </div>
                                <div className="activity-content">
                                    <div className="activity-text">New user registered</div>
                                    <div className="activity-time">3 hours ago</div>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-icon warning">
                                    <i className="pi pi-exclamation-triangle"></i>
                                </div>
                                <div className="activity-content">
                                    <div className="activity-text">Resource maintenance scheduled</div>
                                    <div className="activity-time">5 hours ago</div>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-icon success">
                                    <i className="pi pi-check"></i>
                                </div>
                                <div className="activity-content">
                                    <div className="activity-text">Meeting Room B booking confirmed</div>
                                    <div className="activity-time">1 day ago</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
