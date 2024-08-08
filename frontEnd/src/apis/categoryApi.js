import instance from "./axiosConfig";

export const getAllCategories = () => {
    return instance.get(`/api/categories/getall`);
  };
  
  export const getCategories = () => {
    return instance.get(`/api/categories/categories`);
  };
  
  export const createCategory = (data) => {
    return instance.post("/api/categories/create", data);
  };
  
  export const getCategoryById = (id) => {
    return instance.get(`/api/categories/${id}/detail`);
  };
  
  export const updateCategory = (id, data) => {
    return instance.put(`/api/categories/${id}/update`, data);
  };
  
  export const deleteCategory = (id) => {
    return instance.delete(`/api/categories/${id}/delete`);
  };
  
  export const deleteCategories = (data) => {
    return instance.post(`/api/categories/deletes`, data);
  };
  