import React, { useState } from "react";
import Btn from "../../../components/Auth/Btn";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { connect } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, CreatingInput, CreatingInputAddress, CreatingInputDes, Div, DivText, CheckboxText, BtnDiv, ScrollView, NormalText } from "../../../components/Detail/Creating";
import { dropDownButtonStyle, yearList, monthList, dayList } from "../../../components/Detail/YearDropdown";
import todayString from "../../../components/todayString";
import { KeyboardAvoidingView } from "react-native";
import { getDealingBuilding } from "../../../redux/buildingSlice";


const DealBuildingUpdating = (props) => {
    const [address, setAddress] = useState(props.route.params.address);
    const [price, setPrice] = useState(props.route.params.price.toString());
    const [deposit, setDeposit] = useState(props.route.params.deposit ? props.route.params.deposit.toString() : 0);
    const [month_fee, setMonth_fee] = useState(props.route.params.month_fee ? props.route.params.month_fee.toString() : 0);
    const [management_fee, setManagement_fee] = useState(props.route.params.management_fee ? props.route.params.management_fee.toString() : 0);
    const [floor_top, setFloor_top] = useState(props.route.params.floor_top ? props.route.params.floor_top.toString() : "");
    const [floor_bottom, setFloor_bottom] = useState(props.route.params.floor_bottom ? props.route.params.floor_bottom.toString() : "");
    const [land_type, setLand_type] = useState(props.route.params.land_type ? props.route.params.land_type.toString() : "");
    const [land_m2, setLand_m2] = useState(props.route.params.land_m2 ? props.route.params.land_m2.toString() : "");
    const [building_area_m2, setBuilding_area_m2] = useState(props.route.params.building_area_m2 ? props.route.params.building_area_m2.toString() : "");
    const [total_floor_area_m2, setTotal_floor_area_m2] = useState(props.route.params.total_floor_area_m2 ? props.route.params.total_floor_area_m2.toString() : "");
    const [total_floor_area_m2_for_ratio, setTotal_floor_area_m2_for_ratio] = useState(props.route.params.total_floor_area_m2_for_ratio? props.route.params.total_floor_area_m2_for_ratio.toString() : "");
    const [building_coverage, setBuilding_coverage] = useState(props.route.params.building_coverage ? props.route.params.building_coverage.toString() : "");
    const [floor_area_ratio, setFloor_area_ratio] = useState(props.route.params.floor_area_ratio ? props.route.params.floor_area_ratio.toString() : "");
    const [parking_number, setParking_number] = useState(props.route.params.parking_number ? props.route.params.parking_number.toString() : "");
    const [elevator, setElevator] = useState(props.route.params.elevator);
    const [loan, setLoan] = useState(props.route.params.loan);
    const [not_finished, setNot_finished] = useState(props.route.params.not_finished);
    const [naver, setNaver] = useState(props.route.params.naver);
    const [dabang, setDabang] = useState(props.route.params.dabang);
    const [zicbang, setZicbang] = useState(props.route.params.zicbang);
    const [peterpan, setPeterpan] = useState(props.route.params.peterpan);
    const [owner_phone, setOwner_phone] = useState(props.route.params.owner_phone ? props.route.params.owner_phone.toString() : "");
    const [tenant_phone, setTenant_phone] = useState(props.route.params.tenant_phone ? props.route.params.tenant_phone.toString(): "");
    const [description, setDescription] = useState(props.route.params.description ? props.route.params.description.toString() : "");
    var birthDay = props.route.params.birth;
    birthDay = new Date(birthDay);
    const [year, setYear] = useState(birthDay.getFullYear());
    const [month, setMonth] = useState(birthDay.getMonth()+1);
    const [day, setDay] = useState(birthDay.getDate());
    const CheckboxStyle = {
        marginBottom: 25, 
        marginTop: 25, 
        marginRight: 50
    };

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
                realtor:props.id
            };

            AsyncStorage.getItem("csrftoken").then(value=>{
                return api.buildingDealingUpdating(props.route.params.roomId, form, value)
            }).then(data => {
                alert("건물(매매)가 수정되었습니다.");
                props.navigation.navigate("DealBuildingTable");
                props.getDealingBuilding();
            }).catch(e => console.warn(e));
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
                    <DivText>매매가 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={price} onChangeText={text => setPrice(text)}/>
                </Div>
                <Div>
                    <DivText>보증금 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={deposit ? deposit : 0} onChangeText={text => setDeposit(text)}/>
                    <DivText>월세 (만원)</DivText>
                    <CreatingInput keyboardType="numeric" value={month_fee ? month_fee : 0} onChangeText={text => setMonth_fee(text)}/>
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
                    <CreatingInputDes multiline={true} value={description} onChangeText={text => setDescription(text)} />
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
        </KeyboardAvoidingView>
        </>
    );
};


function mapStateToProps(state){
    return state.usersReducer;
};

function mapDispatchToProps(dispatch){
    return{
        getDealingBuilding: () => dispatch(getDealingBuilding()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DealBuildingUpdating);
