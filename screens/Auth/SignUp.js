import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Auth/Input";
import Btn from "../../components/Auth/Btn";
import utils from "../../utils";
import api from "../../api";
import LoadingPage from "../../components/LoadingPage";

const { width, height } = Dimensions.get("screen");

const View = styled.View`
    alignItems: center;
    justifyContent: center;
    height: ${height*8/10}px;
`;

export default () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if(email === "" || password === "" || passwordConfirm === ""){
            alert('"이메일", "비밀번호", "비밀번호 확인"을 모두 입력해주세요.');
        } else if(!utils.isEmail(email)){
            alert("올바른 이메일을 입력해주세요.");
        } else if(password !== passwordConfirm){
            alert('비밀번호를 다시 확인해주세요.');
        } else{
            const form = {username: email, password: password};
            try{
                setIsLoading(true);
                await api.createAccount(form);
                setIsLoading(false);
                alert("가입하신 이메일로 인증메일을 보냈습니다. 이메일 인증을 완료한 후 로그인해 주세요.");
                navigation.navigate("LogIn");
            } catch(e){
                console.warn(e);
                setIsLoading(false);
                alert("이미 가입이 되어있는 이메일입니다.");
            }
        }
    };
    return isLoading ? (
        <LoadingPage />
    ) : (
        <View>
        <Input 
            value={email} 
            placeholder="이메일" 
            keyboardType="email-address" 
            stateFn = {setEmail}
        />
        <Input 
            value={password} 
            placeholder="비밀번호" 
            stateFn = {setPassword}
            isPassword={true}
        />
        <Input 
            value={passwordConfirm} 
            placeholder="비밀번호 확인" 
            stateFn = {setPasswordConfirm}
            isPassword={true}
        />
        <Btn text={"회원가입"} onPress={handleSubmit} />
        <Text>해당 이메일로 인증메일을 보내드립니다.</Text>
        <Text>인증메일의 링크를 클릭하시면</Text>
        <Text>가입이 완료되고 로그인이 가능합니다.</Text>
        </View>
    );
};