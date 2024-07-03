import instance from "./instance";

export const apiLogin = (data) => {
  return instance.post("/api/auth/login", data);
};

export const apiCheckLogin = () => {
  return instance.get("/api/auth/checklogin");
};

//========================== api role ===============================
export const apiGetAllGroupRole = (type) => {
  return instance.get(`/api/grouprole/getgrouprole?type=${type}`);
};
export const apiGetGroupRole = (id) => {
  return instance.get(`/api/grouprole/${id}/detail`);
};
export const apiGetCreateGroupRole = (data) => {
  return instance.post("/api/grouprole/create", data);
};
export const apiUpdateGroupRole = (id, data) => {
  return instance.put(`/api/grouprole/${id}/update`, data);
};
export const apiDeleteGroupRole = (id) => {
  return instance.delete(`/api/grouprole/${id}/delete`);
};
export const apiGetRole = (id) => {
  return instance.get(`/api/role/${id}/detail`);
};
export const apiCreateRole = (data) => {
  return instance.post("/api/role/create", data);
};
export const apiGetAllRole = () => {
  return instance.get("/api/role/getall");
};
export const apiUpdateRole = (id, data) => {
  return instance.put(`/api/role/${id}/update`, data);
};

//==========================` User api ===============================
export const apiCountUser = () => {
  return instance.get(`/api/user/count`);
}
export const apiGetAllUser = (page, limit, type, keyword) => {
  return instance.get(
    `/api/user/getall?page=${page}&limit=${limit}&type=${type}&keyword=${keyword}`
  );
};
export const apiGetDetailUser = (id) => {
  return instance.get(`/api/user/${id}/detail`);
};
export const apiCreateAccount = (data) => {
  return instance.post("/api/user/create", data);
};
export const apiSoftDeleteUser = (id) => {
  return instance.delete(`/api/user/${id}/softdelete`);
};
export const apiSoftDeleteUsers = (data) => {
  return instance.post("/api/user/softdeletes", data);
};
export const apiUpdateUser = (data, id) => {
  return instance.put(`/api/user/${id}/update`, data);
};

//========================== Category api ================================
export const apiGetAllCategory = () => {
  return instance.get(`/api/category/getall`);
};
export const apiCreateCategory = (data) => {
  return instance.post("/api/category/create", data);
};
export const apiGetCategory = (id) => {
  return instance.get(`/api/category/${id}/detail`);
};
export const apiGetDetailCategory = (id) => {
  return instance.get(`/api/category/${id}/detail`);
};
export const apiUpdateCategory = (data, id) => {
  return instance.put(`/api/category/${id}/update`, data);
};
export const apiDeleteCategory = (id) => {
  return instance.delete(`/api/category/${id}/delete`);
};
export const apiDeleteCategorys = (data) => {
  return instance.post(`/api/category/deletes`, data);
};
export const apicate = () => {
  return instance.get(`/api/category/cate`);
};
//========================== Brand api==================================
export const apiGetAllBrand = () => {
  return instance.get(`/api/brand/getall`);
};
export const apiCreateBrand = (data) => {
  return instance.post("/api/brand/create", data);
};
export const apiGetBrand = (id) => {
  return instance.get(`/api/brand/${id}/detail`);
};
export const apiUpdateBrand = (data, id) => {
  return instance.put(`/api/brand/${id}/update`, data);
};
export const apiDeleteBrand = (id) => {
  return instance.delete(`/api/brand/${id}/delete`);
};
export const apiDeleteBrands = (data) => {
  return instance.post(`/api/brand/deletes`, data);
}
//========================== Products api ================================

export const apiCountProduct = () => {
  return instance.get(`/api/product/count`);
}
export const apiGetAllProduct = (page, limit, keyword) => {
  return instance.get(`/api/product/getall?page=${page}&limit=${limit}&keyword=${keyword}`);
};
export const apiCreateProduct = (data) => {
  return instance.post("/api/product/create", data);
};
export const apiGetProduct = (id) => {
  return instance.get(`/api/product/${id}/detail`);
};
export const apiUpdateProduct = (data, id) => {
  return instance.put(`/api/product/${id}/update`, data);
};
export const apiSoftDeleteProduct = (id) => {
  return instance.delete(`/api/product/${id}/softdelete`);
};
export const apiSoftDeleteProducts = (data) => {
  return instance.post(`/api/product/softdeletes`, data);
};

//========================== Variant api ================================
export const apiGetAllVariantById = (id) => {
  return instance.get(`/api/variant/${id}/getall`);
};
export const apiCreateVariant = (data, id) => {
  return instance.post(`/api/variant/${id}/createvariant`, data);
};
export const apiUpadateVariant = (data, id) => {
  return instance.put(`/api/product/${id}/updatevariant`, data);
};
export const apiDeleteVariant = (id) => {
  return instance.delete(`/api/variant/${id}/softdeletevariant`);
};
export const apiSoftDeleteVariants = (data) => {
  return instance.post(`/api/variant/softdeletes`, data);
};
export const apiEditVariant = (data, id) => {
  return instance.put(`/api/variant/${id}/updatevariant`, data);
};
export const apiGetVariant = (id) => {
  return instance.get(`/api/variant/${id}/detail`);
};
export const apiGetRatings = (id, page) => {
  return instance.get(`/api/variant/${id}/getratings?page=${page}`);
};
export const apiUpdateReply = (data, id) => {
  return instance.put(`/api/variant/${id}/updatereply`, data);
};

// ========================= Discount api ================================

export const apiGetAllDiscount = (page, limit, keyword) => {
  return instance.get(`/api/discount/getall?page=${page}&limit=${limit}&keyword=${keyword}`);
};

export const apiCreateDiscount = (data) => {
  return instance.post("/api/discount/create", data);
};

export const apiGetDiscount = (id) => {
  return instance.get(`/api/discount/${id}/detail`);
};

export const apiUpdateDiscount = (data, id) => {
  return instance.put(`/api/discount/${id}/update`, data);
};

export const apiDeleteDiscount = (id) => {
  return instance.delete(`/api/discount/${id}/delete`);
};
export const apiDeleteDiscounts = (data) => {
  return instance.post(`/api/discount/deletes`, data);
}
