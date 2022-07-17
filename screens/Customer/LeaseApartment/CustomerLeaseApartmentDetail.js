import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert } from 'react-native';
import api from "../../../api";
import { Container, ScrollContainer, Div, Item, Text, TextLong, Des, DetailTO, DetailTODelete, DetailTOText, DetailTODiv } from "../../../components/Detail/Detail";


const CustomerLeaseApartmentDetail = ({navigation, route: {params}}) => {
    const deleteBook = (id) => {
        function sendingData(){
            AsyncStorage.getItem("csrftoken").then(value =>{
                return api.customerApartmentLeaseDeleting(id, value);
            }).then(data => {
                alert("아파트(매매) 손님이 삭제되었습니다.");
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
            <ScrollContainer>
            <Div><Item>손님 (연락처)</Item><TextLong>{params.guest_phone}</TextLong></Div>
            <Div><Item>확인일</Item><Text>{params.updated}</Text></Div>
            <Div>
                <Item>방</Item><Text>{params.room}</Text>
            </Div>
            <Div>
                <Item>보증금</Item><Text>{params.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</Text>
                <Item>월 세</Item><Text>{params.month_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</Text>
            </Div>
            <Div>
                <Item>전용면적</Item><Text>{params.area_m2}㎡</Text>
            </Div>
            <Div>
                <Item>주차</Item><Text>{params.parking ? "O" : "X" }</Text>
                <Item>승강기</Item><Text>{params.elevator ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>대출</Item><Text>{params.loan ? "O" : "X" }</Text>
                <Item>진행매물</Item><Text>{params.not_finished ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>상세설명</Item>
                <Des>{params.description}</Des>
            </Div>
            </ScrollContainer>
            <DetailTODiv>
                <DetailTO onPress={() => navigation.navigate("CustomerLeaseApartmentUpdating", params)}>
                    <DetailTOText>손님 수정</DetailTOText>
                </DetailTO>
                <DetailTODelete onPress={() => deleteBook(params.roomId)}>
                    <DetailTOText>손님 삭제</DetailTOText>
                </DetailTODelete>
            </DetailTODiv>
        </Container>
        </>
    );
}

export default CustomerLeaseApartmentDetail;