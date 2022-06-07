import React from "react";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";


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

const NavigationTab = () => {
    const navigation = useNavigation();
    return (
        <Div>
            <NaviTab onPress={() => navigation.navigate("Book")}>
                <Ionicons name={"search"} size={20} color={"gray"} />
                <NaviTabText>장부</NaviTabText>
            </NaviTab>
            <NaviTab onPress={() => navigation.navigate("ContractTable")}>
                <Ionicons name={"heart"} size={20} color={"gray"} />
                <NaviTabText>계약</NaviTabText>
            </NaviTab>
            <NaviTab onPress={() => navigation.navigate("Management")}>
                <Ionicons name={"map"} size={20} color={"gray"} />
                <NaviTabText>임대관리</NaviTabText>
            </NaviTab>
            <NaviTab onPress={() => navigation.navigate("Profile")}>
                <Ionicons name={"person"} size={20} color={"gray"} />
                <NaviTabText>개인정보</NaviTabText>
            </NaviTab>
        </Div>
    );
};

function mapStateToProps(state){
    return state
};

export default connect(mapStateToProps)(NavigationTab);