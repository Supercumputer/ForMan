import instance from "./axiosConfig";

export const createRating = (data, id) => {
    return instance.post(`/api/ratings/create?variant_id=${id}`, data);
}

