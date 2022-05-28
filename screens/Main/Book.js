import React, { Component, useEffect } from "react";
import styled from "styled-components/native";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity,} from 'react-native';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { getBooks } from "../../redux/apartsSlice";
// import dealApart from "../Books/dealApart";


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
        <View>
            <TouchableOpacity 
                onPress={() => navigation.navigate("BookType")}
                style={{padding: 10, margin: 10, backgroundColor:"red", width: 100, height: 100, alignItems:"center", justifyContent:"center"}}
            >
                <Text style={{fontSize:15}}>매물</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding: 10, margin: 10, backgroundColor:"red", width: 100, height: 100, alignItems:"center", justifyContent:"center"}}><Text style={{fontSize:15}}>손님</Text></TouchableOpacity>
        </View>
    )
};

export default BookStart;