import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {TouchableOpacity, Alert} from 'react-native';
import styled from "styled-components/native";
import api from "../../../api";
import Btn from "../../../components/Auth/Btn";


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

const DealOfficetelDetail = ({navigation, route: {params}}) => {
    const deleteBook = (id) => {
        function sendingData(){
            AsyncStorage.getItem("csrftoken").then(value =>{
                return api.officetelDealingDeleting(id, value);
            }).then(data => {
                alert("아파트(매매)가 삭제되었습니다.");
                navigation.navigate("Book");
            }).catch(e => console.warn(e));
        };
        Alert.alert(
            '매물 삭제',
            "해당매물을 삭제하시겠습니까?",
            [
                {
                    text: "아니요",
                    style: "cancel"
                },
                {
                    text: "네",
                    onPress: () => sendingData()
                },
            ]
        )
    }

    return (
        <>
        <Container>
            <Div><Item>주 소</Item><TextLong>{params.address}</TextLong></Div>
            <Div><Item>확인일</Item><Text>{params.updated}</Text></Div>
            <Div>
                <Item>방</Item><Text>{params.room}</Text>
                <Item>화장실</Item><Text>{params.bath}</Text>
            </Div>
            <Div><Item>매매가</Item><Text>{params.price}만원</Text></Div>
            <Div>
                <Item>보증금</Item><Text>{params.deposit}만원</Text>
                <Item>월 세</Item><Text>{params.month_fee}만원</Text>
            </Div>
            <Div>
                <Item>관리비</Item><Text>{params.management_fee}만원</Text>
            </Div>
            <Div><Item>준 공</Item><Text>{params.birth}</Text></Div>
            <Div>
                <Item>전용면적</Item><Text>{params.area_m2}㎡</Text>
                <Item>공급면적</Item><Text>{params.total_area_m2}㎡</Text>
            </Div>
            <Div>
                <Item>대지지분</Item><Text>{params.land_m2}㎡</Text>
            </Div>
            <Div>
                <Item>주차가능</Item><Text>{params.parking ? "O" : "X" }</Text>
                <Item>공 실</Item><Text>{params.empty ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>승강기</Item><Text>{params.elevator ? "O" : "X" }</Text>
                <Item>대 출</Item><Text>{params.loan ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>진행매물</Item><Text>{params.not_finished ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>네이버</Item><Text>{params.naver ? "O" : "X" }</Text>
                <Item>다 방</Item><Text>{params.dabang ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>직 방</Item><Text>{params.zicbang ? "O" : "X" }</Text>
                <Item>피터팬</Item><Text>{params.peterpan ? "O" : "X" }</Text>
            </Div>
            <Div><Item>집주인</Item><Text>{params.owner_phone}</Text></Div>
            <Div><Item>세입자</Item><Text>{params.tenant_phone}</Text></Div>
            <Div>
                <Item>상세설명</Item>
                <Des>{params.description}</Des>
            </Div>
            <Div>
                <TouchableOpacity>
                    <Btn 
                        text="매물 수정" 
                        onPress={() => navigation.navigate("DealOfficetelUpdating", params)}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Btn 
                        text="매물 삭제" 
                        onPress={() => deleteBook(params.roomId)}/>
                    </TouchableOpacity>
            </Div>
        </Container>
        </>
    );
}

export default DealOfficetelDetail;