import instance from "./axiosConfig";

export const getAllGroupRoles = (type) => {
    return instance.get(`/api/grouproles/getgrouprole?type=${type}`);
  };
  
  export const getGroupRoleById = (id) => {
    return instance.get(`/api/grouproles/${id}/detail`);
  };
  
  export const createGroupRole = (data) => {
    return instance.post("/api/grouproles/create", data);
  };
  
  export const updateGroupRole = (id, data) => {
    return instance.put(`/api/grouproles/${id}/update`, data);
  };
  
  export const deleteGroupRole = (id) => {
    return instance.delete(`/api/grouproles/${id}/delete`);
  };
  
  export const getRoleById = (id) => {
    return instance.get(`/api/roles/${id}/detail`);
  };
  
  export const createRole = (data) => {
    return instance.post("/api/roles/create", data);
  };
  
  export const getAllRoles = () => {
    return instance.get("/api/roles/getall");
  };
  
  export const updateRole = (id, data) => {
    return instance.put(`/api/roles/${id}/update`, data);
  };
  