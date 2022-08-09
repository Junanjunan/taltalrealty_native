import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Alert } from 'react-native';
import api from "../../../api";
import { Container, ScrollContainer, Div, DetailTO, DetailShareTO, DetailTODelete, DetailTOText, DetailTODiv } from "../../../components/Detail/Detail";
import * as BookItem from "../../../components/Detail/BookItem";
import { copyToClipboard } from "../../../components/Detail/ClipboardParams";
import { BookTitle } from "../../../components/Detail/BookTitle";


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
    };

    const [shareAddress, setShareAddress] = useState(true);
    const [sharePrice, setSharePrice] = useState(true);
    const [shareDeposit, setShareDeposit] = useState(true);
    const [shareMonth_fee, setShareMonth_fee] = useState(true);
    const [shareManagement_fee, setShareManagement_fee] = useState(true);
    const [shareBirth, setShareBirth] = useState(true);
    const [shareElevator, setShareElevator] = useState(true);
    const [shareLoan, setShareLoan] = useState(true);
    const [shareOwner_phone, setShareOwner_phone] = useState(false);
    const [shareTenant_phone, setShareTenant_phone] = useState(false);
    const [shareDescription, setShareDescription] = useState(false);

    const [shareFloor_top, setShareFloor_top] = useState(true);
    const [shareFloor_bottom, setShareFloor_bottom] = useState(true);
    const [shareLand_type, setShareLand_type] = useState(true);
    const [shareLandM2Building, setShareLandM2Building] = useState(true);
    const [shareParking_number, setShareParking_number] = useState(true);
    const [shareBuilding_area_m2, setShareBuilding_area_m2] = useState(true);
    const [shareTotal_floor_area_m2, setShareTotal_floor_area_m2] = useState(true);
    const [shareTotal_floor_area_m2_for_ratio, setShareTotal_floor_area_m2_for_ratio] = useState(true);
    const [shareBuilding_coverage, setShareBuilding_coverage] = useState(true);
    const [shareFloor_area_ratio, setShareFloor_area_ratio] = useState(true);
    

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
                <BookItem.Price item={props.route.params.price} state={sharePrice} setState={setSharePrice} />
            </Div>
            <Div>
                <BookItem.FloorTop item={props.route.params.floor_top} state={shareFloor_top} setState={setShareFloor_top} />
                <BookItem.FloorBottom item={props.route.params.floor_bottom} state={shareFloor_bottom} setState={setShareFloor_bottom} />
            </Div>
            <Div>
                <BookItem.Birth item={props.route.params.birth} state={shareBirth} setState={setShareBirth} />
            </Div>
            <Div>
                <BookItem.Deposit item={props.route.params.deposit} state={shareDeposit} setState={setShareDeposit}/>
                <BookItem.MonthFee item={props.route.params.month_fee} state={shareMonth_fee} setState={setShareMonth_fee} />
            </Div>
            <Div>
                <BookItem.ManagementFee item={props.route.params.management_fee} state={shareManagement_fee} setState={setShareManagement_fee} />
            </Div>
            <Div>
                <BookItem.LandType item={props.route.params.land_type} state={shareLand_type} setState={setShareLand_type} />
                <BookItem.LandM2Building item={props.route.params.land_m2} state={shareLandM2Building} setState={setShareLandM2Building} />
            </Div>
            <Div>
                <BookItem.ParkingNumber item={props.route.params.parking_number} state={shareParking_number} setState={setShareParking_number} />
                <BookItem.BuildingAreaM2 item={props.route.params.building_area_m2} state={shareBuilding_area_m2} setState={setShareBuilding_area_m2} />
            </Div>
            <Div>
                <BookItem.TotalFloorAreaM2 item={props.route.params.total_floor_area_m2} state={shareTotal_floor_area_m2} setState={setShareTotal_floor_area_m2} />
                <BookItem.TotalFloorAreaM2ForRatio item={props.route.params.shareTotal_floor_area_m2_for_ratio} state={shareTotal_floor_area_m2_for_ratio} setState={setShareTotal_floor_area_m2_for_ratio} />
            </Div>
            <Div>
                <BookItem.BuildingCoverage item={props.route.params.building_coverage} state={shareBuilding_coverage} setState={setShareBuilding_coverage} />
                <BookItem.FloorAreaRatio item={props.route.params.floor_area_ratio} state={shareFloor_area_ratio} setState={setShareFloor_area_ratio} />
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
                    price: sharePrice,
                    deposit: shareDeposit,
                    month_fee: shareMonth_fee,
                    management_fee: shareManagement_fee,
                    birth: shareBirth,
                    elevator: shareElevator,
                    loan: shareLoan,
                    owner_phone: shareOwner_phone,
                    tenant_phone: shareTenant_phone,
                    description: shareDescription,

                    floor_top: shareFloor_top,
                    floor_bottom: shareFloor_bottom,
                    land_type: shareLand_type,
                    land_m2_building: shareLandM2Building,
                    parking_number: shareParking_number,
                    building_area_m2: shareBuilding_area_m2,
                    total_floor_area_m2: shareTotal_floor_area_m2,
                    total_floor_area_m2_for_ratio: shareTotal_floor_area_m2_for_ratio,
                    building_coverage: shareBuilding_coverage,
                    floor_area_ratio: shareFloor_area_ratio
                    
                })}>
                    <DetailTOText>매물 내용 복사(체크박스) & 공유</DetailTOText>
                </DetailShareTO>
            </DetailTODiv>
            <DetailTODiv>
                <DetailTO onPress={() => props.navigation.navigate("DealBuildingUpdating", props.route.params)}>
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


export default connect(mapStateToProps)(DealBuildingDetail);