import axios from "axios";

const callApi = async(method, path, data, jwt, params) => {
    const headers = {
        Authorization: jwt,
        "Content-Type": "application/json"
    };
    const baseUrl = "https://5047-175-193-99-118.jp.ngrok.io/api/v1";
    // const baseUrl = "http:127.0.0.1:8000/api/v1";
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
    books: token => callApi("get", '/books-apartment-dealing/', null, token),
    test: () => callApi("get", "/me/"),
    test2: () => callApi("get", "/test/"),
    test3: () => callApi("get", "/books-apartment-dealing/")
}