import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getCustomerLeaseApartment } from "../../../redux/apartmentSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";


const CustomerLeaseApartmentTable = ({apartment:{customerApartmentLease}, getCustomerLeaseApartment, navigation, token, userId}) => {
    const [guest_phone, setGuest_phone] = useState();
    const [room, setRoom] = useState();
    const [deposit, setDeposit] = useState();
    const [month_fee, setMonth_fee] = useState();
    const [area_m2, setArea_m2] = useState();
    const [parking, setParking] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [loan, setLoan] = useState(false);
    const [not_finished, setNot_finished] = useState(true);

    useEffect(() => {getCustomerLeaseApartment()}, []);

    const fields = [
        { key: 'guest_phone', title: '손님 (연락처)', width:55},
        { key: 'room', title: '방수', width:30},
        { key: 'deposit', title: '보증금', width:40},
        { key: 'month_fee', title: '월세', width:30},
        { key: 'area_m2', title: '면적 (㎡)', width:40},
        { key: 'parking', title: '주차', width:25},
        { key: 'elevator', title: '승강기', width:25},
        { key: 'loan', title: '대출', width:25},
        { key: 'not_finished', title: '진행매물', width:25},
    ];

    const hiddenFields = [
        { key: 'updated', title: '확인일', width:100},
        { key: 'guest_phone', title: '연락처', width:100},
        { key: 'description', title: '상세설명', width:100},
        { key: 'roomId', title: 'ID', width: 100}
    ]

    const allFields = fields.concat(hiddenFields);
    
    const rows = Array.apply(null, Array(customerApartmentLease.length)).map(
        (item, idx) => ({
            guest_phone: customerApartmentLease[idx].guest_phone,
            room: customerApartmentLease[idx].room,
            deposit: customerApartmentLease[idx].deposit,
            month_fee: customerApartmentLease[idx].month_fee,
            area_m2: customerApartmentLease[idx].area_m2,
            not_finished: `${customerApartmentLease[idx].not_finished ? "O" : "X"}`,
            parking: `${customerApartmentLease[idx].parking ? "O" : "X"}`,
            elevator: `${customerApartmentLease[idx].elevator ? "O" : "X"}`,
            loan: `${customerApartmentLease[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(customerApartmentLease.length)).map(
        (item, idx) => ({
            guest_phone: customerApartmentLease[idx].guest_phone,
            deposit: customerApartmentLease[idx].deposit,
            month_fee: customerApartmentLease[idx].month_fee,
            room: customerApartmentLease[idx].room,
            area_m2: customerApartmentLease[idx].area_m2,
            updated: customerApartmentLease[idx].updated,
            parking: customerApartmentLease[idx].parking,
            elevator: customerApartmentLease[idx].elevator,
            loan: customerApartmentLease[idx].loan,
            not_finished: customerApartmentLease[idx].not_finished,
            description: customerApartmentLease[idx].description,
            roomId: customerApartmentLease[idx].id
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
            realtor_id: userId
        };
        try{
            const { data } = await api.customerApartmentLeaseSearching(form, `Bearer ${token}`)
            navigation.navigate("CustomerLeaseApartmentSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View>
            <CreatingBtn onPress={() => navigation.navigate('CustomerLeaseApartmentCreating')}>
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
                            onPress={() => navigation.navigate("CustomerLeaseApartmentDetail", allRows[index] )}
                        />
                    ))
                }
            </Table>
        </ScrollView>
        </>
    );
}

const Test = (props) => {
    useEffect(() => {props.getCustomerLeaseApartment()}, []);
    console.log(props);
    
    return(
        <Text>Test</Text>
    );
}


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
// export default connect(mapStateToProps, mapDispatchToProps)(Test);