import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert } from 'react-native';
import api from "../../../api";
import { Container, ScrollContainer, Div, Item, Text, TextLong, PhoneText, PhoneTextView, Des, DetailTO, DetailTODelete, DetailTOText, DetailTODiv, DetailShareTO } from "../../../components/Detail/Detail";
import { connect } from "react-redux";
import { copyToClipboard } from "../../../components/Detail/ClipboardParams";
import * as BookItem from "../../../components/Detail/BookItem";
import { BookTitle } from "../../../components/Detail/BookTitle";


const LeaseApartmentDetail = (props) => {
    const deleteBook = (id) => {
        function sendingData(){
            AsyncStorage.getItem("csrftoken").then(value =>{
                return api.apartmentLeaseDeleting(id, value);
            }).then(data => {
                alert("아파트(임대)가 삭제되었습니다.");
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

    const [shareAddress, setShareAddress] = useState(true);
    const [shareRoom, setShareRoom] = useState(true);
    const [shareBath, setShareBath] = useState(true);
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

    return (
        <>
        <Container>
            <BookTitle props={props} />
            <ScrollContainer>
            <Div>
                <BookItem.Address item={props.route.params.address} state={shareAddress} setState={setShareAddress}/>
            </Div>
            <Div>
                <BookItem.Updated item={props.route.params.updated} />
            </Div>
            <Div>
                <BookItem.Room item={props.route.params.room} state={shareRoom} setState={setShareRoom} />
                <BookItem.Bath item={props.route.params.bath} state={shareBath} setState={setShareBath} />
            </Div>
            <Div>
                <BookItem.Deposit item={props.route.params.deposit} state={shareDeposit} setState={setShareDeposit}/>
                <BookItem.MonthFee item={props.route.params.month_fee} state={shareMonth_fee} setState={setShareMonth_fee} />
            </Div>
            <Div>
                <BookItem.ManagementFee item={props.route.params.management_fee} state={shareManagement_fee} setState={setShareManagement_fee} />
            </Div>
            <Div>
                <BookItem.Birth item={props.route.params.birth} state={shareBirth} setState={setShareBirth} />
            </Div>
            <Div>
                <BookItem.AreaM2 item={props.route.params.area_m2} state={shareArea_m2} setState={setShareArea_m2}/>
                <BookItem.TotalAreaM2 item={props.route.params.total_area_m2} state={shareTotal_area_m2} setState={setShareTotal_area_m2}/>
            </Div>
            <Div>
                <BookItem.LandM2 item={props.route.params.land_m2} state={shareLand_m2} setState={setShareLand_m2}/>
            </Div>
            <Div>
                <BookItem.Parking item={props.route.params.parking} state={shareParking} setState={setShareParking}/>
                <BookItem.Empty item={props.route.params.empty} state={shareEmpty} setState={setShareEmpty}/>
            </Div>
            <Div>
                <BookItem.Elevator item={props.route.params.elevator} state={shareElevator} setState={setShareElevator}/>
                <BookItem.Loan item={props.route.params.loan} state={shareLoan} setState={setShareLoan}/>
            </Div>
            <Div>
                <BookItem.NotFinished item={props.route.params.not_finished} />
            </Div>
            <Div>            
                <BookItem.Naver item={props.route.params.naver} />
                <BookItem.Dabang item={props.route.params.dabang} />
            </Div>
            <Div>
                <BookItem.Zicbang item={props.route.params.zicbang} />
                <BookItem.Peterpan item={props.route.params.peterpan} />
            </Div>
            <Div>
                <BookItem.OwnerPhone item={props.route.params.owner_phone} state={shareOwner_phone} setState={setShareOwner_phone}/>
            </Div>
            <Div>
                <BookItem.TenantPhone item={props.route.params.tenant_phone} state={shareTenant_phone} setState={setShareTenant_phone}/>
            </Div>
            <Div>
                <BookItem.Description item={props.route.params.description} state={shareDescription} setState={setShareDescription}/>
            </Div>
            </ScrollContainer>
            <DetailTODiv>
                <DetailShareTO onPress={() => copyToClipboard({
                    props: props, 
                    address: shareAddress, 
                    room: shareRoom, 
                    bath: shareBath, 
                    deposit: shareDeposit,
                    month_fee: shareMonth_fee,
                    management_fee: shareManagement_fee,
                    birth: shareBirth,
                    area_m2: shareArea_m2,
                    total_area_m2: shareTotal_area_m2,
                    land_m2: shareLand_m2,
                    parking: shareParking,
                    empty: shareEmpty,
                    elevator: shareElevator,
                    loan: shareLoan,
                    owner_phone: shareOwner_phone,
                    tenant_phone: shareTenant_phone,
                    description: shareDescription,
                })}>
                    <DetailTOText>매물 내용 복사(체크박스) & 공유</DetailTOText>
                </DetailShareTO>
            </DetailTODiv>
            <DetailTODiv>
                <DetailTO onPress={() => props.navigation.navigate("LeaseApartmentUpdating", props.route.params)}>
                    <DetailTOText>매물 수정</DetailTOText>
                </DetailTO>
                <DetailTODelete onPress={() => deleteBook(props.route.params.roomId)}>
                    <DetailTOText>매물 삭제</DetailTOText>
                </DetailTODelete>
            </DetailTODiv>
        </Container>
        </>
    );
};

function mapStateToProps(state){
    return state.usersReducer;
};

export default connect(mapStateToProps)(LeaseApartmentDetail);