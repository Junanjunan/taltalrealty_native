import React from "react";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/usersSlice";
import api from "../../api";

const Text = styled.Text``;

const LogoutBtn = styled.TouchableOpacity`
    width: 200px;
    height: 200px;
    backgroundColor: red;
`;

const LogoutBtnText = styled.Text``;

const Profile = () => {
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(userLogout());
    }
    async function logOut(){
        await api.socialLogout();
        handleSubmit();          
    };
    return (
        <>
        <Text>Profile</Text>
        <LogoutBtn
            onPress={logOut}
        ><LogoutBtnText>로그아웃</LogoutBtnText></LogoutBtn>
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

export default Profile;

