import React, { Component, useEffect } from "react";
import styled from "styled-components/native";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity,} from 'react-native';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getVillas } from "../../../redux/villasSlice";


const DealVillaTable = ({villas, getVillas, navigation}) => {
    useEffect(() => {getVillas()}, []);


    const fields = [
        { key: 'address', title: '주소', width:130},
        { key: 'price', title: '가격', width:60},
        { key: 'room', title: '방수', width:30},
        { key: 'birth', title: '준공', width:75},
        { key: 'area_m2', title: '면적(㎡)', width:50},
        { key: 'not_finished', title: '진행매물', width:30},
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
    
    const rows = Array.apply(null, Array(villas.length)).map(
        (item, idx) => ({
            address: villas[idx].address,
            price: villas[idx].price,
            room: villas[idx].room,
            birth: villas[idx].birth,
            area_m2: villas[idx].area_m2,
            not_finished: `${villas[idx].not_finished ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(villas.length)).map(
        (item, idx) => ({
            address: villas[idx].address,
            price: villas[idx].price,
            room: villas[idx].room,
            birth: villas[idx].birth,
            area_m2: villas[idx].area_m2,
            updated: villas[idx].updated,
            deposit: villas[idx].deposit,
            month_fee: villas[idx].month_fee,
            management_fee: villas[idx].management_fee,
            bath: villas[idx].bath,
            total_area_m2: villas[idx].total_area_m2,
            land_m2: villas[idx].land_m2,
            parking: villas[idx].parking,
            elevator: villas[idx].elevator,
            loan: villas[idx].loan,
            empty: villas[idx].empty,
            not_finished: villas[idx].not_finished,
            naver: villas[idx].naver,
            dabang: villas[idx].dabang,
            zicbang: villas[idx].zicbang,
            peterpan: villas[idx].peterpan,
            owner_phone: villas[idx].owner_phone,
            tenant_phone: villas[idx].tenant_phone,
            description: villas[idx].description,
            roomId: villas[idx].id
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

    return (
        <>
        <View style={{alignItems: 'center'}}>
            <TouchableOpacity 
                style={{
                    height: 30,
                    width: 120,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: 15,
                    paddingRight: 16, 
                    marginBottom: 5,
                    marginTop: 5,
                    backgroundColor: 'pink',
                    }}
                onPress={() => navigation.navigate('DealVillaCreating')}
            >
                <Text>매물등록</Text>
            </TouchableOpacity>
        </View>
        <View style={{paddingLeft: 15, paddingRight: 20, backgroundColor: 'white'}}>
        <Table borderStyle={{borderWidth: 1}}>
            <Row 
                data={state.tableHead} 
                widthArr={state.widthArr}
                textStyle={{textAlign: "center"}}
            />
        </Table>
        </View>
        <ScrollView style={{paddingLeft:15, paddingRight: 20}}>
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
    return state.villasReducer.explore;
};

function mapDispatchToProps(dispatch){
    return{
        getVillas: () => dispatch(getVillas()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DealVillaTable);
