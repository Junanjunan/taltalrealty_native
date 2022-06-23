import React, { useState } from "react";
import { View, Text} from "react-native";
import styled from "styled-components/native";
import { WebView } from 'react-native-webview';
import axios from "axios";
import Modal from "react-native-modal";
import { userSocialLogin, logIn } from "../../redux/usersSlice";
import { useDispatch } from "react-redux";
import api from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";



const TestBtn = styled.TouchableOpacity`
    backgroundColor: red;
    height: 50px;
`;


const runFirst = `
        const user_pk = document.getElementById("idDiv").innerHTML
        const encoded_jwt = document.getElementById("tokenDiv").innerHTML
        // window.ReactNativeWebView.postMessage(user_pk);
        // alert(window.document.cookie);        
        const cookie = window.document.cookie;
        const obj = {'user_pk': user_pk, 'access_token':encoded_jwt, 'cookie': cookie}
        window.ReactNativeWebView.postMessage(JSON.stringify(obj));
        true;
    `;

const runBeforeFirst = `
    window.isNativeApp = true;
    true;
`;

const KakaoLogin2 = () => {
    return(
        <WebView
            source={{ uri: 'https://5a49-121-130-89-131.jp.ngrok.io/users/login/'}}
        />
    );
}