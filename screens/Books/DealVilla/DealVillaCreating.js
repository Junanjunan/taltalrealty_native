import React, { useState } from "react";
import styled from "styled-components/native";
import Input from "../../../components/Auth/Input";
import Btn from "../../../components/Auth/Btn";
import colors from "../../../colors";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity, Dimensions} from 'react-native';
import Checkbox from "expo-checkbox";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';



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
    fontSize: 18;
    marginRight: 5;
    width: 60;
    textAlign: center;
`;

const CheckboxText = styled.Text`
    fontSize: 18;
    marginRight: 5;
    width: 45;
    textAlign: center;
`;

const BtnDiv = styled.View`
    alignItems: center;
    margin: 20px;
`;

const DealVillaCreating = () => {
    const [checkEmpty, setCheckEmpty] = useState(false);
    const [checkParking, setCheckParking] = useState(false);
    const [checkElevator, setCheckElevator] = useState(false);
    const [checkLoan, setCheckLoan] = useState(false);
    const [checkNotFinished, setCheckNotFinished] = useState(false);
    const [checkNaver, setCheckNaver] = useState(false);
    const [checkDabang, setCheckDabang] = useState(false);
    const [checkZicbang, setCheckZicbang] = useState(false);
    const [checkPeterpan, setCheckPeterpan] = useState(false);
    const CheckboxStyle = {
        marginBottom: 25, 
        marginTop: 25, 
        marginRight: 50
    }

    function sendingData(){
        console.log("Sending Data");
    }


    return(
        <>
        <ScrollView>
            <Container>
                <Div>
                    <DivText>주소</DivText>
                    <CreatingInputAddress placeholder="주소" />
                </Div>
                <Div>
                    <DivText>확인일</DivText>
                    <CreatingInputDate placeholder="YYYY" keyboardType="numeric" />
                    <Text> - </Text>
                    <CreatingInputDate placeholder="MM" keyboardType="numeric" />
                    <Text> - </Text>
                    <CreatingInputDate placeholder="DD" keyboardType="numeric" />
                </Div>
                <Div>
                    <DivText>방</DivText>
                    <CreatingInput placeholder="방" keyboardType="numeric" />
                    <DivText>화장실</DivText>
                    <CreatingInput placeholder="화장실" keyboardType="numeric" />
                </Div>
                <Div>
                    <DivText>매매가 (만원)</DivText>
                    <CreatingInput placeholder="매매가" keyboardType="numeric"/>
                </Div>
                <Div>
                    <DivText>보증금 (만원)</DivText>
                    <CreatingInput placeholder="보증금" keyboardType="numeric" />
                    <DivText>월세 (만원)</DivText>
                    <CreatingInput placeholder="월세" keyboardType="numeric" />
                </Div>
                <Div>
                    <DivText>관리비 (만원)</DivText>
                    <CreatingInput placeholder="관리비" keyboardType="numeric" />
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
                    <CreatingInput placeholder="전용면적" keyboardType="numeric" />
                    <DivText>공급면적(㎡)</DivText>
                    <CreatingInput placeholder="공급면적" keyboardType="numeric" />
                </Div>
                <Div>
                    <DivText>대지지분(㎡)</DivText>
                    <CreatingInput placeholder="대지지분" keyboardType="numeric" />
                </Div>
                <Div>
                    <CheckboxText>주차</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={checkParking} onValueChange={(newValue) => setCheckParking(newValue)}/>
                    <CheckboxText>공실</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={checkEmpty} onValueChange={(newValue) => setCheckEmpty(newValue)}/>
                    <CheckboxText>승강기</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={checkElevator} onValueChange={(newValue) => setCheckElevator(newValue)}/>
                </Div>
                <Div>
                    <CheckboxText>대출</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={checkLoan} onValueChange={(newValue) => setCheckLoan(newValue)}/>
                    <CheckboxText>진행중</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={checkNotFinished} onValueChange={(newValue) => setCheckNotFinished(newValue)}/>
                    <CheckboxText>네이버</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={checkNaver} onValueChange={(newValue) => setCheckNaver(newValue)}/>
                </Div>    
                <Div>
                    <CheckboxText>다방</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={checkDabang} onValueChange={(newValue) => setCheckDabang(newValue)}/>
                    <CheckboxText>직방</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={checkZicbang} onValueChange={(newValue) => setCheckZicbang(newValue)}/>
                    <CheckboxText>피터팬</CheckboxText>
                    <Checkbox style={CheckboxStyle} value={checkPeterpan} onValueChange={(newValue) => setCheckPeterpan(newValue)}/>
                </Div> 
                <Div>
                    <DivText>집주인</DivText>
                    <CreatingInputAddress placeholder="집주인" />
                </Div>
                <Div>
                    <DivText>세입자</DivText>
                    <CreatingInputAddress placeholder="세입자" />
                </Div>
                <Div>
                    <DivText>상세설명</DivText>
                    <CreatingInputAddress placeholder="상세설명" />
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


export default DealVillaCreating;
