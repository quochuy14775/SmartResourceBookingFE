import api from "@/lib/axios";


const departmentService = {
    getAllDepartments: async (query?: string) => {
        const url = query ? `/Department?${query}` : '/Department';
        const response = await api.get(url);
        return response.data;
    },

    getDepartmentById: async (departmentId: string) => {
        const response = await api.get(`/Department/${departmentId}`);
        return response.data;
    },

    createDepartment: async (data: any) => {
        const response = await api.post('/Department', data);
        return response.data;
    },

    updateDepartment: async (id: string, data: any) => {
        const response = await api.put(`/Department/${id}`, data);
        return response.data;
    },

    deleteDepartments: async (ids: number[]) => {
        const response = await api.put('/Department/delete', ids);
        return response.data;
    },

    disableDepartments: async (ids: number[]) => {
        const response = await api.put('/Department/disable', ids);
        return response.data;
    },

    enableDepartments: async (ids: number[]) => {
        const response = await api.put('/Department/enable', ids);
        return response.data;
    },

};

export default departmentService;