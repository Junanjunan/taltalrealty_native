import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api";
import Btn from "../../components/Auth/Btn";
import { doSetNavBook } from "../../redux/navigationSlice";
import { connect } from "react-redux";
import { Container, ScrollContainer, Div, Item, Text, TextLong, Des, DetailTO, DetailTODelete, DetailTOText, DetailTODiv } from "../../components/Detail/Detail";

const ContractDetail = (props) => {
    const deleteContract = id => {
        function sendingData(){
            AsyncStorage.getItem("csrftoken").then(value =>{
                return api.contractDeleting(id, value);
            }).then(data => {
                alert("계약이 삭제되었습니다.");
                props.navigation.navigate("Book");
                props.doSetNavBook();
            }).catch(e => console.warn(e));
        };
        Alert.alert(
            "계약 삭제",
            "해당 계약을 삭제하시겠습니까?",
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
            <Div><Item>유 형</Item><TextLong>{props.route.params.types}</TextLong></Div>
            {
                props.route.params.types === "매매" 
                ? <Div><Item>매매가</Item><Text>{props.route.params.price}만원</Text></Div>
                : <Div></Div>
            }
            
            <Div>
                <Item>보증금</Item><Text>{props.route.params.deposit}만원</Text>
                <Item>월 세</Item><Text>{props.route.params.month_fee}만원</Text>
            </Div>
            <Div><Item>계약금</Item><Text>{props.route.params.start_money}만원</Text></Div>
            {
                props.route.params.middle_money
                ? <Div><Item>중도금</Item><Text>{props.route.params.middle_money}만원</Text></Div>
                : <Div></Div>
            }
            
            <Div><Item>잔금</Item><Text>{props.route.params.last_money}만원</Text></Div>
            <Div>
                <Item>계약일</Item><Text>{props.route.params.start_day}</Text>
                <Item>신고기한까지</Item><Text>{props.route.params.report_due_date}일</Text>
            </Div>
            {
                props.route.params.types === "매매"
                ? <Div><Item>중도금일</Item><Text>{props.route.params.middle_day}</Text></Div>
                : <Div></Div>
            }
            <Div>
                <Item>잔금일</Item><Text>{props.route.params.last_day}</Text>
                <Item>잔금일 까지</Item><Text>{props.route.params.due_days}일</Text>
            </Div>
            <Div>
                <Item>진행매물</Item><Text>{props.route.params.not_finished ? "O" : "X" }</Text>
                <Item>신고완료</Item><Text>{props.route.params.report ? "O" : "X" }</Text>
            </Div>
            <Div>
                {props.route.params.types === "매매" ? <Item>매도인</Item> : <Item>임대인</Item>}
                <Text>{props.route.params.owner_phone}</Text>
            </Div>
            <Div>
                {props.route.params.types === "매매" ? <Item>매수인</Item> : <Item>임차인</Item>}
                <Text>{props.route.params.tenant_phone}</Text>
            </Div>
            <Div>
                <Item>특이사항</Item><Text>{props.route.params.description}</Text>
            </Div>
            <DetailTODiv>
                <DetailTO onPress={() => props.navigation.navigate("ContractUpdating", props.route.params)}>
                    <DetailTOText>계약 수정</DetailTOText>
                </DetailTO>
                <DetailTODelete onPress={() => deleteContract(props.route.params.contractId)}>
                    <DetailTOText>계약 삭제</DetailTOText>
                </DetailTODelete>
            </DetailTODiv>
        </Container>
        </>
    );
};

function mapDispatchToProps(dispatch){
    return {
        doSetNavBook: () => dispatch(doSetNavBook()),
    }
};

export default connect(null, mapDispatchToProps)(ContractDetail);