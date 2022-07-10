import React from "react";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { doSetNavBook, doSetNavContract, doSetNavManagement, doSetNavProfile } from "../redux/navigationSlice";
import { NavDiv, NavTab, NavTabText} from "./DivCollection";

const { width, height } = Dimensions.get("screen");
console.log(height);


const NavigationTab = (props) => {
    const navigation = useNavigation();
    return (
        <NavDiv>
            <NavTab onPress={() => {
                navigation.navigate("Book");
                props.doSetNavBook();
                }}
            >
                <Ionicons name={"search"} size={20} color={props.book ? "red" : "gray"} />
                <NavTabText>장부</NavTabText>
            </NavTab>
            <NavTab onPress={() => {
                navigation.navigate("ContractTable");
                props.doSetNavContract();
                }}
            >
                <Ionicons name={"heart"} size={20} color={props.contract ? "red" : "gray"} />
                <NavTabText>계약</NavTabText>
            </NavTab>
            <NavTab onPress={() => {
                navigation.navigate("ManagementTable");
                props.doSetNavManagement();
                }}
            >
                <Ionicons name={"map"} size={20} color={props.management ? "red": "gray"} />
                <NavTabText>임대관리</NavTabText>
            </NavTab>
            <NavTab onPress={() => {
                navigation.navigate("Profile");
                props.doSetNavProfile();
                }}
            >
                <Ionicons name={"person"} size={20} color={props.profile ? "red" :"gray"} />
                <NavTabText>개인정보</NavTabText>
            </NavTab>
        </NavDiv>
    );
};

function mapStateToProps(state){
    return state.navigationReducer
};

function mapDispatchToProps(dispatch){
    return {
        doSetNavBook: () => dispatch(doSetNavBook()),
        doSetNavContract: () => dispatch(doSetNavContract()),
        doSetNavManagement: () => dispatch(doSetNavManagement()),
        doSetNavProfile: () => dispatch(doSetNavProfile()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationTab);