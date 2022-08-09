import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getLeaseStore } from "../../../redux/storeSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";
import { TableWidth } from "../../../components/DivCollection";
import { BookTitle } from "../../../components/Detail/BookTitle";


const UnitWidth = TableWidth/10;

const LeaseStoreTable = (props) => {
    const [address, setAddress] = useState();
    const [deposit, setDeposit] = useState();
    const [month_fee, setMonth_fee] = useState();
    const [area_m2, setArea_m2] = useState();
    const [description, setDescription] = useState();
    const [empty, setEmpty] = useState(false);
    const [parking, setParking] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [loan, setLoan] = useState(false);
    const [not_finished, setNot_finished] = useState(true);

    useEffect(() => {props.getLeaseStore()}, []);

    const fields = [
        { key: 'address', title: '주소', width:UnitWidth*3.2},
        { key: 'deposit', title: '보증금', width:UnitWidth*1.3},
        { key: 'month_fee', title: '월세', width:UnitWidth},
        { key: 'area_m2', title: '면적 (㎡)', width:UnitWidth*1.1},
        { key: 'parking', title: '주차', width:UnitWidth*2/3},
        { key: 'empty', title: '공실', width:UnitWidth*2/3},
        { key: 'elevator', title: '승강기', width:UnitWidth*2/3},
        { key: 'loan', title: '대출', width:UnitWidth*2/3},
        { key: 'not_finished', title: '진행매물', width:UnitWidth*2/3},
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
    
    const rows = Array.apply(null, Array(props.store.storeLease.length)).map(
        (item, idx) => ({
            address: props.store.storeLease[idx].address,
            deposit: props.store.storeLease[idx].deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            month_fee: props.store.storeLease[idx].month_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            area_m2: props.store.storeLease[idx].area_m2,
            not_finished: `${props.store.storeLease[idx].not_finished ? "O" : "X"}`,
            parking: `${props.store.storeLease[idx].parking ? "O" : "X"}`,
            empty: `${props.store.storeLease[idx].empty ? "O" : "X"}`,
            elevator: `${props.store.storeLease[idx].elevator ? "O" : "X"}`,
            loan: `${props.store.storeLease[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.store.storeLease.length)).map(
        (item, idx) => ({
            address: props.store.storeLease[idx].address,
            birth: props.store.storeLease[idx].birth,
            area_m2: props.store.storeLease[idx].area_m2,
            updated: props.store.storeLease[idx].updated,
            deposit: props.store.storeLease[idx].deposit,
            month_fee: props.store.storeLease[idx].month_fee,
            management_fee: props.store.storeLease[idx].management_fee,
            bath: props.store.storeLease[idx].bath,
            total_area_m2: props.store.storeLease[idx].total_area_m2,
            parking: props.store.storeLease[idx].parking,
            elevator: props.store.storeLease[idx].elevator,
            loan: props.store.storeLease[idx].loan,
            empty: props.store.storeLease[idx].empty,
            not_finished: props.store.storeLease[idx].not_finished,
            naver: props.store.storeLease[idx].naver,
            dabang: props.store.storeLease[idx].dabang,
            zicbang: props.store.storeLease[idx].zicbang,
            peterpan: props.store.storeLease[idx].peterpan,
            owner_phone: props.store.storeLease[idx].owner_phone,
            tenant_phone: props.store.storeLease[idx].tenant_phone,
            description: props.store.storeLease[idx].description,
            roomId: props.store.storeLease[idx].id
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
            const { data } = await api.storeLeaseSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("LeaseStoreSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View>
            <BookTitle props={props} />
            <CreatingBtn onPress={() => props.navigation.navigate('LeaseStoreCreating')}>
                <Text>매물등록</Text>
            </CreatingBtn>
            <SearchContainer>
                <Div>
                    <SearchArticle><SearchTitleText>주소</SearchTitleText><SearchInputAddress value={address} onChangeText={text => setAddress(text)} /></SearchArticle>
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
                            onPress={() => props.navigation.navigate("LeaseStoreDetail", allRows[index] )}
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
        store: state.storeReducer.explore,
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    };
};

function mapDispatchToProps(dispatch){
    return{
        getLeaseStore: () => dispatch(getLeaseStore()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaseStoreTable);