import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';



const callApi = async(method, path, data, jwt, params, csrftoken) => {

    // const baseUrl = "http://taltalrealty31-dev.ap-northeast-2.elasticbeanstalk.com/api/v1";
    const baseUrl = "https://cb3b-112-187-140-235.jp.ngrok.io/api/v1";
    const fullUrl = `${baseUrl}${path}`;
    const headers = {
        Authorization: jwt,
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken
    };
    
    if(method === "get" || method === "delete"){
        return axios[method](fullUrl, {headers, params})
    } else{
        return axios[method](fullUrl, data, {headers});
    }
};


export default{
    createAccount: form => callApi("post", "/users/", form),
    login: (form, csrftoken) => callApi("post", "/users/login/", form, null, null, csrftoken),
    socialLogin: (id) => callApi("get", `/userToken/${id}/`),
    socialLogout: () => callApi("get", `/users/social-logout/`),
    books: token => callApi("get", "/books-apartment-dealing/", null, token),
    booksDetail: (id, token) => callApi("get", `/books-apartment-dealing/${id}/`, null, token),
    villaDealingTable: token => callApi("get", "/books-villa-dealing/", null, token),
    villaDealingCreating: (form) => callApi("post", "/books-villa-dealing/", form),
    villaDealingUpdating: (id, form) => callApi("put", `/books-villa-dealing-updating/${id}/`, form),
    villaDealingDeleting: (id) => callApi("delete", `/books-villa-dealing-deleting/${id}/`),
    villaDealingSearching: (form, token) => callApi("get", "/books-villa-dealing-searching/", null, token, form),
    contractTable: token => callApi("get", "/contracts/", null, token),
    contractCreating: (form, csrftoken) => callApi("post", "/contracts/", form, null, null, csrftoken),
    contractUpdating: (id, form, csrftoken) => callApi("put", `/contract-updating/${id}/`, form, null, null, csrftoken),
    contractDeleting: (id, csrftoken) => callApi("delete", `/contract-deleting/${id}/`, null, null, null, csrftoken),
    managementTable: token => callApi("get", "/managements/", null, token),
    managementCreating: (form, csrftoken) => callApi("post", "/managements/", form, null, null, csrftoken),
    managementUpdating: (id, form, csrftoken) => callApi("put", `/management-updating/${id}/`, form, null, null, csrftoken),
    managementDeleting: (id, csrftoken) => callApi("delete", `/management-deleting/${id}/`, null, null, null, csrftoken),
    test: () => callApi("get", "/me/"),
    test2: () => callApi("get", "/test/"),
};