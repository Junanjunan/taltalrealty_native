import React, { Component, useEffect } from "react";
import styled from "styled-components/native";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity,} from 'react-native';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { getBooks } from "../../redux/apartsSlice";



const TableView = ({books, getBooks}) => {
    useEffect(() => {getBooks()}, []);
    const navigation = useNavigation();

    const fields = [
        { key: 'roomId', title: 'roomId' },
        { key: 'address', title: '주소'},
        { key: 'price', title: '가격'},
        { key: 'room', title: '방수'},
        { key: 'birth', title: '준공'},
        { key: 'area_m2', title: '면적'},
    ];

    const hiddenFields = [
        { key: 'update', title: '확인일' },
        { key: 'deposit', title: '보증금'},
        { key: 'mont_fee', title: '월세'},
        { key: 'management_fee', title: '관리비'},
        { key: 'bath', title: '화장실'},
        { key: 'total_area_m2', title: '공급면적'},
        { key: 'land_m2', title: '대지지분'},
        { key: 'parking', title: '주차'},
        { key: 'elevator', title: '승강기'},
        { key: 'loan', title: '대출'},
        { key: 'empty', title: '공실'},
        { key: 'not_finished', title: '진행매물'},
        { key: 'naver', title: '네이버'},
        { key: 'dabang', title: '다방'},
        { key: 'zicbang', title: '직방'},
        { key: 'peterpan', title: '피터팬'},
        { key: 'owner_phone', title: '집주인'},
        { key: 'tenant_phone', title: '세입자'},
        { key: 'description', title: '상세설명'},
    ]

    const allFields = fields.concat(hiddenFields);
    
    const rows = Array.apply(null, Array(books.length)).map(
        (item, idx) => ({
            roomId: books[idx].id,
            address: books[idx].address,
            price: books[idx].price,
            room: books[idx].room,
            birth: books[idx].birth,
            area_m2: books[idx].area_m2
        })
    );

    const hiddenRows = Array.apply(null, Array(books.length)).map(
        (item, idx) => ({
            update: books[idx].update,
            deposit: books[idx].deposit,
            mont_fee: books[idx].mont_fee,
            management_fee: books[idx].management_fee,
            bath: books[idx].bath,
            total_area_m2: books[idx].total_area_m2,
            land_m2: books[idx].land_m2,
            parking: books[idx].parking,
            elevator: books[idx].elevator,
            loan: books[idx].loan,
            empty: books[idx].empty,
            not_finished: books[idx].not_finished,
            naver: books[idx].naver,
            dabang: books[idx].dabang,
            zicbang: books[idx].zicbang,
            peterpan: books[idx].peterpan,
            owner_phone: books[idx].owner_phone,
            tenant_phone: books[idx].tenant_phone,
            description: books[idx].description,
        })
    )

    const allRows = rows.concat(hiddenRows);


    const state = {
        tableHead: fields.map(field => field.title),
        data: rows.map(row =>
            fields.map(field => row[field.key]))
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
        <ScrollView style={{padding:15}}>
            <Table borderStyle={{borderWidth: 1}}>
                <Row data={state.tableHead} />
                {
                    tableData.map((rowData, index) => (
                        <Row key={index} data={state.data[index]} onPress={() => navigation.navigate("DealApartDetail", allState.allData[index] )}/>
                    ))
                }
            </Table>
        </ScrollView>
    );
}

function mapStateToProps(state){
    return state.apartsReducer.explore;
};

function mapDispatchToProps(dispatch){
    return{
        getBooks: () => dispatch(getBooks()),
        navigation: () => useNavigation()
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TableView);
