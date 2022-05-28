import React from "react";
// import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity,} from 'react-native';
import styled from "styled-components/native";
import api from "../../api";

const Container = styled.View`
    padding: 15px;
`;

const Div = styled.View`
    flexDirection: row;
    marginBottom: 5px;
`;

const Item = styled.Text`
    width: 60px;
    margin: 5px;
    fontSize: 17px;
`;

const Text = styled.Text`
    width: 100px;
    margin: 5px;
    fontSize: 17px;
`;

const TextLong = styled.Text`
    margin: 5px;
    fontSize: 15px;
`;

const Des = styled.Text`
    margin: 5px;
    fontSize: 17px;
    margin: 5px;
`;

const Center = styled.View`
    alignItems: center;
`;

const Address = styled.Text`
    alignItems:center;
    margin: 5px;
`;

const ApartDetail = ({route: {params}}) => {
    console.log(params);
    return (
        <Container>
            <Div><Item>주 소</Item><TextLong>{params[0]}</TextLong></Div>
            <Div><Item>확인일</Item><Text>{params[5]}</Text></Div>
            <Div>
                <Item>방</Item><Text>{params[2]}</Text>
                <Item>화장실</Item><Text>{params[9]}</Text>
            </Div>
            <Div><Item>매매가</Item><Text>{params[1]}만원</Text></Div>
            <Div>
                <Item>보증금</Item><Text>{params[6]}만원</Text>
                <Item>월 세</Item><Text>{params[7]}만원</Text>
            </Div>
            <Div>
                <Item>관리비</Item><Text>{params[8]}만원</Text>
            </Div>
            <Div><Item>준 공</Item><Text>{params[3]}</Text></Div>
            <Div>
                <Item>전용면적</Item><Text>{params[4]}㎡</Text>
                <Item>공급면적</Item><Text>{params[10]}㎡</Text>
            </Div>
            <Div>
                <Item>대지지분</Item><Text>{params[11]}㎡</Text>
            </Div>
            <Div>
                <Item>주차가능</Item><Text>{params[12] ? "O" : "X" }</Text>
                <Item>공 실</Item><Text>{params[15] ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>승강기</Item><Text>{params[13] ? "O" : "X" }</Text>
                <Item>대 출</Item><Text>{params[14] ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>진행매물</Item><Text>{params[16] ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>네이버</Item><Text>{params[17] ? "O" : "X" }</Text>
                <Item>다 방</Item><Text>{params[18] ? "O" : "X" }</Text>
            </Div>
            <Div>
            <Item>직 방</Item><Text>{params[19] ? "O" : "X" }</Text>
            <Item>피터팬</Item><Text>{params[20] ? "O" : "X" }</Text>
            </Div>
            <Div><Item>집주인</Item><Text>{params[21]}</Text></Div>
            <Div><Item>세입자</Item><Text>{params[22]}</Text></Div>
            <Div>
                <Item>상세설명</Item>
                <Des>{params[23]}</Des>
            </Div>
        </Container>
    );
}

export default ApartDetail;