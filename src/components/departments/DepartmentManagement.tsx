'use client';

import React, {useState, useEffect, useRef} from 'react';
import {DataTable, DataTablePageEvent, DataTableSortEvent} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Tag} from 'primereact/tag';
import {Toast} from 'primereact/toast';
import {ConfirmDialog, confirmDialog} from 'primereact/confirmdialog';
import {Toolbar} from 'primereact/toolbar';
import './DepartmentManagement.css';
import { Skeleton } from 'primereact/skeleton';
import departmentService from '@/services/departmentService';
import {Department, DepartmentFormData} from '@/types/departments';
import DepartmentDialog from '@/components/departments/DepartmentDialog/DepartmentDialog';
import {getVietnamTimeISO} from "@/ultis/dateHelper";

const DepartmentManagement: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [selectedDepartments, setSelectedDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(false);
    const [DepartmentToDelete, setDepartmentToDelete] = useState<Department[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<1 | -1 | 0 | undefined>(1);
    const [globalFilter, setGlobalFilter] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);
    const [department, setDepartment] = useState<DepartmentFormData>({
        name: '',
        description: '',
        isActive: true,
        createAt: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editDepartmentId, setEditDepartmentId] = useState<string | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        loadDepartments();
    }, [first, rows, sortField, sortOrder, globalFilter]);

    const loadDepartments = async () => {
        setLoading(true);
        try {
            const orderBy = sortField
                ? `${sortField} ${sortOrder === 1 ? 'asc' : sortOrder === -1 ? 'desc' : ''}`
                : undefined;
            const response = await departmentService.getAllDepartments(
                // build a simple query that mimics previous behavior; departmentService expects query string
                `&$skip=${first}&$top=${rows}` + (orderBy ? `&$orderby=${encodeURIComponent(orderBy)}` : '') + (globalFilter ? `&$filter=${encodeURIComponent(globalFilter)}` : '')
            );

            // Try to infer shape: response.value or response
            const list: Department[] = response.value ?? response;
            setDepartments(list);
            setTotalRecords(response['@odata.count'] ?? (Array.isArray(list) ? list.length : 0));
        } catch (error) {
            toast.current?.show({severity: 'error', summary: 'Error', detail: 'Failed to load departments', life: 3000});
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
        setSortOrder(event.sortOrder ?? 1);
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(e.target.value);
        setFirst(0);
    };

    const openNew = () => {
        setDepartment({name: '', description: '', isActive: true, createAt: ''});
        setSubmitted(false);
        setIsEdit(false);
        setEditDepartmentId(null);
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDialogVisible(false);
    };

    const editItem = (d: Department) => {
        setDepartment({name: d.name, description: d.description ?? '', isActive: d.isActive, createAt: d.createdAt});
        setIsEdit(true);
        setEditDepartmentId(d.id);
        setDialogVisible(true);
    };

    const confirmDelete = (d: Department) => {
        confirmDialog({
            message: `Are you sure you want to delete ${d.name}?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteDepartment(Number(d.id)),
            acceptClassName: 'p-button-danger'
        });
    };

    const deleteDepartment = async (id: number) => {
        try {
            await departmentService.deleteDepartments([id]);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Deleted', life: 3000 });
            await loadDepartments();
        } catch {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
        }
    };

    const deleteSelected = () => {
        confirmDialog({
            message: `Are you sure you want to delete ${selectedDepartments.length} selected departments?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                try {
                    await departmentService.deleteDepartments(selectedDepartments.map(d => Number(d.id)));
                    setSelectedDepartments([]);
                    toast.current?.show({severity: 'success', summary: 'Success', detail: 'Departments deleted successfully', life: 3000});
                    await loadDepartments();
                } catch {
                    toast.current?.show({severity: 'error', summary: 'Error', detail: 'Failed to delete departments', life: 3000});
                }
            },
            acceptClassName: 'p-button-danger'
        });
    };


    const saveDepartment = async () => {
        setSubmitted(true);

        if (department.name.trim()) {
            try {
                if (isEdit && editDepartmentId) {
                    await departmentService.updateDepartment(editDepartmentId, department);
                    toast.current?.show({severity: 'success', summary: 'Success', detail: 'Department updated successfully', life: 3000});
                } else {
                    // Tạo mới, set createdAt theo giờ VN
                    const newDepartment = { ...department, createdAt: getVietnamTimeISO() };
                    console.log(newDepartment.createdAt);
                    await departmentService.createDepartment(newDepartment);
                    toast.current?.show({severity: 'success', summary: 'Success', detail: 'Department created successfully', life: 3000});
                }
                setDialogVisible(false);
                await loadDepartments();
                setDepartment({name: '', description: '', isActive: true, createAt: ''});
            } catch (error) {
                toast.current?.show({severity: 'error', summary: 'Error', detail: 'Failed to save department', life: 3000});
            }
        }
    };

    const disableSelected = () => {
        confirmDialog({
            message: `Disable ${selectedDepartments.length} selected departments?`,
            header: 'Confirm Disable',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                try {
                    await departmentService.disableDepartments(selectedDepartments.map(d => Number(d.id)));
                    toast.current?.show({ severity: 'success', summary: 'Disabled', detail: 'Departments disabled', life: 3000 });
                    setSelectedDepartments([]);
                    await loadDepartments();
                } catch {
                    toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to disable', life: 3000 });
                }
            },
            acceptClassName: 'p-button-warning'
        });
    };

    const enableSelected = () => {
        confirmDialog({
            message: `Enable ${selectedDepartments.length} selected departments?`,
            header: 'Confirm Enable',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                try {
                    await departmentService.enableDepartments(selectedDepartments.map(d => Number(d.id)));
                    toast.current?.show({ severity: 'success', summary: 'Enabled', detail: 'Departments enabled', life: 3000 });
                    setSelectedDepartments([]);
                    await loadDepartments();
                } catch {
                    toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to enable', life: 3000 });
                }
            },
            acceptClassName: 'p-button-info'
        });
    };

    const disableDepartment = async (id: number) => {
        try {
            await departmentService.disableDepartments([id]);
            toast.current?.show({
                severity: 'warn',
                summary: 'Disabled',
                detail: 'Department disabled',
                life: 3000
            });
            await loadDepartments();
        } catch {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to disable', life: 3000 });
        }
    };

    const enableDepartment = async (id: number) => {
        try {
            await departmentService.enableDepartments([id]);
            toast.current?.show({
                severity: 'success',
                summary: 'Enabled',
                detail: 'Department enabled',
                life: 3000
            });
            await loadDepartments();
        } catch {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to enable', life: 3000 });
        }
    };




    const nameBodyTemplate = (rowData: Department) => {
        return (
            <div>
                <div className="font-semibold">{rowData.name}</div>
            </div>
        );
    };

    const descriptionBodyTemplate = (rowData: Department) => {
        return (
            <div className="text-sm text-gray-600">{rowData.description}</div>
        );
    };

    const statusBodyTemplate = (rowData: Department) => {
        return (
            <Tag
                value={rowData.isActive ? "Active" : "Inactive"}
                severity={rowData.isActive ? "success" : "danger"}
            />
        );
    };

    const dateBodyTemplate = (rowData: Department) => {
        return new Date(rowData.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    };

    const actionBodyTemplate = (rowData: Department) => {
        return (
            <div className="flex gap-2">
                {/* Edit */}
                <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    severity="info"
                    onClick={() => editItem(rowData)}
                    tooltip="Edit"
                    tooltipOptions={{ position: 'top' }}
                />

                {/* Delete */}
                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDelete(rowData)}
                    tooltip="Delete"
                    tooltipOptions={{ position: 'top' }}
                />

                {/* Enable / Disable dynamic button */}
                {rowData.isActive ? (
                    <Button
                        icon="pi pi-ban"
                        rounded
                        outlined
                        severity="warning"
                        onClick={() =>
                            confirmDialog({
                                message: `Disable ${rowData.name}?`,
                                header: 'Confirm Disable',
                                icon: 'pi pi-exclamation-triangle',
                                accept: () => disableDepartment(Number(rowData.id)),
                                acceptClassName: 'p-button-warning'
                            })
                        }
                        tooltip="Disable"
                        tooltipOptions={{ position: 'top' }}
                    />
                ) : (
                    <Button
                        icon="pi pi-check-circle"
                        rounded
                        outlined
                        severity="success"
                        onClick={() =>
                            confirmDialog({
                                message: `Enable ${rowData.name}?`,
                                header: 'Confirm Enable',
                                icon: 'pi pi-exclamation-triangle',
                                accept: () => enableDepartment(Number(rowData.id)),
                                acceptClassName: 'p-button-success'
                            })
                        }
                        tooltip="Enable"
                        tooltipOptions={{ position: 'top' }}
                    />
                )}
            </div>
        );
    };


    const rightToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-3">
                <Button
                    icon="pi pi-plus"
                    severity="info"
                    rounded
                    className="toolbar-button px-4 py-2 font-semibold text-white shadow-md hover:shadow-lg"
                    onClick={openNew}
                />

                <Button
                    icon="pi pi-trash"
                    severity="danger"
                    rounded
                    disabled={!selectedDepartments.length}
                    className="toolbar-button px-4 py-2 font-semibold text-white shadow-md hover:shadow-lg disabled:opacity-50"
                    onClick={deleteSelected}
                />

                <Button
                    icon="pi pi-ban"
                    severity="warning"
                    rounded
                    disabled={!selectedDepartments.length}
                    className="toolbar-button px-4 py-2 font-semibold text-white shadow-md hover:shadow-lg disabled:opacity-50"
                    onClick={disableSelected}
                />

                <Button
                    icon="pi pi-check-circle"
                    severity="success"
                    rounded
                    disabled={!selectedDepartments.length}
                    className="toolbar-button px-4 py-2 font-semibold text-white shadow-md hover:shadow-lg disabled:opacity-50"
                    onClick={enableSelected}
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
            placeholder="Search departments..."
            className="search-input"
        />
      </span>
        );
    };
    const renderSkeletonTable = () => {
        const skeletonRows = Array.from({ length: rows });
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




    return (
        <div className="user-management">
            <Toast ref={toast}/>
            <ConfirmDialog/>

            <div className="page-header">
                <div>
                    <h1 className="page-title gradient-text">Department Management</h1>
                    <p className="page-subtitle">Manage departments and related information</p>
                </div>
                <div className="page-stats">
                    <div className="stat-card scale-in">
                        <i className="pi pi-briefcase stat-icon"></i>
                        <div>
                            <div className="stat-value">{totalRecords}</div>
                            <div className="stat-label">Total Departments</div>
                        </div>
                    </div>
                    <div className="stat-card scale-in" style={{animationDelay: '0.1s'}}>
                        <i className="pi pi-folder stat-icon"></i>
                        <div>
                            <div className="stat-value">{departments.filter(u => u.isActive).length}</div>
                            <div className="stat-label">Active Departments</div>
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
                        value={departments}
                        selection={selectedDepartments}
                        onSelectionChange={(e: { value: Department[] }) => setSelectedDepartments(e.value)}
                        dataKey="id"
                        paginator
                        rows={rows}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        paginatorClassName="custom-paginator"
                        paginatorDropdownAppendTo={() => document.body}
                        first={first}
                        totalRecords={totalRecords}
                        onPage={onPage}
                        onSort={onSort}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        selectionMode="multiple"
                        lazy
                        className="user-datatable"
                        emptyMessage="No departments found"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} departments"
                    >
                        <Column selectionMode="multiple" headerStyle={{width: '3rem'}}/>
                        <Column field="name" header="Name" sortable body={nameBodyTemplate}/>
                        <Column field="description" header="Description" body={descriptionBodyTemplate}/>
                        <Column field="isActive" header="Status" body={statusBodyTemplate} sortable/>
                        <Column field="createdAt" header="Created" body={dateBodyTemplate} sortable/>
                        <Column body={actionBodyTemplate} header="Actions"/>
                    </DataTable>
                )}
            </div>

            <DepartmentDialog
                visible={dialogVisible}
                onHide={hideDialog}
                onSave={saveDepartment}
                submitted={submitted}
                isEdit={isEdit}
                department={department}
                setDepartment={setDepartment}
            />
        </div>
    );
};

export default DepartmentManagement;
