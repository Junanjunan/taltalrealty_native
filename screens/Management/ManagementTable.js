import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { Dimensions } from "react-native";
import { getManagement } from "../../redux/managementSlice";

const { width } = Dimensions.get("screen");

const Container = styled.View`
    padding: 10px;
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

const TableScrollView = styled.ScrollView``;

const Text = styled.Text``;

const ManagementTable = (props) => {
    useEffect(() => {props.getManagement()}, []);
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
    ];
    const hiddennFields = [
        { key: 'deposit', title: '보증금'},
        { key: 'month_fee', title: '월세'},
        { key: 'management_fee', title: '관리비'},
        { key: 'parking_fee', title: '주차비'},
        { key: 'start_day', title: '계약일'},
        { key: 'contract_start_day', title: '입주일'},
        { key: 'contract_last_day', title: '만기일'},
        { key: 'deal_renewal_right_usage', title:'갱신청구권 사용여부'},
        { key: 'owner_phone', title: '임대인'},
        { key: 'tenant_phone', title: '임차인'},
        { key: 'description', title: '특이사항'},
        { key: 'managementId', title: 'ID'}
    ];

    const allFields = fields.concat(hiddennFields);

    console.log(props.management.management);
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
    }

    return(
        <Container>
            <CreatingBtn onPress={() => props.navigation.navigate('ManagementCreating')}>
                <Text>관리 매물등록</Text>
            </CreatingBtn>
            <Table borderStyle={{borderWidth:1}}>
                <Row 
                    data = {state.tableHead}
                    widthArr = {state.widthArr}
                    height = {50}
                    textStyle = {{textAlign: "center"}}
                    style = {{
                        backgroundColor: "skyBlue"
                    }}
                />
            </Table>
            <TableScrollView>
                <Table borderStyle={{borderWidth:1}}>
                    {
                        tableData.map((rowData, index) => (
                            <Row
                                key={index}
                                data={state.data[index]}
                                style={{height:50}}
                                textStyle={{textAlign:"center", fontSize:14}}
                                widthArr={state.widthArr}
                                onPress={() => props.navigation.navigate("ManagementDetail", allRows[index])}
                            />
                        ))
                    }
                </Table>
            </TableScrollView>
        </Container>
    );
};

function mapStateToProps(state){
    return {
        management: state.managementReducer.explore,
        token: state.usersReducer.token
    }
};

function mapDispatchToProps(dispatch){
    return{
        getManagement: () => dispatch(getManagement())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ManagementTable);