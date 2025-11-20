
export interface UserSession {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    avatar?: string;
}
export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    department: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    avatar?: string;
    phone?: string;
}

export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    USER = 'user',
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended'
}
export interface LoginResponse {
    token: string;
    expiration: string;
}

export interface UserFormData {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    department: string;
    status: UserStatus;
    phone?: string;
    password?: string;
}

export interface ODataResponse<T> {
    value: T[];
    '@odata.count': number;
    '@odata.nextLink'?: string;
}

export interface ODataQueryParams {
    $skip?: number;
    $top?: number;
    $orderby?: string;
    $filter?: string;
    $count?: boolean;
}