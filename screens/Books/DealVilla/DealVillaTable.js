import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { getDealingVillas } from "../../../redux/villasSlice";
import Checkbox from "expo-checkbox";
import api from "../../../api";
import { SearchInput, SearchInputAddress, SearchTitleText, SearchArticle, Div, CreatingBtn, SearchContainer, SearchBtn, SearchBtnText, CheckboxStyle, ScrollView, View, Text, TableBorderStyle, RowHeadStyle, RowBodyStyle, RowTextStyle, TitleText } from "../../../components/Detail/Table";
import { ScreenHeight, ScreenWidth, TableWidth } from "../../../components/DivCollection";
import { allFields, fields, hiddenFields } from "../DealApartment/DealApartmentTable";
import { BookTitle } from "../../../components/Detail/BookTitle";

const DealVillaTable = (props) => {
    console.log(props.route.name.includes("Villa"));
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

    useEffect(() => {props.getDealingVillas()}, []);

    const UnitWidth = TableWidth/9;
    
    const rows = Array.apply(null, Array(props.villasDealing.villas.length)).map(
        (item, idx) => ({
            address: props.villasDealing.villas[idx].address,
            price: props.villasDealing.villas[idx].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            area_m2: props.villasDealing.villas[idx].area_m2,
            room: props.villasDealing.villas[idx].room,
            not_finished: `${props.villasDealing.villas[idx].not_finished ? "O" : "X"}`,
            parking: `${props.villasDealing.villas[idx].parking ? "O" : "X"}`,
            empty: `${props.villasDealing.villas[idx].empty ? "O" : "X"}`,
            elevator: `${props.villasDealing.villas[idx].elevator ? "O" : "X"}`,
            loan: `${props.villasDealing.villas[idx].loan ? "O" : "X"}`,
        })
    );


    const allRows = Array.apply(null, Array(props.villasDealing.villas.length)).map(
        (item, idx) => ({
            address: props.villasDealing.villas[idx].address,
            price: props.villasDealing.villas[idx].price,
            room: props.villasDealing.villas[idx].room,
            birth: props.villasDealing.villas[idx].birth,
            area_m2: props.villasDealing.villas[idx].area_m2,
            updated: props.villasDealing.villas[idx].updated,
            deposit: props.villasDealing.villas[idx].deposit,
            month_fee: props.villasDealing.villas[idx].month_fee,
            management_fee: props.villasDealing.villas[idx].management_fee,
            bath: props.villasDealing.villas[idx].bath,
            total_area_m2: props.villasDealing.villas[idx].total_area_m2,
            land_m2: props.villasDealing.villas[idx].land_m2,
            parking: props.villasDealing.villas[idx].parking,
            elevator: props.villasDealing.villas[idx].elevator,
            loan: props.villasDealing.villas[idx].loan,
            empty: props.villasDealing.villas[idx].empty,
            not_finished: props.villasDealing.villas[idx].not_finished,
            naver: props.villasDealing.villas[idx].naver,
            dabang: props.villasDealing.villas[idx].dabang,
            zicbang: props.villasDealing.villas[idx].zicbang,
            peterpan: props.villasDealing.villas[idx].peterpan,
            owner_phone: props.villasDealing.villas[idx].owner_phone,
            tenant_phone: props.villasDealing.villas[idx].tenant_phone,
            description: props.villasDealing.villas[idx].description,
            roomId: props.villasDealing.villas[idx].id
        })
    );

    const state = {
        tableHead: fields.map(field => field.title),
        data: rows.map(row =>
            fields.map(field => row[field.key])),
        widthArr: fields.map(field => field.width), 
        // heightArr: fields.map(field => field.height)
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
            const { data } = await api.villaDealingSearching(form, `Bearer ${props.token}`)
            props.navigation.navigate("DealVillaSearchTable", {data, form});
        } catch(e){
            console.warn(e);
        }
    }

    return (
        <>
        <View>
            <BookTitle props={props} />
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
                textStyle={{textAlign: "center"}}
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
        villasDealing: state.villasReducer.explore,
        token: state.usersReducer.token,
        userId: state.usersReducer.id
    };
};

function mapDispatchToProps(dispatch){
    return{
        getDealingVillas: () => dispatch(getDealingVillas()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DealVillaTable);