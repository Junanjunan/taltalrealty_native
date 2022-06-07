import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import api from "../../api";
import { getContract } from "../../redux/contractSlice";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

const Container = styled.View`
    padding: 10px;
`;

const TableScrollView = styled.ScrollView``;

const Text = styled.Text``;


const ContractTable = ({getContract, contract:{contract}, navigation, token }) => {

    console.log(contract);
    useEffect(() => {getContract()}, []);

    const fields = [
        { key: 'address', title: '주소', width: 120},
        { key: 'types', title: '유형', width: 30},
        { key: 'start_day', title:'계약일', width: 70},
        { key: 'last_day', title:'잔금일', width: 70},
        { key: 'report_due_date', title:'남은 신고일', width: 40},
        { key: 'report', title:'거래신고', width: 30},
        { key: 'not_finished', title:'진행중', width: 30}
    ];
    const hiddennFields = [
        { key: 'price', title: '가격'},
        { key: 'deposit', title: '보증금'},
        { key: 'month_fee', title: '월세'},
        { key: 'start_money', title: '계약금'},
        { key: 'middle_money', title: '중도금'},
        { key: 'last_money', title: '잔금'},
        { key: 'middle_day', title: '중도금일'},
        { key: 'due_days', title: '잔금일까지'},
        { key: 'owner_phone', title: '매도(임대)인'},
        { key: 'tenant_phone', title: '매수(임차)인'},
        { key: 'description', title: '특이사항'},
        { key: 'contractId', title: 'ID'}
    ]

    const allFields = fields.concat(hiddennFields);

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
            report: `${contract[idx].report ? "O" : "X"}`,
            not_finished: `${contract[idx].not_finished ? "O" : "X"}`,
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
    )

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
    }

    return (
      <>
      <Container>
          <Table borderStyle={{borderWidth: 1}}>
              <Row 
                data = {state.tableHead}
                widthArr = {state.widthArr}
                height = {50}
                textStyle = {{textAlign: "center"}}
                style = {{
                    backgroundColor: "skyBlue",
                }}
              />
          </Table>
          <TableScrollView>
                <Table borderStyle={{borderWidth:1}}>
                    {
                        tableData.map((rowData, index) =>(
                            <Row 
                                key={index}
                                data={state.data[index]}
                                style={{height:50}}
                                textStyle={{textAlign:"center", fontSize:14}}
                                widthArr={state.widthArr}
                                onPress={() => navigation.navigate("ContractDetail", allRows[index])}
                            />
                        ))
                    }
                </Table>
          </TableScrollView>
      </Container>
      </>
    );
  }
  
  
  function mapStateToProps(state){
      return {
        contract: state.contractReducer.explore,
        token: state.usersReducer.token
      }
  };
  
  function mapDispatchToProps(dispatch){
      return{
          getContract: () => dispatch(getContract())
      }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ContractTable);