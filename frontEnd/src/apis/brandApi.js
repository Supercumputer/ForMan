import instance from "./axiosConfig";

export const getAllBrands = () => {
    return instance.get(`/api/brands/getall`);
  };
  
  export const createBrand = (data) => {
    return instance.post("/api/brands/create", data);
  };
  
  export const getBrandById = (id) => {
    return instance.get(`/api/brands/${id}/detail`);
  };
  
  export const updateBrand = (id, data) => {
    return instance.put(`/api/brands/${id}/update`, data);
  };
  
  export const deleteBrand = (id) => {
    return instance.delete(`/api/brands/${id}/delete`);
  };
  
  export const deleteBrands = (data) => {
    return instance.post(`/api/brands/deletes`, data);
  };
  