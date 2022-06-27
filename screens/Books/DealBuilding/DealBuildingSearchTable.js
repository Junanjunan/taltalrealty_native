import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { View, ScrollView, Text, Dimensions} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getDealingBuilding } from "../../../redux/buildingSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle } from "../../../components/Detail/Table";


const DealBuildingSearchTable = ({ getDealingBuilding, navigation, route: {params}, token, userId}) => {
    const [address, setAddress] = useState(params.form.address);
    const [price, setPrice] = useState(params.form.price);
    const [land_m2, setLand_m2] = useState();
    const [elevator, setElevator] = useState(params.form.elevator);
    const [loan, setLoan] = useState(params.form.loan);
    const [not_finished, setNot_finished] = useState(params.form.not_finished);

    useEffect(() => {getDealingBuilding()}, []);

    const fields = [
        { key: 'address', title: '주소', width:120},
        { key: 'price', title: '가격', width:55},
        { key: 'elevator', title: '승강기', width:25},
        { key: 'loan', title: '대출', width:25},
        { key: 'not_finished', title: '진행매물', width:25},
        { key: 'floor_top', title: '지상층', width:25},
        { key: 'land_type', title:'토지종류', width: 40},
        { key: 'land_m2', title:'토지면적', width: 40}
    ];

    const hiddenFields = [
        { key: 'updated', title: '확인일', width:100},
        { key: 'deposit', title: '보증금', width:100},
        { key: 'month_fee', title: '월세', width:100},
        { key: 'management_fee', title: '관리비', width:100},
        { key: 'floor_bottom', title: '지하층'},
        { key: 'building_area_m2', title: '건축면적' },
        { key: 'total_floor_area_m2', title: '연면적'},
        { key: 'total_floor_area_m2_for_ratio', title: '연면적-용적률용'},
        { key: 'building_coverage', title: '건폐율'},
        { key: 'floor_area_ratio', title: '용적률'},
        { key: 'parking_number', title: '주차대수'},
        { key: 'elevator', title: '승강기', width:100},
        { key: 'naver', title: '네이버', width:100},
        { key: 'dabang', title: '다방', width:100},
        { key: 'zicbang', title: '직방', width:100},
        { key: 'peterpan', title: '피터팬', width:100},
        { key: 'owner_phone', title: '집주인', width:100},
        { key: 'tenant_phone', title: '세입자', width:100},
        { key: 'description', title: '상세설명', width:100},
        { key: 'roomId', title: 'ID', width: 100}
    ]

    const allFields = fields.concat(hiddenFields);
    
    const rows = Array.apply(null, Array(params.data.length)).map(
        (item, idx) => ({
            address: params.data[idx].address,
            price: params.data[idx].price,
            not_finished: `${params.data[idx].not_finished ? "O" : "X"}`,
            elevator: `${params.data[idx].elevator ? "O" : "X"}`,
            loan: `${params.data[idx].loan ? "O" : "X"}`,
            floor_top: params.data[idx].floor_top,
            land_type: params.data[idx].land_type,
            land_m2: params.data[idx].land_m2
        })
    );


    const allRows = Array.apply(null, Array(params.data.length)).map(
        (item, idx) => ({
            address: params.data[idx].address,
            price: params.data[idx].price,
            birth: params.data[idx].birth,
            updated: params.data[idx].updated,
            deposit: params.data[idx].deposit,
            month_fee: params.data[idx].month_fee,
            management_fee: params.data[idx].management_fee,
            floor_top: params.data[idx].floor_top,
            land_type: params.data[idx].land_type,
            land_m2: params.data[idx].land_m2,
            floor_bottom: params.data[idx].floor_bottom,
            building_area_m2: params.data[idx].building_area_m2,
            total_floor_area_m2: params.data[idx].total_floor_area_m2,
            total_floor_area_m2_for_ratio: params.data[idx].total_floor_area_m2_for_ratio,
            building_coverage: params.data[idx].building_coverage,
            floor_area_ratio: params.data[idx].floor_area_ratio,
            parking_number: params.data[idx].parking_number,
            elevator: params.data[idx].elevator,
            loan: params.data[idx].loan,
            not_finished: params.data[idx].not_finished,
            naver: params.data[idx].naver,
            dabang: params.data[idx].dabang,
            zicbang: params.data[idx].zicbang,
            peterpan: params.data[idx].peterpan,
            owner_phone: params.data[idx].owner_phone,
            tenant_phone: params.data[idx].tenant_phone,
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
            ...(address && {address}),
            ...(price && {price}),
            ...(land_m2 && {land_m2}),
            ...(elevator && {elevator}),
            ...(loan && {loan}),
            ...(not_finished && {not_finished}),
            realtor_id: userId
        };
        try{
            const { data } = await api.buildingDealingSearching(form, `Bearer ${token}`)
            navigation.navigate("DealBuildingSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View style={{alignItems: 'center'}}>
            <CreatingBtn onPress={() => navigation.navigate('DealBuildingCreating')}>
                <Text>매물등록</Text>
            </CreatingBtn>
            <SearchContainer>
            <Div>
                <SearchArticle><SearchTitleText>주소</SearchTitleText><SearchInputAddress value={address} onChangeText={text => setAddress(text)} /></SearchArticle>
            </Div>
            <Div>
                <SearchArticle><SearchTitleText>매매가</SearchTitleText><SearchInput keyboardType="numeric" value={price} onChangeText={text => setPrice(text)} /><Text>만원 이하</Text></SearchArticle>
                <SearchArticle><SearchTitleText>토지면적</SearchTitleText><SearchInput keyboardType="numeric" value={land_m2} onChangeText={text => setLand_m2(text)} /><Text>㎡ 이상</Text></SearchArticle>
            </Div>
            <Div>
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
                        <SearchBtnText>매물 검색</SearchBtnText>
                    </SearchBtn>
                </SearchContainer>
        </View>
        <View style={{alignItems: "center"}}>
        <Table borderStyle={{borderWidth: 1}}>
            <Row 
                data={state.tableHead} 
                widthArr={state.widthArr}
                height={50}
                textStyle={{textAlign: "center"}}
                style={{
                    backgroundColor: "skyblue",
                }}
            />
        </Table>
        </View>
        <ScrollView 
            style={{marginBottom: 70}}
            contentContainerStyle={{alignItems: "center"}}
        >
            <Table borderStyle={{borderWidth: 1}}>
                {
                    tableData.map((rowData, index) => (
                        <Row 
                            key={index} 
                            data={state.data[index]} 
                            style={{height:50}} 
                            textStyle={{textAlign: "center", fontSize: 14}} 
                            widthArr={state.widthArr}
                            onPress={() => navigation.navigate("DealBuildingDetail", allRows[index] )}
                        />
                    ))
                }
            </Table>
        </ScrollView>
        </>
    );
}

function mapStateToProps(state){
    return {
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    };
};

function mapDispatchToProps(dispatch){
    return{
        getDealingBuilding: () => dispatch(getDealingBuilding()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DealBuildingSearchTable);