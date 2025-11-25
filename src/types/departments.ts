// filepath: src/types/departments.ts


export interface Department {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: string; // ISO date string
}

export interface DepartmentFormData {
    name: string;
    description?: string;
    isActive: boolean;
    createAt: string;
}

