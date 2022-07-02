import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getCustomerDealingBuilding } from "../../../redux/buildingSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";


const CustomerDealBuildingSearchTable = ({ getCustomerDealingBuilding, navigation, route: {params}, token, userId}) => {
    const [guest_phone, setGuest_phone] = useState(params.form.guest_phone);
    const [price, setPrice] = useState(params.form.price);
    const [land_m2, setArea_m2] = useState(params.form.land_m2);
    const [elevator, setElevator] = useState(params.form.elevator);
    const [not_finished, setNot_finished] = useState(params.form.not_finished);

    useEffect(() => {getCustomerDealingBuilding()}, []);

    const fields = [
        { key: 'guest_phone', title: '손님 (연락처)', width:55},
        { key: 'price', title: '가격', width:55},
        { key: 'land_m2', title: '면적 (㎡)', width:40},
        { key: 'elevator', title: '승강기', width:25},
        { key: 'not_finished', title: '진행매물', width:25},
    ];

    const hiddenFields = [
        { key: 'updated', title: '확인일', width:100},
        { key: 'description', title: '상세설명', width:100},
        { key: 'roomId', title: 'ID', width: 100}
    ]

    const allFields = fields.concat(hiddenFields);
    
    const rows = Array.apply(null, Array(params.data.length)).map(
        (item, idx) => ({
            guest_phone: params.data[idx].guest_phone,
            price: params.data[idx].price,
            land_m2: params.data[idx].land_m2,
            not_finished: `${params.data[idx].not_finished ? "O" : "X"}`,
            elevator: `${params.data[idx].elevator ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(params.data.length)).map(
        (item, idx) => ({
            guest_phone: params.data[idx].guest_phone,
            price: params.data[idx].price,
            land_m2: params.data[idx].land_m2,
            updated: params.data[idx].updated,
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
            ...(price && {price}),
            ...(land_m2 && {land_m2}),
            ...(elevator && {elevator}),
            ...(not_finished && {not_finished}),
            realtor_id: userId
        };
        try{
            const { data } = await api.customerBuildingDealingSearching(form, `Bearer ${token}`)
            navigation.navigate("CustomerDealBuildingSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View>
            <CreatingBtn onPress={() => navigation.navigate('CustomerDealBuildingCreating')}>
                <Text>매물등록</Text>
            </CreatingBtn>
            <SearchContainer>
                <Div>
                <SearchArticle><SearchTitleText>손님(연락처)</SearchTitleText><SearchInputAddress value={guest_phone} onChangeText={text => setGuest_phone(text)} /></SearchArticle>
                </Div>
                <Div>
                    <SearchArticle><SearchTitleText>매매가</SearchTitleText><SearchInput keyboardType="numeric" value={price} onChangeText={text => setPrice(text)} /><Text>만원 이하</Text></SearchArticle>
                    <SearchArticle><SearchTitleText>토지면적</SearchTitleText><SearchInput keyboardType="numeric" value={land_m2} onChangeText={text => setArea_m2(text)} /><Text>㎡ 이상</Text></SearchArticle>
                </Div>
                <Div>
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
                            onPress={() => navigation.navigate("CustomerDealBuildingDetail", allRows[index] )}
                        />
                    ))
                }
            </Table>
        </ScrollView>
        </>
    );
}

const Test = (props) => {
    useEffect(() => {props.getCustomerDealingBuilding()}, []);
    console.log(props);
    
    return(
        <Text>Test</Text>
    );
}


function mapStateToProps(state){
    return {
        building: state.buildingReducer.explore,
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    };
};

function mapDispatchToProps(dispatch){
    return{
        getCustomerDealingBuilding: () => dispatch(getCustomerDealingBuilding()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDealBuildingSearchTable);
// export default connect(mapStateToProps, mapDispatchToProps)(Test);