import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { BlurView } from 'expo-blur';
import Btn from "../../components/Auth/Btn";


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
            </BtnContainer>
        </BlurView>
        <Image source={require("../../assets/loginBg.jpg")} />
        <StatusBar barStyle="light-content" />
    </Container>
    );
    };