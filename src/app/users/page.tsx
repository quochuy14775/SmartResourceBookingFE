'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import UserManagement from '@/components/users/UserManagement';

export default function UsersPage() {
  return (
    <DashboardLayout>
      <UserManagement />
    </DashboardLayout>
  );
}

