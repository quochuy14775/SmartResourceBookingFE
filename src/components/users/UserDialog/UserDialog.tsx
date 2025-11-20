'use client';

import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { UserFormData, UserRole, UserStatus } from "@/types/user";
import './UserDialog.css';

interface SelectOption<T> {
    label: string;
    value: T;
}
interface Props {
    visible: boolean;
    onHide: () => void;
    onSave: () => void;
    submitted: boolean;
    isEdit: boolean;
    user: UserFormData;
    setUser: (data: UserFormData) => void;
    roleOptions: SelectOption<UserRole>[];
    statusOptions: SelectOption<UserStatus>[];
}

const UserDialog: React.FC<Props> = ({
                                         visible,
                                         onHide,
                                         onSave,
                                         submitted,
                                         isEdit,
                                         user,
                                         setUser,
                                         roleOptions,
                                         statusOptions
                                     }) => {

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = e.target.value || '';
        setUser({ ...user, [name]: val });
    };

    const onDropdownChange = (e: { value: UserRole | UserStatus }, name: keyof UserFormData) => {
        setUser({ ...user, [name]: e.value });
    };

    const footer = (
        <div>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={onHide} />
            <Button label="Save" icon="pi pi-check" onClick={onSave} />
        </div>
    );

    return (
        <Dialog
            visible={visible}
            style={{ width: '520px' }}
            header={isEdit ? 'Edit User' : 'New User'}
            modal
            className="user-dialog"
            footer={footer}
            onHide={onHide}
        >
            <div className="dialog-content">

                <div className="form-grid">

                    <div className="form-field">
                        <label>Username *</label>
                        <InputText
                            value={user.username}
                            onChange={(e) => onInputChange(e, 'username')}
                            className={submitted && !user.username ? 'p-invalid' : ''}
                        />
                        {submitted && !user.username && <small className="p-error">Required</small>}
                    </div>

                    <div className="form-field">
                        <label>Email *</label>
                        <InputText
                            value={user.email}
                            onChange={(e) => onInputChange(e, 'email')}
                            type="email"
                            className={submitted && !user.email ? 'p-invalid' : ''}
                        />
                        {submitted && !user.email && <small className="p-error">Required</small>}
                    </div>

                    <div className="form-field">
                        <label>First Name *</label>
                        <InputText
                            value={user.firstName}
                            onChange={(e) => onInputChange(e, 'firstName')}
                            className={submitted && !user.firstName ? 'p-invalid' : ''}
                        />
                    </div>

                    <div className="form-field">
                        <label>Last Name *</label>
                        <InputText
                            value={user.lastName}
                            onChange={(e) => onInputChange(e, 'lastName')}
                            className={submitted && !user.lastName ? 'p-invalid' : ''}
                        />
                    </div>

                    <div className="form-field">
                        <label>Department</label>
                        <InputText
                            value={user.department}
                            onChange={(e) => onInputChange(e, 'department')}
                        />
                    </div>

                    <div className="form-field">
                        <label>Phone</label>
                        <InputText
                            value={user.phone}
                            onChange={(e) => onInputChange(e, 'phone')}
                        />
                    </div>

                    <div className="form-field">
                        <label>Role</label>
                        <Dropdown
                            value={user.role}
                            options={roleOptions}
                            onChange={(e) => onDropdownChange(e, 'role')}
                            placeholder="Select a role"
                        />
                    </div>

                    <div className="form-field">
                        <label>Status</label>
                        <Dropdown
                            value={user.status}
                            options={statusOptions}
                            onChange={(e) => onDropdownChange(e, 'status')}
                            placeholder="Select a status"
                        />
                    </div>

                    {!isEdit && (
                        <div className="form-field full-width">
                            <label>Password</label>
                            <InputText
                                type="password"
                                value={user.password}
                                onChange={(e) => onInputChange(e, 'password')}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Dialog>

    );
};

export default UserDialog;
