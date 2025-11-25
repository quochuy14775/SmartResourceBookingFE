'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import DepartmentManagement from "@/components/departments/DepartmentManagement";

export default function UsersPage() {
    return (
        <DashboardLayout>
            <DepartmentManagement />
        </DashboardLayout>
    );
}

