import instance from "./axiosConfig";

export const getUserCount = () => {
    return instance.get(`/api/users/count`);
  };
  
  export const getAllUsers = (page, limit, type, keyword) => {
    return instance.get(
      `/api/users/getall?page=${page}&limit=${limit}&type=${type}&keyword=${keyword}`
    );
  };
  
  export const getUserById = (id) => {
    return instance.get(`/api/users/${id}/detail`);
  };
  
  export const getUserByEmail = (query) => {
    return instance.get(`/api/users/findByEmail${query}`);
  };
  
  export const createUser = (data) => {
    return instance.post("/api/users/create", data);
  };
  
  export const sendUserFeedback = (data) => {
    return instance.post("/api/users/sendfeedback", data);
  };
  
  export const softDeleteUser = (id) => {
    return instance.delete(`/api/users/${id}/softdelete`);
  };
  
  export const softDeleteUsers = (data) => {
    return instance.post("/api/users/softdeletes", data);
  };
  
  export const updateUser = (id, data) => {
    return instance.put(`/api/users/${id}/update`, data);
  };
  
  export const updateUserPassword = (id, data) => {
    return instance.put(`/api/users/${id}/resetpassword`, data);
  };
  