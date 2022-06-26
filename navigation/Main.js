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

import DealApartmentTable from "../screens/Books/DealApartment/DealApartmentTable";
import DealApartmentDetail from "../screens/Books/DealApartment/DealApartmentDetail";
import DealApartmentCreating from "../screens/Books/DealApartment/DealApartmentCreating";
import DealApartmentUpdating from "../screens/Books/DealApartment/DealApartmentUpdating";
import DealApartmentSearchTable from "../screens/Books/DealApartment/DealApartmentSearchTable";

import DealOfficetelTable from "../screens/Books/DealOfficetel/DealOfficetelTable";
import DealOfficetelDetail from "../screens/Books/DealOfficetel/DealOfficetelDetail";
import DealOfficetelCreating from "../screens/Books/DealOfficetel/DealOfficetelCreating";
import DealOfficetelUpdating from "../screens/Books/DealOfficetel/DealOfficetelUpdating";
import DealOfficetelSearchTable from "../screens/Books/DealOfficetel/DealOfficetelSearchTable";

import DealStoreTable from "../screens/Books/DealStore/DealStoreTable";
import DealStoreDetail from "../screens/Books/DealStore/DealStoreDetail";
import DealStoreCreating from "../screens/Books/DealStore/DealStoreCreating";
import DealStoreUpdating from "../screens/Books/DealStore/DealStoreUpdating";
import DealStoreSearchTable from "../screens/Books/DealStore/DealStoreSearchTable";

import DealBuildingTable from "../screens/Books/DealBuilding/DealBuildingTable";
import DealBuildingDetail from "../screens/Books/DealBuilding/DealBuildingDetail";
import DealBuildingCreating from "../screens/Books/DealBuilding/DealBuildingCreating";
import DealBuildingUpdating from "../screens/Books/DealBuilding/DealBuildingUpdating";
import DealBuildingSearchTable from "../screens/Books/DealBuilding/DealBuildingSearchTable";

import ContractTable from "../screens/Contract/ContractTable";
import ContractDetail from "../screens/Contract/ContractDetail";
import ContractCreating from "../screens/Contract/ContractCreating";
import ContractUpdating from "../screens/Contract/ContractUpdating";

import ManagementTable from "../screens/Management/ManagementTable";
import ManagementDetail from "../screens/Management/ManagementDetail";
import ManagementCreating from "../screens/Management/ManagementCreating";
import ManagementUpdating from "../screens/Management/ManagementUpdating";

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
            
            <MainNavigator.Screen name="DealApartmentTable" component={DealApartmentTable} />
            <MainNavigator.Screen name="DealApartmentDetail" component={DealApartmentDetail} />
            <MainNavigator.Screen name="DealApartmentCreating" component={DealApartmentCreating} />
            <MainNavigator.Screen name="DealApartmentUpdating" component={DealApartmentUpdating} />
            <MainNavigator.Screen name="DealApartmentSearchTable" component={DealApartmentSearchTable} />

            <MainNavigator.Screen name="DealOfficetelTable" component={DealOfficetelTable} />
            <MainNavigator.Screen name="DealOfficetelDetail" component={DealOfficetelDetail} />
            <MainNavigator.Screen name="DealOfficetelCreating" component={DealOfficetelCreating} />
            <MainNavigator.Screen name="DealOfficetelUpdating" component={DealOfficetelUpdating} />
            <MainNavigator.Screen name="DealOfficetelSearchTable" component={DealOfficetelSearchTable} />

            <MainNavigator.Screen name="DealStoreTable" component={DealStoreTable} />
            <MainNavigator.Screen name="DealStoreDetail" component={DealStoreDetail} />
            <MainNavigator.Screen name="DealStoreCreating" component={DealStoreCreating} />
            <MainNavigator.Screen name="DealStoreUpdating" component={DealStoreUpdating} />
            <MainNavigator.Screen name="DealStoreSearchTable" component={DealStoreSearchTable} />

            <MainNavigator.Screen name="DealBuildingTable" component={DealBuildingTable} />
            <MainNavigator.Screen name="DealBuildingDetail" component={DealBuildingDetail} />
            <MainNavigator.Screen name="DealBuildingCreating" component={DealBuildingCreating} />
            <MainNavigator.Screen name="DealBuildingUpdating" component={DealBuildingUpdating} />
            <MainNavigator.Screen name="DealBuildingSearchTable" component={DealBuildingSearchTable} />

            <MainNavigator.Screen name="ContractTable" component={ContractTable} />
            <MainNavigator.Screen name="ContractDetail" component={ContractDetail} />
            <MainNavigator.Screen name="ContractUpdating" component={ContractUpdating} />
            <MainNavigator.Screen name="ContractCreating" component={ContractCreating} />
            <MainNavigator.Screen name="ManagementTable" component={ManagementTable} />
            <MainNavigator.Screen name="ManagementDetail" component={ManagementDetail} />
            <MainNavigator.Screen name="ManagementCreating" component={ManagementCreating} />
            <MainNavigator.Screen name="ManagementUpdating" component={ManagementUpdating} />
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