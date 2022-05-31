import React, { useEffect } from "react";
import styled from "styled-components/native";
import { connect } from "react-redux";
import api from "../api";
import { getBooks } from "../redux/apartsSlice";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack";
import Book from "../screens/Main/Book";
import Contract from "../screens/Main/Contract";
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


const Container = styled.View`
    justifyContent: center;
    alignItems: center;
    flex: 1;
`;

const Text = styled.Text``;


const TabsNavigator = createBottomTabNavigator();

export const Tabs = () => {
    return(
        <TabsNavigator.Navigator 
            screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => {
                    var iconName;
                    if(route.name === "장부"){
                        iconName = "search";
                    } else if(route.name === "계약"){
                        iconName = "heart";
                    } else if(route.name ==="임대관리"){
                        iconName = "map";
                    } else if(route.name === "개인정보"){
                        iconName = "person";
                    }
                return <Ionicons name={iconName} size={20} color={focused ? colors.red : "gray"} />
                },
                tabBarActiveTintColor: colors.red,
                tabBarLabelStyle: {
                    fontSize: 15
                }
            })}
        >
            <TabsNavigator.Screen name="장부" component={Book}/>
            <TabsNavigator.Screen name="계약" component={Contract} />
            <TabsNavigator.Screen name="임대관리" component={Management} />
            <TabsNavigator.Screen name="개인정보" component={Profile} />
        </TabsNavigator.Navigator>
    );
}

const MainNavigator = createStackNavigator();



const Main = () =>{
    return (
            <MainNavigator.Navigator>
                <MainNavigator.Screen name="tabs" component={Tabs} options={{headerShown:false, presentation:"containedModal"}} />
                <MainNavigator.Screen name="BookType" component={BookType} />
                <MainNavigator.Screen name="DealApart" component={DealApart} />
                <MainNavigator.Screen name="DealApartDetail" component={DealApartDetail} />
                <MainNavigator.Screen name="DealVillaTable" component={DealVillaTable} />
                <MainNavigator.Screen name="DealVillaDetail" component={DealVillaDetail} />
                <MainNavigator.Screen name="DealVillaCreating" component={DealVillaCreating} />
            </MainNavigator.Navigator>
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