import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getCustomerLeaseStore } from "../../../redux/storeSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";


const CustomerLeaseStoreSearchTable = ({ getCustomerLeaseStore, navigation, route: {params}, token, userId}) => {
    const [guest_phone, setGuest_phone] = useState(params.form.guest_phone);
    const [deposit, setDeposit] = useState(params.form.deposit);
    const [month_fee, setMonth_fee] = useState(params.form.month_fee);
    const [area_m2, setArea_m2] = useState(params.form.area_m2);
    const [parking, setParking] = useState(params.form.parking);
    const [elevator, setElevator] = useState(params.form.elevator);
    const [loan, setLoan] = useState(params.form.loan);
    const [not_finished, setNot_finished] = useState(params.form.not_finished);

    useEffect(() => {getCustomerLeaseStore()}, []);

    const fields = [
        { key: 'guest_phone', title: '손님 (연락처)', width:55},
        { key: 'deposit', title: '보증금', width:40},
        { key: 'month_fee', title: '월세', width:30},
        { key: 'area_m2', title: '면적 (㎡)', width:40},
        { key: 'parking', title: '주차', width:25},
        { key: 'elevator', title: '승강기', width:25},
        { key: 'loan', title: '대출', width:25},
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
            deposit: params.data[idx].deposit,
            month_fee: params.data[idx].month_fee,
            area_m2: params.data[idx].area_m2,
            not_finished: `${params.data[idx].not_finished ? "O" : "X"}`,
            parking: `${params.data[idx].parking ? "O" : "X"}`,
            elevator: `${params.data[idx].elevator ? "O" : "X"}`,
            loan: `${params.data[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(params.data.length)).map(
        (item, idx) => ({
            guest_phone: params.data[idx].guest_phone,
            deposit: params.data[idx].deposit,
            month_fee: params.data[idx].month_fee,
            area_m2: params.data[idx].area_m2,
            updated: params.data[idx].updated,
            parking: params.data[idx].parking,
            elevator: params.data[idx].elevator,
            loan: params.data[idx].loan,
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
            ...(deposit && {deposit}),
            ...(month_fee && {month_fee}),
            ...(area_m2 && {area_m2}),
            ...(parking && {parking}),
            ...(elevator && {elevator}),
            ...(loan && {loan}),
            ...(not_finished && {not_finished}),
            realtor_id: userId
        };
        try{
            const { data } = await api.customerStoreLeaseSearching(form, `Bearer ${token}`)
            navigation.navigate("CustomerLeaseStoreSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View>
            <CreatingBtn onPress={() => navigation.navigate('CustomerLeaseStoreCreating')}>
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
                            onPress={() => navigation.navigate("CustomerLeaseStoreDetail", allRows[index] )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLeaseStoreSearchTable);
// export default connect(mapStateToProps, mapDispatchToProps)(Test);