import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getDealingStore } from "../../../redux/storeSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";
import { TableWidth } from "../../../components/DivCollection";
import { BookTitle } from "../../../components/Detail/BookTitle";


const DealStoreTable = (props) => {
    const [address, setAddress] = useState();
    const [price, setPrice] = useState();
    const [area_m2, setArea_m2] = useState();
    const [description, setDescription] = useState();
    const [empty, setEmpty] = useState(false);
    const [parking, setParking] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [loan, setLoan] = useState(false);
    const [not_finished, setNot_finished] = useState(true);

    useEffect(() => {props.getDealingStore()}, []);

    const UnitWidth = TableWidth/8;

    const fields = [
        { key: 'address', title: '주소', width:UnitWidth*2.5},
        { key: 'price', title: '가격', width:UnitWidth*1.2},
        { key: 'area_m2', title: '면적 (㎡)', width:UnitWidth},
        { key: 'parking', title: '주차', width:UnitWidth*2/3},
        { key: 'empty', title: '공실', width:UnitWidth*2/3},
        { key: 'elevator', title: '승강기', width:UnitWidth*2/3},
        { key: 'loan', title: '대출', width:UnitWidth*2/3},
        { key: 'not_finished', title: '진행매물', width:UnitWidth*2/3},
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
    
    const rows = Array.apply(null, Array(props.storeDealing.store.length)).map(
        (item, idx) => ({
            address: props.storeDealing.store[idx].address,
            price: props.storeDealing.store[idx].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            area_m2: props.storeDealing.store[idx].area_m2,
            not_finished: `${props.storeDealing.store[idx].not_finished ? "O" : "X"}`,
            parking: `${props.storeDealing.store[idx].parking ? "O" : "X"}`,
            empty: `${props.storeDealing.store[idx].empty ? "O" : "X"}`,
            elevator: `${props.storeDealing.store[idx].elevator ? "O" : "X"}`,
            loan: `${props.storeDealing.store[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.storeDealing.store.length)).map(
        (item, idx) => ({
            address: props.storeDealing.store[idx].address,
            price: props.storeDealing.store[idx].price,
            birth: props.storeDealing.store[idx].birth,
            area_m2: props.storeDealing.store[idx].area_m2,
            updated: props.storeDealing.store[idx].updated,
            deposit: props.storeDealing.store[idx].deposit,
            month_fee: props.storeDealing.store[idx].month_fee,
            management_fee: props.storeDealing.store[idx].management_fee,
            bath: props.storeDealing.store[idx].bath,
            total_area_m2: props.storeDealing.store[idx].total_area_m2,
            land_m2: props.storeDealing.store[idx].land_m2,
            parking: props.storeDealing.store[idx].parking,
            elevator: props.storeDealing.store[idx].elevator,
            loan: props.storeDealing.store[idx].loan,
            empty: props.storeDealing.store[idx].empty,
            not_finished: props.storeDealing.store[idx].not_finished,
            naver: props.storeDealing.store[idx].naver,
            dabang: props.storeDealing.store[idx].dabang,
            zicbang: props.storeDealing.store[idx].zicbang,
            peterpan: props.storeDealing.store[idx].peterpan,
            owner_phone: props.storeDealing.store[idx].owner_phone,
            tenant_phone: props.storeDealing.store[idx].tenant_phone,
            description: props.storeDealing.store[idx].description,
            roomId: props.storeDealing.store[idx].id
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
            ...(price && {price}),
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
            const { data } = await api.storeDealingSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("DealStoreSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <BookTitle props={props} />
        <View>
            <CreatingBtn onPress={() => props.navigation.navigate('DealStoreCreating')}>
                <Text>매물등록</Text>
            </CreatingBtn>
            <SearchContainer>
                <Div>
                    <SearchArticle><SearchTitleText>주소</SearchTitleText><SearchInputAddress value={address} onChangeText={text => setAddress(text)} /></SearchArticle>
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
                            onPress={() => props.navigation.navigate("DealStoreDetail", allRows[index] )}
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
        storeDealing: state.storeReducer.explore,
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    };
};

function mapDispatchToProps(dispatch){
    return{
        getDealingStore: () => dispatch(getDealingStore()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DealStoreTable);