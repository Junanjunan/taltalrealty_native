import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getDealingApartment } from "../../../redux/apartmentSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle } from "../../../components/Detail/Table";
import { TableWidth } from "../../../components/DivCollection";

const UnitWidth = TableWidth/9;

export const fields = [
    { key: 'address', title: '주소', width:UnitWidth*2.5},
    { key: 'price', title: '가격', width:UnitWidth*1.5},
    { key: 'area_m2', title: '면적 (㎡)', width:UnitWidth},
    { key: 'room', title: '방수', width:UnitWidth*2/3},
    { key: 'parking', title: '주차', width:UnitWidth*2/3},
    { key: 'empty', title: '공실', width:UnitWidth*2/3},
    { key: 'elevator', title: '승강기', width:UnitWidth*2/3},
    { key: 'loan', title: '대출', width:UnitWidth*2/3},
    { key: 'not_finished', title: '진행매물', width:UnitWidth*2/3},
];

export const hiddenFields = [
    { key: 'updated', title: '확인일'},
    { key: 'deposit', title: '보증금'},
    { key: 'month_fee', title: '월세'},
    { key: 'management_fee', title: '관리비'},
    { key: 'bath', title: '화장실'},
    { key: 'total_area_m2', title: '공급면적'},
    { key: 'land_m2', title: '대지지분'},
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
    { key: 'roomId', title: 'ID'},
];

export const allFields = fields.concat(hiddenFields);

const DealApartmentTable = (props) => {
    const [address, setAddress] = useState();
    const [room, setRoom] = useState();
    const [price, setPrice] = useState();
    const [area_m2, setArea_m2] = useState();
    const [description, setDescription] = useState();
    const [empty, setEmpty] = useState(false);
    const [parking, setParking] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [loan, setLoan] = useState(false);
    const [not_finished, setNot_finished] = useState(true);

    useEffect(() => {props.getDealingApartment()}, []);

    
    const rows = Array.apply(null, Array(props.apartmentDealing.apartment.length)).map(
        (item, idx) => ({
            address: props.apartmentDealing.apartment[idx].address,
            price: props.apartmentDealing.apartment[idx].price,
            area_m2: props.apartmentDealing.apartment[idx].area_m2,
            room: props.apartmentDealing.apartment[idx].room,
            not_finished: `${props.apartmentDealing.apartment[idx].not_finished ? "O" : "X"}`,
            parking: `${props.apartmentDealing.apartment[idx].parking ? "O" : "X"}`,
            empty: `${props.apartmentDealing.apartment[idx].empty ? "O" : "X"}`,
            elevator: `${props.apartmentDealing.apartment[idx].elevator ? "O" : "X"}`,
            loan: `${props.apartmentDealing.apartment[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.apartmentDealing.apartment.length)).map(
        (item, idx) => ({
            address: props.apartmentDealing.apartment[idx].address,
            price: props.apartmentDealing.apartment[idx].price,
            room: props.apartmentDealing.apartment[idx].room,
            birth: props.apartmentDealing.apartment[idx].birth,
            area_m2: props.apartmentDealing.apartment[idx].area_m2,
            updated: props.apartmentDealing.apartment[idx].updated,
            deposit: props.apartmentDealing.apartment[idx].deposit,
            month_fee: props.apartmentDealing.apartment[idx].month_fee,
            management_fee: props.apartmentDealing.apartment[idx].management_fee,
            bath: props.apartmentDealing.apartment[idx].bath,
            total_area_m2: props.apartmentDealing.apartment[idx].total_area_m2,
            land_m2: props.apartmentDealing.apartment[idx].land_m2,
            parking: props.apartmentDealing.apartment[idx].parking,
            elevator: props.apartmentDealing.apartment[idx].elevator,
            loan: props.apartmentDealing.apartment[idx].loan,
            empty: props.apartmentDealing.apartment[idx].empty,
            not_finished: props.apartmentDealing.apartment[idx].not_finished,
            naver: props.apartmentDealing.apartment[idx].naver,
            dabang: props.apartmentDealing.apartment[idx].dabang,
            zicbang: props.apartmentDealing.apartment[idx].zicbang,
            peterpan: props.apartmentDealing.apartment[idx].peterpan,
            owner_phone: props.apartmentDealing.apartment[idx].owner_phone,
            tenant_phone: props.apartmentDealing.apartment[idx].tenant_phone,
            description: props.apartmentDealing.apartment[idx].description,
            roomId: props.apartmentDealing.apartment[idx].id
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
            ...(description && {description}),
            ...(parking && {parking}),
            ...(empty && {empty}),
            ...(elevator && {elevator}),
            ...(loan && {loan}),
            ...(not_finished && {not_finished}),
            realtor_id: props.userId
        };
        try{
            const { data } = await api.apartmentDealingSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("DealApartmentSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    };

    return (
        <>
        <View>
            <CreatingBtn onPress={() => props.navigation.navigate('DealApartmentCreating')}>
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
                            onPress={() => props.navigation.navigate("DealApartmentDetail", allRows[index] )}
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
        apartmentDealing: state.apartmentReducer.explore,
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    };
};

function mapDispatchToProps(dispatch){
    return{
        getDealingApartment: () => dispatch(getDealingApartment()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DealApartmentTable);