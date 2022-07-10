import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getContract } from "../../redux/contractSlice";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../components/Detail/Table";
import Checkbox from "expo-checkbox";
import api from "../../api";
import { TableWidth } from "../../components/DivCollection";


const ContractTable = ({getContract, contract:{contract}, navigation, token, userId}) => {
    useEffect(() => {getContract()}, []);

    const [address, setAddress] = useState();
    const [description, setDescription] = useState();
    const [report, setReport] = useState(false);
    const [not_finished, setNot_finished] = useState(true);

    const UnitWidth = TableWidth/7;

    const fields = [
        { key: 'address', title: '주소', width: UnitWidth*1.75},
        { key: 'types', title: '유형', width: UnitWidth*2/3},
        { key: 'start_day', title:'계약일', width: UnitWidth*1.4},
        { key: 'last_day', title:'잔금일', width: UnitWidth*1.4},
        { key: 'report_due_date', title:'남은 신고일', width: UnitWidth*3/4},
        { key: 'report', title:'거래신고', width: UnitWidth*1/2},
        { key: 'not_finished', title:'진행중', width: UnitWidth*1/2},
    ];

    const rows = Array.apply(null, Array(contract.length)).map(
        (item, idx) => (
            {
            address: contract[idx].address,
            types: `${contract[idx].types==="Deal" ? "매매" : "임대" }`,
            start_day: contract[idx].start_day,
            last_day: contract[idx].last_day,
            report_due_date: `${Math.floor(31 + new Date(contract[idx].start_day)/86400000 - new Date()/86400000)}`,
            report: `${contract[idx].report ? "O" : "X"}`,
            not_finished: `${contract[idx].not_finished ? "O" : "X"}`
            }
        )
    );

    const allRows = Array.apply(null, Array(contract.length)).map(
        (item, idx) => ({
            address: contract[idx].address,
            types: `${contract[idx].types==="Deal" ? "매매" : "임대" }`,
            start_day: contract[idx].start_day,
            last_day: contract[idx].last_day,
            report_due_date: `${Math.floor(31 + new Date(contract[idx].start_day)/86400000 - new Date()/86400000)}`,
            report: contract[idx].report,
            not_finished: contract[idx].not_finished,
            price: contract[idx].price,
            deposit: contract[idx].deposit,
            month_fee: contract[idx].month_fee,
            start_money: contract[idx].start_money,
            middle_money: contract[idx].middle_money,
            last_money: contract[idx].last_money,
            middle_day: contract[idx].middle_day,
            due_days: `${Math.floor(new Date(contract[idx].last_day)/86400000 - new Date()/86400000)}`,
            owner_phone: contract[idx].owner_phone,
            tenant_phone: contract[idx].tenant_phone,
            description: contract[idx].description,
            contractId: contract[idx].id
        })
    );

    const state = {
        tableHead: fields.map(field => field.title),
        data: rows.map(row =>
            fields.map(field => row[field.key])
            ),
        widthArr: fields.map(field => field.width),
    };

    const tableData = [];
    for (let i=0; i< rows.length; i+=1){
        const rowData = [];
        for (let j=0; j<fields.length; j+=1){
            rowData.push(`${i}${j}`);
        };
        tableData.push(rowData);
    };

    async function getSearching(){
        const form = {
            ...(address && {address}),
            ...(description && {description}),
            ...(report && {report}),
            ...(not_finished && {not_finished}),
            realtor_id: userId
        };
        try{
            const { data } = await api.contractSearching(form, `Bearer ${token}`)
            navigation.navigate("ContractSearching", {data, form});
        } catch(e){
            console.warn(e);
        }
    };

    return (
    <>
    <View>
        <CreatingBtn onPress={() => navigation.navigate('ContractCreating')}>
            <Text>계약등록</Text>
        </CreatingBtn>
        <SearchContainer>
            <Div>
                <SearchArticle><SearchTitleText>주소</SearchTitleText><SearchInputAddress value={address} onChangeText={text => setAddress(text)} /></SearchArticle>
            </Div>
            <Div>
                <SearchArticle><SearchTitleText>비고</SearchTitleText><SearchInputAddress value={description} onChangeText={text => setDescription(text)} /></SearchArticle>
            </Div>
            <Div>
                <SearchArticle>
                    <SearchTitleText>신고완료</SearchTitleText>
                    <Checkbox style={CheckboxStyle} value={report} onValueChange={(newValue) => setReport(newValue)}/>
                </SearchArticle>
                <SearchArticle>
                    <SearchTitleText>진행중</SearchTitleText>
                    <Checkbox style={CheckboxStyle} value={not_finished} onValueChange={(newValue) => setNot_finished(newValue)}/>
                </SearchArticle>
            </Div>
            <SearchBtn onPress={() => getSearching()}>
                <SearchBtnText>계약 검색</SearchBtnText>
            </SearchBtn>
        </SearchContainer>
        <Table borderStyle={{borderWidth: 1}}>
            <Row 
                data = {state.tableHead}
                widthArr = {state.widthArr}
                textStyle = {RowTextStyle}
                style = {RowHeadStyle}
            />
        </Table>
        <ScrollView>
            <Table borderStyle={TableBorderStyle}>
                {
                    tableData.map((rowData, index) =>(
                        <Row 
                            key={index}
                            data={state.data[index]}
                            style={RowBodyStyle}
                            textStyle={RowTextStyle}
                            widthArr={state.widthArr}
                            onPress={() => navigation.navigate("ContractDetail", allRows[index])}
                        />
                    ))
                }
            </Table>
        </ScrollView>
    </View>
    </>
    );
}


function mapStateToProps(state){
    return {
        contract: state.contractReducer.explore,
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    }
};

function mapDispatchToProps(dispatch){
    return{
        getContract: () => dispatch(getContract()),
        doSetNavContract: () => dispatch(doSetNavContract())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractTable);