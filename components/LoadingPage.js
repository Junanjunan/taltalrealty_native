import React from "react";
import { useState } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("screen");

const Container = styled.View`
    position: absolute;
    height: ${height}px;
    width: ${width}px;
    paddingBottom: ${height*1/6}px;
    alignItems:center;
    justifyContent: center;
    backgroundColor: rgba(150,150,150,1);
    zIndex: 1;
`;

const Text = styled.Text`
    fontSize: 20px;
`;

const LoadingPage = () => {
    return (
        <Container>
            <Text>회원가입 인증메일을 보내는 중입니다.</Text>
            <Text>잠시만 기다려주세요.</Text>
        </Container>
    );
};

export default LoadingPage;