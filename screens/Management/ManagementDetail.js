import React from "react";
import styled from "styled-components/native";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, TouchableOpacity, Alert} from 'react-native';
import api from "../../api";
import Btn from "../../components/Auth/Btn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doSetNavBook } from "../../redux/navigationSlice";
import { connect } from "react-redux";
import { Container, ScrollContainer, Div, Item, Text, TextLong, Des, DetailTO, DetailTODelete, DetailTOText, DetailTODiv } from "../../components/Detail/Detail";


const ManagementDetail = (props) => {
    const deleteManagement = id => {
        function sendingData(){
            try{
                AsyncStorage.getItem("csrftoken").then(value =>{
                    return api.managementDeleting(id, value);
                }).then(data => {
                    alert("관리매물이 삭제되었습니다.");
                    props.navigation.navigate("Book");
                    props.doSetNavBook();
                })
            } catch(e){
                console.warn(e);
            }
        };
        Alert.alert(
            "임대매물 삭제",
            "해당 임대매물을 삭제하시겠습니까?",
            [
                {
                    text:"아니요",
                    style: "cancel"
                },
                {
                    text:"네",
                    onPress: () => sendingData()
                }
            ]
        )
    }
    return(
        <>
        <Container>
            <Div><Item>주 소</Item><TextLong>{props.route.params.address}</TextLong></Div>
            <Div>
                <Item>보증금</Item><Text>{props.route.params.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 만원</Text>
                <Item>월 세</Item><Text>{props.route.params.month_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 만원</Text>
            </Div>
            <Div>
                <Item>관리비</Item><Text>{props.route.params.management_fee} 만원</Text>
                <Item>주차비</Item><Text>{props.route.params.parking_fee} 만원</Text>
            </Div>
            <Div>
                <Item>계약일</Item><Text>{props.route.params.contract_day}</Text>
            </Div>
            <Div>
                <Item>거래신고</Item><Text>{props.route.params.deal_report ? "O" : "X"}</Text>
                {
                    props.route.params.deal_report ?
                    <Item></Item> :
                    <><Item>거래신고 잔여일</Item><Text>{props.route.params.report_due_day} 일</Text></>
                }
            </Div>
            <Div>
                <Item>입주일</Item><Text>{props.route.params.contract_start_day}</Text>
                <Item>만기일</Item><Text>{props.route.params.contract_last_day}</Text>
            </Div>
            <Div>
                <Item>만기일 까지</Item><Text>{props.route.params.rest_contract_day} 일</Text>
            </Div>
            <Div>
                <Item>갱신기간 (180~60일)</Item><Text>{props.route.params.renewal_period === true ? "O" : "X"}</Text>
                <Item>갱신 고지 여부</Item><Text>{props.route.params.deal_renewal_notice === true ? "O" : "X"}</Text>
            </Div>
            <Div>
                <Item>갱신청구권 사용여부</Item><Text>{props.route.params.deal_renewal_right_usage === true  ? "O" : "X"}</Text>
            </Div>
            <Div>
                <Item>임대인</Item><Text>{props.route.params.owner_phone}</Text>
            </Div>
            <Div>
                <Item>임차인</Item><Text>{props.route.params.tenant_phone}</Text>
            </Div>
            <Div>
                <Item>특이사항</Item><Text>{props.route.params.description}</Text>
            </Div>
            <DetailTODiv>
                <DetailTO onPress={() => props.navigation.navigate("ManagementUpdating", props.route.params)}>
                    <DetailTOText>매물 수정</DetailTOText>
                </DetailTO>
                <DetailTODelete onPress={() => deleteManagement(props.route.params.managementId)}>
                    <DetailTOText>매물 삭제</DetailTOText>
                </DetailTODelete>
            </DetailTODiv>
        </Container>
        </>
    );
}

function mapDispatchToProps(dispatch){
    return {
        doSetNavBook: () => dispatch(doSetNavBook()),
    }
};

export default connect(null, mapDispatchToProps)(ManagementDetail);
