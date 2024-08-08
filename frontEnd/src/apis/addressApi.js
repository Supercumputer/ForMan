import instance from "./axiosConfig";

export const getAllAddresses = (userId) => {
    return instance.get(`/api/addresses/${userId}/getall`);
  };
  
  export const getDefaultAddress = (userId) => {
    return instance.get(`/api/addresses/${userId}/getdefault`);
  };
  
  export const updateAddress = (addressId, data) => {
    return instance.put(`/api/addresses/${addressId}/update`, data);
  };
  
  export const updateDefaultAddress = (addressId) => {
    return instance.put(`/api/addresses/${addressId}/updateDefault`);
  };
  
  export const deleteAddress = (addressId) => {
    return instance.delete(`/api/addresses/${addressId}/delete`);
  };
  
  export const createAddress = (data) => {
    return instance.post(`/api/addresses/create`, data);
  };
  