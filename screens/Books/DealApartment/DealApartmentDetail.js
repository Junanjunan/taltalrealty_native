import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert } from 'react-native';
import api from "../../../api";
import { Container, ScrollContainer, Div, Item, Text, TextLong, PhoneText, PhoneTextView, Des, DetailTO, DetailTODelete, DetailTOText, DetailTODiv } from "../../../components/Detail/Detail";
import CallAndSms from "../../../components/Detail/CallAndSms";
import * as Clipboard from 'expo-clipboard';


const DealApartmentDetail = (props) => {
    const deleteBook = (id) => {
        function sendingData(){
            AsyncStorage.getItem("csrftoken").then(value =>{
                return api.apartmentDealingDeleting(id, value);
            }).then(data => {
                alert("아파트(매매)가 삭제되었습니다.");
                props.navigation.navigate("Book");
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
    };

    
    const copyToClipboard = async () => {
        
        // await Clipboard.setStringAsync(`주소: ${props.route.params.address}\n방: ${props.route.params.room}\n화장실:${props.route.params.bath}\n매매가: ${props.route.params.price}`);
        const Params = JSON.stringify(props.route.params)
        await Clipboard.setStringAsync(Params);
    };

    return (
        <>
        <Container>
            <ScrollContainer>
            <Div><Item>주 소</Item><TextLong>{props.route.params.address}</TextLong></Div>
            <Div><Item>확인일</Item><Text>{props.route.params.updated}</Text></Div>
            <Div>
                <Item>방</Item><Text>{props.route.params.room}</Text>
                <Item>화장실</Item><Text>{props.route.params.bath}</Text>
            </Div>
            <Div><Item>매매가</Item><Text>{props.route.params.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</Text></Div>
            <Div>
                <Item>보증금</Item><Text>{props.route.params.deposit ? props.route.params.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}만원</Text>
                <Item>월 세</Item><Text>{props.route.params.month_fee ? props.route.params.month_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}만원</Text>
            </Div>
            <Div>
                <Item>관리비</Item><Text>{props.route.params.management_fee}만원</Text>
            </Div>
            <Div><Item>준 공</Item><Text>{props.route.params.birth}</Text></Div>
            <Div>
                <Item>전용면적</Item><Text>{props.route.params.area_m2}㎡</Text>
                <Item>공급면적</Item><Text>{props.route.params.total_area_m2}㎡</Text>
            </Div>
            <Div>
                <Item>대지지분</Item><Text>{props.route.params.land_m2}㎡</Text>
            </Div>
            <Div>
                <Item>주차가능</Item><Text>{props.route.params.parking ? "O" : "X" }</Text>
                <Item>공 실</Item><Text>{props.route.params.empty ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>승강기</Item><Text>{props.route.params.elevator ? "O" : "X" }</Text>
                <Item>대 출</Item><Text>{props.route.params.loan ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>진행매물</Item><Text>{props.route.params.not_finished ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>네이버</Item><Text>{props.route.params.naver ? "O" : "X" }</Text>
                <Item>다 방</Item><Text>{props.route.params.dabang ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>직 방</Item><Text>{props.route.params.zicbang ? "O" : "X" }</Text>
                <Item>피터팬</Item><Text>{props.route.params.peterpan ? "O" : "X" }</Text>
            </Div>
            <Div>
                <Item>집주인</Item>
                <PhoneTextView><PhoneText>{props.route.params.owner_phone}</PhoneText></PhoneTextView>
                <CallAndSms href={props.route.params.owner_phone} />
            </Div>
            <Div>
                <Item>세입자</Item>
                <PhoneTextView><PhoneText>{props.route.params.tenant_phone}</PhoneText></PhoneTextView>
                <CallAndSms href={props.route.params.tenant_phone} />
            </Div>
            <Div>
                <Item>상세설명</Item>
                <Des>{props.route.params.description}</Des>
            </Div>
            <DetailTODiv>
                <DetailTO onPress={copyToClipboard}>
                    <DetailTOText>매물 내용 복사하러가기</DetailTOText>
                </DetailTO>
                {/* <DetailTODelete onPress={() => deleteBook(props.route.params.roomId)}>
                    <DetailTOText>매물 삭제</DetailTOText>
                </DetailTODelete> */}
            </DetailTODiv>
            </ScrollContainer>
            
            <DetailTODiv>
                <DetailTO onPress={() => props.navigation.navigate("DealApartmentUpdating", props.route.params)}>
                    <DetailTOText>매물 수정</DetailTOText>
                </DetailTO>
                <DetailTODelete onPress={() => deleteBook(props.route.params.roomId)}>
                    <DetailTOText>매물 삭제</DetailTOText>
                </DetailTODelete>
            </DetailTODiv>
        </Container>
        </>
    );
}

export default DealApartmentDetail;