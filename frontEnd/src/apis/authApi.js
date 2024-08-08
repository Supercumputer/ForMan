import instance from "./axiosConfig";

export const loginUser = (data) => {
    return instance.post("/api/auth/login", data);
};

export const registerUser = (data) => {
    return instance.post("/api/auth/register", data);
};

export const fetchAccountDetails = () => {
    return instance.get("/api/auth/account");
};

export const refreshAuthToken = () => {
    return instance.get("/api/auth/refreshtoken");
};

export const logoutUser = () => {
    return instance.get("/api/auth/logout");
};