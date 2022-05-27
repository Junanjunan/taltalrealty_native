import React from "react";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity,} from 'react-native';
import api from "../../api";

const ApartDetail = ({route: {params}}) => {
    console.log(params);
    return (
        <View>
            <Text>{params}/</Text>
        </View>
    );
}

export default ApartDetail;