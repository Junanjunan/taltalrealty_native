import React, { useState } from "react";
import Btn from "../../../components/Auth/Btn";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, CreatingInput, CreatingInputAddress, CreatingInputDes, Div, DivText, CheckboxText, BtnDiv, ScrollView, NormalText } from "../../../components/Detail/Creating";
import todayString from "../../../components/todayString";
import { KeyboardAvoidingView } from "react-native";
import { getCustomerDealingStore } from "../../../redux/storeSlice";
import { BookTitle } from "../../../components/Detail/BookTitle";


const CustomerDealStoreUpdating = (props) => {
    const [guest_phone, setGuest_phone] = useState(props.route.params.guest_phone);
    const [price, setPrice] = useState(props.route.params.price ? props.route.params.price.toString() : 0);
    const [area_m2, setArea_m2] = useState(props.route.params.area_m2 ? props.route.params.area_m2.toString() : 0);
    const [parking, setParking] = useState(props.route.params.parking);
    const [elevator, setElevator] = useState(props.route.params.elevator);
    const [loan, setLoan] = useState(props.route.params.loan);
    const [not_finished, setNot_finished] = useState(props.route.params.not_finished);
    const [description, setDescription] = useState(props.route.params.description ? props.route.params.description.toString() : "");
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
        } else if(!area_m2){
            alert("전용면적은 필수 입력사항입니다.");
        } else{
            const form = {
                ...(price && {price}),
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
                realtor:props.id
            };
            
            AsyncStorage.getItem("csrftoken").then(value => {
                return api.customerStoreDealingUpdating(props.route.params.roomId, form, value);
            }).then(data => {
                alert("상가(매매) 손님이 수정되었습니다.");
                props.navigation.navigate("CustomerDealStoreTable");
                props.getCustomerDealingStore();
            }).catch(e => {
                console.warn(e);
            })
        } 
    };

    return(
        <>
        <KeyboardAvoidingView behavior="height">
        <BookTitle props={props} />
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

function mapDispatchToProps(dispatch){
    return{
        getCustomerDealingStore: () => dispatch(getCustomerDealingStore()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDealStoreUpdating);
