import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { doSetNavBook, doSetNavContract, doSetNavManagement, doSetNavProfile } from "../redux/navigationSlice";
import { NavDiv, NavTab, NavTabText} from "./DivCollection";

const myBlue = "rgba(150, 240, 240, 1)";

const NavigationTab = (props) => {
    const navigation = useNavigation();
    return (
        <NavDiv>
            <NavTab onPress={() => {
                navigation.navigate("Book");
                props.doSetNavBook();
                }}
            >
                <Ionicons name={"search"} size={20} color={props.book ? myBlue : "gray"} />
                <NavTabText>장부</NavTabText>
            </NavTab>
            <NavTab onPress={() => {
                navigation.navigate("ContractTable");
                props.doSetNavContract();
                }}
            >
                <Ionicons name={"document-text-outline"} size={20} color={props.contract ? myBlue : "gray"} />
                <NavTabText>계약</NavTabText>
            </NavTab>
            <NavTab onPress={() => {
                navigation.navigate("ManagementTable");
                props.doSetNavManagement();
                }}
            >
                <Ionicons name={"home-outline"} size={20} color={props.management ? myBlue : "gray"} />
                <NavTabText>임대관리</NavTabText>
            </NavTab>
            <NavTab onPress={() => {
                navigation.navigate("Profile");
                props.doSetNavProfile();
                }}
            >
                <Ionicons name={"person-outline"} size={20} color={props.profile ? myBlue :"gray"} />
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