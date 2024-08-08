import instance from "./axiosConfig";

export const upsertCart = (data) => {
    return instance.put("/api/carts/upsertcart", data);
  };
  
  export const getCartByUserId = (user_id) => {
    return instance.get(`/api/carts?user_id=${user_id}`);
  };
  
  export const deleteCart = (data) => {
    return instance.put("/api/carts/deletecart", data);
  };
  
  export const deleteAllCartsByUserId = (id) => {
    return instance.delete(`/api/carts/${id}/deleteallbyuserid`);
  };
  
  export const updateCartQuantity = (data) => {
    return instance.put("/api/carts/updatequantity", data);
  };
  
  export const mergeCarts = (data) => {
    return instance.put("/api/carts/mergecart", data);
  };
  
  export const checkCartInventory = (data) => {
    return instance.put("/api/carts/checkinventory", data);
  };
  