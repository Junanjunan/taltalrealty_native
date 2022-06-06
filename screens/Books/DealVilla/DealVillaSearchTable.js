import React, { Component, useEffect, useState } from "react";
import styled from "styled-components/native";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity, Dimensions} from 'react-native';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getVillas } from "../../../redux/villasSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";


const { width } = Dimensions.get("screen");

const SearchInput = styled.TextInput`
    backgroundColor: white;
    width: 40px;
    borderWidth: 1px;
    margin: 3px;
`;

const SearchInputLong = styled.TextInput`
    backgroundColor: white;
    width: 150px;
    borderWidth: 1px;
    margin: 3px;
`;

const SearchTitleText = styled.Text`
`;

const SearchArticle = styled.View`
    flexDirection: row;
    marginLeft: 5px;
    marginRight: 5px;
    alignItems: center;
`;

const Div = styled.View`
    flexDirection: row;
`;

const CreatingBtn = styled.TouchableOpacity`
    backgroundColor: pink;
    height: 40px;
    width: ${width*9/10}px;
    alignItems: center;
    justifyContent: center;
    marginBottom: 10px;
    borderRadius: 10px;
`;

const SearchContainer = styled.View`
    alignItems: center;
    borderWidth: 1px;
    padding: 5px;
    marginBottom: 10px;
    width: ${width*9/10}px;
`;

const SearchBtn = styled.TouchableOpacity`
    backgroundColor: red;
    width: 120px;
    height: 30px;
    alignItems: center;
    justifyContent: center;
`;

const SearchBtnText = styled.Text``;

const CheckboxStyle = {
    marginTop: 10,
    marginBottom: 10
};


const DealVillaSearchTable = ({villas, getVillas, navigation, route: {params}, token}) => {
    console.log(params);
    const [address, setAddress] = useState();
    const [room, setRoom] = useState();
    const [price, setPrice] = useState();
    const [area_m2, setArea_m2] = useState();
    const [description, setDescription] = useState();
    const [empty, setEmpty] = useState(false);
    const [parking, setParking] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [loan, setLoan] = useState(false);
    const [not_finished, setNot_finished] = useState(true);

    useEffect(() => {getVillas()}, []);

    const fields = [
        { key: 'address', title: '주소', width:120},
        { key: 'price', title: '가격', width:55},
        { key: 'area_m2', title: '면적 (㎡)', width:40},
        { key: 'room', title: '방수', width:30},
        { key: 'parking', title: '주차', width:25},
        { key: 'empty', title: '공실', width:25},
        { key: 'elevator', title: '승강기', width:25},
        { key: 'loan', title: '대출', width:25},
        { key: 'not_finished', title: '진행매물', width:25},
    ];

    const hiddenFields = [
        { key: 'updated', title: '확인일', width:100},
        { key: 'deposit', title: '보증금', width:100},
        { key: 'month_fee', title: '월세', width:100},
        { key: 'management_fee', title: '관리비', width:100},
        { key: 'bath', title: '화장실', width:100},
        { key: 'total_area_m2', title: '공급면적', width:100},
        { key: 'land_m2', title: '대지지분', width:100},
        { key: 'parking', title: '주차', width:100},
        { key: 'elevator', title: '승강기', width:100},
        { key: 'loan', title: '대출', width:100},
        { key: 'empty', title: '공실', width:100},
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
    
    const rows = Array.apply(null, Array(params.length)).map(
        (item, idx) => ({
            address: params[idx].address,
            price: params[idx].price,
            area_m2: params[idx].area_m2,
            room: params[idx].room,
            not_finished: `${params[idx].not_finished ? "O" : "X"}`,
            parking: `${params[idx].parking ? "O" : "X"}`,
            empty: `${params[idx].empty ? "O" : "X"}`,
            elevator: `${params[idx].elevator ? "O" : "X"}`,
            loan: `${params[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(params.length)).map(
        (item, idx) => ({
            address: params[idx].address,
            price: params[idx].price,
            room: params[idx].room,
            birth: params[idx].birth,
            area_m2: params[idx].area_m2,
            updated: params[idx].updated,
            deposit: params[idx].deposit,
            month_fee: params[idx].month_fee,
            management_fee: params[idx].management_fee,
            bath: params[idx].bath,
            total_area_m2: params[idx].total_area_m2,
            land_m2: params[idx].land_m2,
            parking: params[idx].parking,
            elevator: params[idx].elevator,
            loan: params[idx].loan,
            empty: params[idx].empty,
            not_finished: params[idx].not_finished,
            naver: params[idx].naver,
            dabang: params[idx].dabang,
            zicbang: params[idx].zicbang,
            peterpan: params[idx].peterpan,
            owner_phone: params[idx].owner_phone,
            tenant_phone: params[idx].tenant_phone,
            description: params[idx].description,
            roomId: params[idx].id
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

    const allState = {
        allTableHead: allFields.map(field => field.title),
        allData: allRows.map(row=>
            allFields.map(field => row[field.key]))
    };

    async function getSearching(){
        const form = {
            ...(address && {address}),
            ...(room && {room}),
            ...(price && {price}),
            ...(area_m2 && {area_m2}),
            ...(description && {description}),
            ...(parking && {parking}),
            ...(empty && {empty}),
            ...(elevator && {elevator}),
            ...(loan && {loan}),
            ...(not_finished && {not_finished})
        };
        try{
            const { data } = await api.villaDealingSearching(form, `Bearer ${token}`)
            navigation.navigate("DealVillaSearchTable", data);
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View style={{alignItems: 'center'}}>
            <CreatingBtn onPress={() => navigation.navigate('DealVillaCreating')}>
                <Text>매물등록</Text>
            </CreatingBtn>
            <SearchContainer>
            <Div>
            <SearchArticle><SearchTitleText>주소</SearchTitleText><SearchInput value={address} onChangeText={text => setAddress(text)} /></SearchArticle>
                    <SearchArticle><SearchTitleText>매매가</SearchTitleText><SearchInput keyboardType="numeric" value={price} onChangeText={text => setPrice(text)} /><Text>만원 이하</Text></SearchArticle>
                    <SearchArticle><SearchTitleText>전용면적</SearchTitleText><SearchInput keyboardType="numeric" value={area_m2} onChangeText={text => setArea_m2(text)} /><Text>㎡ 이상</Text></SearchArticle>               
            </Div>
            <Div>
            <SearchArticle><SearchTitleText>방</SearchTitleText><SearchInput keyboardType="numeric" value={room} onChangeText={text => setRoom(text)} /></SearchArticle>
                    <SearchArticle><SearchTitleText>특징</SearchTitleText><SearchInputLong value={description} onChangeText={text => setDescription(text)} /></SearchArticle>
            </Div>
            <Div>
                    <SearchArticle>
                        <SearchTitleText>주차</SearchTitleText>
                        <Checkbox style={CheckboxStyle} value={parking} onValueChange={(newValue) => setParking(newValue)}/>
                    </SearchArticle>
                    <SearchArticle>
                        <SearchTitleText>공실</SearchTitleText>
                        <Checkbox style={CheckboxStyle} value={empty} onValueChange={(newValue) => setEmpty(newValue)}/>
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
                            onPress={() => navigation.navigate("DealVillaDetail", allRows[index] )}
                        />
                    ))
                }
            </Table>
        </ScrollView>
        </>
    );
}

function mapStateToProps(state){
    return {token: state.usersReducer.token};
};

function mapDispatchToProps(dispatch){
    return{
        getVillas: () => dispatch(getVillas()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DealVillaSearchTable);
