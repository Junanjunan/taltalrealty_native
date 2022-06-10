import React, { useEffect } from "react";
import styled from "styled-components/native";
import { connect } from "react-redux";
import api from "../api";
import { getBooks } from "../redux/apartsSlice";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack";
import Book from "../screens/Main/Book";
import Management from "../screens/Main/Management";
import Profile from "../screens/Main/Profile";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import DealApart from "../screens/Books/DealApart";
import DealApartDetail from "../screens/Books/DealApartDetail";
import BookType from "../screens/Books/BookType";

import DealVillaTable from "../screens/Books/DealVilla/DealVillaTable";
import DealVillaDetail from "../screens/Books/DealVilla/DealVillaDetail";
import DealVillaCreating from "../screens/Books/DealVilla/DealVillaCreating";
import DealVillaUpdating from "../screens/Books/DealVilla/DealVillaUpdating";
import DealVillaSearchTable from "../screens/Books/DealVilla/DealVillaSearchTable";

import ContractTable from "../screens/Contract/ContractTable";
import ContractDetail from "../screens/Contract/ContractDetail";
import ContractCreating from "../screens/Contract/ContractCreating";
import ContractUpdating from "../screens/Contract/ContractUpdating";

import ManagementTable from "../screens/Management/ManagementTable";

import NavigationTab from "../components/NavigationTab";


const Container = styled.View`
    justifyContent: center;
    alignItems: center;
    flex: 1;
`;

const Text = styled.Text``;


const MainNavigator = createStackNavigator();


const Main = () =>{
    return (
        <>
        <MainNavigator.Navigator>
            <MainNavigator.Screen name="Book" component={Book}/>
            <MainNavigator.Screen name="Management" component={Management} />
            <MainNavigator.Screen name="Profile" component={Profile} />
            <MainNavigator.Screen name="BookType" component={BookType} />
            <MainNavigator.Screen name="DealApart" component={DealApart} />
            <MainNavigator.Screen name="DealApartDetail" component={DealApartDetail} />
            <MainNavigator.Screen name="DealVillaTable" component={DealVillaTable} />
            <MainNavigator.Screen name="DealVillaDetail" component={DealVillaDetail} />
            <MainNavigator.Screen name="DealVillaCreating" component={DealVillaCreating} />
            <MainNavigator.Screen name="DealVillaUpdating" component={DealVillaUpdating} />
            <MainNavigator.Screen name="DealVillaSearchTable" component={DealVillaSearchTable} />
            <MainNavigator.Screen name="ContractTable" component={ContractTable} />
            <MainNavigator.Screen name="ContractDetail" component={ContractDetail} />
            <MainNavigator.Screen name="ContractUpdating" component={ContractUpdating} />
            <MainNavigator.Screen name="ContractCreating" component={ContractCreating} />
            <MainNavigator.Screen name="ManagementTable" component={ManagementTable} />
        </MainNavigator.Navigator>
        <NavigationTab />
        </>
    );
}


function mapStateToProps(state){
    return state.apartsReducer.explore;
}

function mapDispatchToProps(dispatch){
    return{
        getBooks: () => dispatch(getBooks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);