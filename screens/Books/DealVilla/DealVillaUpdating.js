import React, { useState } from "react";
import styled from "styled-components/native";
import Input from "../../../components/Auth/Input";
import Btn from "../../../components/Auth/Btn";
import colors from "../../../colors";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity, Dimensions} from 'react-native';
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { connect } from "react-redux";



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

const DealVillaCreating = ({id, navigation, route: {params}}) => {
    console.log(params.roomId);
    const [address, setAddress] = useState(params.address);
    const [room, setRoom] = useState(params.room.toString());
    const [bath, setBath] = useState(params.bath ? params.bath.toString() : 0);
    const [price, setPrice] = useState(params.price.toString());
    const [deposit, setDeposit] = useState(params.desposit ? params.deposit.toString() : "");
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
    const CheckboxStyle = {
        marginBottom: 25, 
        marginTop: 25, 
        marginRight: 50
    };
    const today = new Date()
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();
    const todayString = `${year}-${month}-${day}`;

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
                realtor:id
            }
        
            try{
                await api.villaDealingUpdating(params.roomId, form);
                alert("매물이 수정되었습니다.");
                navigation.navigate("Book");
            } catch(e){
                console.warn(e);
            }
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
                    <CreatingInputDate placeholder="YYYY" keyboardType="numeric" />
                    <Text> - </Text>
                    <CreatingInputDate placeholder="MM" keyboardType="numeric" />
                    <Text> - </Text>
                    <CreatingInputDate placeholder="DD" keyboardType="numeric" />
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

export default connect(mapStateToProps)(DealVillaCreating);
