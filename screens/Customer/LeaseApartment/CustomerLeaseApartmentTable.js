import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getCustomerLeaseApartment } from "../../../redux/apartmentSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";
import { TableWidth } from "../../../components/DivCollection";
import { BookTitle } from "../../../components/Detail/BookTitle";


export const UnitWidth = TableWidth/9;

export const fields = [
    { key: 'guest_phone', title: '손님(연락처)', width:UnitWidth*2.25},
    { key: 'room', title: '방', width:UnitWidth*2/3},
    { key: 'deposit', title: '보증금', width:UnitWidth*1.2},
    { key: 'month_fee', title: '월세', width:UnitWidth},
    { key: 'area_m2', title: '면적(㎡)', width:UnitWidth*1.2},
    { key: 'parking', title: '주차', width:UnitWidth*2/3},
    { key: 'elevator', title: '승강기', width:UnitWidth*2/3},
    { key: 'loan', title: '대출', width:UnitWidth*2/3},
    { key: 'not_finished', title: '진행매물', width:UnitWidth*2/3},
];

export const hiddenFields = [
    { key: 'updated', title: '확인일', width:100},
    { key: 'guest_phone', title: '연락처', width:100},
    { key: 'description', title: '상세설명', width:100},
    { key: 'roomId', title: 'ID', width: 100}
]

export const allFields = fields.concat(hiddenFields);

const CustomerLeaseApartmentTable = (props) => {
    const [guest_phone, setGuest_phone] = useState();
    const [room, setRoom] = useState();
    const [deposit, setDeposit] = useState();
    const [month_fee, setMonth_fee] = useState();
    const [area_m2, setArea_m2] = useState();
    const [parking, setParking] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [loan, setLoan] = useState(false);
    const [not_finished, setNot_finished] = useState(true);

    useEffect(() => {props.getCustomerLeaseApartment()}, []);
    
    const rows = Array.apply(null, Array(props.apartment.customerApartmentLease.length)).map(
        (item, idx) => ({
            guest_phone: props.apartment.customerApartmentLease[idx].guest_phone,
            room: props.apartment.customerApartmentLease[idx].room,
            deposit: props.apartment.customerApartmentLease[idx].deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            month_fee: props.apartment.customerApartmentLease[idx].month_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            area_m2: props.apartment.customerApartmentLease[idx].area_m2,
            not_finished: `${props.apartment.customerApartmentLease[idx].not_finished ? "O" : "X"}`,
            parking: `${props.apartment.customerApartmentLease[idx].parking ? "O" : "X"}`,
            elevator: `${props.apartment.customerApartmentLease[idx].elevator ? "O" : "X"}`,
            loan: `${props.apartment.customerApartmentLease[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.apartment.customerApartmentLease.length)).map(
        (item, idx) => ({
            guest_phone: props.apartment.customerApartmentLease[idx].guest_phone,
            deposit: props.apartment.customerApartmentLease[idx].deposit,
            month_fee: props.apartment.customerApartmentLease[idx].month_fee,
            room: props.apartment.customerApartmentLease[idx].room,
            area_m2: props.apartment.customerApartmentLease[idx].area_m2,
            updated: props.apartment.customerApartmentLease[idx].updated,
            parking: props.apartment.customerApartmentLease[idx].parking,
            elevator: props.apartment.customerApartmentLease[idx].elevator,
            loan: props.apartment.customerApartmentLease[idx].loan,
            not_finished: props.apartment.customerApartmentLease[idx].not_finished,
            description: props.apartment.customerApartmentLease[idx].description,
            roomId: props.apartment.customerApartmentLease[idx].id
        })
    );

    const state = {
        tableHead: fields.map(field => field.title),
        data: rows.map(row =>
            fields.map(field => row[field.key])),
        widthArr: fields.map(field => field.width),
        heightArr: fields.map(field => field.height)
    };

    const tableData = [];
    for (let i=0; i < rows.length; i += 1){
        const rowData = [];
        for (let j=0; j<fields.length; j += 1){
            rowData.push(`${i}:${j}`);
        }
        tableData.push(rowData);
    };

    const allTableData = [];
    for (let k=0; k < allRows.length; k += 1){
        const allRowData = [];
        for (let l=0; l<allFields.length; l += 1){
            allRowData.push(`${k}:${l}`);
        }
        allTableData.push(allRowData);
    };

    async function getSearching(){
        const form = {
            ...(guest_phone && {guest_phone}),
            ...(room && {room}),
            ...(deposit && {deposit}),
            ...(month_fee && {month_fee}),
            ...(area_m2 && {area_m2}),
            ...(parking && {parking}),
            ...(elevator && {elevator}),
            ...(loan && {loan}),
            ...(not_finished && {not_finished}),
            realtor_id: props.userId
        };
        try{
            const { data } = await api.customerApartmentLeaseSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("CustomerLeaseApartmentSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View>
            <BookTitle props={props} />
            <CreatingBtn onPress={() => props.navigation.navigate('CustomerLeaseApartmentCreating')}>
                <Text>매물등록</Text>
            </CreatingBtn>
            <SearchContainer>
                <Div>
                    <SearchArticle><SearchTitleText>손님(연락처)</SearchTitleText><SearchInputAddress value={guest_phone} onChangeText={text => setGuest_phone(text)} /></SearchArticle>
                    <SearchArticle><SearchTitleText>방</SearchTitleText><SearchInput keyboardType="numeric" value={room} onChangeText={text => setRoom(text)} /></SearchArticle>
                </Div>
                <Div>
                    <SearchArticle><SearchTitleText>보증금</SearchTitleText><SearchInput keyboardType="numeric" value={deposit} onChangeText={text => setDeposit(text)} /><Text>만원 이하</Text></SearchArticle>
                    <SearchArticle><SearchTitleText>월세</SearchTitleText><SearchInput keyboardType="numeric" value={month_fee} onChangeText={text => setMonth_fee(text)} /><Text>만원 이하</Text></SearchArticle>
                </Div>
                <Div>
                    <SearchArticle><SearchTitleText>전용면적</SearchTitleText><SearchInput keyboardType="numeric" value={area_m2} onChangeText={text => setArea_m2(text)} /><Text>㎡ 이상</Text></SearchArticle>
                </Div>
                <Div>
                    <SearchArticle>
                        <SearchTitleText>주차</SearchTitleText>
                        <Checkbox style={CheckboxStyle} value={parking} onValueChange={(newValue) => setParking(newValue)}/>
                    </SearchArticle>
                    <SearchArticle>
                        <SearchTitleText>승강기</SearchTitleText>
                        <Checkbox style={CheckboxStyle} value={elevator} onValueChange={(newValue) => setElevator(newValue)}/>
                    </SearchArticle>
                    <SearchArticle>
                        <SearchTitleText>대출</SearchTitleText>
                        <Checkbox style={CheckboxStyle} value={loan} onValueChange={(newValue) => setLoan(newValue)}/>
                    </SearchArticle>
                    <SearchArticle>
                        <SearchTitleText>진행중</SearchTitleText>
                        <Checkbox style={CheckboxStyle} value={not_finished} onValueChange={(newValue) => setNot_finished(newValue)}/>
                    </SearchArticle>
                </Div>
                <SearchBtn onPress={() => getSearching()}>
                    <SearchBtnText>손님 검색</SearchBtnText>
                </SearchBtn>
            </SearchContainer>
        </View>
        <View>
        <Table borderStyle={TableBorderStyle}>
            <Row 
                data={state.tableHead} 
                widthArr={state.widthArr}
                textStyle={RowTextStyle}
                style={RowHeadStyle}
            />
        </Table>
        </View>
        <ScrollView contentContainerStyle={{alignItems: "center"}}>
            <Table borderStyle={TableBorderStyle}>
                {
                    tableData.map((rowData, index) => (
                        <Row 
                            key={index} 
                            data={state.data[index]} 
                            style={RowBodyStyle} 
                            textStyle={RowTextStyle} 
                            widthArr={state.widthArr}
                            onPress={() => props.navigation.navigate("CustomerLeaseApartmentDetail", allRows[index] )}
                        />
                    ))
                }
            </Table>
        </ScrollView>
        </>
    );
};

function mapStateToProps(state){
    return {
        apartment: state.apartmentReducer.explore,
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    };
};

function mapDispatchToProps(dispatch){
    return{
        getCustomerLeaseApartment: () => dispatch(getCustomerLeaseApartment()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLeaseApartmentTable);