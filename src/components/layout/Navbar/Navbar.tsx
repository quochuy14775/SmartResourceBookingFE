'use client';

import React, {useState, useEffect, useRef, useCallback} from 'react';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useUser } from '@/context/UserContext';
import { notificationService } from '@/services/notificationService';
import { Notification } from '@/types/layout';
import './Navbar.css';

const Navbar: React.FC = () => {
    const { user, logout } = useUser();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const userMenuRef = useRef<Menu>(null);
    const notificationPanelRef = useRef<OverlayPanel>(null);



    const loadNotifications = useCallback(async () => {
        const data = await notificationService.getNotifications();
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.read).length);
    }, []);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            void loadNotifications();
        }, 0);
        return () => clearTimeout(timer);
    }, [loadNotifications]);

    const userMenuItems = [
        {
            label: user?.username || 'User',
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    command: () => {
                        console.log('Navigate to profile');
                    }
                },
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    command: () => {
                        console.log('Navigate to settings');
                    }
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: logout
                }
            ]
        }
    ];

    const handleNotificationClick = async (notification: Notification) => {
        if (!notification.read) {
            await notificationService.markAsRead(notification.id);
            await loadNotifications();
        }
        notificationPanelRef.current?.hide();

        const link = notification.link; // lưu vào biến tạm
        if (link) {
            window.location.replace(link);
        }
    };

    const markAllAsRead = async () => {
        await notificationService.markAllAsRead();
        await loadNotifications();
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success': return 'pi-check-circle';
            case 'warning': return 'pi-exclamation-triangle';
            case 'error': return 'pi-times-circle';
            default: return 'pi-info-circle';
        }
    };

    const formatTimestamp = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-left">
                    <h1 className="navbar-title gradient-text">Smart Resource Booking</h1>
                </div>

                <div className="navbar-right">
                    {/* Notifications */}
                    <div className="navbar-item">
                        <Button
                            icon="pi pi-bell"
                            rounded
                            text
                            severity="secondary"
                            className="notification-button p-overlay-badge"
                            onClick={(e) => notificationPanelRef.current?.toggle(e)}
                        >
                            {unreadCount > 0 && (
                                <Badge value={unreadCount} severity="danger" />
                            )}
                        </Button>

                        <OverlayPanel ref={notificationPanelRef} className="notification-panel">
                            <div className="notification-header">
                                <h3>Notifications</h3>
                                {unreadCount > 0 && (
                                    <Button
                                        label="Mark all as read"
                                        link
                                        size="small"
                                        onClick={markAllAsRead}
                                    />
                                )}
                            </div>
                            <div className="notification-list">
                                {notifications.length === 0 ? (
                                    <div className="notification-empty">
                                        <i className="pi pi-bell-slash" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                                        <p>No notifications</p>
                                    </div>
                                ) : (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`notification-item ${!notification.read ? 'unread' : ''}`}
                                            onClick={() => handleNotificationClick(notification)}
                                        >
                                            <div className={`notification-icon ${notification.type}`}>
                                                <i className={`pi ${getNotificationIcon(notification.type)}`}></i>
                                            </div>
                                            <div className="notification-content">
                                                <h4>{notification.title}</h4>
                                                <p>{notification.message}</p>
                                                <span className="notification-time">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                                            </div>
                                            {!notification.read && <div className="notification-dot"></div>}
                                        </div>
                                    ))
                                )}
                            </div>
                        </OverlayPanel>
                    </div>

                    {/* User Profile */}
                    <div className="navbar-item">
                        <div className="user-profile" onClick={(e) => userMenuRef.current?.toggle(e)}>
                            <Avatar
                                image={user?.avatar}
                                label={!user?.avatar ? user?.firstName?.[0] : undefined}
                                shape="circle"
                                size="large"
                                className="user-avatar"
                            />
                            <div className="user-info">
                                <span className="user-name">{user?.firstName} {user?.lastName}</span>
                                <span className="user-role">{user?.role}</span>
                            </div>
                            <i className="pi pi-chevron-down"></i>
                        </div>
                        <Menu model={userMenuItems} popup ref={userMenuRef} className="user-menu" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
