import React, { useState } from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect, useDispatch } from "react-redux";
import { userLogout } from "../../redux/usersSlice";
import { Alert, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api";
import { doSetNavProfile } from "../../redux/navigationSlice";


const { width, height } = Dimensions.get("screen");

const Container = styled.View`
    padding: 10px;
    paddingLeft: 20px;
    paddingRight: 20px;
`;

const Div = styled.View`
    marginBottom: 20px;
`;

const LogoAndText = styled.View`
    flexDirection: row;
    alignItems: center;
`;

const LoginLogo = styled.Image`
    margin: 5px;
    width: 25px;
    height: 25px;
`;

const TitleText = styled.Text`
    fontSize: 15px;
    color: gray;
`;

const ContentText = styled.Text`
    margin: 5px;
    fontSize: 20px;
`;

const LogoutContainer = styled.View`
    alignItems: center;
    marginBottom: 20px;
`;

const LogoutBtn = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    backgroundColor: rgba(0, 0, 0, 0.1);
    alignItems: center;
    justifyContent: center;
`;

const DoubleContainer = styled.View`
    flexDirection: row;
    alignItems: center;
    justifyContent: center;
    marginBottom: 20px;
`;

const PasswordChangeBtn = styled.TouchableOpacity`
    width: 47%;
    height: 50px;
    backgroundColor: rgba(0, 0, 0, 0.2);
    alignItems: center;
    justifyContent: center;
    marginRight: ${width*1/20}px;
`;

const WithdrawBtn = styled.TouchableOpacity`
    width: 47%;
    height: 50px;
    backgroundColor: rgba(0, 0, 0, 0.2);
    alignItems: center;
    justifyContent: center;
`;

const LogoutBtnText = styled.Text``;

const Profile = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [login_method, set_login_method] = useState("");
    const [username, set_username] = useState("");
    const [first_name, set_first_name] = useState("");

    const handleSubmit = () => {
        dispatch(userLogout());
    }
    async function logOut(){
        await api.socialLogout();
        handleSubmit();
    };

    var profileData

    function getProfile(id){
        profileData = api.profile(id);
        return profileData;
    };

    getProfile(props.id)
    .then(
        results => {
            set_login_method(results.data.login_method);
            set_username(results.data.username);
            set_first_name(results.data.first_name);
        }
    );

    function Withdraw(){
        Alert.alert(
            "회원탈퇴",
            "정말 탈퇴하시겠습니까?\n탈퇴시 저장한 모든 자료들이 사라집니다.",
            [
                {
                    text:"아니요",
                    style: "cancel"
                },
                {
                    text:"네",
                    onPress: () => AsyncStorage.getItem("csrftoken").then(value=>{
                        return api.withdraw(props.id, value);
                    }).then(data => {
                        alert("회원탈퇴가 완료되었습니다.");
                        logOut();
                    }).catch(e => {
                        alert("알수 없는 오류가 발생");
                        console.warn(e);
                    })
                }
            ]
        )
    };

    return (
        <>
        <Container>
        <Div>
            <TitleText>로그인 수단</TitleText>
            <LogoAndText>
                {
                    login_method === "email" ?
                    <MaterialCommunityIcons 
                        name="email-outline"
                        size={25}
                        style={{
                            color:"black",
                            margin: 5
                        }}
                    /> : (
                        login_method === "kakao" ?
                        <LoginLogo source={require("../../assets/kakao_login.png")} /> :
                        (
                            login_method === "naver" ?
                            <LoginLogo source={require("../../assets/naver_login.png")} /> :
                            <LoginLogo source={require("../../assets/github_login.png")} />
                        )
                    )
                }
                <ContentText>{login_method}</ContentText>
            </LogoAndText>
        </Div>
        <Div>
            <TitleText>이메일</TitleText>
            <ContentText>{username}</ContentText>
        </Div>
        <Div>
            <TitleText>이름</TitleText>
            <ContentText>{first_name}</ContentText>
        </Div>
        <LogoutContainer>
            <LogoutBtn onPress={logOut}>
                <LogoutBtnText>로그아웃</LogoutBtnText>
            </LogoutBtn>
        </LogoutContainer>
        <DoubleContainer>
            <PasswordChangeBtn 
            onPress={
                login_method === "email" ?
                () => navigation.navigate("PasswordChanging") :
                () => alert("외부경로로 가입한 경우는 비밀번호 변경이 불가능합니다.")
            }
            >
                <LogoutBtnText>비밀번호 변경</LogoutBtnText>
            </PasswordChangeBtn>
            <WithdrawBtn onPress={Withdraw}>
                <LogoutBtnText>회원탈퇴</LogoutBtnText>
            </WithdrawBtn>
        </DoubleContainer>
        </Container>
        </>
    );
}

// async function profile(){
//     const dispatch = useDispatch();
//     const handleSubmit = () => {
//         dispatch(userLogout());
//     }
//     return (
//         <>
//         <Text>Profile</Text>
//         <LogoutBtn
//             onPress={handleSubmit}
//         ><LogoutBtnText>로그아웃</LogoutBtnText></LogoutBtn>
//         </>
//     );
// }

function mapStateToProps(state){
    return state.usersReducer;
};

function mapDispatchToProps(dispatch){
    return {
        doSetNavProfile: () => dispatch(doSetNavProfile())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

