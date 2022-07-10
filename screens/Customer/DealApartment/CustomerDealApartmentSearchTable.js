import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getCustomerDealingApartment } from "../../../redux/apartmentSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";
import { fields, hiddenFields, allFields } from "./CustomerDealApartmentTable";


const CustomerDealApartmentSearchTable = ({ getCustomerDealingApartment, navigation, route: {params}, token, userId}) => {
    const [guest_phone, setGuest_phone] = useState(params.form.guest_phone);
    const [room, setRoom] = useState(params.form.room);
    const [price, setPrice] = useState(params.form.price);
    const [area_m2, setArea_m2] = useState(params.form.area_m2);
    const [parking, setParking] = useState(params.form.parking);
    const [elevator, setElevator] = useState(params.form.elevator);
    const [not_finished, setNot_finished] = useState(params.form.not_finished);

    useEffect(() => {getCustomerDealingApartment()}, []);
    
    const rows = Array.apply(null, Array(params.data.length)).map(
        (item, idx) => ({
            guest_phone: params.data[idx].guest_phone,
            price: params.data[idx].price,
            area_m2: params.data[idx].area_m2,
            room: params.data[idx].room,
            not_finished: `${params.data[idx].not_finished ? "O" : "X"}`,
            parking: `${params.data[idx].parking ? "O" : "X"}`,
            elevator: `${params.data[idx].elevator ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(params.data.length)).map(
        (item, idx) => ({
            guest_phone: params.data[idx].guest_phone,
            price: params.data[idx].price,
            room: params.data[idx].room,
            area_m2: params.data[idx].area_m2,
            updated: params.data[idx].updated,
            parking: params.data[idx].parking,
            elevator: params.data[idx].elevator,
            not_finished: params.data[idx].not_finished,
            description: params.data[idx].description,
            roomId: params.data[idx].id
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
            ...(not_finished && {not_finished}),
            realtor_id: userId
        };
        try{
            const { data } = await api.customerApartmentDealingSearching(form, `Bearer ${token}`)
            navigation.navigate("CustomerDealApartmentSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View>
            <CreatingBtn onPress={() => navigation.navigate('CustomerDealApartmentCreating')}>
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
                            onPress={() => navigation.navigate("CustomerDealApartmentDetail", allRows[index] )}
                        />
                    ))
                }
            </Table>
        </ScrollView>
        </>
    );
}

const Test = (props) => {
    useEffect(() => {props.getCustomerDealingApartment()}, []);
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
        getCustomerDealingApartment: () => dispatch(getCustomerDealingApartment()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDealApartmentSearchTable);
// export default connect(mapStateToProps, mapDispatchToProps)(Test);