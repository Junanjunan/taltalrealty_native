import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {TouchableOpacity, Alert, ScrollView, Dimensions} from 'react-native';
import styled from "styled-components/native";
import api from "../../../api";
import Btn from "../../../components/Auth/Btn";

const { width, height } = Dimensions.get("screen");

const Container = styled.ScrollView`
    padding: 15px;
    height: 300px;
`;

const Div = styled.View`
    flexDirection: row;
    marginBottom: 10px;
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
    width: ${width*7/12}px;
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

const DealBuildingDetail = ({navigation, route: {params}}) => {
    const deleteBook = (id) => {
        function sendingData(){
            AsyncStorage.getItem("csrftoken").then(value =>{
                return api.buildingDealingDeleting(id, value);
            }).then(data => {
                alert("상가(매매)가 삭제되었습니다.");
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
            <ScrollView
                style={{height: height*2/3}}
            >
            <Div><Item>주 소</Item><TextLong>{params.address}</TextLong></Div>
            <Div><Item>확인일</Item><Text>{params.updated}</Text></Div>
            <Div><Item>매매가</Item><Text>{params.price}만원</Text></Div>
            <Div>
                <Item>지상층</Item><Text>{params.floor_top}층</Text>
                <Item>지하층</Item><Text>{params.floor_bottom}층</Text>
            </Div>
            <Div>
                <Item>준 공</Item><Text>{params.birth}</Text>
            </Div>
            <Div>
                <Item>보증금</Item><Text>{params.deposit}만원</Text>
                <Item>월 세</Item><Text>{params.month_fee}만원</Text>
            </Div>
            <Div>
                <Item>관리비</Item><Text>{params.management_fee}만원</Text>
            </Div>
            <Div>
                <Item>토지종류</Item><Text>{params.land_type}</Text>
                <Item>토지면적</Item><Text>{params.land_m2}㎡</Text>
            </Div>
            <Div>
                <Item>주차대수</Item><Text>{params.parking_number}</Text>
                <Item>건축면적</Item><Text>{params.building_area_m2}㎡</Text>
            </Div>
            <Div>
                <Item>연면적</Item><Text>{params.total_floor_area_m2}㎡</Text>
                <Item>연면적 (용적률)</Item><Text>{params.total_floor_area_m2_for_ratio}㎡</Text>
            </Div>
            <Div>
                <Item>건폐율</Item><Text>{params.building_coverage}%</Text>
                <Item>용적률</Item><Text>{params.floor_area_ratio}%</Text>
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
            </ScrollView>
            <Div>
                <TouchableOpacity>
                    <Btn 
                        text="매물 수정" 
                        onPress={() => navigation.navigate("DealBuildingUpdating", params)}
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

export default DealBuildingDetail;