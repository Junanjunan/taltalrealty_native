import React, { Component, useEffect } from "react";
import styled from "styled-components/native";
import {StyleSheet, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity, Dimensions} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getBooks } from "../../redux/apartsSlice";
import { doSetNavBook } from "../../redux/navigationSlice";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("screen");

console.log(height);

const View = styled.View`
    // height: ${height*10/18}px;
    backgroundColor: red;
`;

const Div = styled.View`
    flexDirection: row;
    alignItems: center;
`;

const MainTitle = styled.View`
    backgroundColor: pink;
    width: ${width*1/4}px;
    height: ${height * 7/20}px;
    marginLeft: 15px;
    alignItems: center;
    justifyContent: center;
`;

const MainTitleText = styled.Text`
    fontSize: 50px;
`;

const styles = StyleSheet.create({
    BookTypeView: {
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: width*1/4,
        height: height*1/20,
        borderRadius: 10
    },

    BookTypeTO: {
        backgroundColor: '#B2EBF4',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: width*1/4,
        height: height*1/21,
        borderRadius: 10
    },

    scrollViewContainerStyle:{
        alignItems: 'center',
        height: height * 7/20,
        marginBottom: height*0.6/18,
        marginTop: height*0.6/18
    }
})

const BookType = () => {
    const navigation = useNavigation();
    return(
        <>
        <ScrollView contentContainerStyle={styles.scrollViewContainerStyle}>
            <View style={styles.BookTypeView}><Text>매매</Text></View>
            <TouchableOpacity onPress={() => navigation.navigate("DealApartmentTable")} style={styles.BookTypeTO}><Text>아파트</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("DealVillaTable")} style={styles.BookTypeTO}><Text>빌라</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("DealOfficetelTable")} style={styles.BookTypeTO}><Text>오피스텔</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("DealStoreTable")} style={styles.BookTypeTO}><Text>상가</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("DealBuildingTable")} style={styles.BookTypeTO}><Text>건물</Text></TouchableOpacity>
        </ScrollView>
        <ScrollView contentContainerStyle={styles.scrollViewContainerStyle}>
            <View style={styles.BookTypeView}><Text>임대</Text></View>
            <TouchableOpacity onPress={() => navigation.navigate("LeaseApartmentTable")} style={styles.BookTypeTO}><Text>아파트</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("LeaseVillaTable")} style={styles.BookTypeTO}><Text>주택</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("LeaseOfficetelTable")} style={styles.BookTypeTO}><Text>오피스텔</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("LeaseStoreTable")} style={styles.BookTypeTO}><Text>상가</Text></TouchableOpacity>
        </ScrollView>
        </>
    );
}

const CustomerType = () => {
    const navigation = useNavigation();
    return(
        <>
        <ScrollView contentContainerStyle={styles.scrollViewContainerStyle}>
            <View style={styles.BookTypeView}><Text>매매</Text></View>
            <TouchableOpacity onPress={() => navigation.navigate("CustomerDealApartmentTable")} style={styles.BookTypeTO}><Text>아파트</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CustomerDealVillaTable")} style={styles.BookTypeTO}><Text>빌라</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CustomerDealOfficetelTable")} style={styles.BookTypeTO}><Text>오피스텔</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CustomerDealStoreTable")} style={styles.BookTypeTO}><Text>상가</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CustomerDealBuildingTable")} style={styles.BookTypeTO}><Text>건물</Text></TouchableOpacity>
        </ScrollView>
        <ScrollView contentContainerStyle={styles.scrollViewContainerStyle}>
        <View style={styles.BookTypeView}><Text>임대</Text></View>
            <TouchableOpacity onPress={() => navigation.navigate("CustomerLeaseApartmentTable")} style={styles.BookTypeTO}><Text>아파트</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CustomerLeaseVillaTable")} style={styles.BookTypeTO}><Text>주택</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CustomerLeaseOfficetelTable")} style={styles.BookTypeTO}><Text>오피스텔</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CustomerLeaseStoreTable")} style={styles.BookTypeTO}><Text>상가</Text></TouchableOpacity>
        </ScrollView>
        </>
    );
}


const Book = (props) => {
    return(        
        <>
        <View>
            <Div>
            <MainTitle>
                <MainTitleText>매물</MainTitleText>
            </MainTitle>
            <BookType />
            </Div>
            <Div>
            <MainTitle>
                <MainTitleText>손님</MainTitleText>
            </MainTitle>
            <CustomerType />
            </Div>
        </View>
        </>
    )
};


function mapStateToProps(state){
    return state.navigationReducer
};

function mapDispatchToProps(dispatch){
    return{
        doSetNavBook: () => dispatch(doSetNavBook())
    }
};

// export default Book;
export default connect(mapStateToProps, mapDispatchToProps)(Book);