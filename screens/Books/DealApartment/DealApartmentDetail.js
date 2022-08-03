import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Alert } from 'react-native';
import api from "../../../api";
import { Container, ScrollContainer, Div, BindingDiv, Item, Text, TextLong, PhoneText, PhoneTextView, Des, DetailTO, DetailShareTO, DetailTODelete, DetailTOText, DetailTODiv } from "../../../components/Detail/Detail";
import { ShareCheckboxStyle } from "../../../components/Detail/Creating";
import CallAndSms from "../../../components/Detail/CallAndSms";
import * as Clipboard from 'expo-clipboard';
import Checkbox from "expo-checkbox";

var profileData;

function getProfile(id){
    profileData = api.profile(id);
    return profileData;
};



const DealApartmentDetail = (props) => {
    console.log(props.id);
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

    const [office, set_office] = useState("");
    const [tel, set_tel] = useState("");

    getProfile(props.id)
    .then(
        results => {
            set_office(results.data.office);
            set_tel(results.data.tel)
        }
    );

    const [shareAddress, setShareAddress] = useState(true);
    const [shareRoom, setShareRoom] = useState(true);
    const [shareBath, setShareBath] = useState(true);
    const [sharePrice, setSharePrice] = useState(true);
    const [shareDeposit, setShareDeposit] = useState(true);
    const [shareMonth_fee, setShareMonth_fee] = useState(true);
    const [shareManagement_fee, setShareManagement_fee] = useState(true);
    const [shareBirth, setShareBirth] = useState(true);
    const [shareArea_m2, setShareArea_m2] = useState(true);
    const [shareTotal_area_m2, setShareTotal_area_m2] = useState(true);
    const [shareLand_m2, setShareLand_m2] = useState(true);
    const [shareParking, setShareParking] = useState(true);
    const [shareEmpty, setShareEmpty] = useState(true);
    const [shareElevator, setShareElevator] = useState(true);
    const [shareLoan, setShareLoan] = useState(true);
    const [shareOwner_phone, setShareOwner_phone] = useState(false);
    const [shareTenant_phone, setShareTenant_phone] = useState(false);
    const [shareDescription, setShareDescription] = useState(false);


    async function copyToClipboard (
        props, address, room, bath, price, deposit, month_fee, 
        management_fee, birth, area_m2, total_area_m2, land_m2, 
        parking, empty, elevator, loan, owner_phone, tenant_phone, description
        ){
        const Params = `${address ? `주소: ${props.route.params.address},\n` : ""}${room ? `방: ${props.route.params.room},\n` : ""}${bath ? `화장실: ${props.route.params.bath ? props.route.params.bath : 0},\n` : ""}${price ? `매매가: ${props.route.params.price}만원,\n` : ""}${deposit ? `보증금: ${props.route.params.deposit ? props.route.params.deposit : 0}만원,\n` : ""}${month_fee ? `월세: ${props.route.params.month_fee ? props.route.params.month_fee : 0}만원,\n` : ""}${management_fee ? `관리비: ${props.route.params.management_fee ? props.route.params.management_fee : 0}만원,\n` : ""}${birth ? `준공: ${props.route.params.birth},\n` : ""}${area_m2 ? `전용면적: ${props.route.params.area_m2}㎡,\n` : ""}${total_area_m2 ? `공급면적: ${props.route.params.total_area_m2 ? props.route.params.total_area_m2 : 0}㎡,\n` : ""}${land_m2 ? `대지지분: ${props.route.params.land_m2 ? props.route.params.land_m2 : 0}㎡,\n` : ""}${parking ? `주차가능: ${props.route.params.parking ? "O" : "X"},\n` : ""}${empty ? `공실: ${props.route.params.empty ? "O" : "X"},\n` : ""}${elevator ? `승강기: ${props.route.params.elevator ? "O" : "X"},\n` : ""}${loan ? `대출: ${props.route.params.loan ? "O" : "X"},\n` : ""}${owner_phone ? `매도인: ${props.route.params.owner_phone ? props.route.params.owner_phone : ""},\n` : ""}${tenant_phone ? `세입자: ${props.route.params.tenant_phone ? props.route.params.tenant_phone : ""},\n` : ""}${description ? `상세설명: ${props.route.params.description ? props.route.params.description : "" },\n` : ""}${`\n${office},\n`}${`연락처: ${tel},\n`}            
        `;
        await Clipboard.setStringAsync(Params);
    };

    return (
        <>
        <Container>
            <ScrollContainer>
            <Div>
                <BindingDiv onPress={() => setShareAddress(!shareAddress)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareAddress}/>
                    {/* <Checkbox style={ShareCheckboxStyle}  value={shareAddress} onValueChange={(newValue) => setShareAddress(newValue)}/> */}
                    <Item>주 소</Item><TextLong>{props.route.params.address}</TextLong>
                </BindingDiv>
            </Div>
            <Div><Item>확인일</Item><Text>{props.route.params.updated}</Text></Div>
            <Div>
                <BindingDiv onPress={() => setShareRoom(!shareRoom)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareRoom}/>
                    <Item>방</Item><Text>{props.route.params.room}</Text>
                </BindingDiv>
                <BindingDiv onPress={() => setShareBath(!shareBath)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareBath}/>
                    <Item>화장실</Item><Text>{props.route.params.bath}</Text>
                </BindingDiv>
            </Div>
            <Div>
                <BindingDiv onPress={() => setSharePrice(!sharePrice)}>
                    <Checkbox style={ShareCheckboxStyle} value={sharePrice}/>
                    <Item>매매가</Item><Text>{props.route.params.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</Text>
                </BindingDiv>
            </Div>
            <Div>
                <BindingDiv onPress={() => setShareDeposit(!shareDeposit)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareDeposit} onValueChange={(newValue) => setShareDeposit(newValue)}/>
                    <Item>보증금</Item><Text>{props.route.params.deposit ? props.route.params.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}만원</Text>
                </BindingDiv>
                <BindingDiv onPress={() => setShareMonth_fee(!shareMonth_fee)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareMonth_fee} onValueChange={(newValue) => setShareMonth_fee(newValue)}/>
                    <Item>월 세</Item><Text>{props.route.params.month_fee ? props.route.params.month_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}만원</Text>
                </BindingDiv>
            </Div>
            <Div>
                <BindingDiv onPress={() => setShareManagement_fee(!shareManagement_fee)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareManagement_fee} onValueChange={(newValue) => setShareManagement_fee(newValue)}/>
                    <Item>관리비</Item><Text>{props.route.params.management_fee}만원</Text>
                </BindingDiv>
            </Div>
            <Div>
                <BindingDiv onPress={() => setShareBirth(!shareBirth)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareBirth} onValueChange={(newValue) => setShareBirth(newValue)}/>
                    <Item>준 공</Item><Text>{props.route.params.birth}</Text>
                </BindingDiv>
            </Div>
            <Div>
                <BindingDiv onPress={() => setShareArea_m2(!shareArea_m2)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareArea_m2} onValueChange={(newValue) => setShareArea_m2(newValue)}/>
                    <Item>전용면적</Item><Text>{props.route.params.area_m2}㎡</Text>
                </BindingDiv>
                <BindingDiv onPress={() => setShareTotal_area_m2(!shareTotal_area_m2)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareTotal_area_m2} onValueChange={(newValue) => setShareTotal_area_m2(newValue)}/>
                    <Item>공급면적</Item><Text>{props.route.params.total_area_m2}㎡</Text>
                </BindingDiv>
            </Div>
            <Div>
                <BindingDiv onPress={() => setShareLand_m2(!shareLand_m2)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareLand_m2} onValueChange={(newValue) => setShareLand_m2(newValue)}/>
                    <Item>대지지분</Item><Text>{props.route.params.land_m2}㎡</Text>
                </BindingDiv>
            </Div>
            <Div>
                <BindingDiv onPress={() => setShareParking(!shareParking)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareParking} onValueChange={(newValue) => setShareParking(newValue)}/>
                    <Item>주차가능</Item><Text>{props.route.params.parking ? "O" : "X" }</Text>
                </BindingDiv>
                <BindingDiv onPress={() => setShareEmpty(!shareEmpty)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareEmpty} onValueChange={(newValue) => setShareEmpty(newValue)}/>
                    <Item>공 실</Item><Text>{props.route.params.empty ? "O" : "X" }</Text>
                </BindingDiv>
            </Div>
            <Div>
                <BindingDiv onPress={() => setShareElevator(!shareElevator)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareElevator} onValueChange={(newValue) => setShareElevator(newValue)}/>
                    <Item>승강기</Item><Text>{props.route.params.elevator ? "O" : "X" }</Text>
                </BindingDiv>
                <BindingDiv onPress={() => setShareLoan(!shareLoan)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareLoan} onValueChange={(newValue) => setShareLoan(newValue)}/>
                    <Item>대 출</Item><Text>{props.route.params.loan ? "O" : "X" }</Text>
                </BindingDiv>
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
                <BindingDiv onPress={() => setShareOwner_phone(!shareOwner_phone)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareOwner_phone} onValueChange={(newValue) => setShareOwner_phone(newValue)}/>
                    <Item>집주인</Item>
                    <PhoneTextView><PhoneText>{props.route.params.owner_phone}</PhoneText></PhoneTextView>
                </BindingDiv>
                <CallAndSms href={props.route.params.owner_phone} />
            </Div>
            <Div>
                <BindingDiv onPress={() => setShareTenant_phone(!shareTenant_phone)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareTenant_phone} onValueChange={(newValue) => setShareTenant_phone(newValue)}/>
                    <Item>세입자</Item>
                    <PhoneTextView><PhoneText>{props.route.params.tenant_phone}</PhoneText></PhoneTextView>
                </BindingDiv>
                <CallAndSms href={props.route.params.tenant_phone} />
            </Div>
            <Div>
                <BindingDiv onPress={() => setShareDescription(!shareDescription)}>
                    <Checkbox style={ShareCheckboxStyle} value={shareDescription} onValueChange={(newValue) => setShareDescription(newValue)}/>
                    <Item>상세설명</Item>
                    <Des>{props.route.params.description}</Des>
                </BindingDiv>
            </Div>
            
            </ScrollContainer>
            <DetailTODiv>
                <DetailShareTO onPress={() => copyToClipboard(
                    props, 
                    shareAddress, 
                    shareRoom, 
                    shareBath, 
                    sharePrice,
                    shareDeposit,
                    shareMonth_fee,
                    shareManagement_fee,
                    shareBirth,
                    shareArea_m2,
                    shareTotal_area_m2,
                    shareLand_m2,
                    shareParking,
                    shareEmpty,
                    shareElevator,
                    shareLoan,
                    shareOwner_phone,
                    shareTenant_phone,
                    shareDescription,
                    )}>
                    <DetailTOText>매물 내용 복사(체크박스)</DetailTOText>
                </DetailShareTO>
            </DetailTODiv>
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

function mapStateToProps(state){
    return state.usersReducer;
};

export default connect(mapStateToProps)(DealApartmentDetail);