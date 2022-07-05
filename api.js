import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import HomeUrl from "./components/HomeUrl";


const callApi = async(method, path, data, jwt, params, csrftoken) => {

    // const baseUrl = "http://taltalrealty31-dev.ap-northeast-2.elasticbeanstalk.com/api/v1";
    // const baseUrl = "https://8821-121-130-89-131.jp.ngrok.io/api/v1";
    const baseUrl = HomeUrl + "/api/v1";
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
    createAccount: form => callApi("post", "/users/signup/", form),
    login: (form, csrftoken) => callApi("post", "/users/login/", form, null, null, csrftoken),
    socialLogin: (id) => callApi("get", `/userToken/${id}/`),
    socialLogout: () => callApi("get", `/users/social-logout/`),
    profile: id => callApi("get", `/profile/${id}/`),
    passwordChanging: (id, form, csrftoken) => callApi("post", `/profile/${id}/`, form, null, null, csrftoken),
    withdraw: (id, csrftoken) => callApi("delete", `/profile/${id}/`, null, null, null, csrftoken),
    books: token => callApi("get", "/books-apartment-dealing/", null, token),
    booksDetail: (id, token) => callApi("get", `/books-apartment-dealing/${id}/`, null, token),
    
    villaDealingTable: token => callApi("get", "/books-villa-dealing/", null, token),
    villaDealingCreating: (form, csrftoken) => callApi("post", "/books-villa-dealing/", form, null, null, csrftoken),
    villaDealingUpdating: (id, form, csrftoken) => callApi("put", `/books-villa-dealing-updating/${id}/`, form, null, null, csrftoken),
    villaDealingDeleting: (id, csrftoken) => callApi("delete", `/books-villa-dealing-deleting/${id}/`, null, null, null, csrftoken),
    villaDealingSearching: (form, token) => callApi("get", "/books-villa-dealing-searching/", null, token, form),

    apartmentDealingTable: token => callApi("get", "/books-apartment-dealing/", null, token),
    apartmentDealingCreating: (form, csrftoken) => callApi("post", "/books-apartment-dealing/", form, null, null, csrftoken),
    apartmentDealingUpdating: (id, form, csrftoken) => callApi("put", `/books-apartment-dealing-updating/${id}/`, form, null, null, csrftoken),
    apartmentDealingDeleting: (id, csrftoken) => callApi("delete", `/books-apartment-dealing-deleting/${id}/`, null, null, null, csrftoken),
    apartmentDealingSearching: (form, token) => callApi("get", "/books-apartment-dealing-searching/", null, token, form),
    
    officetelDealingTable: token => callApi("get", "/books-officetel-dealing/", null, token),
    officetelDealingCreating: (form, csrftoken) => callApi("post", "/books-officetel-dealing/", form, null, null, csrftoken),
    officetelDealingUpdating: (id, form, csrftoken) => callApi("put", `/books-officetel-dealing-updating/${id}/`, form, null, null, csrftoken),
    officetelDealingDeleting: (id, csrftoken) => callApi("delete", `/books-officetel-dealing-deleting/${id}/`, null, null, null, csrftoken),
    officetelDealingSearching: (form, token) => callApi("get", "/books-officetel-dealing-searching/", null, token, form),

    storeDealingTable: token => callApi("get", "/books-store-dealing/", null, token),
    storeDealingCreating: (form, csrftoken) => callApi("post", "/books-store-dealing/", form, null, null, csrftoken),
    storeDealingUpdating: (id, form, csrftoken) => callApi("put", `/books-store-dealing-updating/${id}/`, form, null, null, csrftoken),
    storeDealingDeleting: (id, csrftoken) => callApi("delete", `/books-store-dealing-deleting/${id}/`, null, null, null, csrftoken),
    storeDealingSearching: (form, token) => callApi("get", "/books-store-dealing-searching/", null, token, form),

    buildingDealingTable: token => callApi("get", "/books-building-dealing/", null, token),
    buildingDealingCreating: (form, csrftoken) => callApi("post", "/books-building-dealing/", form, null, null, csrftoken),
    buildingDealingUpdating: (id, form, csrftoken) => callApi("put", `/books-building-dealing-updating/${id}/`, form, null, null, csrftoken),
    buildingDealingDeleting: (id, csrftoken) => callApi("delete", `/books-building-dealing-deleting/${id}/`, null, null, null, csrftoken),
    buildingDealingSearching: (form, token) => callApi("get", "/books-building-dealing-searching/", null, token, form),

    villaLeaseTable: token => callApi("get", "/books-villa-lease/", null, token),
    villaLeaseCreating: (form, csrftoken) => callApi("post", "/books-villa-lease/", form, null, null, csrftoken),
    villaLeaseUpdating: (id, form, csrftoken) => callApi("put", `/books-villa-lease-updating/${id}/`, form, null, null, csrftoken),
    villaLeaseDeleting: (id, csrftoken) => callApi("delete", `/books-villa-lease-deleting/${id}/`, null, null, null, csrftoken),
    villaLeaseSearching: (form, token) => callApi("get", "/books-villa-lease-searching/", null, token, form),
    
    apartmentLeaseTable: token => callApi("get", "/books-apartment-lease/", null, token),
    apartmentLeaseCreating: (form, csrftoken) => callApi("post", "/books-apartment-lease/", form, null, null, csrftoken),
    apartmentLeaseUpdating: (id, form, csrftoken) => callApi("put", `/books-apartment-lease-updating/${id}/`, form, null, null, csrftoken),
    apartmentLeaseDeleting: (id, csrftoken) => callApi("delete", `/books-apartment-lease-deleting/${id}/`, null, null, null, csrftoken),
    apartmentLeaseSearching: (form, token) => callApi("get", "/books-apartment-lease-searching/", null, token, form),
    
    officetelLeaseTable: token => callApi("get", "/books-officetel-lease/", null, token),
    officetelLeaseCreating: (form, csrftoken) => callApi("post", "/books-officetel-lease/", form, null, null, csrftoken),
    officetelLeaseUpdating: (id, form, csrftoken) => callApi("put", `/books-officetel-lease-updating/${id}/`, form, null, null, csrftoken),
    officetelLeaseDeleting: (id, csrftoken) => callApi("delete", `/books-officetel-lease-deleting/${id}/`, null, null, null, csrftoken),
    officetelLeaseSearching: (form, token) => callApi("get", "/books-officetel-lease-searching/", null, token, form),
    
    storeLeaseTable: token => callApi("get", "/books-store-lease/", null, token),
    storeLeaseCreating: (form, csrftoken) => callApi("post", "/books-store-lease/", form, null, null, csrftoken),
    storeLeaseUpdating: (id, form, csrftoken) => callApi("put", `/books-store-lease-updating/${id}/`, form, null, null, csrftoken),
    storeLeaseDeleting: (id, csrftoken) => callApi("delete", `/books-store-lease-deleting/${id}/`, null, null, null, csrftoken),
    storeLeaseSearching: (form, token) => callApi("get", "/books-store-lease-searching/", null, token, form),

    customerApartmentDealingTable: token => callApi("get", "/customer-apartment-dealing/", null, token),
    customerApartmentDealingCreating: (form, csrftoken) => callApi("post", "/customer-apartment-dealing/", form, null, null, csrftoken),
    customerApartmentDealingUpdating: (id, form, csrftoken) => callApi("put", `/customer-apartment-dealing-updating/${id}/`, form, null, null, csrftoken),
    customerApartmentDealingDeleting: (id, csrftoken) => callApi("delete", `/customer-apartment-dealing-deleting/${id}/`, null, null, null, csrftoken),
    customerApartmentDealingSearching: (form, token) => callApi("get", "/customer-apartment-dealing-searching/", null, token, form),

    customerBuildingDealingTable: token => callApi("get", "/customer-building-dealing/", null, token),
    customerBuildingDealingCreating: (form, csrftoken) => callApi("post", "/customer-building-dealing/", form, null, null, csrftoken),
    customerBuildingDealingUpdating: (id, form, csrftoken) => callApi("put", `/customer-building-dealing-updating/${id}/`, form, null, null, csrftoken),
    customerBuildingDealingDeleting: (id, csrftoken) => callApi("delete", `/customer-building-dealing-deleting/${id}/`, null, null, null, csrftoken),
    customerBuildingDealingSearching: (form, token) => callApi("get", "/customer-building-dealing-searching/", null, token, form),

    customerVillaDealingTable: token => callApi("get", "/customer-villa-dealing/", null, token),
    customerVillaDealingCreating: (form, csrftoken) => callApi("post", "/customer-villa-dealing/", form, null, null, csrftoken),
    customerVillaDealingUpdating: (id, form, csrftoken) => callApi("put", `/customer-villa-dealing-updating/${id}/`, form, null, null, csrftoken),
    customerVillaDealingDeleting: (id, csrftoken) => callApi("delete", `/customer-villa-dealing-deleting/${id}/`, null, null, null, csrftoken),
    customerVillaDealingSearching: (form, token) => callApi("get", "/customer-villa-dealing-searching/", null, token, form),

    customerOfficetelDealingTable: token => callApi("get", "/customer-officetel-dealing/", null, token),
    customerOfficetelDealingCreating: (form, csrftoken) => callApi("post", "/customer-officetel-dealing/", form, null, null, csrftoken),
    customerOfficetelDealingUpdating: (id, form, csrftoken) => callApi("put", `/customer-officetel-dealing-updating/${id}/`, form, null, null, csrftoken),
    customerOfficetelDealingDeleting: (id, csrftoken) => callApi("delete", `/customer-officetel-dealing-deleting/${id}/`, null, null, null, csrftoken),
    customerOfficetelDealingSearching: (form, token) => callApi("get", "/customer-officetel-dealing-searching/", null, token, form),

    customerStoreDealingTable: token => callApi("get", "/customer-store-dealing/", null, token),
    customerStoreDealingCreating: (form, csrftoken) => callApi("post", "/customer-store-dealing/", form, null, null, csrftoken),
    customerStoreDealingUpdating: (id, form, csrftoken) => callApi("put", `/customer-store-dealing-updating/${id}/`, form, null, null, csrftoken),
    customerStoreDealingDeleting: (id, csrftoken) => callApi("delete", `/customer-store-dealing-deleting/${id}/`, null, null, null, csrftoken),
    customerStoreDealingSearching: (form, token) => callApi("get", "/customer-store-dealing-searching/", null, token, form),

    customerApartmentLeaseTable: token => callApi("get", "/customer-apartment-lease/", null, token),
    customerApartmentLeaseCreating: (form, csrftoken) => callApi("post", "/customer-apartment-lease/", form, null, null, csrftoken),
    customerApartmentLeaseUpdating: (id, form, csrftoken) => callApi("put", `/customer-apartment-lease-updating/${id}/`, form, null, null, csrftoken),
    customerApartmentLeaseDeleting: (id, csrftoken) => callApi("delete", `/customer-apartment-lease-deleting/${id}/`, null, null, null, csrftoken),
    customerApartmentLeaseSearching: (form, token) => callApi("get", "/customer-apartment-lease-searching/", null, token, form),

    customerVillaLeaseTable: token => callApi("get", "/customer-villa-lease/", null, token),
    customerVillaLeaseCreating: (form, csrftoken) => callApi("post", "/customer-villa-lease/", form, null, null, csrftoken),
    customerVillaLeaseUpdating: (id, form, csrftoken) => callApi("put", `/customer-villa-lease-updating/${id}/`, form, null, null, csrftoken),
    customerVillaLeaseDeleting: (id, csrftoken) => callApi("delete", `/customer-villa-lease-deleting/${id}/`, null, null, null, csrftoken),
    customerVillaLeaseSearching: (form, token) => callApi("get", "/customer-villa-lease-searching/", null, token, form),

    customerOfficetelLeaseTable: token => callApi("get", "/customer-officetel-lease/", null, token),
    customerOfficetelLeaseCreating: (form, csrftoken) => callApi("post", "/customer-officetel-lease/", form, null, null, csrftoken),
    customerOfficetelLeaseUpdating: (id, form, csrftoken) => callApi("put", `/customer-officetel-lease-updating/${id}/`, form, null, null, csrftoken),
    customerOfficetelLeaseDeleting: (id, csrftoken) => callApi("delete", `/customer-officetel-lease-deleting/${id}/`, null, null, null, csrftoken),
    customerOfficetelLeaseSearching: (form, token) => callApi("get", "/customer-officetel-lease-searching/", null, token, form),

    customerStoreLeaseTable: token => callApi("get", "/customer-store-lease/", null, token),
    customerStoreLeaseCreating: (form, csrftoken) => callApi("post", "/customer-store-lease/", form, null, null, csrftoken),
    customerStoreLeaseUpdating: (id, form, csrftoken) => callApi("put", `/customer-store-lease-updating/${id}/`, form, null, null, csrftoken),
    customerStoreLeaseDeleting: (id, csrftoken) => callApi("delete", `/customer-store-lease-deleting/${id}/`, null, null, null, csrftoken),
    customerStoreLeaseSearching: (form, token) => callApi("get", "/customer-store-lease-searching/", null, token, form),


    contractTable: token => callApi("get", "/contracts/", null, token),
    contractSearching: (form, token) => callApi("get", "/contracts/searching/", null, token, form),
    contractCreating: (form, csrftoken) => callApi("post", "/contracts/", form, null, null, csrftoken),
    contractUpdating: (id, form, csrftoken) => callApi("put", `/contract-updating/${id}/`, form, null, null, csrftoken),
    contractDeleting: (id, csrftoken) => callApi("delete", `/contract-deleting/${id}/`, null, null, null, csrftoken),
    
    managementTable: token => callApi("get", "/managements/", null, token),
    managementSearching: (form, token) => callApi("get", "/managements/searching/", null, token, form),
    managementCreating: (form, csrftoken) => callApi("post", "/managements/", form, null, null, csrftoken),
    managementUpdating: (id, form, csrftoken) => callApi("put", `/management-updating/${id}/`, form, null, null, csrftoken),
    managementDeleting: (id, csrftoken) => callApi("delete", `/management-deleting/${id}/`, null, null, null, csrftoken),
    test: () => callApi("get", "/me/"),
    test2: () => callApi("get", "/test/"),
};