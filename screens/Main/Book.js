import React, { Component, useEffect } from "react";
import styled from "styled-components/native";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity, Dimensions} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getBooks } from "../../redux/apartsSlice";
import NavigationTab from "../../components/NavigationTab";


const { width, height } = Dimensions.get("screen");

const Div = styled.View`
    flexDirection: row;
    alignItems: center;
    padding: 20px;
    borderWidth: 0.5px;
    height: ${height * 2/5}px
`;

const MainTitle = styled.View`
    backgroundColor: pink;
    width: 150px;
    height: ${height * 3/10}px
    alignItems: center;
    justifyContent: center;
`;

const MainTitleText = styled.Text`
    fontSize: 50px;
`;


const NaviTab = styled.TouchableOpacity`
    alignItems: center;
    justifyContent: center;
    width: ${width*1/4}px;
    backgroundColor: white;
`;

const NaviTabText = styled.Text`
    fontSize: 15px;
    color: gray;
`;

const styles = StyleSheet.create({
    BookTypeTO: {
        backgroundColor: '#B2EBF4',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: 120,
        height: height*1/20,
        borderRadius: 20
    },

    scrollViewContainerStyle:{
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const BookType = () => {
    const navigation = useNavigation();
    return(
        <>
        <ScrollView contentContainerStyle={styles.scrollViewContainerStyle}>
            <TouchableOpacity onPress={() => navigation.navigate("DealApart")} style={styles.BookTypeTO}><Text>아파트</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("DealVillaTable")} style={styles.BookTypeTO}><Text>빌라</Text></TouchableOpacity>
            <TouchableOpacity style={styles.BookTypeTO}><Text>오피스텔</Text></TouchableOpacity>
            <TouchableOpacity style={styles.BookTypeTO}><Text>상가</Text></TouchableOpacity>
            <TouchableOpacity style={styles.BookTypeTO}><Text>건물</Text></TouchableOpacity>
        </ScrollView>
        </>
    );
}

const CustomerType = () => {
    const navigation = useNavigation();
    return(
        <>
        <ScrollView contentContainerStyle={styles.scrollViewContainerStyle}>
            <TouchableOpacity onPress={() => navigation.navigate("DealApart")} style={styles.BookTypeTO}><Text>아파트</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("DealVillaTable")} style={styles.BookTypeTO}><Text>빌라</Text></TouchableOpacity>
            <TouchableOpacity style={styles.BookTypeTO}><Text>오피스텔</Text></TouchableOpacity>
            <TouchableOpacity style={styles.BookTypeTO}><Text>상가</Text></TouchableOpacity>
            <TouchableOpacity style={styles.BookTypeTO}><Text>건물</Text></TouchableOpacity>
        </ScrollView>
        </>
    );
}



const BookStart = () => {
    // const styles = StyleSheet.create({
    //     container: { 
    //         flex:1, 
    //         padding: 10, 
    //         paddingTop:15, 
    //         backgroundColor: '#fff',
    //     },
    //     header:{
    //         height: 50,
    //         // backgroundColor: '#212732',
    //         borderColor: 'white',
    //     },
    //     headerText:{
    //         textAlign: 'center',
    //         // color: 'white',
    //         margin: 6
    //     },
    //     centerRow:{
    //         justifyContent:"center", 
    //         alignItems:"center",
    //         flexDirection: "row",
    //     }
    // });
    const navigation = useNavigation();
    useEffect(() => {getBooks()}, []);
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

export default BookStart;