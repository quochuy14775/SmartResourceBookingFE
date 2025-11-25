'use client';

import React from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {UserFormData, UserRole, UserStatus} from "@/types/user";
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

    // Small reusable field component for text inputs to reduce duplication
    const TextField = ({
                           label,
                           name,
                           type = 'text',
                           required = false,
                           className = ''
                       }: {
        label: string;
        name: keyof UserFormData;
        type?: string;
        required?: boolean;
        className?: string;
    }) => (
        <div className={`form-field ${className}`}>
            <label>{label}{required ? ' *' : ''}</label>
            <InputText
                type={type}
                value={(user[name] as any) ?? ''}
                onChange={(e) => setUser({...user, [name]: (e?.target as HTMLInputElement)?.value ?? ''})}
                className={required && submitted && !(user[name] as any) ? 'p-invalid' : ''}
            />
            {required && submitted && !(user[name] as any) && <small className="p-error">Required</small>}
        </div>
    );

    const DropdownField = ({
                               label,
                               name,
                               options,
                               placeholder
                           }: {
        label: string;
        name: keyof UserFormData;
        options: SelectOption<any>[];
        placeholder?: string;
    }) => (
        <div className="form-field">
            <label>{label}</label>
            <Dropdown
                value={user[name] as any}
                options={options}
                onChange={(e) => setUser({...user, [name]: e.value})}
                placeholder={placeholder}
            />
        </div>
    );

    const footer = (
        <div className="user-dialog-footer-buttons">
            <Button label="Cancel" icon="pi pi-times" outlined className="btn-cancel" onClick={onHide}/>
            <Button label="Save" icon="pi pi-check" className="btn-save" onClick={onSave}/>
        </div>
    );

    return (
        <Dialog
            visible={visible}
            style={{width: '520px'}}
            header={isEdit ? 'Edit User' : 'New User'}
            modal
            className="user-dialog"
            footer={footer}
            onHide={onHide}
        >
            <div className="dialog-content">

                <div className="form-grid">

                    <TextField label="Username" name="username" required/>

                    <TextField label="Email" name="email" type="email" required/>

                    <TextField label="First Name" name="firstName" required/>

                    <TextField label="Last Name" name="lastName" required/>

                    <TextField label="Department" name="department"/>

                    <TextField label="Phone" name="phone"/>

                    <DropdownField label="Role" name="role" options={roleOptions} placeholder="Select a role"/>

                    <DropdownField label="Status" name="status" options={statusOptions} placeholder="Select a status"/>

                    {!isEdit && (
                        <div className="form-field full-width">
                            <label>Password</label>
                            <InputText
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({
                                    ...user,
                                    password: (e?.target as HTMLInputElement)?.value ?? ''
                                })}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Dialog>

    );
};

export default UserDialog;
