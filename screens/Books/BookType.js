import React, { useEffect } from "react";
import styled from "styled-components/native";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity,} from 'react-native';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import NavigationTab from "../../components/NavigationTab";


const BookType = () => {
    const navigation = useNavigation();
    const styles = StyleSheet.create({
        BookTypeTO: {
            backgroundColor: '#B2EBF4',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
            width: 120,
            height: 60,
            borderRadius: 20
        },

        scrollViewContainerStyle:{
            alignItems: 'center',
            justifyContent: 'center',
        }
    })

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

// export default connect(mapStateToProps, mapDispatchToProps)(TableView);

export default BookType;
