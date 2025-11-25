'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { DepartmentFormData } from '@/types/departments';
import './DepartmentDialog.css'; // chắc chắn import CSS hiện tại

interface DepartmentDialogProps {
    visible: boolean;
    onHide: () => void;
    onSave: (data: DepartmentFormData) => void;
    department: DepartmentFormData;
    setDepartment: React.Dispatch<React.SetStateAction<DepartmentFormData>>;
    submitted?: boolean;
    isEdit?: boolean;
}

const statusOptions = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
];

const DepartmentDialog: React.FC<DepartmentDialogProps> = ({
                                                               visible,
                                                               onHide,
                                                               onSave,
                                                               department,
                                                               setDepartment,
                                                               submitted = false,
                                                               isEdit = false
                                                           }) => {
    const [errors, setErrors] = useState<{ name?: string }>({});

    useEffect(() => {
        if (submitted) validate();
    }, [department, submitted]);

    const handleChange = useCallback(
        (field: keyof DepartmentFormData, value: any) => {
            setDepartment(prev => ({ ...prev, [field]: value }));
            setErrors(prev => ({ ...prev, [field]: '' }));
        },
        [setDepartment]
    );

    const validate = () => {
        const newErrors: { name?: string } = {};
        if (!department.name || department.name.trim() === '') {
            newErrors.name = 'Name is required.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;
        onSave(department);
    };

    const dialogHeader = isEdit ? 'Update Department' : 'Add Department';

    const dialogFooter = (
        <div className="user-dialog-footer-buttons">
            <Button
                label="Cancel"
                icon="pi pi-times"
                outlined
                className="btn-cancel"
                onClick={onHide}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                className="btn-save"
                onClick={handleSave}
                autoFocus
            />
        </div>
    );

    return (
        <Dialog
            visible={visible}
            header={dialogHeader}
            modal
            className="user-dialog"
            footer={dialogFooter}
            onHide={onHide}
            style={{ width: '500px', maxWidth: '90vw' }}
            breakpoints={{ '640px': '95vw' }}
        >
            <div className="dialog-content form-grid">
                <div className="form-field full-width">
                    <label htmlFor="name">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <InputText
                        id="name"
                        value={department.name}
                        onChange={e => handleChange('name', e.target.value)}
                        className={errors.name ? 'p-invalid' : ''}
                        placeholder="Enter department name"
                    />
                    {errors.name && <Message severity="error" text={errors.name} />}
                </div>

                <div className="form-field full-width">
                    <label htmlFor="description">Description</label>
                    <InputText
                        id="description"
                        value={department.description}
                        onChange={e => handleChange('description', e.target.value)}
                        placeholder="Enter description"
                    />
                </div>

                <div className="form-field full-width">
                    <label htmlFor="status">Status</label>
                    <Dropdown
                        id="status"
                        value={department.isActive}
                        options={statusOptions}
                        onChange={e => handleChange('isActive', e.value)}
                        placeholder="Select status"
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default DepartmentDialog;
