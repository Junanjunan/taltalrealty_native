import React, { useState } from "react";
import Btn from "../../../components/Auth/Btn";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { connect } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, CreatingInput, CreatingInputAddress, Div, DivText, CheckboxText, BtnDiv, ScrollView, NormalText } from "../../../components/Detail/Creating";
import { dropDownButtonStyle, yearList, monthList, dayList } from "../../../components/Detail/YearDropdown";
import todayString from "../../../components/todayString";
import { KeyboardAvoidingView } from "react-native";


const CustomerDealBuildingUpdating = ({id, navigation, route: {params}}) => {
    const [guest_phone, setGuest_phone] = useState(params.guest_phone);
    const [price, setPrice] = useState(params.price ? params.price.toString() : 0);
    const [land_m2, setArea_m2] = useState(params.land_m2 ? params.land_m2.toString() : 0);
    const [elevator, setElevator] = useState(params.elevator);
    const [not_finished, setNot_finished] = useState(params.not_finished);
    const [description, setDescription] = useState(params.description ? params.description.toString() : "");
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
                realtor:id
            };
            
            AsyncStorage.getItem("csrftoken").then(value => {
                return api.customerBuildingDealingUpdating(params.roomId, form, value);
            }).then(data => {
                alert("아파트(매매) 손님이 수정되었습니다.");
                navigation.navigate("Book");
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
                    <CreatingInputAddress  value={description} onChangeText={text => setDescription(text)} />
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

export default connect(mapStateToProps)(CustomerDealBuildingUpdating);
