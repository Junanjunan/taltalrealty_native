import React, { useState } from "react";
import styled from "styled-components/native";
import Btn from "../../components/Auth/Btn";
import colors from "../../colors";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity, Dimensions} from 'react-native';
import Checkbox from "expo-checkbox";
import api from "../../api";
import { connect } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";


const yearList = [2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1950,1949,1948,1947,1946,1945,1944,1943,1942,1941,1940,1939,1938,1937,1936,1935,1934,1933,1932,1931,1930,1929,1928,1927,1926,1925,1924,1923,1922,1921,1920,1919,1918,1917,1916,1915,1914,1913,1912,1911,1910,1909,1908,1907,1906,1905,1904,1903,1902,1901,1900];
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
}

const Container = styled.View`
    flex:1;
    padding: 20px;
    marginBottom: 30px;
`;

const CreatingInput = styled.TextInput`
    width: ${width/5}px;
    padding: 12.5px 10px;
    border: 1px solid ${colors.black};
    background-color: white;
    border-radius: 10px;
    margin-bottom: 5px;
    marginTop: 5px;
    marginRight: 30px;
`;

const CreatingInputAddress = styled.TextInput`
    width: ${width*3/5}px;
    padding: 12.5px 10px;
    border: 1px solid ${colors.black};
    background-color: white;
    border-radius: 10px;
    margin-bottom: 5px;
    marginTop: 5px;
`;

const Div = styled.View`
    flexDirection: row;
    alignItems: center;
    vertialAlign: middle;
    textAlign: center;
`;

const DivText = styled.Text`
    fontSize: 18px;
    marginRight: 5px;
    width: 60px;
    textAlign: center;
`;

const CheckboxText = styled.Text`
    fontSize: 18px;
    marginRight: 5px;
    width: 60px;
    textAlign: center;
`;

const BtnDiv = styled.View`
    alignItems: center;
    margin: 20px;
`;

const ManagementCreating = (props) => {
    const [address, setAddress] = useState();
    const [deposit, setDeposit] = useState();
    const [month_fee, setMonth_fee] = useState();
    const [management_fee, setManagement_fee] = useState();
    const [parking_fee, setParking_fee] = useState();
    const [contract_day, setContract_day] = useState();
    const [contractYear, setContractYear] = useState();
    const [contractMonth, setContractMonth] = useState();
    const [contractDay, setContractDay] = useState();
    const [contract_start_day, setContract_start_day] = useState();
    const [contractStartYear, setContractStartYear] = useState();
    const [contractStartMonth, setContractStartMonth] = useState();
    const [contractStartDay, setContractStartDay] = useState();
    const [contract_last_day, setContract_last_day] = useState();
    const [contractLastYear, setContractLastYear] = useState();
    const [contractLastMonth, setContractLastMonth] = useState();
    const [contractLastDay, setContractLastDay] = useState();
    const [not_finished, setNot_finished] = useState();
    const [deal_report, setDeal_report] = useState();
    const [deal_renewal_notice, setDeal_renewal_notice] = useState();
    const [deal_renewal_right_usage, setDeal_renewal_right_usage] = useState();
    const [owner_phone, setOwner_phone] = useState();
    const [tenant_phone, setTenant_phone] = useState();
    const [description, setDescription] = useState();
    const CheckboxStyle = {
        marginBottom: 25, 
        marginTop: 25, 
        marginRight: 50
    };

    async function sendingData(){
        if(!address){
            alert("주소는 필수 입력사항입니다.");
        // } else if(!contract_day){
        //     alert("계약일은 필수 입력사항입니다.");
        // } else if(!contract_start_day){
        //     alert("입주일은 필수 입력사항입니다.");
        // } else if(!contract_last_day){
        //     alert("만기일은 필수 입력사항입니다.");
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
                manager: props.id
            };

            AsyncStorage.getItem("csrftoken").then(value=>{
                return api.managementCreating(form, value);
            }).then(data => {
                alert("관리매물이 등록되었습니다.");
                props.navigation.navigate("Book");
            }).catch(e => {
                alert("계약일, 입주일, 만기일 필수 입력사항입니다.")
                console.log(e);
            });
        }
    };

    return(
        <>
        <ScrollView>
            <Container>
                <Div>
                    <DivText>주소</DivText>
                    <CreatingInputAddress value={address} onChangeText={text => setAddress(text)} />
                </Div>
                <Div>
                    <DivText>보증금</DivText>
                    <CreatingInput keyboardType="numeric" value={deposit} onChangeText={text => setDeposit(text)} />
                    <DivText>월세</DivText>
                    <CreatingInput keyboardType="numeric" value={month_fee} onChangeText={text => setMonth_fee(text)} />
                </Div>
                <Div>
                    <DivText>관리비</DivText>
                    <CreatingInput keyboardType="numeric" value={management_fee} onChangeText={text => setManagement_fee(text)} />
                    <DivText>주차비</DivText>
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
                    <DivText>특이사항</DivText>
                    <CreatingInputAddress  value={description} onChangeText={text => setDescription(text)} />
                </Div>
                <BtnDiv>
                    <Btn 
                        text={"등록하기"} 
                        onPress={() => {
                            sendingData();
                        }}
                    />
                </BtnDiv>
            </Container>
        </ScrollView>
        </>
    );
};

function mapStateToProps(state){
    return state.usersReducer;
};

export default connect(mapStateToProps)(ManagementCreating);