import instance from "./axiosConfig";

export const createOrder = (data) => {
    return instance.post(`/api/orders/create`, data);
};

export const getOrderById = (id) => {
    return instance.get(`/api/orders/${id}/getorderbyId`);
};

export const getOrderByUserId = (id) => {
    return instance.get(`/api/orders/${id}/getorderbyuserid`);
};

export const getOrderDetailById = (id) => {
    return instance.get(`/api/orders/${id}/getorderdetailbyId`);
};

export const getAllOrders = (query) => {
    return instance.get(`/api/orders/getallorders${query}`);
};

export const getAllOrdersStatistic = (query) => {
    return instance.get(`/api/orders/getallordersstatistic${query}`);
};

export const getAllOrdersTrash = (page, limit) => {
    return instance.get(`/api/orders/getallorderstrash?page=${page}&limit=${limit}`);
};

export const sendMailOrder = (data) => {
    return instance.post(`/api/orders/sendemail`, data);
};

export const updateOrder = (orderId, data) => {
    return instance.put(`/api/orders/${orderId}/updateOrder`, data);
};

export const createPaymentUrlVnpay = (data) => {
    return instance.post(`/api/orders/create_payment_url`, data);
};

export const getPaymentResult = () => {
    return instance.get(`/api/orders/payment-result`);
};

export const deleteSoftOrder = (orderId) => {
    return instance.delete(`/api/orders/${orderId}/deletesoftorder`);
};

export const destroyOrder = (orderId) => {
    return instance.delete(`/api/orders/${orderId}/destroy`);
};

export const restoreOrder = (orderId) => {
    return instance.put(`/api/orders/${orderId}/restore`);
};

export const deleteSoftOrders = (data) => {
    return instance.post(`/api/orders/deletesoftorders`, data);
};

export const revenuesOrdersByDay = () => {
    return instance.get(`/api/orders/statisticsRevenuesOrdersByDay`);
};

export const quantityOrdersByDay = () => {
    return instance.get(`/api/orders/statisticsQuantityOrdersByDay`);
};

export const totalPaymentSuccessOrder = () => {
    return instance.get(`/api/orders/totalPaymentSuccessOrder`);
};

export const countOrder = () => {
    return instance.get(`/api/orders/countOrder`);
};

export const statisticsBestSeller = (query) => {
    return instance.get(`/api/orders/statisticsBestSeller${query}`);
};

export const apiCheckRating = (data) => {
    return instance.post(`/api/orders/checkratingorderstatus`, data);
}