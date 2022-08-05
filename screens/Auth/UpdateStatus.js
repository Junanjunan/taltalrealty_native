import React, { useState } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Input from "../../components/Auth/Input";
import Btn from "../../components/Auth/Btn";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api";
import { doSetNavBook, doSetNavProfile } from "../../redux/navigationSlice";

const { width, height } = Dimensions.get("screen");

const Container = styled.View`
    height: ${height*3/5}px;
    alignItems: center;
    justifyContent: center;
`;

const UpdateStatus = (props) => {
    const [office, setOffice] = useState("");
    const [tel, setTel] = useState("");

    async function sendingData(){
        const form = {
            office: office,
            tel: tel
        };


    AsyncStorage.getItem("csrftoken").then(value=>{
        return api.updateStatus(props.id, form, value);
    }).then(data => {
        alert("회원정보가 변경되었습니다.");
        props.navigation.navigate("Book");
        props.doSetNavBook();
    }).catch(e => {
        alert("알수 없는 오류가 발생");
        console.log(e);
    });
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
        doSetNavBook: () => dispatch(doSetNavBook()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStatus);