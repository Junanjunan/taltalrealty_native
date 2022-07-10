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


const CustomerLeaseOfficetelUpdating = ({id, navigation, route: {params}}) => {
    const [guest_phone, setGuest_phone] = useState(params.guest_phone);
    const [room, setRoom] = useState(params.room.toString());
    const [deposit, setDeposit] = useState(params.deposit ? params.deposit.toString() : 0);
    const [month_fee, setMonth_fee] = useState(params.month_fee ? params.month_fee.toString() : 0);
    const [area_m2, setArea_m2] = useState(params.area_m2 ? params.area_m2.toString() : 0);
    const [parking, setParking] = useState(params.parking);
    const [elevator, setElevator] = useState(params.elevator);
    const [loan, setLoan] = useState(params.loan);
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
        } else if(!room){
            alert("방 개수는 필수 입력사항입니다");
        } else if(!deposit || !month_fee){
            alert("희망 보증금과 월세는 필수 입력사항입니다.");
        } else if(!area_m2){
            alert("전용면적은 필수 입력사항입니다.");
        } else{
            const form = {
                ...(room && {room}),
                ...(deposit && {deposit}),
                ...(month_fee && {month_fee}),
                ...(area_m2 && {area_m2}),
                ...(parking && {parking}),            
                ...(elevator && {elevator}),
                ...(loan && {loan}),
                ...(not_finished && {not_finished}),
                ...(!parking && {parking:false}),
                ...(!elevator && {elevator:false}),
                ...(!loan && {loan:false}),
                ...(!not_finished && {not_finished:false}),
                ...(guest_phone && {guest_phone}),
                ...(description && {description}),
                updated:todayString,
                realtor:id
            };
            
            AsyncStorage.getItem("csrftoken").then(value => {
                return api.customerOfficetelLeaseUpdating(params.roomId, form, value);
            }).then(data => {
                alert("오피스텔(임대) 손님이 수정되었습니다.");
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
                    <DivText>방</DivText>
                    <CreatingInput keyboardType="numeric" value={room} onChangeText={text => setRoom(text)}/>
                </Div>
                <Div>
                    <DivText>보증금 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={deposit} onChangeText={text => setDeposit(text)}/>
                    <DivText>월세 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={month_fee} onChangeText={text => setMonth_fee(text)}/>
                </Div>
                <Div>
                    <DivText>전용면적(㎡)</DivText>
                    <CreatingInput keyboardType="numeric" value={area_m2} onChangeText={text => setArea_m2(text)} />
                </Div>
                <Div>
                    <CheckboxText>주차</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={parking} onValueChange={(newValue) => setParking(newValue)}/>
                    <CheckboxText>승강기</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={elevator} onValueChange={(newValue) => setElevator(newValue)}/>
                </Div>
                <Div>
                    <CheckboxText>대출</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={loan} onValueChange={(newValue) => setLoan(newValue)}/>
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

export default connect(mapStateToProps)(CustomerLeaseOfficetelUpdating);
