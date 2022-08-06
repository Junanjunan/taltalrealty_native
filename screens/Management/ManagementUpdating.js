import React, { useState } from "react";
import styled from "styled-components/native";
import Btn from "../../components/Auth/Btn";
import {KeyboardAvoidingView, Text, Dimensions} from 'react-native';
import Checkbox from "expo-checkbox";
import api from "../../api";
import { connect } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doSetNavBook } from "../../redux/navigationSlice";
import { Container, CreatingInput, CreatingInputAddress, CreatingInputDes, Div, DivText, CheckboxText, BtnDiv, ScrollView, NormalText } from "../../components/Detail/Creating";
import { getManagement } from "../../redux/managementSlice";


const yearList = [2026,2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010];
const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const dayList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

const { width } = Dimensions.get("screen");

const dropDownButtonStyle = {
    width: width/5,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
};


const ManagementUpdating = (props) => {
    const [address, setAddress] = useState(`${props.route.params.address}`);
    const [deposit, setDeposit] = useState(`${props.route.params.deposit ? props.route.params.deposit : ""}`);
    const [month_fee, setMonth_fee] = useState(`${props.route.params.month_fee ? props.route.params.month_fee : ""}`);
    const [management_fee, setManagement_fee] = useState(`${props.route.params.management_fee ? props.route.params.management_fee : ""}`);
    const [parking_fee, setParking_fee] = useState(`${props.route.params.parking_fee ? props.route.params.parking_fee : ""}`);
    var modiContractDay = new Date(props.route.params.contract_day);
    const [contractYear, setContractYear] = useState(modiContractDay.getFullYear());
    const [contractMonth, setContractMonth] = useState(modiContractDay.getMonth()+1);
    const [contractDay, setContractDay] = useState(modiContractDay.getDate());
    
    var modiContractStartDay = new Date(props.route.params.contract_start_day);
    const [contractStartYear, setContractStartYear] = useState(modiContractStartDay.getFullYear());
    const [contractStartMonth, setContractStartMonth] = useState(modiContractStartDay.getMonth()+1);
    const [contractStartDay, setContractStartDay] = useState(modiContractStartDay.getDate());
    
    var modiContractLastDay = new Date(props.route.params.contract_last_day);
    const [contractLastYear, setContractLastYear] = useState(modiContractLastDay.getFullYear());
    const [contractLastMonth, setContractLastMonth] = useState(modiContractLastDay.getMonth()+1);
    const [contractLastDay, setContractLastDay] = useState(modiContractLastDay.getDate());
    const [not_finished, setNot_finished] = useState(props.route.params.not_finished);
    const [deal_report, setDeal_report] = useState(props.route.params.deal_report);
    const [deal_renewal_notice, setDeal_renewal_notice] = useState(props.route.params.deal_renewal_notice);
    const [deal_renewal_right_usage, setDeal_renewal_right_usage] = useState(props.route.params.deal_renewal_right_usage);
    const [owner_phone, setOwner_phone] = useState(props.route.params.owner_phone);
    const [tenant_phone, setTenant_phone] = useState(props.route.params.tenant_phone);
    const [description, setDescription] = useState(props.route.params.description);
    const CheckboxStyle = {
        marginBottom: 25,
        marginTop: 25,
        marginRight: 50
    };

    async function sendingData(){
        if(!address){
            alert("주소는 필수 입력사항입니다.");
        }  else{
            const DateReg = /\d{4}-\d{1,2}-\d{1,2}/;
            const final_contract_day = `${contractYear}-${contractMonth}-${contractDay}`;
            const final_contract_start_day = `${contractStartYear}-${contractStartMonth}-${contractStartDay}`;
            const final_contract_last_day = `${contractLastYear}-${contractLastMonth}-${contractLastDay}`;

            const form = {
                ...(address && {address}),
                ...(deposit && {deposit}),
                ...(month_fee && {month_fee}),
                ...(management_fee && {management_fee}),
                ...(parking_fee && {parking_fee}),
                contract_day: final_contract_day,
                contract_start_day: final_contract_start_day,
                contract_last_day: final_contract_last_day,
                ...(not_finished && {not_finished}),
                ...(deal_report && {deal_report}),
                ...(deal_renewal_notice && {deal_renewal_notice}),
                ...(deal_renewal_right_usage && {deal_renewal_right_usage}),
                ...(!not_finished && {not_finished:false}),
                ...(!deal_report && {deal_report:false}),
                ...(!deal_renewal_notice && {deal_renewal_notice:false}),
                ...(!deal_renewal_right_usage && {deal_renewal_right_usage:false}),
                ...(owner_phone && {owner_phone}),
                ...(tenant_phone && {tenant_phone}),
                ...(description && {description}),
                realtor: props.id
            }
            try{
                AsyncStorage.getItem("csrftoken").then(value=>{
                    return api.managementUpdating(props.route.params.managementId, form, value)
                }).then(data => {
                    alert("관리매물이 수정되었습니다.");
                    props.navigation.navigate("ManagementTable");
                    props.getManagement();
                });
            } catch(e){
                alert("계약일, 입주일, 만기일을 다시 확인해주세요.");
                console.warn(e);
            }
        }
    };

    return(
        <>
        <KeyboardAvoidingView behavior="height">
        <ScrollView>
            <Container>
                <Div>
                    <DivText>주소</DivText>
                    <CreatingInputAddress value={address} onChangeText={text => setAddress(text)} />
                </Div>
                <Div>
                    <DivText>보증금 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={deposit} onChangeText={text => setDeposit(text)} />
                    <DivText>월세 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={month_fee} onChangeText={text => setMonth_fee(text)} />
                </Div>
                <Div>
                    <DivText>관리비 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={management_fee} onChangeText={text => setManagement_fee(text)} />
                    <DivText>주차비 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={parking_fee} onChangeText={text => setParking_fee(text)} />
                </Div>
                <Div>
                    <DivText>계약일</DivText>
                    <SelectDropdown
                        name="year"
                        data={yearList}
                        defaultButtonText={"년"}
                        defaultValue={contractYear}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setContractYear(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <Text> - </Text>
                    <SelectDropdown
                        name="month"
                        data={monthList}
                        defaultButtonText={"월"}
                        defaultValue={contractMonth}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setContractMonth(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <Text> - </Text>
                    <SelectDropdown
                        name="month"
                        data={dayList}
                        defaultButtonText={"일"}
                        defaultValue={contractDay}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setContractDay(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </Div>
                <Div>
                    <CheckboxText>전월세 신고</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={deal_report} onValueChange={(newValue) => setDeal_report(newValue)}/>
                </Div>
                <Div>
                    <DivText>입주일</DivText>
                    <SelectDropdown
                        name="year"
                        data={yearList}
                        defaultButtonText={"년"}
                        defaultValue={contractStartYear}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setContractStartYear(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <Text> - </Text>
                    <SelectDropdown
                        name="month"
                        data={monthList}
                        defaultButtonText={"월"}
                        defaultValue={contractStartMonth}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setContractStartMonth(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <Text> - </Text>
                    <SelectDropdown
                        name="month"
                        data={dayList}
                        defaultButtonText={"일"}
                        defaultValue={contractStartDay}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setContractStartDay(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </Div>
                <Div>
                    <DivText>만기일</DivText>
                    <SelectDropdown
                        name="year"
                        data={yearList}
                        defaultButtonText={"년"}
                        defaultValue={contractLastYear}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setContractLastYear(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <Text> - </Text>
                    <SelectDropdown
                        name="month"
                        data={monthList}
                        defaultButtonText={"월"}
                        defaultValue={contractLastMonth}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setContractLastMonth(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <Text> - </Text>
                    <SelectDropdown
                        name="month"
                        data={dayList}
                        defaultButtonText={"일"}
                        defaultValue={contractLastDay}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setContractLastDay(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </Div>
                <Div>
                    <CheckboxText>갱신 고지 여부</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={deal_renewal_notice} onValueChange={(newValue) => setDeal_renewal_notice(newValue)}/>
                    <CheckboxText>갱신청구권 사용</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={deal_renewal_right_usage} onValueChange={(newValue) => setDeal_renewal_right_usage(newValue)}/>
                </Div>
                <Div>
                    <DivText>집주인</DivText>
                    <CreatingInputAddress value={owner_phone} onChangeText={text => setOwner_phone(text)} />
                </Div>
                <Div>
                    <DivText>세입자</DivText>
                    <CreatingInputAddress value={tenant_phone} onChangeText={text => setTenant_phone(text)} />
                </Div>
                <Div>
                    <DivText>상세설명</DivText>
                    <CreatingInputDes multiline={true}  value={description} onChangeText={text => setDescription(text)} />
                </Div>
                <BtnDiv>
                    <Btn 
                        text={"수정하기"} 
                        onPress={() => {
                            sendingData();
                        }}
                    />
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
    return {
        getManagement: () => dispatch(getManagement())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagementUpdating);