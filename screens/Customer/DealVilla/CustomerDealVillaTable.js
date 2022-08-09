import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getCustomerDealingVilla } from "../../../redux/villasSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";
import { fields, allFields } from "../DealApartment/CustomerDealApartmentTable";
import { BookTitle } from "../../../components/Detail/BookTitle";


const CustomerDealVillaTable = (props) => {
    useEffect(() => {props.getCustomerDealingVilla()}, []);
    const [guest_phone, setGuest_phone] = useState();
    const [room, setRoom] = useState(); 
    const [price, setPrice] = useState();
    const [area_m2, setLand_m2] = useState();
    const [parking, setParking] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [loan, setLoan] = useState(false);
    const [not_finished, setNot_finished] = useState(true);
    
    const rows = Array.apply(null, Array(props.villa.customerVillaDealing.length)).map(
        (item, idx) => ({
            guest_phone: props.villa.customerVillaDealing[idx].guest_phone,
            room: props.villa.customerVillaDealing[idx].room,
            price: props.villa.customerVillaDealing[idx].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            area_m2: props.villa.customerVillaDealing[idx].area_m2,
            parking: `${props.villa.customerVillaDealing[idx].parking ? "O" : "X"}`,
            elevator: `${props.villa.customerVillaDealing[idx].elevator ? "O" : "X"}`,
            loan: `${props.villa.customerVillaDealing[idx].loan ? "O" : "X"}`,
            not_finished: `${props.villa.customerVillaDealing[idx].not_finished ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.villa.customerVillaDealing.length)).map(
        (item, idx) => ({
            guest_phone: props.villa.customerVillaDealing[idx].guest_phone,
            price: props.villa.customerVillaDealing[idx].price,
            room: props.villa.customerVillaDealing[idx].room,
            area_m2: props.villa.customerVillaDealing[idx].area_m2,
            updated: props.villa.customerVillaDealing[idx].updated,
            parking: props.villa.customerVillaDealing[idx].parking,
            elevator: props.villa.customerVillaDealing[idx].elevator,
            loan: props.villa.customerVillaDealing[idx].loan,
            not_finished: props.villa.customerVillaDealing[idx].not_finished,
            description: props.villa.customerVillaDealing[idx].description,
            roomId: props.villa.customerVillaDealing[idx].id
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
            const { data } = await api.customerVillaDealingSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("CustomerDealVillaSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    };

    return (
        <>
        <View>
            <BookTitle props={props} />
            <CreatingBtn onPress={() => props.navigation.navigate('CustomerDealVillaCreating')}>
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
                            onPress={() => props.navigation.navigate("CustomerDealVillaDetail", allRows[index] )}
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
        villa: state.villasReducer.explore,
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    };
};

function mapDispatchToProps(dispatch){
    return{
        getCustomerDealingVilla: () => dispatch(getCustomerDealingVilla()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDealVillaTable);

