import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getCustomerLeaseStore } from "../../../redux/storeSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";
import { TableWidth } from "../../../components/DivCollection";


const CustomerLeaseStoreTable = (props) => {
    const [guest_phone, setGuest_phone] = useState();
    const [deposit, setDeposit] = useState();
    const [month_fee, setMonth_fee] = useState();
    const [area_m2, setArea_m2] = useState();
    const [parking, setParking] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [loan, setLoan] = useState(false);
    const [not_finished, setNot_finished] = useState(true);

    useEffect(() => {props.getCustomerLeaseStore()}, []);

    const UnitWidth = TableWidth/8;

    const fields = [
        { key: 'guest_phone', title: '손님 (연락처)', width:UnitWidth*2.1},
        { key: 'deposit', title: '보증금', width:UnitWidth*1.1},
        { key: 'month_fee', title: '월세', width:UnitWidth},
        { key: 'area_m2', title: '면적(㎡)', width:UnitWidth*1.1},
        { key: 'parking', title: '주차', width:UnitWidth*2/3},
        { key: 'elevator', title: '승강기', width:UnitWidth*2/3},
        { key: 'loan', title: '대출', width:UnitWidth*2/3},
        { key: 'not_finished', title: '진행매물', width:UnitWidth*2/3},
    ];

    const hiddenFields = [
        { key: 'updated', title: '확인일', width:100},
        { key: 'guest_phone', title: '연락처', width:100},
        { key: 'description', title: '상세설명', width:100},
        { key: 'roomId', title: 'ID', width: 100}
    ]

    const allFields = fields.concat(hiddenFields);
    
    const rows = Array.apply(null, Array(props.store.customerStoreLease.length)).map(
        (item, idx) => ({
            guest_phone: props.store.customerStoreLease[idx].guest_phone,
            deposit: props.store.customerStoreLease[idx].deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            month_fee: props.store.customerStoreLease[idx].month_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            area_m2: props.store.customerStoreLease[idx].area_m2,
            not_finished: `${props.store.customerStoreLease[idx].not_finished ? "O" : "X"}`,
            parking: `${props.store.customerStoreLease[idx].parking ? "O" : "X"}`,
            elevator: `${props.store.customerStoreLease[idx].elevator ? "O" : "X"}`,
            loan: `${props.store.customerStoreLease[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.store.customerStoreLease.length)).map(
        (item, idx) => ({
            guest_phone: props.store.customerStoreLease[idx].guest_phone,
            deposit: props.store.customerStoreLease[idx].deposit,
            month_fee: props.store.customerStoreLease[idx].month_fee,
            area_m2: props.store.customerStoreLease[idx].area_m2,
            updated: props.store.customerStoreLease[idx].updated,
            parking: props.store.customerStoreLease[idx].parking,
            elevator: props.store.customerStoreLease[idx].elevator,
            loan: props.store.customerStoreLease[idx].loan,
            not_finished: props.store.customerStoreLease[idx].not_finished,
            description: props.store.customerStoreLease[idx].description,
            roomId: props.store.customerStoreLease[idx].id
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
            ...(deposit && {deposit}),
            ...(month_fee && {month_fee}),
            ...(area_m2 && {area_m2}),
            ...(parking && {parking}),
            ...(elevator && {elevator}),
            ...(loan && {loan}),
            ...(not_finished && {not_finished}),
            realtor_id: props.userId
        };
        try{
            const { data } = await api.customerStoreLeaseSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("CustomerLeaseStoreSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View>
            <CreatingBtn onPress={() => props.navigation.navigate('CustomerLeaseStoreCreating')}>
                <Text>손님등록</Text>
            </CreatingBtn>
            <SearchContainer>
                <Div>
                    <SearchArticle><SearchTitleText>손님(연락처)</SearchTitleText><SearchInputAddress value={guest_phone} onChangeText={text => setGuest_phone(text)} /></SearchArticle>
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
                            onPress={() => props.navigation.navigate("CustomerLeaseStoreDetail", allRows[index] )}
                        />
                    ))
                }
            </Table>
        </ScrollView>
        </>
    );
}

const Test = (props) => {
    useEffect(() => {props.getCustomerLeaseStore()}, []);
    console.log(props);
    
    return(
        <Text>Test</Text>
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
        getCustomerLeaseStore: () => dispatch(getCustomerLeaseStore()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLeaseStoreTable);
// export default connect(mapStateToProps, mapDispatchToProps)(Test);