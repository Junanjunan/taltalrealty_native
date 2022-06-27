import React, { useState } from "react";
import Btn from "../../../components/Auth/Btn";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { connect } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, CreatingInput, CreatingInputAddress, Div, DivText, CheckboxText, BtnDiv, ScrollView, NormalText } from "../../../components/Detail/Creating";


const dropDownButtonStyle = {
    width: 77,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10
}

const yearList = [2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1950,1949,1948,1947,1946,1945,1944,1943,1942,1941,1940,1939,1938,1937,1936,1935,1934,1933,1932,1931,1930,1929,1928,1927,1926,1925,1924,1923,1922,1921,1920,1919,1918,1917,1916,1915,1914,1913,1912,1911,1910,1909,1908,1907,1906,1905,1904,1903,1902,1901,1900];
const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const dayList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

const DealBuildingUpdating = ({id, navigation, route: {params}}) => {
    const [address, setAddress] = useState(params.address);
    const [price, setPrice] = useState(params.price.toString());
    const [deposit, setDeposit] = useState(params.deposit ? params.deposit.toString() : "");
    const [month_fee, setMonth_fee] = useState(params.month_fee ? params.month_fee.toString() : "");
    const [management_fee, setManagement_fee] = useState(params.management_fee ? params.management_fee.toString() : 0);
    const [floor_top, setFloor_top] = useState(params.floor_top ? params.floor_top.toString() : "");
    const [floor_bottom, setFloor_bottom] = useState(params.floor_bottom ? params.floor_bottom.toString() : "");
    const [land_type, setLand_type] = useState(params.land_type ? params.land_type.toString() : "");
    const [land_m2, setLand_m2] = useState(params.land_m2 ? params.land_m2.toString() : "");
    const [building_area_m2, setBuilding_area_m2] = useState(params.building_area_m2 ? params.building_area_m2.toString() : "");
    const [total_floor_area_m2, setTotal_floor_area_m2] = useState(params.total_floor_area_m2 ? params.total_floor_area_m2.toString() : "");
    const [total_floor_area_m2_for_ratio, setTotal_floor_area_m2_for_ratio] = useState(params.total_floor_area_m2_for_ratio? params.total_floor_area_m2_for_ratio.toString() : "");
    const [building_coverage, setBuilding_coverage] = useState(params.building_coverage ? params.building_coverage.toString() : "");
    const [floor_area_ratio, setFloor_area_ratio] = useState(params.floor_area_ratio ? params.floor_area_ratio.toString() : "");
    const [parking_number, setParking_number] = useState(params.parking_number ? params.parking_number.toString() : "");
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
        } else if(!price){
            alert("매매가는 필수 입력사항입니다.");
        } else if(!deposit){
            alert("보증금은 필수 입력사항입니다.");
        } else if(!month_fee){
            alert("월세는 필수 입력사항입니다.");
        } else if(!year || !month || !day){
            alert("준공일은 필수 입력사항입니다.");
        } else if(!owner_phone && !tenant_phone){
            alert("집주인과 세입자 연락처 중 하나는 입력해주세요")
        } else{
            const birth = `${year}-${month}-${day}`;
            const form = {
                ...(address && {address}),
                ...(price && {price}),
                ...(deposit && {deposit}),
                ...(month_fee && {month_fee}),
                ...(management_fee && {management_fee}),
                ...(floor_top && {floor_top}),
                ...(floor_bottom && {floor_bottom}),
                ...(land_type && {land_type}),
                ...(land_m2 && {land_m2}),
                ...(building_area_m2 && {building_area_m2}),
                ...(total_floor_area_m2 && {total_floor_area_m2}),
                ...(total_floor_area_m2_for_ratio && {total_floor_area_m2_for_ratio}),
                ...(building_coverage && {building_coverage}),
                ...(floor_area_ratio && {floor_area_ratio}),
                ...(parking_number && {parking_number}),
                ...(elevator && {elevator}),
                ...(loan && {loan}),
                ...(not_finished && {not_finished}),
                ...(naver && {naver}),
                ...(dabang && {dabang}),
                ...(zicbang && {zicbang}),
                ...(peterpan && {peterpan}),
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
                return api.buildingDealingUpdating(params.roomId, form, value)
            }).then(data => {
                alert("건물(매매)가 수정되었습니다.");
                navigation.navigate("Book");
            }).catch(e => console.warn(e));
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
                    <DivText>주차 대수</DivText>
                    <CreatingInput keyboardType="numeric" value={parking_number} onChangeText={text => setParking_number(text)} />
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
                    <NormalText> - </NormalText>
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
                    <NormalText> - </NormalText>
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
                    <DivText>지상 층수</DivText>
                    <CreatingInput keyboardType="numeric" value={floor_top} onChangeText={text => setFloor_top(text)} />
                    <DivText>지하 층수</DivText>
                    <CreatingInput keyboardType="numeric" value={floor_bottom} onChangeText={text => setFloor_bottom(text)} />
                </Div>
                <Div>
                    <DivText>토지종류</DivText>
                    <CreatingInput value={land_type} onChangeText={text => setLand_type(text)} />
                    <DivText>토지면적(㎡)</DivText>
                    <CreatingInput keyboardType="numeric" value={land_m2} onChangeText={text => setLand_m2(text)} />
                </Div>
                <Div>
                    <DivText>건축면적(㎡)</DivText>
                    <CreatingInput keyboardType="numeric" value={building_area_m2} onChangeText={text => setBuilding_area_m2(text)} />
                </Div>
                <Div>
                    <DivText>연면적 (㎡)</DivText>
                    <CreatingInput keyboardType="numeric" value={total_floor_area_m2} onChangeText={text => setTotal_floor_area_m2(text)} />
                    <DivText>연면적-용적률용(㎡)</DivText>
                    <CreatingInput keyboardType="numeric" value={total_floor_area_m2_for_ratio} onChangeText={text => setTotal_floor_area_m2_for_ratio(text)} />
                </Div>
                <Div>
                    <DivText>건폐율</DivText>
                    <CreatingInput keyboardType="numeric" value={building_coverage} onChangeText={text => setBuilding_coverage(text)} />
                    <DivText>용적률</DivText>
                    <CreatingInput keyboardType="numeric" value={floor_area_ratio} onChangeText={text => setFloor_area_ratio(text)} />
                </Div>
                
                <Div>
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

export default connect(mapStateToProps)(DealBuildingUpdating);
