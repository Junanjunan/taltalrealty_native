import React, { useState } from "react";
import styled from "styled-components/native";
import Input from "../../../components/Auth/Input";
import Btn from "../../../components/Auth/Btn";
import colors from "../../../colors";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity, Dimensions} from 'react-native';
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { connect } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dropDownButtonStyle = {
    width: 77,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10
}

const yearList = [2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1950,1949,1948,1947,1946,1945,1944,1943,1942,1941,1940,1939,1938,1937,1936,1935,1934,1933,1932,1931,1930,1929,1928,1927,1926,1925,1924,1923,1922,1921,1920,1919,1918,1917,1916,1915,1914,1913,1912,1911,1910,1909,1908,1907,1906,1905,1904,1903,1902,1901,1900];
const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const dayList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];


const { width } = Dimensions.get("screen");

const Container = styled.View`
    flex:1;
    padding: 20px;
`;

const CreatingInput = styled.TextInput`
    width: ${width/6}px;
    padding: 12.5px 10px;
    border: 1px solid ${colors.black};
    background-color: white;
    border-radius: 10px;
    margin-bottom: 5px;
    marginTop: 5px;
    marginRight: 50px;
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

const CreatingInputDate = styled.TextInput`
    width: ${width/7}px;
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
    width: 45px;
    textAlign: center;
`;

const BtnDiv = styled.View`
    alignItems: center;
    margin: 20px;
`;

const DealApartmentUpdating = ({id, navigation, route: {params}}) => {
    console.log(params);
    const [address, setAddress] = useState(params.address);
    const [room, setRoom] = useState(params.room.toString());
    const [bath, setBath] = useState(params.bath ? params.bath.toString() : 0);
    const [price, setPrice] = useState(params.price.toString());
    const [deposit, setDeposit] = useState(params.deposit ? params.deposit.toString() : "");
    const [month_fee, setMonth_fee] = useState(params.month_fee ? params.month_fee.toString() : "");
    const [management_fee, setManagement_fee] = useState(params.management_fee ? params.management_fee.toString() : 0);
    const [area_m2, setArea_m2] = useState(params.area_m2.toString());
    const [total_area_m2, setTotal_area_m2] = useState(params.total_area_m2 ? params.total_area_m2.toString() : 0);
    const [land_m2, setLand_m2] = useState(params.land_m2 ? params.land_m2.toString() : "");
    const [empty, setEmpty] = useState(params.empty);
    const [parking, setParking] = useState(params.parking);
    const [elevator, setElevator] = useState(params.elevator);
    const [loan, setLoan] = useState(params.loan);
    const [not_finished, setNot_finished] = useState(params.not_finished);
    const [naver, setNaver] = useState(params.naver);
    const [dabang, setDabang] = useState(params.dabang);
    const [zicbang, setZicbang] = useState(params.zicbang);
    const [peterpan, setPeterpan] = useState(params.peterpan);
    const [owner_phone, setOwner_phone] = useState(params.owner_phone ? params.owner_phone.toString() : "");
    const [tenant_phone, setTenant_phone] = useState(params.tenant_phone ? params.tenant_phone.toString(): "");
    const [description, setDescription] = useState(params.description ? params.description.toString() : "");
    var birthDay = params.birth;
    birthDay = new Date(birthDay);
    const [year, setYear] = useState(birthDay.getFullYear());
    const [month, setMonth] = useState(birthDay.getMonth()+1);
    const [day, setDay] = useState(birthDay.getDate());
    const CheckboxStyle = {
        marginBottom: 25, 
        marginTop: 25, 
        marginRight: 50
    };
    const today = new Date()
    const tYear = today.getFullYear();
    const tMonth = today.getMonth()+1;
    const tDay = today.getDate();
    const todayString = `${tYear}-${tMonth}-${tDay}`;

    async function sendingData(){
        if(!address){
            alert("주소는 필수 입력사항입니다");
        } else if(!room){
            alert("방 개수는 필수 입력사항입니다");
        } else if(!price){
            alert("매매가는 필수 입력사항입니다.");
        } else if(!area_m2){
            alert("전용면적은 필수 입력사항입니다.");
        } else if(!owner_phone && !tenant_phone){
            alert("집주인과 세입자 연락처 중 하나는 입력해주세요")
        } else{
            const birth = `${year}-${month}-${day}`;
            const form = {
                ...(address && {address}),
                ...(room && {room}),
                ...(bath && {bath}),
                ...(price && {price}),
                ...(deposit && {deposit}),
                ...(month_fee && {month_fee}),
                ...(management_fee && {management_fee}),
                ...(area_m2 && {area_m2}),
                ...(total_area_m2 && {total_area_m2}),
                ...(land_m2 && {land_m2}),
                ...(empty && {empty}),
                ...(parking && {parking}),            
                ...(elevator && {elevator}),
                ...(loan && {loan}),
                ...(not_finished && {not_finished}),
                ...(naver && {naver}),
                ...(dabang && {dabang}),
                ...(zicbang && {zicbang}),
                ...(peterpan && {peterpan}),
                ...(!empty && {empty:false}),
                ...(!parking && {parking:false}),
                ...(!elevator && {elevator:false}),
                ...(!loan && {loan:false}),
                ...(!not_finished && {not_finished:false}),
                ...(!naver && {naver:false}),
                ...(!dabang && {dabang:false}),
                ...(!zicbang && {zicbang:false}),
                ...(!peterpan && {peterpan:false}),
                ...(owner_phone && {owner_phone}),
                ...(tenant_phone && {tenant_phone}),
                ...(description && {description}),
                updated:todayString,
                birth: birth,
                realtor:id
            };

            AsyncStorage.getItem("csrftoken").then(value=>{
                return api.apartmentDealingUpdating(params.roomId, form, value)
            }).then(data => {
                alert("아파트(매매)가 수정되었습니다.");
                navigation.navigate("Book");
            }).catch(e => console.warn(e));
        }
    };

    console.log(empty);

    return(
        <>
        <ScrollView>
            <Container>
                <Div>
                    <DivText>주소</DivText>
                    <CreatingInputAddress value={address} onChangeText={text => setAddress(text)} />
                </Div>
                <Div>
                    <DivText>방</DivText>
                    <CreatingInput keyboardType="numeric" value={room} onChangeText={text => setRoom(text)}/>
                    <DivText>화장실</DivText>
                    <CreatingInput keyboardType="numeric"  value={bath} onChangeText={text => setBath(text)}/>
                </Div>
                <Div>
                    <DivText>매매가 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={price} onChangeText={text => setPrice(text)}/>
                </Div>
                <Div>
                    <DivText>보증금 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={deposit} onChangeText={text => setDeposit(text)}/>
                    <DivText>월세 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={month_fee} onChangeText={text => setMonth_fee(text)}/>
                </Div>
                <Div>
                    <DivText>관리비 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={management_fee} onChangeText={text => setManagement_fee(text)} />
                </Div>
                <Div>
                    <DivText>준공</DivText>
                    <SelectDropdown
                        name="year"
                        data={yearList}
                        defaultButtonText={"년"}
                        defaultValue={year}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setYear(selectedItem);
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
                        defaultValue={month}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setMonth(selectedItem);
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
                        defaultValue={day}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setDay(selectedItem);
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
                    <DivText>전용면적(㎡)</DivText>
                    <CreatingInput keyboardType="numeric" value={area_m2} onChangeText={text => setArea_m2(text)} />
                    <DivText>공급면적(㎡)</DivText>
                    <CreatingInput keyboardType="numeric" value={total_area_m2} onChangeText={text => setTotal_area_m2(text)} />
                </Div>
                <Div>
                    <DivText>대지지분(㎡)</DivText>
                    <CreatingInput keyboardType="numeric" value={land_m2} onChangeText={text => setLand_m2(text)} />
                </Div>
                <Div>
                    <CheckboxText>주차</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={parking} onValueChange={(newValue) => setParking(newValue)}/>
                    <CheckboxText>공실</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={empty} onValueChange={(newValue) => setEmpty(newValue)}/>
                    <CheckboxText>승강기</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={elevator} onValueChange={(newValue) => setElevator(newValue)}/>
                </Div>
                <Div>
                    <CheckboxText>대출</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={loan} onValueChange={(newValue) => setLoan(newValue)}/>
                    <CheckboxText>진행중</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={not_finished} onValueChange={(newValue) => setNot_finished(newValue)}/>
                    <CheckboxText>네이버</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={naver} onValueChange={(newValue) => setNaver(newValue)}/>
                </Div>    
                <Div>
                    <CheckboxText>다방</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={dabang} onValueChange={(newValue) => setDabang(newValue)}/>
                    <CheckboxText>직방</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={zicbang} onValueChange={(newValue) => setZicbang(newValue)}/>
                    <CheckboxText>피터팬</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={peterpan} onValueChange={(newValue) => setPeterpan(newValue)}/>
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

export default connect(mapStateToProps)(DealApartmentUpdating);
