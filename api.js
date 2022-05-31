import axios from "axios";

const callApi = async(method, path, data, jwt, params) => {
    const headers = {
        Authorization: jwt,
        "Content-Type": "application/json"
    };
    const baseUrl = "https://eb8f-121-130-149-138.jp.ngrok.io/api/v1";
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
    villas: token => callApi("get", "/books-villa-dealing/", null, token),
    contracts: token => callApi("get", "/contracts/", null, token),
    test: () => callApi("get", "/me/"),
    test2: () => callApi("get", "/test/"),
}