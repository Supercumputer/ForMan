import instance from "./axiosConfig";

export const getAllDiscounts = (page, limit, keyword) => {
    return instance.get(
        `/api/discounts/getall?page=${page}&limit=${limit}&keyword=${keyword}`
    );
};

export const createDiscount = (data) => {
    return instance.post("/api/discounts/create", data);
};

export const getDiscountById = (id) => {
    return instance.get(`/api/discounts/${id}/detail`);
};

export const getDiscountByCode = (code) => {
    return instance.get(`/api/discounts/${code}/getdiscountbycode`);
};

export const updateDiscount = (data, id) => {
    return instance.put(`/api/discounts/${id}/update`, data);
};

export const updateDiscountByCode = (data, code) => {
    return instance.put(`/api/discounts/${code}/updatebycode`, data);
};

export const deleteDiscount = (id) => {
    return instance.delete(`/api/discounts/${id}/delete`);
};

export const deleteDiscounts = (data) => {
    return instance.post(`/api/discounts/deletes`, data);
};
