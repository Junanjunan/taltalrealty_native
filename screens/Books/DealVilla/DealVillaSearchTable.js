import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getDealingVillas } from "../../../redux/villasSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";


const DealVillaSearchTable = (props) => {
    console.log(props.route.params.data.length);
    console.log(props.route.params.form);
    const [address, setAddress] = useState(props.route.params.form.address);
    const [room, setRoom] = useState(props.route.params.form.room);
    const [price, setPrice] = useState(props.route.params.form.price);
    const [area_m2, setArea_m2] = useState(props.route.params.form.area_m2);
    const [empty, setEmpty] = useState(props.route.params.form.empty);
    const [parking, setParking] = useState(props.route.params.form.parking);
    const [elevator, setElevator] = useState(props.route.params.form.elevator);
    const [loan, setLoan] = useState(props.route.params.form.loan);
    const [not_finished, setNot_finished] = useState(props.route.params.form.not_finished);

    useEffect(() => {props.getDealingVillas()}, []);

    const fields = [
        { key: 'address', title: '주소', width:120},
        { key: 'price', title: '가격', width:55},
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
        { key: 'deposit', title: '보증금', width:100},
        { key: 'month_fee', title: '월세', width:100},
        { key: 'management_fee', title: '관리비', width:100},
        { key: 'bath', title: '화장실', width:100},
        { key: 'total_area_m2', title: '공급면적', width:100},
        { key: 'land_m2', title: '대지지분', width:100},
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
    
    const rows = Array.apply(null, Array(props.route.params.data.length)).map(
        (item, idx) => ({
            address: props.route.params.data[idx].address,
            price: props.route.params.data[idx].price,
            area_m2: props.route.params.data[idx].area_m2,
            room: props.route.params.data[idx].room,
            not_finished: `${props.route.params.data[idx].not_finished ? "O" : "X"}`,
            parking: `${props.route.params.data[idx].parking ? "O" : "X"}`,
            empty: `${props.route.params.data[idx].empty ? "O" : "X"}`,
            elevator: `${props.route.params.data[idx].elevator ? "O" : "X"}`,
            loan: `${props.route.params.data[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.route.params.data.length)).map(
        (item, idx) => ({
            address: props.route.params.data[idx].address,
            price: props.route.params.data[idx].price,
            room: props.route.params.data[idx].room,
            birth: props.route.params.data[idx].birth,
            area_m2: props.route.params.data[idx].area_m2,
            updated: props.route.params.data[idx].updated,
            deposit: props.route.params.data[idx].deposit,
            month_fee: props.route.params.data[idx].month_fee,
            management_fee: props.route.params.data[idx].management_fee,
            bath: props.route.params.data[idx].bath,
            total_area_m2: props.route.params.data[idx].total_area_m2,
            land_m2: props.route.params.data[idx].land_m2,
            parking: props.route.params.data[idx].parking,
            elevator: props.route.params.data[idx].elevator,
            loan: props.route.params.data[idx].loan,
            empty: props.route.params.data[idx].empty,
            not_finished: props.route.params.data[idx].not_finished,
            naver: props.route.params.data[idx].naver,
            dabang: props.route.params.data[idx].dabang,
            zicbang: props.route.params.data[idx].zicbang,
            peterpan: props.route.params.data[idx].peterpan,
            owner_phone: props.route.params.data[idx].owner_phone,
            tenant_phone: props.route.params.data[idx].tenant_phone,
            description: props.route.params.data[idx].description,
            roomId: props.route.params.data[idx].id
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
            ...(price && {price}),
            ...(area_m2 && {area_m2}),
            ...(parking && {parking}),
            ...(empty && {empty}),
            ...(elevator && {elevator}),
            ...(loan && {loan}),
            ...(not_finished && {not_finished}),
            realtor_id: props.userId
        };
        try{
            const { data } = await api.villaDealingSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("DealVillaSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View>
            <CreatingBtn onPress={() => props.navigation.navigate('DealVillaCreating')}>
                <Text>매물등록</Text>
            </CreatingBtn>
            <SearchContainer>
            <Div>
                <SearchArticle><SearchTitleText>주소</SearchTitleText><SearchInputAddress value={address} onChangeText={text => setAddress(text)} /></SearchArticle>
                <SearchArticle><SearchTitleText>방</SearchTitleText><SearchInput keyboardType="numeric" value={room} onChangeText={text => setRoom(text)} /></SearchArticle>
            </Div>
            <Div>
                <SearchArticle><SearchTitleText>매매가</SearchTitleText><SearchInput keyboardType="numeric" value={price} onChangeText={text => setPrice(text)} /><Text>만원 이하</Text></SearchArticle>
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
                            onPress={() => props.navigation.navigate("DealVillaDetail", allRows[index] )}
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
        getDealingVillas: () => dispatch(getDealingVillas()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DealVillaSearchTable);