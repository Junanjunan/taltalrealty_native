import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getCustomerDealingApartment } from "../../../redux/apartmentSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";
import { TableWidth } from "../../../components/DivCollection";
import { BookTitle } from "../../../components/Detail/BookTitle";


const UnitWidth = TableWidth/8;

export const fields = [
    { key: 'guest_phone', title: '손님 (연락처)', width:UnitWidth*2.5},
    { key: 'price', title: '가격', width:UnitWidth*1.2},
    { key: 'area_m2', title: '면적 (㎡)', width:UnitWidth*1},
    { key: 'room', title: '방수', width:UnitWidth*2/3},
    { key: 'parking', title: '주차', width:UnitWidth*2/3},
    { key: 'elevator', title: '승강기', width:UnitWidth*2/3},
    { key: 'loan', title: '대출', width:UnitWidth*2/3},
    { key: 'not_finished', title: '진행매물', width:UnitWidth*2/3},
];

export const hiddenFields = [
    { key: 'updated', title: '확인일', width:100},
    { key: 'description', title: '상세설명', width:100},
    { key: 'roomId', title: 'ID', width: 100}
]

export const allFields = fields.concat(hiddenFields);


const CustomerDealApartmentTable = (props) => {
    const [guest_phone, setGuest_phone] = useState();
    const [room, setRoom] = useState();
    const [price, setPrice] = useState();
    const [area_m2, setArea_m2] = useState();
    const [parking, setParking] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [loan, setLoan] = useState(false);
    const [not_finished, setNot_finished] = useState(true);

    useEffect(() => {props.getCustomerDealingApartment()}, []);
    
    const rows = Array.apply(null, Array(props.apartment.customerApartmentDealing.length)).map(
        (item, idx) => ({
            guest_phone: props.apartment.customerApartmentDealing[idx].guest_phone,
            price: props.apartment.customerApartmentDealing[idx].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            area_m2: props.apartment.customerApartmentDealing[idx].area_m2,
            room: props.apartment.customerApartmentDealing[idx].room,
            not_finished: `${props.apartment.customerApartmentDealing[idx].not_finished ? "O" : "X"}`,
            parking: `${props.apartment.customerApartmentDealing[idx].parking ? "O" : "X"}`,
            loan: `${props.apartment.customerApartmentDealing[idx].loan ? "O" : "X"}`,
            elevator: `${props.apartment.customerApartmentDealing[idx].elevator ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.apartment.customerApartmentDealing.length)).map(
        (item, idx) => ({
            guest_phone: props.apartment.customerApartmentDealing[idx].guest_phone,
            price: props.apartment.customerApartmentDealing[idx].price,
            room: props.apartment.customerApartmentDealing[idx].room,
            area_m2: props.apartment.customerApartmentDealing[idx].area_m2,
            updated: props.apartment.customerApartmentDealing[idx].updated,
            parking: props.apartment.customerApartmentDealing[idx].parking,
            elevator: props.apartment.customerApartmentDealing[idx].elevator,
            loan: props.apartment.customerApartmentDealing[idx].loan,
            not_finished: props.apartment.customerApartmentDealing[idx].not_finished,
            description: props.apartment.customerApartmentDealing[idx].description,
            roomId: props.apartment.customerApartmentDealing[idx].id
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
            ...(price && {price}),
            ...(area_m2 && {area_m2}),
            ...(parking && {parking}),
            ...(elevator && {elevator}),
            ...(loan && {loan}),
            ...(not_finished && {not_finished}),
            realtor_id: props.userId
        };
        try{
            const { data } = await api.customerApartmentDealingSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("CustomerDealApartmentSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <BookTitle props={props} />
        <View>
            <CreatingBtn onPress={() => props.navigation.navigate('CustomerDealApartmentCreating')}>
                <Text>매물등록</Text>
            </CreatingBtn>
            <SearchContainer>
                <Div>
                    <SearchArticle><SearchTitleText>손님(연락처)</SearchTitleText><SearchInputAddress value={guest_phone} onChangeText={text => setGuest_phone(text)} /></SearchArticle>
                    <SearchArticle><SearchTitleText>방</SearchTitleText><SearchInput keyboardType="numeric" value={room} onChangeText={text => setRoom(text)} /></SearchArticle>
                </Div>
                <Div>
                    <SearchArticle><SearchTitleText>매매가</SearchTitleText><SearchInput keyboardType="numeric" value={price} onChangeText={text => setPrice(text)} /><Text>만원 이하</Text></SearchArticle>
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
                            onPress={() => props.navigation.navigate("CustomerDealApartmentDetail", allRows[index] )}
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
        getCustomerDealingApartment: () => dispatch(getCustomerDealingApartment()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDealApartmentTable);