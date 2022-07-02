import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getLeaseVilla } from "../../../redux/villasSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";


const LeaseVillaSearchTable = ({ getLeaseVilla, navigation, route: {params}, token, userId}) => {
    const [address, setAddress] = useState(params.form.address);
    const [room, setRoom] = useState(params.form.room);
    const [deposit, setDeposit] = useState(params.form.deposit);
    const [month_fee, setMonth_fee] = useState(params.form.month_fee);
    const [area_m2, setArea_m2] = useState(params.form.area_m2);
    const [empty, setEmpty] = useState(params.form.empty);
    const [parking, setParking] = useState(params.form.parking);
    const [elevator, setElevator] = useState(params.form.elevator);
    const [loan, setLoan] = useState(params.form.loan);
    const [not_finished, setNot_finished] = useState(params.form.not_finished);

    useEffect(() => {getLeaseVilla()}, []);

    const fields = [
        { key: 'address', title: '주소', width:120},
        { key: 'deposit', title: '보증금', width:40},
        { key: 'month_fee', title: '월세', width:30},
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
        { key: 'management_fee', title: '관리비', width:100},
        { key: 'bath', title: '화장실', width:100},
        { key: 'total_area_m2', title: '공급면적', width:100},
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
    
    const rows = Array.apply(null, Array(params.data.length)).map(
        (item, idx) => ({
            address: params.data[idx].address,
            deposit: params.data[idx].deposit,
            month_fee: params.data[idx].month_fee,
            area_m2: params.data[idx].area_m2,
            room: params.data[idx].room,
            not_finished: `${params.data[idx].not_finished ? "O" : "X"}`,
            parking: `${params.data[idx].parking ? "O" : "X"}`,
            empty: `${params.data[idx].empty ? "O" : "X"}`,
            elevator: `${params.data[idx].elevator ? "O" : "X"}`,
            loan: `${params.data[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(params.data.length)).map(
        (item, idx) => ({
            address: params.data[idx].address,
            birth: params.data[idx].birth,
            area_m2: params.data[idx].area_m2,
            updated: params.data[idx].updated,
            deposit: params.data[idx].deposit,
            month_fee: params.data[idx].month_fee,
            room: params.data[idx].room,
            management_fee: params.data[idx].management_fee,
            bath: params.data[idx].bath,
            total_area_m2: params.data[idx].total_area_m2,
            parking: params.data[idx].parking,
            elevator: params.data[idx].elevator,
            loan: params.data[idx].loan,
            empty: params.data[idx].empty,
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
            ...(room && {room}),
            ...(deposit && {deposit}),
            ...(month_fee && {month_fee}),
            ...(area_m2 && {area_m2}),
            ...(parking && {parking}),
            ...(empty && {empty}),
            ...(elevator && {elevator}),
            ...(loan && {loan}),
            ...(not_finished && {not_finished}),
            realtor_id: userId
        };
        try{
            const { data } = await api.villaLeaseSearching(form, `Bearer ${token}`)
            navigation.navigate("LeaseVillaSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View>
            <CreatingBtn onPress={() => navigation.navigate('LeaseVillaCreating')}>
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
                height={50}
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
                            onPress={() => navigation.navigate("LeaseVillaDetail", allRows[index] )}
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
        getLeaseVilla: () => dispatch(getLeaseVilla()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(LeaseVillaSearchTable);