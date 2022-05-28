import React, { useEffect } from "react";
import styled from "styled-components/native";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity,} from 'react-native';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native";



const BookType = () => {
    const navigation = useNavigation();
    return(
        <ScrollView>
            <Text>BookTyps.js</Text>
            <TouchableOpacity onPress={() => navigation.navigate("DealApart")}><Text>아파트</Text></TouchableOpacity>
            <TouchableOpacity><Text>빌라</Text></TouchableOpacity>
            <TouchableOpacity><Text>오피스텔</Text></TouchableOpacity>
            <TouchableOpacity><Text>상가</Text></TouchableOpacity>
            <TouchableOpacity><Text>건물</Text></TouchableOpacity>
        </ScrollView>
    );
}

// export default connect(mapStateToProps, mapDispatchToProps)(TableView);

export default BookType;
