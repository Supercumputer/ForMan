import instance from "./axiosConfig";

export const getAllColors = () => {
    return instance.get(`/api/colors/getall`);
};

export const createColor = (data) => {
    return instance.post(`/api/colors/create`, data);
};

export const updateColor = (id, data) => {
    return instance.put(`/api/colors/${id}/update`, data);
};

export const deleteColor = (id) => {
    return instance.delete(`/api/colors/${id}/delete`);
};

export const deleteColors = (data) => {
    return instance.post(`/api/colors/deletes`, data);
};

export const getColorById = (id) => {
    return instance.get(`/api/colors/${id}/detail`);
};
