import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getLeaseApartment } from "../../../redux/apartmentSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";


const LeaseApartmentTable = (props) => {
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

    useEffect(() => {props.getLeaseApartment()}, []);

    const fields = [
        { key: 'address', title: '주소', width:120},
        { key: 'area_m2', title: '면적 (㎡)', width:40},
        { key: 'room', title: '방', width:20},
        { key: 'deposit', title: '보증금', width:40},
        { key: 'month_fee', title: '월세', width:30},
        { key: 'parking', title: '주차', width:25},
        { key: 'empty', title: '공실', width:25},
        { key: 'elevator', title: '승강기', width:25},
        { key: 'loan', title: '대출', width:25},
        { key: 'not_finished', title: '진행매물', width:25},
    ];

    const hiddenFields = [
        { key: 'updated', title: '확인일'},
        { key: 'management_fee', title: '관리비'},
        { key: 'bath', title: '화장실'},
        { key: 'total_area_m2', title: '공급면적'},
        { key: 'parking', title: '주차'},
        { key: 'elevator', title: '승강기'},
        { key: 'empty', title: '공실'},
        { key: 'naver', title: '네이버'},
        { key: 'dabang', title: '다방'},
        { key: 'zicbang', title: '직방'},
        { key: 'peterpan', title: '피터팬'},
        { key: 'owner_phone', title: '집주인'},
        { key: 'tenant_phone', title: '세입자'},
        { key: 'description', title: '상세설명'},
        { key: 'roomId', title: 'ID'}
    ]

    const allFields = fields.concat(hiddenFields);
    
    const rows = Array.apply(null, Array(props.apartment.apartmentLease.length)).map(
        (item, idx) => ({
            address: props.apartment.apartmentLease[idx].address,
            area_m2: props.apartment.apartmentLease[idx].area_m2,
            room: props.apartment.apartmentLease[idx].room,
            deposit: props.apartment.apartmentLease[idx].deposit,
            month_fee: props.apartment.apartmentLease[idx].month_fee,
            not_finished: `${props.apartment.apartmentLease[idx].not_finished ? "O" : "X"}`,
            parking: `${props.apartment.apartmentLease[idx].parking ? "O" : "X"}`,
            empty: `${props.apartment.apartmentLease[idx].empty ? "O" : "X"}`,
            elevator: `${props.apartment.apartmentLease[idx].elevator ? "O" : "X"}`,
            loan: `${props.apartment.apartmentLease[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.apartment.apartmentLease.length)).map(
        (item, idx) => ({
            address: props.apartment.apartmentLease[idx].address,
            room: props.apartment.apartmentLease[idx].room,
            deposit: props.apartment.apartmentLease[idx].deposit,
            month_fee: props.apartment.apartmentLease[idx].month_fee,
            birth: props.apartment.apartmentLease[idx].birth,
            area_m2: props.apartment.apartmentLease[idx].area_m2,
            updated: props.apartment.apartmentLease[idx].updated,
            management_fee: props.apartment.apartmentLease[idx].management_fee,
            bath: props.apartment.apartmentLease[idx].bath,
            total_area_m2: props.apartment.apartmentLease[idx].total_area_m2,
            parking: props.apartment.apartmentLease[idx].parking,
            elevator: props.apartment.apartmentLease[idx].elevator,
            loan: props.apartment.apartmentLease[idx].loan,
            empty: props.apartment.apartmentLease[idx].empty,
            not_finished: props.apartment.apartmentLease[idx].not_finished,
            naver: props.apartment.apartmentLease[idx].naver,
            dabang: props.apartment.apartmentLease[idx].dabang,
            zicbang: props.apartment.apartmentLease[idx].zicbang,
            peterpan: props.apartment.apartmentLease[idx].peterpan,
            owner_phone: props.apartment.apartmentLease[idx].owner_phone,
            tenant_phone: props.apartment.apartmentLease[idx].tenant_phone,
            description: props.apartment.apartmentLease[idx].description,
            roomId: props.apartment.apartmentLease[idx].id
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
            const { data } = await api.apartmentLeaseSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("LeaseApartmentSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View>
            <CreatingBtn onPress={() => props.navigation.navigate('LeaseApartmentCreating')}>
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
                            onPress={() => props.navigation.navigate("LeaseApartmentDetail", allRows[index] )}
                        />
                    ))
                }
            </Table>
        </ScrollView>
        </>
    );
}

// const Test = (props) => {
//     useEffect(() => {props.getLeaseApartment()},[]);
//     console.log(props);
//     return(
//         <Text>Text</Text>
//     )
// }

function mapStateToProps(state){
    return {
        apartment: state.apartmentReducer.explore,
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    };
};

function mapDispatchToProps(dispatch){
    return{
        getLeaseApartment: () => dispatch(getLeaseApartment()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaseApartmentTable);
// export default connect(mapStateToProps, mapDispatchToProps)(Test);