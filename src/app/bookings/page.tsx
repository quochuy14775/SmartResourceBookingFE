'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import { Card } from 'primereact/card';

export default function BookingsPage() {
  return (
    <DashboardLayout>
      <div className="fade-in">
        <div className="page-header" style={{ marginBottom: '2rem' }}>
          <div>
            <h1 className="page-title gradient-text" style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>
              Bookings
            </h1>
            <p className="page-subtitle" style={{ color: '#6b7280', fontSize: '1rem', margin: 0 }}>
              View and manage all resource bookings
            </p>
          </div>
        </div>

        <Card style={{ background: 'white', borderRadius: '16px', padding: '3rem', textAlign: 'center' }}>
          <i className="pi pi-calendar" style={{ fontSize: '4rem', color: '#667eea', marginBottom: '1rem' }}></i>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>Bookings Management</h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            This feature is under development. You'll be able to view, create, and manage all bookings here.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}

