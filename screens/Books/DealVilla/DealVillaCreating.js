import React, { useState } from "react";
import styled from "styled-components/native";
import Input from "../../../components/Auth/Input";
import Btn from "../../../components/Auth/Btn";
import colors from "../../../colors";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity, Dimensions} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import Checkbox from "expo-checkbox";


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
`;

const CreatingInputAddress = styled.TextInput`
    width: ${width/2}px;
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
    
`;

const DivText = styled.Text`
    fontSize: 18;
    marginRight: 5;
    width: 60;
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


    return(
        <ScrollView>
            <Container>
                <Div>
                    <DivText>주소</DivText>
                    <CreatingInputAddress placeholder="주소" />
                </Div>
                <Div>
                    <DivText>확인일</DivText>
                    <CreatingInput placeholder="확인일" />
                </Div>
                <Div>
                    <DivText>방</DivText>
                    <CreatingInput placeholder="방" />
                </Div>
                <Div>
                    <DivText>화장실</DivText>
                    <CreatingInput placeholder="화장실" />
                </Div>
                <Div>
                    <DivText>매매가</DivText>
                    <CreatingInput placeholder="매매가" />
                </Div>
                <Div>
                    <DivText>보증금</DivText>
                    <CreatingInput placeholder="보증금" />
                </Div>
                <Div>
                    <DivText>월세</DivText>
                    <CreatingInput placeholder="월세" />
                </Div>
                <Div>
                    <DivText>관리비</DivText>
                    <CreatingInput placeholder="관리비" />
                </Div>
                <Div>
                    <DivText>준공</DivText>
                    <CreatingInput placeholder="준공" />
                </Div>
                <Div>
                    <DivText>전용면적</DivText>
                    <CreatingInput placeholder="전용면적" />
                </Div>
                <Div>
                    <DivText>공급면적</DivText>
                    <CreatingInput placeholder="공급면적" />
                </Div>
                <Div>
                    <DivText>대지지분</DivText>
                    <CreatingInput placeholder="대지지분" />
                </Div>
                <Div>
                    <DivText>주차가능</DivText>
                    <Checkbox style={{marginBottom: 25, marginTop: 25}} value={checkParking} onValueChange={(newValue) => setCheckParking(newValue)}/>
                </Div>
                <Div>
                    <DivText>공실</DivText>
                    <Checkbox style={{marginBottom: 25, marginTop: 25}} value={checkEmpty} onValueChange={(newValue) => setCheckEmpty(newValue)}/>
                </Div>
                <Div>
                    <DivText>승강기</DivText>
                    <Checkbox style={{marginBottom: 25, marginTop: 25}} value={checkElevator} onValueChange={(newValue) => setCheckElevator(newValue)}/>
                </Div>
                <Div>
                    <DivText>대출</DivText>
                    <Checkbox style={{marginBottom: 25, marginTop: 25}} value={checkLoan} onValueChange={(newValue) => setCheckLoan(newValue)}/>
                </Div>
                <Div>
                    <DivText>진행매물</DivText>
                    <Checkbox style={{marginBottom: 25, marginTop: 25}} value={checkNotFinished} onValueChange={(newValue) => setCheckNotFinished(newValue)}/>
                </Div>
                <Div>
                    <DivText>네이버</DivText>
                    <Checkbox style={{marginBottom: 25, marginTop: 25}} value={checkNaver} onValueChange={(newValue) => setCheckNaver(newValue)}/>
                </Div>    
                <Div>
                    <DivText>다방</DivText>
                    <Checkbox style={{marginBottom: 25, marginTop: 25}} value={checkDabang} onValueChange={(newValue) => setCheckDabang(newValue)}/>
                </Div> 
                <Div>
                    <DivText>직방</DivText>
                    <Checkbox style={{marginBottom: 25, marginTop: 25}} value={checkZicbang} onValueChange={(newValue) => setCheckZicbang(newValue)}/>
                </Div> 
                <Div>
                    <DivText>피터팬</DivText>
                    <Checkbox style={{marginBottom: 25, marginTop: 25}} value={checkPeterpan} onValueChange={(newValue) => setCheckPeterpan(newValue)}/>
                </Div> 
                <CreatingInput placeholder="집주인" />
                <CreatingInput placeholder="세입자" />
                <CreatingInput placeholder="상세설명" /> 
                <Btn text={"Log in"} />
            </Container>
        </ScrollView>
    );
};


export default DealVillaCreating;
