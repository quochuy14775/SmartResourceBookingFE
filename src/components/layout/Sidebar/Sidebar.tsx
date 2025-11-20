'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MenuItem } from '@/types/layout';
import { useUser } from '@/context/UserContext';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const { user } = useUser();
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    const menuItems: MenuItem[] = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            route: '/dashboard',
            roles: ['ADMIN', 'MANAGER', 'USER']
        },
        {
            label: 'User Management',
            icon: 'pi pi-users',
            route: '/users',
            roles: ['ADMIN', 'MANAGER']
        },
        {
            label: 'Resource Management',
            icon: 'pi pi-box',
            route: '/resources',
            roles: ['ADMIN', 'MANAGER']
        },
        {
            label: 'Bookings',
            icon: 'pi pi-calendar',
            route: '/bookings',
            roles: ['ADMIN', 'MANAGER', 'USER']
        },
        {
            label: 'My Bookings',
            icon: 'pi pi-calendar-plus',
            route: '/my-bookings',
            roles: ['ADMIN', 'MANAGER', 'USER']
        },
        {
            label: 'Reports',
            icon: 'pi pi-chart-bar',
            route: '/reports',
            roles: ['ADMIN', 'MANAGER']
        },
        {
            label: 'Settings',
            icon: 'pi pi-cog',
            route: '/settings',
            roles: ['ADMIN']
        }
    ];

    const filteredMenuItems = menuItems.filter(item =>
        item.roles.map(r => r.toLowerCase()).includes((user?.role || 'guest').toLowerCase())
    );

    const handleNavigation = (route: string) => {
        router.push(route);
    };

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
                <i className={`pi ${collapsed ? 'pi-angle-right' : 'pi-angle-left'}`}></i>
            </div>

            <div className="sidebar-content">
                <div className="sidebar-menu">
                    {filteredMenuItems.map((item, index) => (
                        <div
                            key={index}
                            className={`sidebar-item ${pathname === item.route ? 'active' : ''}`}
                            onClick={() => handleNavigation(item.route)}
                            title={collapsed ? item.label : ''}
                        >
                            <div className="sidebar-item-content">
                                <i className={item.icon}></i>
                                {!collapsed && <span>{item.label}</span>}
                            </div>
                            {item.badge && !collapsed && (
                                <span className="sidebar-badge">{item.badge}</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="sidebar-footer">
                    <div className="sidebar-version">
                        {!collapsed && (
                            <>
                                <i className="pi pi-info-circle"></i>
                                <span>Version 1.0.0</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;