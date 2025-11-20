'use client';

import React, {useState, useEffect, useRef} from 'react';
import {DataTable, DataTablePageEvent, DataTableSortEvent} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {Tag} from 'primereact/tag';
import {Toast} from 'primereact/toast';
import {ConfirmDialog, confirmDialog} from 'primereact/confirmdialog';
import {Toolbar} from 'primereact/toolbar';
import {Avatar} from 'primereact/avatar';
import './UserManagement.css';
import { Skeleton } from 'primereact/skeleton';
import {userService} from "@/services/notificationService";
import {User, UserFormData, UserRole, UserStatus} from "@/types/user";
import UserDialog from "@/components/users/UserDialog/UserDialog";

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<1 | -1 | 0 | undefined>(1);
    const [globalFilter, setGlobalFilter] = useState('');
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [user, setUser] = useState<UserFormData>({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        role: UserRole.USER,
        department: '',
        status: UserStatus.ACTIVE,
        phone: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editUserId, setEditUserId] = useState<string | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        loadUsers();
    }, [first, rows, sortField, sortOrder, globalFilter]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const orderBy = sortField
                ? `${sortField} ${sortOrder === 1 ? 'asc' : sortOrder === -1 ? 'desc' : ''}`
                : undefined;
            const response = await userService.getUsers({
                $skip: first,
                $top: rows,
                $orderby: orderBy,
                $filter: globalFilter,
                $count: true
            });
            setUsers(response.value);
            setTotalRecords(response['@odata.count']);
        } catch (error) {
            toast.current?.show({severity: 'error', summary: 'Error', detail: 'Failed to load users', life: 3000});
        } finally {
            setLoading(false);
        }
    };

    const onPage = (event: DataTablePageEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const onSort = (event: DataTableSortEvent) => {
        setSortField(event.sortField as string);
        setSortOrder(event.sortOrder ?? 1); // event.sortOrder là number
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(e.target.value);
        setFirst(0); // Reset to first page on search
    };

    const openNew = () => {
        setUser({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            role: UserRole.USER,
            department: '',
            status: UserStatus.ACTIVE,
            phone: '',
            password: ''
        });
        setSubmitted(false);
        setIsEdit(false);
        setEditUserId(null);
        setUserDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    const editUser = (user: User) => {
        setUser({
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            department: user.department,
            status: user.status,
            phone: user.phone || ''
        });
        setIsEdit(true);
        setEditUserId(user.id);
        setUserDialog(true);
    };

    const confirmDeleteUser = (user: User) => {
        confirmDialog({
            message: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteUser(user.id),
            acceptClassName: 'p-button-danger'
        });
    };

    const deleteUser = async (id: string) => {
        try {
            await userService.deleteUser(id);
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'User deleted successfully',
                life: 3000
            });
            loadUsers();
        } catch (error) {
            toast.current?.show({severity: 'error', summary: 'Error', detail: 'Failed to delete user', life: 3000});
        }
    };

    const deleteSelectedUsers = () => {
        confirmDialog({
            message: `Are you sure you want to delete ${selectedUsers.length} selected users?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                try {
                    await userService.deleteUsers(selectedUsers.map(u => u.id));
                    setSelectedUsers([]);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Users deleted successfully',
                        life: 3000
                    });
                    loadUsers();
                } catch (error) {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete users',
                        life: 3000
                    });
                }
            },
            acceptClassName: 'p-button-danger'
        });
    };

    const saveUser = async () => {
        setSubmitted(true);

        if (user.username.trim() && user.email.trim() && user.firstName.trim() && user.lastName.trim()) {
            try {
                if (isEdit && editUserId) {
                    await userService.updateUser(editUserId, user);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'User updated successfully',
                        life: 3000
                    });
                } else {
                    await userService.createUser(user);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'User created successfully',
                        life: 3000
                    });
                }
                setUserDialog(false);
                loadUsers();
                setUser({
                    username: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    role: UserRole.USER,
                    department: '',
                    status: UserStatus.ACTIVE,
                    phone: '',
                    password: ''
                });
            } catch (error) {
                toast.current?.show({severity: 'error', summary: 'Error', detail: 'Failed to save user', life: 3000});
            }
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setUser({...user, [name]: val});
    };

    const onDropdownChange = (e: { value: UserRole | UserStatus }, name: keyof UserFormData) => {
        setUser({...user, [name]: e.value});
    };

    // Template functions
    const avatarBodyTemplate = (rowData: User) => {
        return (
            <Avatar
                image={rowData.avatar}
                label={!rowData.avatar ? rowData.firstName[0] + rowData.lastName[0] : undefined}
                shape="circle"
                size="large"
            />
        );
    };

    const nameBodyTemplate = (rowData: User) => {
        return (
            <div>
                <div className="font-semibold">{rowData.firstName} {rowData.lastName}</div>
            </div>
        );
    };

    const statusBodyTemplate = (rowData: User) => {
        const severity = rowData.status === UserStatus.ACTIVE ? 'success' :
            rowData.status === UserStatus.INACTIVE ? 'warning' : 'danger';
        return <Tag value={rowData.status} severity={severity}/>;
    };

    const roleBodyTemplate = (rowData: User) => {
        const severity = rowData.role === UserRole.ADMIN ? 'danger' :
            rowData.role === UserRole.MANAGER ? 'info' : 'secondary';
        return <Tag value={rowData.role} severity={severity}/>;
    };

    const dateBodyTemplate = (rowData: User) => {
        return new Date(rowData.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    };

    const actionBodyTemplate = (rowData: User) => {
        return (
            <div className="flex gap-2">
                <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    severity="info"
                    onClick={() => editUser(rowData)}
                    tooltip="Edit"
                    tooltipOptions={{position: 'top'}}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDeleteUser(rowData)}
                    tooltip="Delete"
                    tooltipOptions={{position: 'top'}}
                />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-3">
                {/* Add New User */}
                <Button
                    icon="pi pi-plus"
                    iconPos="left"
                    severity="success"
                    rounded
                    className="toolbar-button px-4 py-2 font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                    onClick={openNew}
                />

                {/* Delete Selected Users */}
                <Button
                    icon="pi pi-trash"
                    iconPos="left"
                    severity="danger"
                    rounded
                    disabled={!selectedUsers || selectedUsers.length === 0}
                    className="toolbar-button px-4 py-2 font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    onClick={deleteSelectedUsers}
                />
            </div>
        );
    };


    const leftToolbarTemplate = () => {
        return (
            <span className="p-input-icon-left">
        <i className="pi pi-search"/>
        <InputText
            type="search"
            value={globalFilter}
            onChange={onGlobalFilterChange}
            placeholder="Search users..."
            className="search-input"
        />
      </span>
        );
    };
    const renderSkeletonTable = () => {
        const skeletonRows = Array.from({ length: rows }); // số dòng skeleton = số rows
        return (
            <div className="skeleton-table">
                {skeletonRows.map((_, i) => (
                    <div key={i} className="skeleton-row flex gap-4 p-3 items-center border-b border-gray-200">
                        <Skeleton shape="circle" size="40px" />
                        <Skeleton width="150px" height="1rem" />
                        <Skeleton width="200px" height="1rem" />
                        <Skeleton width="100px" height="1rem" />
                        <Skeleton width="80px" height="1rem" />
                        <Skeleton width="100px" height="1rem" />
                        <Skeleton width="60px" height="1rem" />
                    </div>
                ))}
            </div>
        );
    };


    const userDialogFooter = (
        <div>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog}/>
            <Button label="Save" icon="pi pi-check" onClick={saveUser}/>
        </div>
    );

    const roleOptions = [
        {label: 'Admin', value: UserRole.ADMIN},
        {label: 'Manager', value: UserRole.MANAGER},
        {label: 'User', value: UserRole.USER},
        {label: 'Guest', value: UserRole.USER}
    ];

    const statusOptions = [
        {label: 'Active', value: UserStatus.ACTIVE},
        {label: 'Inactive', value: UserStatus.INACTIVE},
        {label: 'Suspended', value: UserStatus.SUSPENDED}
    ];

    return (
        <div className="user-management">
            <Toast ref={toast}/>
            <ConfirmDialog/>

            <div className="page-header">
                <div>
                    <h1 className="page-title gradient-text">User Management</h1>
                    <p className="page-subtitle">Manage system users and their permissions</p>
                </div>
                <div className="page-stats">
                    <div className="stat-card scale-in">
                        <i className="pi pi-users stat-icon"></i>
                        <div>
                            <div className="stat-value">{totalRecords}</div>
                            <div className="stat-label">Total Users</div>
                        </div>
                    </div>
                    <div className="stat-card scale-in" style={{animationDelay: '0.1s'}}>
                        <i className="pi pi-user-plus stat-icon"></i>
                        <div>
                            <div className="stat-value">{users.filter(u => u.status === UserStatus.ACTIVE).length}</div>
                            <div className="stat-label">Active Users</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card card-hover">
                <Toolbar className="toolbar" left={leftToolbarTemplate} right={rightToolbarTemplate}/>

                {loading ? (
                    renderSkeletonTable()
                ) : (
                    <DataTable
                        value={users}
                        selection={selectedUsers}
                        onSelectionChange={(e: { value: User[] }) => setSelectedUsers(e.value)}
                        dataKey="id"
                        paginator
                        rows={rows}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        first={first}
                        totalRecords={totalRecords}
                        onPage={onPage}
                        onSort={onSort}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        selectionMode="multiple"
                        lazy
                        className="user-datatable"
                        emptyMessage="No users found"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                    >
                        <Column selectionMode="multiple" headerStyle={{width: '3rem'}}/>
                        <Column field="avatar" header="Avatar" body={avatarBodyTemplate}/>
                        <Column field="firstName" header="Name" sortable/>
                        <Column field="email" header="Email" sortable/>
                        <Column field="department" header="Department" sortable/>
                        <Column field="role" header="Role" body={roleBodyTemplate} sortable/>
                        <Column field="status" header="Status" body={statusBodyTemplate} sortable/>
                        <Column field="createdAt" header="Created" body={dateBodyTemplate} sortable/>
                        <Column body={actionBodyTemplate} header="Actions"/>
                    </DataTable>
                )}
            </div>

            <UserDialog
                visible={userDialog}
                onHide={hideDialog}
                onSave={saveUser}
                submitted={submitted}
                isEdit={isEdit}
                user={user}
                setUser={setUser}
                roleOptions={roleOptions}
                statusOptions={statusOptions}
            />
        </div>
    );
};

export default UserManagement;
