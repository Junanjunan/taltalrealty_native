import React from "react";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/usersSlice";


const Text = styled.Text``;

const LogoutBtn = styled.TouchableOpacity`
    width: 200px;
    height: 200px;
    backgroundColor: red;
`;

const LogoutBtnText = styled.Text``;

export default () => {
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(userLogout());
    }
    return (
        <>
        <Text>Profile</Text>
        <LogoutBtn
            onPress={handleSubmit}
        ><LogoutBtnText>로그아웃</LogoutBtnText></LogoutBtn>
        </>
    );
}

