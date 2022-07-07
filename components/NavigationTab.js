import React from "react";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { doSetNavBook, doSetNavContract, doSetNavManagement, doSetNavProfile } from "../redux/navigationSlice";


const { width } = Dimensions.get("screen");

const Div = styled.View`
    flexDirection: row;
    marginBottom: 5px;
    position: absolute;
    bottom: -5px;
    paddingBottom: 5px;
    paddingTop: 5px;
    backgroundColor: white;
`;

const NaviTab = styled.TouchableOpacity`
    alignItems: center;
    justifyContent: center;
    width: ${width*1/4}px;
`;

const NaviTabText = styled.Text`
    fontSize: 15px;
    color: gray;
`;

const NavigationTab = (props) => {
    // console.log(props.book);
    const navigation = useNavigation();
    return (
        <Div>
            <NaviTab onPress={() => {
                navigation.navigate("Book");
                props.doSetNavBook();
                }}
            >
                <Ionicons name={"search"} size={20} color={props.book ? "red" : "gray"} />
                <NaviTabText>장부</NaviTabText>
            </NaviTab>
            <NaviTab onPress={() => {
                navigation.navigate("ContractTable");
                props.doSetNavContract();
                }}
            >
                <Ionicons name={"heart"} size={20} color={props.contract ? "red" : "gray"} />
                <NaviTabText>계약</NaviTabText>
            </NaviTab>
            <NaviTab onPress={() => {
                navigation.navigate("ManagementTable");
                props.doSetNavManagement();
                }}
            >
                <Ionicons name={"map"} size={20} color={props.management ? "red": "gray"} />
                <NaviTabText>임대관리</NaviTabText>
            </NaviTab>
            <NaviTab onPress={() => {
                navigation.navigate("Profile");
                props.doSetNavProfile();
                }}
            >
                <Ionicons name={"person"} size={20} color={props.profile ? "red" :"gray"} />
                <NaviTabText>개인정보</NaviTabText>
            </NaviTab>
        </Div>
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