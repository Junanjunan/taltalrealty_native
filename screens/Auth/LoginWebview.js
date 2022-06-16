import React, { useState } from "react";
import { View, Text} from "react-native";
import styled from "styled-components/native";
import { WebView } from 'react-native-webview';
import axios from "axios";
import Modal from "react-native-modal";
import { userSocialLogin } from "../../redux/usersSlice";
import { useDispatch } from "react-redux";


const TestBtn = styled.TouchableOpacity`
    backgroundColor: red;
    height: 50px;
`;

const selectProgrammingLanguage = () => {
    const languages = [
      "Rust",
      "Python",
      "JavaScript",
      "TypeScript",
      "C++",
      "Go",
      "R",
      "Java",
      "PHP",
      "Kotlin",
    ];
    const randomInt = Math.floor(Math.random() * languages.length);
    return languages[randomInt];
  };

// const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

const runFirst = `
        // setTimeout(function() { 
        //     window.alert("Click me!~!");
        //     document.getElementById("h1_element").innerHTML = 
        //     "What is your favourite language?";
        //     document.getElementById("h2_element").innerHTML =
        //     "We will see!";
        //     window.ReactNativeWebView.postMessage("하이하이하이");
        //     }, 1000);
        // const sampleButton = document.getElementById("sampleButton");
        // var ex = true;
        // function cli(){
        //     console.log("버튼클릭");
        //     window.ReactNativeWebView.postMessage(ex);
        //     ex = !ex;
        // };
        // sampleButton.addEventListener("click", cli);

        
        // setTimeout(function(){
        //     const pre = document.getElementsByTagName("pre")[0].innerHTML;
        //     window.ReactNativeWebView.postMessage(pre);
        // }, 1000);
        // const find = document.getElementsByClassName("kakao-letter")[0].innerHTML;
        // window.ReactNativeWebView.postMessage(find);

        // var oReq = new XMLHttpRequest();
        // oReq.open("GET", window.location.href)
        // oReq.send();

        // oReq.onreadystatechange = e => {
        //     window.ReactNativeWebView.postMessage(oReq.getAllResponseHeaders());
        // };

        
        fetch(window.location.href)
        .then(response => response.text())
        .then(response => window.ReactNativeWebView.postMessage(response))
        .catch(error => window.ReactNativeWebView.postMessage("??"));

        // fetch(window.location.href)
        // .then(response => document.getElementsByTagName("body")[0].innerHTML=response)
        // .catch(error => window.ReactNativeWebView.postMessage("??"));


        true;
    `;

const runBeforeFirst = `
    window.isNativeApp = true;
    true;
`;

const KakaoLogin = ({ navigation }) => {

    function LogInProgress(data) {
        // access code는 url에 붙어 장황하게 날아온다.
        // substringd으로 url에서 code=뒤를 substring하면 된다.
        const exp = "code=";

        var condition = data.indexOf(exp);

        if (condition != -1) {
            var request_code = data.substring(condition + exp.length);
            // console.log("access code :: " + request_code);
            // 토큰값 받기
            requestToken(request_code);
        }
    };

    const requestToken = async (request_code) => {
        var returnValue = "none";
        var request_token_url = "https://kauth.kakao.com/oauth/token";
        axios({
            method: "post",
            url: request_token_url,
            params: {
                grant_type: 'authorization_code',
                client_id: 'ic',
                redirect_uri: 'url',
                code: request_code,
            },
        }).then(function (response) {
            returnValue = response.data.access_token;
        }).catch(function (error) {
            console.log('error', error);
        });
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [sample, setSample] = useState("sample");
    const [email, setEmail] = useState("email");
    const dispatch = useDispatch();
    return (
        <>
        <Modal 
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            // style={{
            //     flex:1
            // }}
        >
        <View style={{ flex: 1 }}>
            <WebView
                originWhitelist={['*']}
                scalesPageToFit={false}
                style={{ marginTop: 30 }}
                // source={{ uri: 'https://adc4-175-193-30-213.jp.ngrok.io/users/login/' }}
                // source={{ uri: 'https://052f-112-187-140-235.jp.ngrok.io/users/webview-sample/' }}
                source={{ uri: 'https://24a5-175-193-30-213.jp.ngrok.io/users/login/' }}
                injectedJavaScript={runFirst}
                injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
                javaScriptEnabled={true}
                // onMessage={(event) => { LogInProgress(event.nativeEvent["url"]); }}
                onMessage={(event) => {
                    // var dataString = event.nativeEvent.data;
                    // dataString = JSON.parse(dataString);
                    // console.log(dataString);
                    // console.log(dataString.token);
                    // console.log(dataString.user_id);
                    // dispatch(userSocialLogin({
                        // username: dataString.email
                    // }))

                    // setModalVisible(!event.nativeEvent.data);
                    console.log(event.nativeEvent.data);
                }}
            // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
            />
        </View>
        </Modal>
        <View>
            <TestBtn
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text>와우와우</Text>
                <Text>{sample}</Text>
            </TestBtn>
        </View>
        </>

    );
};

export default KakaoLogin;