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
import { getLeaseOfficetel } from "../../../redux/officetelSlice";
import { BookTitle } from "../../../components/Detail/BookTitle";


const LeaseOfficetelUpdating = (props) => {
    const [address, setAddress] = useState(props.route.params.address);
    const [room, setRoom] = useState(props.route.params.room.toString());
    const [bath, setBath] = useState(props.route.params.bath ? props.route.params.bath.toString() : 0);
    const [deposit, setDeposit] = useState(props.route.params.deposit ? props.route.params.deposit.toString() : "");
    const [month_fee, setMonth_fee] = useState(props.route.params.month_fee ? props.route.params.month_fee.toString() : "");
    const [management_fee, setManagement_fee] = useState(props.route.params.management_fee ? props.route.params.management_fee.toString() : 0);
    const [area_m2, setArea_m2] = useState(props.route.params.area_m2.toString());
    const [total_area_m2, setTotal_area_m2] = useState(props.route.params.total_area_m2 ? props.route.params.total_area_m2.toString() : 0);
    const [empty, setEmpty] = useState(props.route.params.empty);
    const [parking, setParking] = useState(props.route.params.parking);
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
        } else if(!room){
            alert("방 개수는 필수 입력사항입니다");
        } else if(!deposit || !month_fee){
            alert("보증금과 월세는 필수 입력사항입니다.");
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
                ...(deposit && {deposit}),
                ...(month_fee && {month_fee}),
                ...(management_fee && {management_fee}),
                ...(area_m2 && {area_m2}),
                ...(total_area_m2 && {total_area_m2}),
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
                realtor:props.id
            };

            AsyncStorage.getItem("csrftoken").then(value=>{
                return api.officetelLeaseUpdating(props.route.params.roomId, form, value)
            }).then(data => {
                alert("오피스텔(매매)가 수정되었습니다.");
                props.navigation.navigate("LeaseOfficetelTable");
                props.getLeaseOfficetel();
            }).catch(e => {
                alert("날짜를 다시 선택해주세요.");
                console.warn(e);
            });
        }
    };

    return(
        <>
        <KeyboardAvoidingView behavior="height">
        <BookTitle props={props} />
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
                    <DivText>전용면적(㎡)</DivText>
                    <CreatingInput keyboardType="numeric" value={area_m2} onChangeText={text => setArea_m2(text)} />
                    <DivText>공급면적(㎡)</DivText>
                    <CreatingInput keyboardType="numeric" value={total_area_m2} onChangeText={text => setTotal_area_m2(text)} />
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
        getLeaseOfficetel: () => dispatch(getLeaseOfficetel()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaseOfficetelUpdating);
