import axios from "axios";

export const getProvinces = () => {
  return axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
};

export const getDistrictsByProvinceId = (provinceId) => {
  return axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
};

export const getCommunesByDistrictId = (districtId) => {
  return axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
};

export const getFullAddressById = (id) => {
  return axios.get(`https://esgoo.net/api-tinhthanh/5/${id}.htm`);
};
