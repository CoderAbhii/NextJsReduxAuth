import Cookies from "js-cookie";
import { commonRequest } from "./axiosConfig";

const BASE_URL = "http://localhost:5000"

export const loginUser = async (data) => {
    return await commonRequest("POST", `${BASE_URL}/api/v1/auth/login`, data);
}

export const signupUser = async (data) => {
    return await commonRequest("POST", `${BASE_URL}/api/v1/auth/register`, data);
}

export const forgotPassword = async (data) => {
    return await commonRequest("POST", `${BASE_URL}/api/v1/auth/password/forgot`, data);
}

export const resetPassword = async (data, token) => {
    return await commonRequest("PUT", `${BASE_URL}/api/v1/auth/password/reset/${token}`, data);
}

export const getUserInfo = async () => {
    return await commonRequest("GET", `${BASE_URL}/api/v1/auth/myaccount`);
}

export const passwordUpdate = async (data) => {
    return await commonRequest("PUT", `${BASE_URL}/api/v1/auth/password/update`, data);
}

export const updateProfile = async (data) => {
    return await commonRequest("PUT", `${BASE_URL}/api/v1/auth/myaccount/update`, data);
}

export const getAllUsers = async () => {
    return await commonRequest("GET", `${BASE_URL}/api/v1/auth/admin/users`);
}

export const getSingleUser = async (id) => {
    return await commonRequest("GET", `${BASE_URL}/api/v1/auth/admin/user/${id}`);
}

export const updateUser = async (data, id) => {
    return await commonRequest("PUT", `${BASE_URL}/api/v1/auth/admin/account/update/${id}`, data);
}

export const deleteUser = async (id) => {
    return await commonRequest("DELETE", `${BASE_URL}/api/v1/auth/admin/user/delete/${id}`);
}