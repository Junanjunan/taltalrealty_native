import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { Dimensions } from "react-native";
import { getManagement } from "../../redux/managementSlice";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../components/Detail/Table";
import Checkbox from "expo-checkbox";
import api from "../../api";
import NavigationTab from "../../components/NavigationTab";

const ManagementTable = (props) => {
    useEffect(() => {props.getManagement()}, []);
    const [address, setAddress] = useState();
    const [description, setDescription] = useState();
    const [deal_report, setDeal_report] = useState(false);
    const [deal_renewal_notice, setDeal_renewal_notice] = useState(false);
    const [deal_renewal_right_usage, setDeal_renewal_right_usage] = useState(false);

    const fields = [
        { key: 'address', title: '주소', width: 80},
        { key: 'contract_day', title:'계약일', width: 40},
        { key: 'contract_start_day', title:'입주일', width: 40},
        { key: 'contract_last_day', title:'만기일', width: 40},
        { key: 'report_due_day', title:'신고 잔여일', width: 40 },
        { key: 'rest_contract_day', title:'남은 계약일', width: 40},
        { key: 'deal_report', title:'거래신고', width: 30},
        { key: 'renewal_period', title:'갱신기간', width: 30},
        { key: 'deal_renewal_notice', title:'갱신고지', width: 30},
        { key: 'deal_renewal_right_usage', title:'갱신권 사용', width:30}
    ];
    // const hiddennFields = [
    //     { key: 'deposit', title: '보증금'},
    //     { key: 'month_fee', title: '월세'},
    //     { key: 'management_fee', title: '관리비'},
    //     { key: 'parking_fee', title: '주차비'},
    //     { key: 'start_day', title: '계약일'},
    //     { key: 'contract_start_day', title: '입주일'},
    //     { key: 'contract_last_day', title: '만기일'},
    //     { key: 'deal_renewal_right_usage', title:'갱신청구권 사용여부'},
    //     { key: 'owner_phone', title: '임대인'},
    //     { key: 'tenant_phone', title: '임차인'},
    //     { key: 'description', title: '특이사항'},
    //     { key: 'managementId', title: 'ID'}
    // ];

    const management = props.management.management
    const rows = Array.apply(null, Array(management.length)).map(
        (item, idx) => (
            {
                address: management[idx].address,
                contract_day: management[idx].contract_day,
                contract_start_day: management[idx].contract_start_day,
                contract_last_day: management[idx].contract_last_day,
                report_due_day: `${management[idx].deal_report ? "-": 30 - Math.floor((new Date() - new Date(management[idx].contract_day))/86400000)}`,
                rest_contract_day: `${Math.floor((new Date(management[idx].contract_last_day) - new Date())/86400000)}`,
                deal_report: `${management[idx].deal_report ? "O" : "X"}`,
                renewal_period: `${Math.floor((new Date(management[idx].contract_last_day) - new Date())/86400000) < 180 && Math.floor((new Date(management[idx].contract_last_day) - new Date())/86400000) > 60 ? "O" : "X"}`,
                deal_renewal_notice: `${management[idx].deal_renewal_notice ? "O" : "X"}`,
                deal_renewal_right_usage: `${management[idx].deal_renewal_right_usage ? "O" : "X"}`
            }
        )
    );

    const allRows = Array.apply(null, Array(management.length)).map(
        (item, idx) => ({
            address: management[idx].address,
            contract_day: management[idx].contract_day,
            contract_start_day: management[idx].contract_start_day,
            contract_last_day: management[idx].contract_last_day,
            report_due_day: `${30 - Math.floor((new Date() - new Date(management[idx].contract_day))/86400000)}`,
            rest_contract_day: `${Math.floor((new Date(management[idx].contract_last_day) - new Date())/86400000)}`,
            deal_report: management[idx].deal_report,
            renewal_period: `${Math.floor((new Date(management[idx].contract_last_day) - new Date())/86400000) < 180 && Math.floor((new Date(management[idx].contract_last_day) - new Date())/86400000) > 60 ? true : false}`,
            deal_renewal_notice: management[idx].deal_renewal_notice,
            deposit: management[idx].deposit,
            month_fee: management[idx].month_fee,
            management_fee: management[idx].management_fee,
            parking_fee: management[idx].parking_fee,
            start_day: management[idx].start_day,
            contract_start_day: management[idx].contract_start_day,
            contract_last_day: management[idx].contract_last_day,
            deal_renewal_right_usage: management[idx].deal_renewal_right_usage,
            owner_phone: management[idx].owner_phone,
            tenant_phone: management[idx].tenant_phone,
            description: management[idx].description,
            managementId: management[idx].id,
        })
    );

    const state = {
        tableHead: fields.map(field => field.title),
        data: rows.map(row =>
            fields.map(field => row[field.key])
            ),
        widthArr: fields.map(field => field.width),
    }

    const tableData = [];
    for (let i=0; i<rows.length; i+=1){
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
            ...(deal_report && {deal_report}),
            ...(deal_renewal_notice && {deal_renewal_notice}),
            ...(deal_renewal_right_usage && {deal_renewal_right_usage}),
            realtor_id: props.userId
        };
        try{
            const { data } = await api.managementSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("ManagementSearching", {data, form});
        } catch(e){
            console.warn(e);
        }
    };

    return(
        <View>
            <CreatingBtn onPress={() => props.navigation.navigate('ManagementCreating')}>
                <Text>관리 매물등록</Text>
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
                        <Checkbox style={CheckboxStyle} value={deal_report} onValueChange={(newValue) => setDeal_report(newValue)}/>
                    </SearchArticle>
                    <SearchArticle>
                        <SearchTitleText>갱신고지</SearchTitleText>
                        <Checkbox style={CheckboxStyle} value={deal_renewal_notice} onValueChange={(newValue) => setDeal_renewal_notice(newValue)}/>
                    </SearchArticle>
                    <SearchArticle>
                        <SearchTitleText>갱신청구권 사용</SearchTitleText>
                        <Checkbox style={CheckboxStyle} value={deal_renewal_right_usage} onValueChange={(newValue) => setDeal_renewal_right_usage(newValue)}/>
                    </SearchArticle>
                </Div>
                <SearchBtn onPress={() => getSearching()}>
                    <SearchBtnText>계약 검색</SearchBtnText>
                </SearchBtn>
            </SearchContainer>
            <Table borderStyle={TableBorderStyle}>
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
                        tableData.map((rowData, index) => (
                            <Row
                                key={index}
                                data={state.data[index]}
                                style={RowBodyStyle}
                                textStyle={RowTextStyle}
                                widthArr={state.widthArr}
                                onPress={() => props.navigation.navigate("ManagementDetail", allRows[index])}
                            />
                        ))
                    }
                </Table>
            </ScrollView>
        </View>
    );
};

function mapStateToProps(state){
    return {
        management: state.managementReducer.explore,
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    }
};

function mapDispatchToProps(dispatch){
    return{
        getManagement: () => dispatch(getManagement())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ManagementTable);