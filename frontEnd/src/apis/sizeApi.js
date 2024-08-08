import instance from "./axiosConfig";

export const getAllSizes = () => {
    return instance.get(`/api/sizes/getall`);
};

export const createSize = (data) => {
    return instance.post(`/api/sizes/create`, data);
};

export const updateSize = (data, id) => {
    return instance.put(`/api/sizes/${id}/update`, data);
};

export const deleteSize = (id) => {
    return instance.delete(`/api/sizes/${id}/delete`);
};

export const deleteSizes = (data) => {
    return instance.post(`/api/sizes/deletes`, data);
};

export const getSizeById = (id) => {
    return instance.get(`/api/sizes/${id}/detail`);
};
