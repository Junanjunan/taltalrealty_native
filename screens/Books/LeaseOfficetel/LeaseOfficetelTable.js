import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getLeaseOfficetel } from "../../../redux/officetelSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";
import { fields, hiddenFields, allFields } from "../LeaseApartment/LeaseApartmentTable";


const LeaseOfficetelTable = (props) => {
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

    useEffect(() => {props.getLeaseOfficetel()}, []);
    
    const rows = Array.apply(null, Array(props.officetel.officetelLease.length)).map(
        (item, idx) => ({
            address: props.officetel.officetelLease[idx].address,
            deposit: props.officetel.officetelLease[idx].deposit,
            month_fee: props.officetel.officetelLease[idx].month_fee,
            area_m2: props.officetel.officetelLease[idx].area_m2,
            room: props.officetel.officetelLease[idx].room,
            not_finished: `${props.officetel.officetelLease[idx].not_finished ? "O" : "X"}`,
            parking: `${props.officetel.officetelLease[idx].parking ? "O" : "X"}`,
            empty: `${props.officetel.officetelLease[idx].empty ? "O" : "X"}`,
            elevator: `${props.officetel.officetelLease[idx].elevator ? "O" : "X"}`,
            loan: `${props.officetel.officetelLease[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.officetel.officetelLease.length)).map(
        (item, idx) => ({
            address: props.officetel.officetelLease[idx].address,
            room: props.officetel.officetelLease[idx].room,
            birth: props.officetel.officetelLease[idx].birth,
            area_m2: props.officetel.officetelLease[idx].area_m2,
            updated: props.officetel.officetelLease[idx].updated,
            deposit: props.officetel.officetelLease[idx].deposit,
            month_fee: props.officetel.officetelLease[idx].month_fee,
            management_fee: props.officetel.officetelLease[idx].management_fee,
            bath: props.officetel.officetelLease[idx].bath,
            total_area_m2: props.officetel.officetelLease[idx].total_area_m2,
            parking: props.officetel.officetelLease[idx].parking,
            elevator: props.officetel.officetelLease[idx].elevator,
            loan: props.officetel.officetelLease[idx].loan,
            empty: props.officetel.officetelLease[idx].empty,
            not_finished: props.officetel.officetelLease[idx].not_finished,
            naver: props.officetel.officetelLease[idx].naver,
            dabang: props.officetel.officetelLease[idx].dabang,
            zicbang: props.officetel.officetelLease[idx].zicbang,
            peterpan: props.officetel.officetelLease[idx].peterpan,
            owner_phone: props.officetel.officetelLease[idx].owner_phone,
            tenant_phone: props.officetel.officetelLease[idx].tenant_phone,
            description: props.officetel.officetelLease[idx].description,
            roomId: props.officetel.officetelLease[idx].id
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
            ...(description && {description}),
            ...(parking && {parking}),
            ...(empty && {empty}),
            ...(elevator && {elevator}),
            ...(loan && {loan}),
            ...(not_finished && {not_finished}),
            realtor_id: props.userId
        };
        try{
            const { data } = await api.officetelLeaseSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("LeaseOfficetelSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View>
            <CreatingBtn onPress={() => props.navigation.navigate('LeaseOfficetelCreating')}>
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
                            onPress={() => props.navigation.navigate("LeaseOfficetelDetail", allRows[index] )}
                        />
                    ))
                }
            </Table>
        </ScrollView>
        </>
    );
}

const Test = (props) => {
    useEffect(() => {props.getLeaseOfficetel()}, []);
    console.log(props.officetel.officetelLease);
    return(
        <Text>Test</Text>
    );
}

function mapStateToProps(state){
    return {
        officetel: state.officetelReducer.explore,
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    };
};

function mapDispatchToProps(dispatch){
    return{
        getLeaseOfficetel: () => dispatch(getLeaseOfficetel()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaseOfficetelTable);
// export default connect(mapStateToProps, mapDispatchToProps)(Test);