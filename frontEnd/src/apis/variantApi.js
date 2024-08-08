import instance from "./axiosConfig";

export const getVariantsByProductId = (id) => {
    return instance.get(`/api/variants/${id}/getall`);
};

export const getSoftDeletedVariantsByProductId = (id) => {
    return instance.get(`/api/variants/${id}/getallSoft`);
};

export const getAllProductVariants = (query) => {
    return instance.get(`/api/variants/getAllProductVariant${query}`);
};

export const getAllVariants = (query) => {
    return instance.get(`/api/variants/getallvariants${query}`);
};

export const createVariant = (data, id) => {
    return instance.post(`/api/variants/${id}/createvariant`, data);
};

export const updateVariant = (data, id) => {
    return instance.put(`/api/variants/${id}/updatevariant`, data);
};

export const softDeleteVariant = (id) => {
    return instance.delete(`/api/variants/${id}/softdeletevariant`);
};

export const softDeleteVariants = (data) => {
    return instance.post(`/api/variants/softdeletes`, data);
};

export const updateVariantQuantity = (data) => {
    return instance.put(`/api/variants/updatequantity`, data);
};

export const getVariantById = (id) => {
    return instance.get(`/api/variants/${id}/detail`);
};

export const getVariantRatings = (id, page) => {
    return instance.get(`/api/variants/${id}/getratings?page=${page}`);
};

export const getAverageVariantRating = (id) => {
    return instance.get(`/api/variants/${id}/getaveragerating`);
};

export const getRatingsByStar = (id, star, page) => {
    return instance.get(`/api/variants/${id}/getratingbystar?star=${star}&page=${page}`);
};

export const updateRatingReply = (data, id) => {
    return instance.put(`/api/variants/${id}/updatereply`, data);
};

export const destroyVariant = (id) => {
    return instance.delete(`/api/variants/${id}/destroy`);
};

export const destroyVariants = (data) => {
    return instance.post(`/api/variants/destroys`, data);
};

export const restoreVariant = (id) => {
    return instance.put(`/api/variants/${id}/restore`);
};
