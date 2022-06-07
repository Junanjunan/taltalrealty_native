import React from "react";
import styled from "styled-components/native";
import api from "../../api";
import Btn from "../../components/Auth/Btn";


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

const ContractDetail = ({route: {params}}) => {
    console.log(params);
    return(
        <>
        <Container>
            <Div><Item>주 소</Item><TextLong>{params.address}</TextLong></Div>
            <Div><Item>유 형</Item><TextLong>{params.types}</TextLong></Div>
            {
                params.types === "매매" 
                ? <Div><Item>매매가</Item><Text>{params.price}만원</Text></Div>
                : <Div></Div>
            }
            
            <Div>
                <Item>보증금</Item><Text>{params.deposit}만원</Text>
                <Item>월 세</Item><Text>{params.month_fee}만원</Text>
            </Div>
            <Div><Item>계약금</Item><Text>{params.start_money}만원</Text></Div>
            {
                params.middle_money
                ? <Div><Item>중도금</Item><Text>{params.middle_money}만원</Text></Div>
                : <Div></Div>
            }
            
            <Div><Item>잔금</Item><Text>{params.last_money}만원</Text></Div>
            <Div>
                <Item>계약일</Item><Text>{params.start_day}</Text>
                <Item>신고기한까지</Item><Text>{params.report_due_date}일</Text>
            </Div>
            {
                params.middle_money
                ? <Div><Item>중도금일</Item><Text>{params.middle_day}</Text></Div>
                : <Div></Div>
            }
            <Div>
                <Item>잔금일</Item><Text>{params.last_day}</Text>
                <Item>잔금일 까지</Item><Text>{params.due_days}일</Text>
            </Div>
            <Div>
                <Item>진행매물</Item><Text>{params.not_finished ? "O" : "X" }</Text>
                <Item>신고완료</Item><Text>{params.report ? "O" : "X" }</Text>
            </Div>
            <Div>
                {params.types === "매매" ? <Item>매도인</Item> : <Item>임대인</Item>}
                <Text>{params.owner_phone}</Text>
            </Div>
            <Div>
                {params.types === "매매" ? <Item>매수인</Item> : <Item>임차인</Item>}
                <Text>{params.tenant_phone}</Text>
            </Div>
        </Container>
        </>
    );
};

export default ContractDetail;