import axios from "axios";
import instance from "./instance";

export const apiLogin = (data) => {
  return instance.post("/api/auth/login", data);
};
export const apiRegister = (data) => {
  return instance.post("/api/auth/register", data);
};

export const apiGetAccount = () => {
  return instance.get("/api/auth/account");
};
export const apiRefreshToken = () => {
  return instance.get("/api/auth/refreshtoken");
};

export const apiLogout = () => {
  return instance.get("/api/auth/logout");
};

// ========================= api cart ===============================
export const apiUpsertCart = (data) => {
  return instance.put("/api/cart/upsertcart", data);
};
export const apiGetCartByUserId = (user_id) => {
  return instance.get(`/api/cart?user_id=${user_id}`);
};
export const apiDeleteCart = (data) => {
  return instance.put("/api/cart/deletecart", data);
};
export const apiDeleteAllCart = (id) => {
  return instance.delete(`/api/cart/${id}/deleteallbyuserid`);
};
export const apiUpadteQuantiTy = (data) => {
  return instance.put("/api/cart/updatequantity", data);
};
export const apiMergeCart = (data) => {
  return instance.put("/api/cart/mergecart", data);
};
export const apiCheckInventory = (data) => {
  return instance.put("/api/cart/checkinventory", data);
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
};
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
export const apiUpdatePassword = (data, id) => {
  return instance.put(`/api/user/${id}/resetpassword`, data);
};

//========================== Category api ================================
export const apiGetAllCategory = () => {
  return instance.get(`/api/category/getall`);
};
export const apiGetCategorys = () => {
  return instance.get(`/api/category/categories`);
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
};
//========================== Products api ================================

export const apiCountProduct = () => {
  return instance.get(`/api/product/count`);
};
export const apiDestroyProduct = (id) => {
  return instance.delete(`/api/product/${id}/destroy`);
};
export const apiDestroysProduct = (data) => {
  return instance.post(`/api/product/destroys`, data);
};
export const apiRestoreProduct = (id) => {
  return instance.put(`/api/product/${id}/restore`);
};
export const apiGetAllProduct = () => {
  return instance.get(`/api/product/getall`);
};
export const apiGetAllProductTrash = () => {
  return instance.get(`/api/product/getalltrash`);
};
export const apiGetProductBySlug = (slug) => {
  return instance.get(`/api/product/getProductBySlug/${slug}/detail`);
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
export const apiGetAllVariantByIdSoft = (id) => {
  return instance.get(`/api/variant/${id}/getallSoft`);
};
export const apiGetAllProductVariant = (query) => {
  return instance.get(`/api/variant/getAllProductVariant${query}`);
};
export const apiGetAllVariants = (query) => {
  return instance.get(`/api/variant/getallvariants${query}`);
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
export const apiUpdateQuantityVariant = (data) => {
  return instance.put(`/api/variant/updatequantity`, data);
};
export const apiGetVariant = (id) => {
  return instance.get(`/api/variant/${id}/detail`);
};
export const apiGetRatings = (id, page) => {
  return instance.get(`/api/variant/${id}/getratings?page=${page}`);
};
export const apiGetAverageRating = (id) => {
  return instance.get(`/api/variant/${id}/getaveragerating`);
};
export const apiGetRatingsByStar = (id, star, page) => {
  return instance.get(
    `/api/variant/${id}/getratingbystar?star=${star}&page=${page}`
  );
};
export const apiUpdateReply = (data, id) => {
  return instance.put(`/api/variant/${id}/updatereply`, data);
};
export const apiDestroyVariant = (id) => {
  return instance.delete(`/api/variant/${id}/destroy`);
};
export const apiDestroysVariant = (data) => {
  return instance.post(`/api/variant/destroys`, data);
};
export const apiRestoreVariant = (id) => {
  return instance.put(`/api/variant/${id}/restore`);
}
// ========================= Discount api ================================

export const apiGetAllDiscount = (page, limit, keyword) => {
  return instance.get(
    `/api/discount/getall?page=${page}&limit=${limit}&keyword=${keyword}`
  );
};

export const apiCreateDiscount = (data) => {
  return instance.post("/api/discount/create", data);
};

export const apiGetDiscount = (id) => {
  return instance.get(`/api/discount/${id}/detail`);
};
export const apiGetDiscountByCode = (code) => {
  return instance.get(`/api/discount/${code}/getdiscountbycode`);
};

export const apiUpdateDiscount = (data, id) => {
  return instance.put(`/api/discount/${id}/update`, data);
};
export const apiUpdateDiscountByCode = (data, id) => {
  return instance.put(`/api/discount/${id}/updatebycode`, data);
};

export const apiDeleteDiscount = (id) => {
  return instance.delete(`/api/discount/${id}/delete`);
};
export const apiDeleteDiscounts = (data) => {
  return instance.post(`/api/discount/deletes`, data);
};

// ========================= Role Color ================================
export const apiGetAllColor = () => {
  return instance.get(`/api/color/getall`);
};
export const apiCreateColor = (data) => {
  return instance.post(`/api/color/create`, data);
};
export const apiUpdateColor = (data, id) => {
  return instance.put(`/api/color/${id}/update`, data);
};
export const apiDeleteColor = (id) => {
  return instance.delete(`/api/color/${id}/delete`);
};
export const apiDeletesColor = (data) => {
  return instance.post(`/api/color/deletes`, data);
};
export const apiGetColor = (id) => {
  return instance.get(`/api/color/${id}/detail`);
};

// ======================= Size api ================================
export const apiGetAllSize = () => {
  return instance.get(`/api/size/getall`);
};
export const apiCreateSize = (data) => {
  return instance.post(`/api/size/create`, data);
};
export const apiUpdateSize = (data, id) => {
  return instance.put(`/api/size/${id}/update`, data);
};
export const apiDeleteSize = (id) => {
  return instance.delete(`/api/size/${id}/delete`);
};
export const apiDeletesSize = (data) => {
  return instance.post(`/api/size/deletes`, data);
};
export const apiGetSize = (id) => {
  return instance.get(`/api/size/${id}/detail`);
};

// ======================= Api tỉnh vn =================================


export const apiGetProvinces = () => {
  return axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
};
export const apiGetDistrict = (id) => {
  return axios.get(`https://esgoo.net/api-tinhthanh/2/${id}.htm`);
};
export const apiGetCommune = (id) => {
  return axios.get(`https://esgoo.net/api-tinhthanh/3/${id}.htm`);
};
export const apiGetFullAddress = (id) => {
  return axios.get(`https://esgoo.net/api-tinhthanh/5/${id}.htm`);
};

//============================ Api Address ======================================

export const apiGetAllAddress = (id) => {
  return instance.get(`/api/address/${id}/getall`);
};
export const apiGetDefaultAddress = (id) => {
  return instance.get(`/api/address/${id}/getdefault`);
};
export const apiUpdateAddress = (id, data) => {
  return instance.put(`/api/address/${id}/update`, data);
};
export const apiUpdateDefaultAddress = (id) => {
  return instance.put(`/api/address/${id}/updateDefault`);
};
export const apiDeleteAddress = (id) => {
  return instance.delete(`/api/address/${id}/delete`);
};
export const apiCreateAddress = (data) => {
  return instance.post(`/api/address/create`, data);
};

// ========================= Api order ==============================

export const apiCreateOrder = (data) => {
  return instance.post(`/api/order/create`, data);
};
export const apiGetOrderById = (id) => {
  return instance.get(`/api/order/${id}/getorderbyId`);
};
export const apiGetOrderByUserId = (id) => {
  return instance.get(`/api/order/${id}/getorderbyuserid`);
};
export const apiGetOrderDetailById = (id) => {
  return instance.get(`/api/order/${id}/getorderdetailbyId`);
};
export const apiGetAllOrders = (page, limit) => {
  return instance.get(`/api/order/getallorders?page=${page}&limit=${limit}`);
};
export const apiGetAllOrdersStatistic = (query) => {
  return instance.get(`/api/order/getallordersstatistic${query}`);
};
export const apiGetAllOrdersTrash = (page, limit) => {
  return instance.get(`/api/order/getallorderstrash?page=${page}&limit=${limit}`);
};
export const apiSendMailOrder = (data) => {
  return instance.post(`/api/order/sendemail`, data);
};
export const apiUpdateOrder = (id, data) => {
  return instance.put(`/api/order/${id}/updateOrder`, data);
};
export const apiCreatePaymentUrlVnpay = (data) => {
  return instance.post(`/api/order/create_payment_url`, data);
};
export const apipaymentResult = () => {
  return instance.get(`/api/order/payment-result`);
};
export const apiDeleteSoftOrder = (id) => {
  return instance.delete(`/api/order/${id}/deletesoftorder`);
};
export const apiDestroyOrder = (id) => {
  return instance.delete(`/api/order/${id}/destroy`);
};
export const apiRestoreOrder = (id) => {
  return instance.put(`/api/order/${id}/restore`);
};
export const apiDeleteSoftsOrder = (data) => {
  return instance.post(`/api/order/deletesoftorders`, data);
};

// ========================= Api rating ==============================

export const apiCreateRating = (data, id) => {
  return instance.post(`/api/rating/create?variant_id=${id}`, data);
}
export const apiCheckRating = (data) => {
  return instance.post(`/api/order/checkratingorderstatus`, data);
}

