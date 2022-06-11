import axios from "axios";

const callApi = async(method, path, data, jwt, params) => {
    const headers = {
        Authorization: jwt,
        "Content-Type": "application/json"
    };
    const baseUrl = "https://f719-112-187-140-235.jp.ngrok.io/api/v1";
    const fullUrl = `${baseUrl}${path}`;
    if(method === "get" || method === "delete"){
        return axios[method](fullUrl, {headers, params})
    } else{
        return axios[method](fullUrl, data, {headers});
    }
};

export default{
    createAccount: form => callApi("post", "/users/", form),
    login: form => callApi("post", "/users/login/", form),
    books: token => callApi("get", "/books-apartment-dealing/", null, token),
    booksDetail: (id, token) => callApi("get", `/books-apartment-dealing/${id}/`, null, token),
    villaDealingTable: token => callApi("get", "/books-villa-dealing/", null, token),
    villaDealingCreating: (form) => callApi("post", "/books-villa-dealing/", form),
    villaDealingUpdating: (id, form) => callApi("put", `/books-villa-dealing-updating/${id}/`, form),
    villaDealingDeleting: (id) => callApi("delete", `/books-villa-dealing-deleting/${id}/`),
    villaDealingSearching: (form, token) => callApi("get", "/books-villa-dealing-searching/", null, token, form),
    contractTable: token => callApi("get", "/contracts/", null, token),
    contractCreating: form => callApi("post", "/contracts/", form),
    contractUpdating: (id, form) => callApi("put", `/contract-updating/${id}/`, form),
    contractDeleting: id => callApi("delete", `/contract-deleting/${id}/`),
    managementTable: token => callApi("get", "/managements/", null, token),
    managementCreating: form => callApi("post", "/managements/", form),
    managementUpdating: (id, form) => callApi("put", `/management-updating/${id}/`, form),
    managementDeleting: id => callApi("delete", `/management-deleting/${id}/`),
    test: () => callApi("get", "/me/"),
    test2: () => callApi("get", "/test/"),
}