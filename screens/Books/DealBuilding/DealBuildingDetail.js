import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert } from 'react-native';
import api from "../../../api";
import { Container, ScrollContainer, Div, Item, Text, TextLong, Des, DetailTO, DetailTODelete, DetailTOText } from "../../../components/Detail/Detail";


const DealBuildingDetail = (props) => {
    const deleteBook = (id) => {
        function sendingData(){
            AsyncStorage.getItem("csrftoken").then(value =>{
                return api.buildingDealingDeleting(id, value);
            }).then(data => {
                alert("건물(매매)가 삭제되었습니다.");
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
    }

    return (
        <>
        
        <Container>
            <ScrollContainer>
            <Div><Item>주 소</Item><TextLong>{props.route.params.address}</TextLong></Div>
            <Div><Item>확인일</Item><Text>{props.route.params.updated}</Text></Div>
            <Div><Item>매매가</Item><Text>{props.route.params.price}만원</Text></Div>
            <Div>
                <Item>지상층</Item><Text>{props.route.params.floor_top}층</Text>
                <Item>지하층</Item><Text>{props.route.params.floor_bottom}층</Text>
            </Div>
            <Div>
                <Item>준 공</Item><Text>{props.route.params.birth}</Text>
            </Div>
            <Div>
                <Item>보증금</Item><Text>{props.route.params.deposit}만원</Text>
                <Item>월 세</Item><Text>{props.route.params.month_fee}만원</Text>
            </Div>
            <Div>
                <Item>관리비</Item><Text>{props.route.params.management_fee}만원</Text>
            </Div>
            <Div>
                <Item>토지종류</Item><Text>{props.route.params.land_type}</Text>
                <Item>토지면적</Item><Text>{props.route.params.land_m2}㎡</Text>
            </Div>
            <Div>
                <Item>주차대수</Item><Text>{props.route.params.parking_number}</Text>
                <Item>건축면적</Item><Text>{props.route.params.building_area_m2}㎡</Text>
            </Div>
            <Div>
                <Item>연면적</Item><Text>{props.route.params.total_floor_area_m2}㎡</Text>
                <Item>연면적 (용적률)</Item><Text>{props.route.params.total_floor_area_m2_for_ratio}㎡</Text>
            </Div>
            <Div>
                <Item>건폐율</Item><Text>{props.route.params.building_coverage}%</Text>
                <Item>용적률</Item><Text>{props.route.params.floor_area_ratio}%</Text>
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
            <Div><Item>집주인</Item><Text>{props.route.params.owner_phone}</Text></Div>
            <Div><Item>세입자</Item><Text>{props.route.params.tenant_phone}</Text></Div>
            <Div>
                <Item>상세설명</Item>
                <Des>{props.route.params.description}</Des>
            </Div>
            </ScrollContainer>
            <Div>
                <DetailTO onPress={() => props.navigation.navigate("DealBuildingUpdating", props.route.params)}>
                    <DetailTOText>매물 수정</DetailTOText>
                </DetailTO>
                <DetailTODelete onPress={() => deleteBook(props.route.params.roomId)}>
                    <DetailTOText>매물 삭제</DetailTOText>
                </DetailTODelete>
            </Div>
        </Container>
        
        </>
    );
}

export default DealBuildingDetail;