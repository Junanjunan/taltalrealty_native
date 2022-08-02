import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert } from 'react-native';
import api from "../../../api";
import { Container, ScrollContainer, Div, Item, Text, TextLong, PhoneText, PhoneTextView, Des, DetailTO, DetailTODelete, DetailTOText, DetailTODiv } from "../../../components/Detail/Detail";
import CallAndSms from "../../../components/Detail/CallAndSms";


const CustomerDealStoreDetail = (props) => {
    const deleteBook = (id) => {
        function sendingData(){
            AsyncStorage.getItem("csrftoken").then(value =>{
                return api.customerStoreDealingDeleting(id, value);
            }).then(data => {
                alert("상가(매매) 손님이 삭제되었습니다.");
                props.navigation.navigate("Book");
            }).catch(e => console.warn(e));
        };
        Alert.alert(
            '손님 삭제',
            "해당손님을 삭제하시겠습니까?",
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
            <Div>
                <Item>손님 (연락처)</Item>
                <PhoneTextView><PhoneText>{props.route.params.guest_phone}</PhoneText></PhoneTextView>
                <CallAndSms href={props.route.params.guest_phone} />
            </Div>
            <Div><Item>확인일</Item><Text>{props.route.params.updated}</Text></Div>
            <Div><Item>매매가</Item><Text>{props.route.params.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</Text></Div>
            <Div>
                <Item>전용면적</Item><Text>{props.route.params.area_m2}㎡</Text>
            </Div>
            <Div>
                <Item>주차</Item><Text>{props.route.params.parking ? "O" : "X" }</Text>
                <Item>승강기</Item><Text>{props.route.params.elevator ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>진행손님</Item><Text>{props.route.params.not_finished ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>상세설명</Item>
                <Des>{props.route.params.description}</Des>
            </Div>
            </ScrollContainer>
            <DetailTODiv>
                <DetailTO onPress={() => props.navigation.navigate("CustomerDealStoreUpdating", props.route.params)}>
                    <DetailTOText>손님 수정</DetailTOText>
                </DetailTO>
                <DetailTODelete onPress={() => deleteBook(props.route.params.roomId)}>
                    <DetailTOText>손님 삭제</DetailTOText>
                </DetailTODelete>
            </DetailTODiv>
        </Container>
        </>
    );
}

export default CustomerDealStoreDetail;