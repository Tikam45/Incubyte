export const BASE_URL = "http://localhost:3000/api";

export const endpoints = {
    SIGNUP_API: BASE_URL + "/auth/register",
    LOGIN_API: BASE_URL + "/auth/login",

    ADD_SWEET_API: BASE_URL + "/sweets/add",
    GET_SWEETS_API: BASE_URL + "/sweets/search",
    PURCHASE_SWEET_API: BASE_URL + "/sweets/:id/purchase",
    RESTOCK_SWEET_API: BASE_URL + "/restock",
}