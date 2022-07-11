import React, { useState } from "react";
import styled from "styled-components/native";
import Btn from "../../components/Auth/Btn";
import colors from "../../colors";
import {KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, Dimensions} from 'react-native';
import Checkbox from "expo-checkbox";
import api from "../../api";
import { connect } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doSetNavBook } from "../../redux/navigationSlice";


const typeList = ["매매", "임대"];
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
    width: 45px;
    textAlign: center;
`;

const BtnDiv = styled.View`
    alignItems: center;
    margin: 20px;
`;

const ContractUpdating = (props) => {
    const [address, setAddress] = useState(props.route.params.address);
    const [types, setTypes] = useState(props.route.params.types === "매매" ? "Deal" : "Lease");
    const [price, setPrice] = useState(props.route.params.price ? props.route.params.price.toString() : "");
    const [deposit, setDeposit] = useState(props.route.params.deposit ? props.route.params.deposit.toString() : "");
    const [month_fee, setMonth_fee] = useState(props.route.params.month_fee ? props.route.params.month_fee.toString() : "");
    const [start_money, setStart_money] = useState(props.route.params.start_money ? props.route.params.start_money.toString() : "");
    const [middle_money, setMiddle_money] = useState(props.route.params.middle_money ? props.route.params.middle_money.toString(): "");
    const [last_money, setLast_money] = useState(props.route.params.last_money ? props.route.params.last_money.toString() : "");
    
    const [start_day, setStart_day] = useState(props.route.params.start_day);
    var modiStartDay = start_day;
    modiStartDay = new Date(modiStartDay);
    const [startYear, setStartYear] = useState(modiStartDay.getFullYear());
    const [startMonth, setStartMonth] = useState(modiStartDay.getMonth()+1);
    const [startDay, setStartDay] = useState(modiStartDay.getDate());

    const [middle_day, setMiddle_day] = useState(props.route.params.middle_day);
    var modiMiddleDay = middle_day;
    if (modiMiddleDay){
        modiMiddleDay = new Date(modiMiddleDay);
    }
    const [middleYear, setMiddleYear] = useState(() => {
        if(modiMiddleDay){
            return modiMiddleDay.getFullYear();
        } else{
            return null;
        }
    });
    const [middleMonth, setMiddleMonth] = useState(() => {
        if(modiMiddleDay){
            return modiMiddleDay.getMonth()+1;
        } else{
            return null;
        }
    });
    const [middleDay, setMiddleDay] = useState(() => {
        if(modiMiddleDay){
            return modiMiddleDay.getDate();
        } else{
            return null;
        }
    });

    const [last_day, setLast_day] = useState(props.route.params.last_day);
    var modiLastDay = last_day;
    modiLastDay = new Date(modiLastDay);
    const [lastYear, setLastYear] = useState(modiLastDay.getFullYear());
    const [lastMonth, setLastMonth] = useState(modiLastDay.getMonth()+1);
    const [lastDay, setLastDay] = useState(modiLastDay.getDate());
    
    const [not_finished, setNot_finished] = useState(props.route.params.not_finished);
    const [report, setReport] = useState(props.route.params.report);
    const [owner_phone, setOwner_phone] = useState(props.route.params.owner_phone ? props.route.params.owner_phone.toString() : "");
    const [tenant_phone, setTenant_phone] = useState(props.route.params.tenant_phone ? props.route.params.tenant_phone.toString(): "");
    const [description, setDescription] = useState(props.route.params.description ? props.route.params.description.toString() : "");
    const CheckboxStyle = {
        marginBottom: 25, 
        marginTop: 25, 
        marginRight: 50
    };
    
    console.log(not_finished);

    async function sendingData(){
        if(!address){
            alert("주소는 필수 입력사항입니다");
        } else{
            const DateReg = /\d{4}-\d{1,2}-\d{1,2}/;

            const final_start_day = `${startYear}-${startMonth}-${startDay}`;
            const final_middle_day = `${middleYear}-${middleMonth}-${middleDay}`;
            const final_last_day = `${lastYear}-${lastMonth}-${lastDay}`;
            
            const form = {
                ...(address && {address}),
                ...(types && {types}),
                ...(price && {price}),
                ...(deposit && {deposit}),
                ...(month_fee && {month_fee}),
                ...(start_money && {start_money}),
                ...(middle_money && {middle_money}),
                ...(last_money && {last_money}),
                start_day: final_start_day,
                ...(DateReg.test(final_middle_day) && {middle_day: final_middle_day}),
                last_day: final_last_day,
                ...(not_finished && {not_finished}),
                ...(!not_finished && {not_finished:false}),
                ...(report && {report}),
                ...(!report && {report:false}),
                ...(owner_phone && {owner_phone}),
                ...(tenant_phone && {tenant_phone}),
                ...(description && {description}),
            };

            AsyncStorage.getItem("csrftoken").then(value=>{
                return api.contractUpdating(props.route.params.contractId, form, value)
            }).then(data => {
                alert("계약이 수정되었습니다.");
                props.navigation.navigate("Book");
                props.doSetNavBook();
            });
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
                    <DivText>거래유형</DivText>
                    {/* <CreatingInput value={types} onChangeText={text => setTypes(text)} /> */}
                    <SelectDropdown
                        data={typeList}
                        defaultButtonText={types==="Deal" ? "매매" : "임대"}
                        defaultValue={types}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            if(selectedItem==="매매"){
                                setTypes("Deal");
                            } else{
                                setTypes("Lease");
                                setPrice(null);
                                setMiddle_money(null);
                                setMiddleYear(null);
                                setMiddleMonth(null);
                                setMiddleDay(null);
                            }
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </Div>
                {
                types === "Deal" ?
                <Div>
                    <DivText>매매가 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={price} onChangeText={text => setPrice(text)}/>
                </Div>
                :
                <Div></Div>
                }
                <Div>
                    <DivText>보증금 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={deposit} onChangeText={text => setDeposit(text)}/>
                    <DivText>월세 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={month_fee} onChangeText={text => setMonth_fee(text)}/>
                </Div>
                <Div>
                    <DivText>계약금 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={start_money} onChangeText={text => setStart_money(text)}/>
                </Div>
                {
                types === "Deal" ?
                <Div>
                    <DivText>중도금 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={middle_money} onChangeText={text => setMiddle_money(text)}/>
                </Div> :
                <Div></Div>
                }
                
                <Div>
                    <DivText>잔금 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={last_money} onChangeText={text => setLast_money(text)}/>
                </Div>
                <Div>
                    <DivText>계약일</DivText>
                    <SelectDropdown
                        name="year"
                        data={yearList}
                        defaultButtonText={"년"}
                        defaultValue={startYear}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setStartYear(selectedItem);
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
                        defaultValue={startMonth}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setStartMonth(selectedItem);
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
                        defaultValue={startDay}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setStartDay(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </Div>
                {
                types === "Deal"?
                <Div>
                <DivText>중도금일</DivText>
                <SelectDropdown
                        name="year"
                        data={yearList}
                        defaultButtonText={"년"}
                        defaultValue={middleYear ? middleYear : ""}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setMiddleYear(selectedItem);
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
                        defaultValue={middleMonth ? middleMonth : ""}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setMiddleMonth(selectedItem);
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
                        defaultValue={middleDay ? middleDay : ""}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setMiddleDay(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </Div>:
                <Div></Div>
                }
                
                <Div>
                    <DivText>잔금일</DivText>
                    <SelectDropdown
                        name="year"
                        data={yearList}
                        defaultButtonText={"년"}
                        defaultValue={lastYear}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setLastYear(selectedItem);
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
                        defaultValue={lastMonth}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setLastMonth(selectedItem);
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
                        defaultValue={lastDay}
                        buttonStyle={dropDownButtonStyle}
                        onSelect={(selectedItem, index) => {
                            setLastDay(selectedItem);
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
                    <CheckboxText>신고</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={report} onValueChange={(newValue) => setReport(newValue)}/>
                    <CheckboxText>진행중</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={not_finished} onValueChange={(newValue) => setNot_finished(newValue)}/>
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
        doSetNavBook: () => dispatch(doSetNavBook()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractUpdating);
