import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getCustomerDealingStore } from "../../../redux/storeSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";


const CustomerDealStoreTable = (props) => {
    useEffect(() => {props.getCustomerDealingStore()}, []);
    const [guest_phone, setGuest_phone] = useState();
    const [price, setPrice] = useState();
    const [area_m2, setLand_m2] = useState();
    const [parking, setParking] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [not_finished, setNot_finished] = useState(true);

    const fields = [
        { key: 'guest_phone', title: '손님 (연락처)', width:55},
        { key: 'price', title: '가격', width:55},
        { key: 'area_m2', title: '전용면적 (㎡)', width:40},
        { key: 'parking', title: '주차', width:25},
        { key: 'elevator', title: '승강기', width:25},
        { key: 'not_finished', title: '진행매물', width:25},
    ];

    const hiddenFields = [
        { key: 'updated', title: '확인일', width:100},
        { key: 'description', title: '상세설명', width:100},
        { key: 'roomId', title: 'ID', width: 100}
    ]

    const allFields = fields.concat(hiddenFields);
    
    const rows = Array.apply(null, Array(props.store.customerStoreDealing.length)).map(
        (item, idx) => ({
            guest_phone: props.store.customerStoreDealing[idx].guest_phone,
            price: props.store.customerStoreDealing[idx].price,
            area_m2: props.store.customerStoreDealing[idx].area_m2,
            parking: `${props.store.customerStoreDealing[idx].parking ? "O" : "X"}`,
            elevator: `${props.store.customerStoreDealing[idx].elevator ? "O" : "X"}`,
            not_finished: `${props.store.customerStoreDealing[idx].not_finished ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.store.customerStoreDealing.length)).map(
        (item, idx) => ({
            guest_phone: props.store.customerStoreDealing[idx].guest_phone,
            price: props.store.customerStoreDealing[idx].price,
            area_m2: props.store.customerStoreDealing[idx].area_m2,
            updated: props.store.customerStoreDealing[idx].updated,
            parking: props.store.customerStoreDealing[idx].parking,
            elevator: props.store.customerStoreDealing[idx].elevator,
            not_finished: props.store.customerStoreDealing[idx].not_finished,
            description: props.store.customerStoreDealing[idx].description,
            roomId: props.store.customerStoreDealing[idx].id
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
            ...(price && {price}),
            ...(area_m2 && {area_m2}),
            ...(parking && {parking}),
            ...(elevator && {elevator}),
            ...(not_finished && {not_finished}),
            realtor_id: props.userId
        };
        try{
            const { data } = await api.customerStoreDealingSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("CustomerDealStoreSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    };

    return (
        <>
        <View>
            <CreatingBtn onPress={() => props.navigation.navigate('CustomerDealStoreCreating')}>
                <Text>매물등록</Text>
            </CreatingBtn>
            <SearchContainer>
                <Div>
                    <SearchArticle><SearchTitleText>손님(연락처)</SearchTitleText><SearchInputAddress value={guest_phone} onChangeText={text => setGuest_phone(text)} /></SearchArticle>
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
                            onPress={() => props.navigation.navigate("CustomerDealStoreDetail", allRows[index] )}
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
        store: state.storeReducer.explore,
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    };
};

function mapDispatchToProps(dispatch){
    return{
        getCustomerDealingStore: () => dispatch(getCustomerDealingStore()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDealStoreTable);