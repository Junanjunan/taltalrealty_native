import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { BlurView } from 'expo-blur';
import Btn from "../../components/Auth/Btn";
import * as WebBrowser from 'expo-web-browser';



const LOGO_URL = "http://logok.org/wp-content/uploads/2014/07/airbnb-logo-belo-219x286.png";

const Container = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
    height: 100%;
`;

const Image = styled.Image`
    position: absolute;
    z-index:-1;
    top: 0;
    width: 100%;
    height: 100%;
`;

const Logo = styled.Image` 
    width: 100px;           
    height: 100px;
`;

const BtnContainer = styled.View``;

export default ({ navigation }) => {
    const goToSignUp = () => navigation.navigate("SignUp");
    const goToLogIn = () => navigation.navigate("LogIn");
    // const _handlePressButtonAsync = async () => {
    //     let result = await WebBrowser.openBrowserAsync('https://6113-175-193-30-213.jp.ngrok.io/users/login/');
    //     setResult(result);
    // };
    return(
    <Container>
        <BlurView
            intensity={20}
            tint="light"
            style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
            }}>
            {/* <Logo source={{uri:LOGO_URL}} /> */}
            <BtnContainer>
                <Btn onPress={goToSignUp} text={"Sign Up"} accent={true} />
                <Btn onPress={goToLogIn} text={"Log In"} />
                {/* <Btn onPress={_handlePressButtonAsync} text={"카카오"} /> */}
                <Btn onPress={() => navigation.navigate("KakaoLogin")} text={"카카오"} />
            </BtnContainer>
        </BlurView>
        <Image source={require("../../assets/loginBg.jpg")} />
        <StatusBar barStyle="light-content" />
    </Container>
    );
    };