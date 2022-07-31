import React, { useState } from "react";
import Btn from "../../../components/Auth/Btn";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, CreatingInput, CreatingInputAddress, CreatingInputDes, Div, DivText, CheckboxText, BtnDiv, ScrollView, NormalText } from "../../../components/Detail/Creating";
import todayString from "../../../components/todayString";
import { KeyboardAvoidingView } from "react-native";


const CustomerDealBuildingCreating = (props) => {
    const [guest_phone, setGuest_phone] = useState();
    const [price, setPrice] = useState();
    const [land_m2, setArea_m2] = useState();
    const [elevator, setElevator] = useState(false);
    const [not_finished, setNot_finished] = useState(true);
    const [description, setDescription] = useState();
    const CheckboxStyle = {
        marginBottom: 25, 
        marginTop: 25, 
        marginRight: 50
    };
    
    async function sendingData(){
        if(!guest_phone){
            alert("손님(연락처)은 필수 입력사항입니다");
        } else if(!price){
            alert("매매가는 필수 입력사항입니다.");
        } else if(!land_m2){
            alert("토지면적은 필수 입력사항입니다.");
        } else{
            const form = {
                ...(price && {price}),
                ...(land_m2 && {land_m2}),
                ...(elevator && {elevator}),
                ...(not_finished && {not_finished}),
                ...(!elevator && {elevator:false}),
                ...(!not_finished && {not_finished:false}),
                ...(guest_phone && {guest_phone}),
                ...(description && {description}),
                updated:todayString,
                realtor:props.id
            };
            
            AsyncStorage.getItem("csrftoken").then(value => {
                return api.customerBuildingDealingCreating(form, value);
            }).then(data => {
                alert("빌딩(매매) 손님이 등록되었습니다.");
                props.navigation.navigate("Book");
            }).catch(e => {
                console.warn(e);
            })
        } 
    };

    return(
        <>
        <KeyboardAvoidingView behavior="height">
        <ScrollView>
            <Container>
                <Div>
                    <DivText>손님 (연락처)</DivText>
                    <CreatingInputAddress value={guest_phone} onChangeText={text => setGuest_phone(text)} />
                </Div>
                <Div>
                    <DivText>매매가 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={price} onChangeText={text => setPrice(text)}/>
                </Div>
                <Div>
                    <DivText>토지면적(㎡)</DivText>
                    <CreatingInput keyboardType="numeric" value={land_m2} onChangeText={text => setArea_m2(text)} />
                </Div>
                <Div>
                    <CheckboxText>승강기</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={elevator} onValueChange={(newValue) => setElevator(newValue)}/>
                    <CheckboxText>진행중</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={not_finished} onValueChange={(newValue) => setNot_finished(newValue)}/>
                </Div>
                <Div>
                    <DivText>상세설명</DivText>
                    <CreatingInputDes multiline={true} value={description} onChangeText={text => setDescription(text)} />
                </Div>
                <BtnDiv>
                    <Btn text={"등록하기"} onPress={() => {sendingData();}} />
                </BtnDiv>
            </Container>
        </ScrollView>
        </KeyboardAvoidingView>
        </>
    );
};


function mapStateToProps(state){
    return state.usersReducer;
};

export default connect(mapStateToProps)(CustomerDealBuildingCreating);
