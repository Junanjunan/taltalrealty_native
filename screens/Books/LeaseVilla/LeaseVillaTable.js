import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getLeaseVilla } from "../../../redux/villasSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";
import { fields, hiddenFields, allFields } from "../LeaseApartment/LeaseApartmentTable";


const LeaseVillaTable = (props) => {
    const [address, setAddress] = useState();
    const [room, setRoom] = useState();
    const [deposit, setDeposit] = useState();
    const [month_fee, setMonth_fee] = useState();
    const [area_m2, setArea_m2] = useState();
    const [description, setDescription] = useState();
    const [empty, setEmpty] = useState(false);
    const [parking, setParking] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [loan, setLoan] = useState(false);
    const [not_finished, setNot_finished] = useState(true);

    useEffect(() => {props.getLeaseVilla()}, []);
    
    const rows = Array.apply(null, Array(props.villa.villaLease.length)).map(
        (item, idx) => ({
            address: props.villa.villaLease[idx].address,
            deposit: props.villa.villaLease[idx].deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            month_fee: props.villa.villaLease[idx].month_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            room: props.villa.villaLease[idx].room,
            area_m2: props.villa.villaLease[idx].area_m2,
            not_finished: `${props.villa.villaLease[idx].not_finished ? "O" : "X"}`,
            parking: `${props.villa.villaLease[idx].parking ? "O" : "X"}`,
            empty: `${props.villa.villaLease[idx].empty ? "O" : "X"}`,
            elevator: `${props.villa.villaLease[idx].elevator ? "O" : "X"}`,
            loan: `${props.villa.villaLease[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.villa.villaLease.length)).map(
        (item, idx) => ({
            address: props.villa.villaLease[idx].address,
            birth: props.villa.villaLease[idx].birth,
            area_m2: props.villa.villaLease[idx].area_m2,
            updated: props.villa.villaLease[idx].updated,
            deposit: props.villa.villaLease[idx].deposit,
            room: props.villa.villaLease[idx].room,
            month_fee: props.villa.villaLease[idx].month_fee,
            management_fee: props.villa.villaLease[idx].management_fee,
            bath: props.villa.villaLease[idx].bath,
            total_area_m2: props.villa.villaLease[idx].total_area_m2,
            parking: props.villa.villaLease[idx].parking,
            elevator: props.villa.villaLease[idx].elevator,
            loan: props.villa.villaLease[idx].loan,
            empty: props.villa.villaLease[idx].empty,
            not_finished: props.villa.villaLease[idx].not_finished,
            naver: props.villa.villaLease[idx].naver,
            dabang: props.villa.villaLease[idx].dabang,
            zicbang: props.villa.villaLease[idx].zicbang,
            peterpan: props.villa.villaLease[idx].peterpan,
            owner_phone: props.villa.villaLease[idx].owner_phone,
            tenant_phone: props.villa.villaLease[idx].tenant_phone,
            description: props.villa.villaLease[idx].description,
            roomId: props.villa.villaLease[idx].id
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
            ...(deposit && {deposit}),
            ...(month_fee && {month_fee}),
            ...(room && {room}),
            ...(area_m2 && {area_m2}),
            ...(description && {description}),
            ...(parking && {parking}),
            ...(empty && {empty}),
            ...(elevator && {elevator}),
            ...(loan && {loan}),
            ...(not_finished && {not_finished}),
            realtor_id: props.userId
        };
        try{
            const { data } = await api.villaLeaseSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("LeaseVillaSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View>
            <CreatingBtn onPress={() => props.navigation.navigate('LeaseVillaCreating')}>
                <Text>매물등록</Text>
            </CreatingBtn>
            <SearchContainer>
                <Div>
                    <SearchArticle><SearchTitleText>주소</SearchTitleText><SearchInputAddress value={address} onChangeText={text => setAddress(text)} /></SearchArticle>
                    <SearchArticle><SearchTitleText>방</SearchTitleText><SearchInput keyboardType="numeric" value={room} onChangeText={text => setRoom(text)} /></SearchArticle>
                </Div>
                <Div>
                    <SearchArticle><SearchTitleText>보증금</SearchTitleText><SearchInput keyboardType="numeric" value={deposit} onChangeText={text => setDeposit(text)} /><Text>만원 이하</Text></SearchArticle>
                    <SearchArticle><SearchTitleText>월세</SearchTitleText><SearchInput keyboardType="numeric" value={month_fee} onChangeText={text => setMonth_fee(text)} /><Text>만원 이하</Text></SearchArticle>
                </Div>
                <Div>
                    <SearchArticle><SearchTitleText>전용면적</SearchTitleText><SearchInput keyboardType="numeric" value={area_m2} onChangeText={text => setArea_m2(text)} /><Text>㎡ 이상</Text></SearchArticle>
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
                            onPress={() => props.navigation.navigate("LeaseVillaDetail", allRows[index] )}
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
        getLeaseVilla: () => dispatch(getLeaseVilla()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaseVillaTable);