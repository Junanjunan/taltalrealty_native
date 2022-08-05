import React, { useState } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Input from "../../components/Auth/Input";
import Btn from "../../components/Auth/Btn";
import { connect } from "react-redux";
import { userUpdateStatus } from "../../redux/usersSlice";

const { width, height } = Dimensions.get("screen");

const Container = styled.View`
    height: ${height*3/5}px;
    alignItems: center;
    justifyContent: center;
`;

const UpdateStatus = (props) => {
    const [office, setOffice] = useState(props.office);
    const [tel, setTel] = useState(props.tel);

    async function sendingData(){
        const form = {
            office: office,
            tel: tel
        };

    props.userUpdateStatus(props.id, form).then(
        data => {
            alert("회원정보가 변경되었습니다.");
            props.navigation.navigate("Profile");
        }
    )
    };

    return (
        <Container>
            <Input placeholder="사무실" value={office} stateFn={setOffice} />
            <Input placeholder="연락처" value={tel} stateFn={setTel} />
            <Btn text="회원정보 변경" onPress={sendingData} />
        </Container>
    );
};


function mapStateToProps(state){
    return state.usersReducer;
};

function mapDispatchToProps(dispatch){
    return{
        userUpdateStatus: (id, form) => dispatch(userUpdateStatus(id, form))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStatus);