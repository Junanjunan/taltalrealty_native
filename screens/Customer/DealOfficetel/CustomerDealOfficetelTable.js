import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getCustomerDealingOfficetel } from "../../../redux/officetelSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";
import { fields, hiddenFields, allFields } from "../DealApartment/CustomerDealApartmentTable";


const CustomerDealOfficetelTable = (props) => {
    useEffect(() => {props.getCustomerDealingOfficetel()}, []);
    const [guest_phone, setGuest_phone] = useState();
    const [room, setRoom] = useState(); 
    const [price, setPrice] = useState();
    const [area_m2, setLand_m2] = useState();
    const [parking, setParking] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [not_finished, setNot_finished] = useState(true);
    
    const rows = Array.apply(null, Array(props.officetel.customerOfficetelDealing.length)).map(
        (item, idx) => ({
            guest_phone: props.officetel.customerOfficetelDealing[idx].guest_phone,
            room: props.officetel.customerOfficetelDealing[idx].room,
            price: props.officetel.customerOfficetelDealing[idx].price,
            area_m2: props.officetel.customerOfficetelDealing[idx].area_m2,
            parking: `${props.officetel.customerOfficetelDealing[idx].parking ? "O" : "X"}`,
            elevator: `${props.officetel.customerOfficetelDealing[idx].elevator ? "O" : "X"}`,
            not_finished: `${props.officetel.customerOfficetelDealing[idx].not_finished ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.officetel.customerOfficetelDealing.length)).map(
        (item, idx) => ({
            guest_phone: props.officetel.customerOfficetelDealing[idx].guest_phone,
            price: props.officetel.customerOfficetelDealing[idx].price,
            room: props.officetel.customerOfficetelDealing[idx].room,
            area_m2: props.officetel.customerOfficetelDealing[idx].area_m2,
            updated: props.officetel.customerOfficetelDealing[idx].updated,
            parking: props.officetel.customerOfficetelDealing[idx].parking,
            elevator: props.officetel.customerOfficetelDealing[idx].elevator,
            not_finished: props.officetel.customerOfficetelDealing[idx].not_finished,
            description: props.officetel.customerOfficetelDealing[idx].description,
            roomId: props.officetel.customerOfficetelDealing[idx].id
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
            realtor_id: props.userId
        };
        try{
            const { data } = await api.customerOfficetelDealingSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("CustomerDealOfficetelSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    };

    return (
        <>
        <View>
            <CreatingBtn onPress={() => props.navigation.navigate('CustomerDealOfficetelCreating')}>
                <Text>매물등록</Text>
            </CreatingBtn>
            <SearchContainer>
                <Div>
                    <SearchArticle><SearchTitleText>손님(연락처)</SearchTitleText><SearchInputAddress value={guest_phone} onChangeText={text => setGuest_phone(text)} /></SearchArticle>
                    <SearchArticle><SearchTitleText>방</SearchTitleText><SearchInput keyboardType="numeric" value={room} onChangeText={text => setRoom(text)} /></SearchArticle>
                </Div>
                <Div>
                    <SearchArticle><SearchTitleText>매매가</SearchTitleText><SearchInput keyboardType="numeric" value={price} onChangeText={text => setPrice(text)} /><Text>만원 이하</Text></SearchArticle>
                    <SearchArticle><SearchTitleText>전용면적</SearchTitleText><SearchInput keyboardType="numeric" value={area_m2} onChangeText={text => setLand_m2(text)} /><Text>㎡ 이상</Text></SearchArticle>
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
                            onPress={() => props.navigation.navigate("CustomerDealOfficetelDetail", allRows[index] )}
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
        officetel: state.officetelReducer.explore,
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    };
};

function mapDispatchToProps(dispatch){
    return{
        getCustomerDealingOfficetel: () => dispatch(getCustomerDealingOfficetel()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDealOfficetelTable);

