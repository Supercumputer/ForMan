import instance from "./axiosConfig";

export const getProductCount = () => {
    return instance.get(`/api/products/count`);
  };
  
  export const destroyProduct = (id) => {
    return instance.delete(`/api/products/${id}/destroy`);
  };
  
  export const destroyProducts = (data) => {
    return instance.post(`/api/products/destroys`, data);
  };
  
  export const restoreProduct = (id) => {
    return instance.put(`/api/products/${id}/restore`);
  };
  
  export const getAllProducts = (query) => {
    return instance.get(`/api/products/getall${query}`);
  };
  
  export const getAllProductsInTrash = (query) => {
    return instance.get(`/api/products/getalltrash${query}`);
  };
  
  export const getProductBySlug = (slug) => {
    return instance.get(`/api/products/getProductBySlug/${slug}/detail`);
  };
  
  export const createProduct = (data) => {
    return instance.post("/api/products/create", data);
  };
  
  export const getProductById = (id) => {
    return instance.get(`/api/products/${id}/detail`);
  };
  
  export const updateProduct = (data, id) => {
    return instance.put(`/api/products/${id}/update`, data);
  };
  
  export const softDeleteProduct = (id) => {
    return instance.delete(`/api/products/${id}/softdelete`);
  };
  
  export const softDeleteProducts = (data) => {
    return instance.post(`/api/products/softdeletes`, data);
  };
  