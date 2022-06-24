import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect, useDispatch } from "react-redux";
import { userLogout } from "../../redux/usersSlice";
import api from "../../api";



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
`;

const LogoutBtn = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    backgroundColor: rgba(0, 0, 0, 0.2);
    alignItems: center;
    justifyContent: center;
`;

const LogoutBtnText = styled.Text``;

const Profile = (props) => {
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(userLogout());
    }
    async function logOut(){
        await api.socialLogout();
        handleSubmit();
    };

    var profileData

    // async function getProfile(id){
    //     profileData = await api.Profile(id);
    //     return profileData;
    // }


    function getProfile(id){
        profileData = api.Profile(id);
        return profileData;
    }

    const [login_method, set_login_method] = useState("");
    const [username, set_username] = useState("");
    const [first_name, set_first_name] = useState("");

    getProfile(props.id)
    .then(
        results => {
            set_login_method(results.data.login_method);
            set_username(results.data.username);
            set_first_name(results.data.first_name);
        }
    );
    

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
}

export default connect(mapStateToProps)(Profile);

